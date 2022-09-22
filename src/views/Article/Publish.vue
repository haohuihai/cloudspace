<template>
  <div>
    <!-- <el-row type="flex" align="middle" class="lineHeight80">

        <el-col :span="4" class="flexCenter">
          <ElButton type="primary" @click="saveEdite">保存</ElButton>
          <ElButton type="primary" @click="temporarySave">存为草稿</ElButton>
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </el-col>
      </el-row> -->
      <v-md-editor
        placeholder="请稍等，图片上传中"
        :disabled-menus="[]"
        v-model="value"
        height="100"
        @change="changeData"></v-md-editor>
    <div :loading="quillUpdateImg" class="containerBox" element-loading-text="请稍等，图片上传中">
      <!-- <mavon-editor @imgAdd="imgAdd" @imgDel="imgDel" fontSize="16px" @save="saveEdite" v-model="value" ref="md"
        previewBackground="rgb(67, 73, 76)" @change="changeData" :codeStyle="codeStyle" :toolbarsFlag="toolbarsFlag">
        <template slot="right-toolbar-after">
          <MavonEditorTools @changeCodeStyle="changeCodeStyle" @changeThemeStyle="changeThemeStyle"
            @hidleShowTools="hidleShowTools" />
        </template>
      </mavon-editor> -->
      <div class="otherOperate" :style="{ top: toolbarsFlag ? '50px' : '10px' }">
        <span @click="hidleShowTools" class="iconfont icon-xiangshangshouqi-yuankuang" v-if="toolbarsFlag"
          data-left="隐藏工具栏"></span>
        <span @click="hidleShowTools" data-left="显示工具栏" class="iconfont icon-xiangxiazhankai-yuankuang" v-else></span>
      </div>
    </div>
    <div class="codeStyle animated slideInRight" v-if="closeCodeStyleMpdel">
      <div class="codeStyleTitle">
        <h3>选择代码分格</h3>
        <i class="el-icon-close" @click="handleCloseStyle"></i>
      </div>
      <div class="codeStyleList">
        <ul @click.stop="handleClickLI($event)">
          <li v-for="(item, index) in codeStyleList" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- <ElDialog title="发布文章" :visible.sync="dialogVisible" width="30%"> -->
      <!-- <el-form label-position="center" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label-width="80px" label="文章标题" prop="type">
          <el-input v-model="ruleForm.inputValue" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="展示封面" prop="type">
          <el-radio-group v-model="ruleForm.isCover">
            <el-radio label="0">无封面</el-radio>
            <el-radio label="1">单图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-upload :style="{ display: ruleForm.isCover === '1' ? 'block' : 'none' }" class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageCoverUrl" :src="imageCoverUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label-width="80px" label="文章类型" prop="type">
          <el-radio-group v-model="ruleForm.articleType">
            <el-radio label="0">原创</el-radio>
            <el-radio label="1">转载</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="80px" label="发布形式" prop="type">
          <el-radio-group v-model="ruleForm.releaseForm">
            <el-radio label="0">公开</el-radio>
            <el-radio label="1">私密</el-radio>
            <el-radio label="2">粉丝可见</el-radio>
            <el-radio label="3">VIP可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="80px" label="文章分类" prop="type">
          <el-select v-model="ruleForm.articleTypeId" placeholder="选择分类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
      <!-- <span slot="footer" class="dialog-footer">
        <ElButton @click="dialogVisible = false">取 消</ElButton>
        <ElButton type="primary" @click="handleSubmitForm">确 定</ElButton>
      </span>
    </ElDialog> -->
  </div>
</template>
<!-- <script src="https://cdn.bootcdn.net/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script> -->
<script setup lang="ts">

import { useCache } from '@/hooks/web/useCache'
import { publishArticleApi } from '@/api/article'
import { ElMessage, ElDialog, ElButton } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { useAppStoreWithOut } from '@/stores/modules/app'
import highjs from "@/assets/lang.hljs.css"

const appStore = useAppStoreWithOut()
const { wsCache } = useCache()

const userInfo = wsCache.get(appStore.getUserInfo)

