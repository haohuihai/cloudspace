<template>
  <div>
    <v-md-editor
      placeholder="开始创作吧"
      :disabled-menus="[]"
      v-model="value"
      height="100"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save"
      right-toolbar="preview  toc  sync-scroll"
      :include-level="[1, 5]"
      @upload-image="imgAdd"
      @save="saveEdite"
      @#image-click="handleImage"
      @change="changeData"
    ></v-md-editor>

    <ElDialog title="发布文章" v-model="dialogVisible" width="30%">
      <ElForm
        label-position="left"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <ElFormItem label-width="80px" label="文章标题" prop="type">
          <ElInput v-model="ruleForm.inputValue" placeholder="请输入内容"></ElInput>
        </ElFormItem>
        <ElFormItem label-width="80px" label="展示封面" prop="type">
          <ElRadioGroup v-model="ruleForm.isCover">
            <ElRadio label="0">无封面</ElRadio>
            <ElRadio label="1">单图</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElUpload
          :style="{ display: ruleForm.isCover === '1' ? 'block' : 'none' }"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageCoverUrl" :src="imageCoverUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </ElUpload>
        <ElFormItem label-width="80px" label="文章类型" prop="type">
          <ElRadioGroup v-model="ruleForm.articleType">
            <ElRadio label="0">原创</ElRadio>
            <ElRadio label="1">转载</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label-width="80px" label="发布形式" prop="type">
          <ElRadioGroup v-model="ruleForm.releaseForm">
            <ElRadio label="0">公开</ElRadio>
            <ElRadio label="1">私密</ElRadio>
            <ElRadio label="2">粉丝可见</ElRadio>
            <ElRadio label="3">VIP可见</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label-width="80px" label="文章分类" prop="type">
          <ElSelect v-model="ruleForm.articleTypeId" placeholder="选择分类">
            <ElOption
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </ElOption>
          </ElSelect>
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="dialogVisible = false">取 消</ElButton>
          <ElButton type="primary" @click="handleSubmitForm">确 定</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
import { useCache } from '@/hooks/web/useCache'
import { publishArticleApi } from '@/api/article'
import {
  ElMessage,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect,
  ElRadio,
  ElButton,
  ElRadioGroup,
  ElUpload
} from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { useAppStoreWithOut } from '@/stores/modules/app'

const appStore = useAppStoreWithOut()
const { wsCache } = useCache()

const userInfo = wsCache.get(appStore.getUserInfo)

let value = ref('') // 是上一次编辑的内容
let previewContent = ref('') // 预览内容
let dialogVisible = ref(false)
let imageCoverUrl = ref('')
let options = ref([
  {
    value: '1',
    label: '前端'
  },
  {
    value: '2',
    label: '后端'
  },
  {
    value: '3',
    label: 'Python'
  },
  {
    value: '4',
    label: '框架'
  },
  {
    value: '5',
    label: '热门问题'
  }
])
let storageMysqlContent = ref('')
let ruleForm = reactive({
  resource: '0',
  isCover: '0',
  articleType: '0',
  releaseForm: '0',
  articleTypeId: '1',
  inputValue: ''
})
let rules = reactive({
  resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }]
})
onMounted(() => {})
const handleAvatarSuccess = (res, file) => {
  // this.imageUrl = URL.createObjectURL(file.raw)
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

// text 输入的内容   value转为标签的内容
const saveEdite = (text, value) => {
  console.log(text, value)
  dialogVisible.value = true
}

// 上传图片
const imgAdd = (pos, $file) => {
  // 第一步.将图片上传到服务器.
  var formdata = new FormData()
  formdata.append('image', $file)
  this.$http
    .post('/article/articleImg', formdata)
    .then((res) => {
      this.$refs.md.$img2Url(pos, 'http://localhost:10000/article/' + res.data.data)
    })
    .catch((err) => {})
}

const changeData = (markdown, html) => {
  storageMysqlContent.value = html
}

// 预览图片
const handleImage = () => {}
const handleSubmitForm = async () => {
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
    userId: '1'
  }
  const res = publishArticleApi(saveArticleContent)
  console.log(res)
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
@codeHeadheight: 50px;
@toolsHeight: 41px;

.v-md-editor {
  height: 100vh;
}

.el-dialog__wrapper {
  .el-dialog__body {
    padding-top: 10px;
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