// import Qs from "qs"
let value = ref('') // 是上一次编辑的内容
let previewContent = ref('') // 预览内容
let dialogVisible = ref(false)
let quillUpdateImg = ref(true)
let imageCoverUrl = ref('')
let codeStyle = ref('agate')
let options = ref([
  {
    value: "1",
    label: "前端",
  },
  {
    value: "2",
    label: "后端",
  },
  {
    value: "3",
    label: "Python",
  },
  {
    value: "4",
    label: "框架",
  },
  {
    value: "5",
    label: "热门问题",
  },
])
let storageMysqlContent = ref('')
let closeCodeStyleMpdel = ref(false)
let codeStyleList = ref([])
let toolbarsFlag = ref(true)
let ruleForm = reactive({
  resource: '0',
  isCover: '0',
  articleType: '0',
  releaseForm: '0',
  articleTypeId: '1',
  inputValue: ''
})
let rules = reactive({
  resource: [
    { required: true, message: "请选择活动资源", trigger: "change" },
  ]
})
onMounted(() => {
  codeStyleList.value = Object.keys(highjs)
})
const handleAvatarSuccess = (res, file) =>  {
  // this.imageUrl = URL.createObjectURL(file.raw)
}
const changeCodeStyle = () =>  {
  closeCodeStyleMpdel.value = !closeCodeStyleMpdel.value
}
const changeThemeStyle = () =>  {
  console.log(`e`, 123)
}
const hidleShowTools = () =>  {
  if (closeCodeStyleMpdel.value) closeCodeStyleMpdel.value = false
  toolbarsFlag.value = !toolbarsFlag.value
}
const handleClickLI = (e) =>  {
  codeStyle.value = e.target.innerText
}
const beforeAvatarUpload = (file) =>  {
  const isJPG = file.type === "image/jpeg"
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error("上传头像图片只能是 JPG 格式!")
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!")
  }
  return isJPG && isLt2M
}
const handleCloseStyle = () =>  {
  closeCodeStyleMpdel.value = false
}
const saveEdite = () =>  {
  dialogVisible.value = true
}
const temporarySave = () =>  {
  console.log(content)
}
// 上传图片
const imgAdd = (pos, $file) =>  {
  // 第一步.将图片上传到服务器.
  var formdata = new FormData()
  formdata.append("image", $file)
  this.$http
    .post("/article/articleImg", formdata)
    .then((res) => {
      this.$refs.md.$img2Url(
        pos,
        "http://localhost:10000/article/" + res.data.data
      )
    })
    .catch((err) => {})
}
// 删除图片
const imgDel = () =>  {
  console.log(`111`, 111)
}
const changeData = (markdown, html)  => {
  storageMysqlContent.value = html
}
const  handleSubmitForm = async () => {
  // window.localStorage.getItem("token")
  let saveArticleContent = {
    content: storageMysqlContent.value,
    token: '1111111111',
    isOriginal: ruleForm.resource,
    coverImage: ruleForm.isCover,
    releaseType: ruleForm.articleType,
    articleTitle: ruleForm.inputValue,
    articleTypeId: ruleForm.articleTypeId,
    abstract: '我是摘要',
    nickname: userInfo.nickname,
    userId: '1',
    codeStyle: codeStyle.value
  }
  const res = publishArticleApi(saveArticleContent)
  console.log(res);
  // const { data: res } = await this.$http.post(
  //   "article/saveEditContent",
  //   Qs.stringify(saveArticleContent)
  // )
  // if (res.status === "SUCCESS") {
  //   ElMessage.success("文章保存成功")
  //   dialogVisible.value = false
  //   push("/")
  // }
}
</script>

<style lang="less" scoped>
// @import "../../assets/css/index.less";

@codeHeadheight: 50px;
@toolsHeight: 41px;
.containerBox {
  width: 100vw;
  .v-note-wrapper {
    height: 100vh;
     .v-note-panel {
      background-color: #f9f9f5;
      color: #2c3e50;
      .content-input-wrapper {
        min-height: 100%;
      }
    }
  }
  .otherOperate {
    position: absolute;
    right: 40px;
    z-index: 2222;
    span {
      color: rgba(102, 128, 153, 0.45);
      font-size: 22px;
      cursor: pointer;
      position: relative;
    }
    span:hover {
      &:after {
        position: absolute;
        display: inline-block;
        left: -22px;
        top: 27px;
        font-size: 14px;
        width: 70px;
        content: attr(data-left);
      }
    }
  }
}
.el-dialog__wrapper {
  .el-dialog__body {
    padding-top: 10px;
  }
}
.codeStyle {
  z-index: 2000;
  width: 200px;
  position: fixed;
  right: 0;
  top: calc(@toolsHeight + 2px);
  height: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  .codeStyleTitle {
    display: flex;
    justify-content: space-between;
    line-height: @codeHeadheight;
    align-items: center;
    box-sizing: border-box;
    padding: 0 12px 0 18px;
    border-bottom: 1px solid #f2f6fc;
  }
  i {
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
  }
  .codeStyleList {
    height: calc(100vh - 79px);
    ul {
      height: 100%;
      overflow: scroll;
      list-style: none;
    }
    ul li {
      padding-left: 30px;
      line-height: 30px;
      height: 30px;
      cursor: pointer;
    }
    ul li:hover {
      background: #cacaca;
      border-bottom: 1px solid #d9d9d9;
    }
  }
}
pre {
  padding: 0 !important;
}

li {
  list-style: disc !important;
}
.v-left-item {
  display: block;
}
.v-right-item {
  text-align: right !important;
  margin-bottom: 0px !important;
}
</style>
