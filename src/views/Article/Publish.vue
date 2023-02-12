<template>
  <div>
    <v-md-editor
      placeholder="开始创作吧"
      :disabled-menus="[]"
      v-model="value"
      height="100"
      :autofocus="true"
      :tab-size="2"
      left-toolbar="undo redo clear | fontColor tip h bold italic strikethrough quote emoji | ul ol table hr todo-list align | link image code | save"
      right-toolbar="preview  toc  sync-scroll fullscreen"
      :include-level="[1, 2]"
      :toolbar="toolbarList"
      @upload-image="imgAdd"
      @save="saveEdite"
      @image-click="handleImage"
      @change="changeData"
      ref="mdEditorRef"
    />

    <ElDialog title="发布文章" v-model="dialogVisible" width="30%">
      <ElForm
        label-position="left"
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <ElFormItem label-width="80px" label="文章标题" prop="type">
          <ElInput v-model="ruleForm.inputValue" placeholder="请输入内容" />
        </ElFormItem>
        <ElFormItem label-width="80px" label="文章分类" prop="type">
          <ElSelect v-model="ruleForm.articleTypeId" placeholder="选择分类">
            <ElOption
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
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
          :show-file-list="false"
          name="article"
          :auto-upload="false"
          :on-success="handleAvatarSuccess"
          :on-change="uploadChange.bind(this)"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageCoverUrl" :src="imageCoverUrl" class="coverImg" />
          <i v-else class="el-icon-plus avatar-uploader-icon">+</i>
        </ElUpload>
        <!-- <ElFormItem label-width="80px" label="文章类型" prop="type">
          <ElRadioGroup v-model="ruleForm.articleType">
            <ElRadio label="0">原创</ElRadio>
            <ElRadio label="1">转载</ElRadio>
          </ElRadioGroup>
        </ElFormItem> -->
        <!-- <ElFormItem label-width="80px" label="发布形式" prop="type">
          <ElRadioGroup v-model="ruleForm.releaseForm">
            <ElRadio label="0">公开</ElRadio>
            <ElRadio label="1">私密</ElRadio>
            <ElRadio label="2">粉丝可见</ElRadio>
            <ElRadio label="3">VIP可见</ElRadio>
          </ElRadioGroup>
        </ElFormItem> -->
      </ElForm>
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="dialogVisible = false">取 消</ElButton>
          <ElButton type="primary" @click="handleSubmitForm">确 定</ElButton>
        </div>
      </template>
    </ElDialog>

    <PreviewImage
      :isVisibleImg="isVisibleImg"
      :imageSrc="previewImageSrc"
      @handle-close-preview="handleCloseImage"
    />
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
import { REQUEST_IMG } from '@/config/axios/service'

import { reactive, ref, onMounted } from 'vue'
import { useAppStoreWithOut } from '@/stores/modules/app'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'
import { PreviewImage } from '@/components/PreviewImage'
import { uploadArticleImg } from '@/api/article'
import { isVisible } from 'element-plus/es/utils'
const appStore = useAppStoreWithOut()
const { wsCache } = useCache()

const userInfo = wsCache.get(appStore.getUserInfo)
let value = ref('') // 是上一次编辑的内容
let isVisibleImg = ref<Boolean>(false)
let previewImageSrc = ref<string>('')
let contentMdValue = ref<string>('')
let previewContent = ref('') // 预览内容
let dialogVisible = ref<Boolean>(false)
let imageCoverUrl = ref<string>('')
const mdEditorRef = ref<HTMLElement | null>(null)
let toolbarList = reactive({
  fontColor: {
    title: '字体颜色',
    icon: 'v-md-icon-tip',
    action(editor) {
      editor.insert(function (selected) {
        console.log('selected', selected)
        const prefix = '<span style="color: red">'
        const suffix = '<span>'
        const placeholder = '请输入文本'
        const content = selected || placeholder

        return {
          text: `${prefix}${content}${suffix}`,
          selected: content
        }
      })
    }
  },
  align: {
    title: '对齐方式',
    icon: 'v-md-icon-tip',
    menus: [
      {
        name: '左对齐',
        text: '左对齐',
        action(editor) {
          editor.insert(function (selected) {
            const prefix = '::: align-left'
            const suffix = ':::'
            const placeholder = '请输入文本'
            const content = selected || placeholder

            return {
              text: `${prefix}
${content}
${suffix}`,
              selected: content
            }
          })
        }
      },
      {
        name: '居中对齐',
        text: '居中对齐',
        action(editor) {
          editor.insert(function (selected) {
            const prefix = '::: align-center'
            const suffix = ':::'
            const placeholder = '请输入文本'
            const content = selected || placeholder

            return {
              text: `${prefix}
${content}
${suffix}`,
              selected: content
            }
          })
        }
      },
      {
        name: '右对齐',
        text: '右对齐',
        action(editor) {
          editor.insert(function (selected) {
            const prefix = '::: align-right'
            const suffix = ':::'
            const placeholder = '请输入文本'
            const content = selected || placeholder

            return {
              text: `${prefix}
${content}
${suffix}`,
              selected: content
            }
          })
        }
      }
    ]
  }
})
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
console.log('REQUEST_IMG', REQUEST_IMG)

onMounted(() => {
  console.log('this', mdEditorRef.value)
})

const handleAvatarSuccess = (res, file) => {
  // this.imageUrl = URL.createObjectURL(file.raw)
}

const uploadChange = (uploadFile, uploadFiles) => {
  let param = new FormData()
  param.append('file', uploadFile.raw)

  uploadArticleImg(param).then((res) => {
    console.log(res)
    imageCoverUrl.value = REQUEST_IMG + '/articleImg/' + res.data
  })
  console.log(uploadFile, uploadFiles)
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  console.log(file)
  // if (!isJPG) {
  //   ElMessage.error('上传头像图片只能是 JPG 格式!')
  // }
  // if (!isLt2M) {
  //   ElMessage.error('上传头像图片大小不能超过 2MB!')
  // }
  // return isJPG && isLt2M
  return true
}
const handleCopyCodeSuccess = (code) => {
  console.log(code)
}
// text 输入的内容   value转为标签的内容
const saveEdite = (text, value) => {
  console.log(text, value)
  dialogVisible.value = true
}

const uploadImage = (evt) => {
  var clipboardData = evt.clipboardData
  console.log(clipboardData)
  for (var i = 0; i < clipboardData.items.length; i++) {
    var item = clipboardData.items[i]
    if (item.kind == 'file' && item.type.match(/^image\//i)) {
      //blob就是剪贴板中的二进制图片数据
      var blob = item.getAsFile(),
        reader = new FileReader()
      console.log('blob', blob)
      //定义fileReader读取完数据后的回调
      reader.onload = function () {
        var sHtml = '<img src="' + event.target.result + '">' //result应该是base64编码后的图片
        document.getElementById('dd').innerHTML += sHtml
      }
      reader.readAsDataURL(blob) //用fileReader读取二进制图片，完成后会调用上面定义的回调函数
    }
  }
}
// 上传图片
const imgAdd = (event, insertImage, files) => {
  console.log(files)
  var formdata = new FormData()
  formdata.append('file', files[0])
  uploadArticleImg(formdata).then((res) => {
    insertImage({
      url: REQUEST_IMG + '/articleImg/' + res.data,
      width: '100px',
      height: '100px'
    })
  })
}

const changeData = (markdown, html) => {
  console.log(markdown, html)
  const html1 = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(markdown))
  storageMysqlContent.value = html1
  contentMdValue.value = markdown
}
// 预览解析前的触发
// :before-preview-change="beforePreviewChange"

// const beforePreviewChange = (text, next) => {
//   console.log('text', text)
//   next(contentMdValue.value)
// }

// 预览图片
const handleImage = (e, currentIndex) => {
  console.log(e)
  previewImageSrc.value = e[currentIndex]
  isVisibleImg.value = true
}
const handleCloseImage = () => {
  isVisibleImg.value = false
}
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

.coverImg,
.avatar-uploader-icon {
  width: 80px;
  height: 80px;
}
pre {
  padding: 0 !important;
}
:deep {
  .vuepress-markdown-body:not(.custom) {
    padding: 1em 1.5em;
  }
  .el-upload {
    .avatar-uploader-icon {
      text-align: center;
      width: 80px;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      background: #fff;
      border: 1px dashed #bfbfbf;
      border-radius: 4px;
      &:hover {
        background: rgb(238, 238, 238);
      }
    }
  }
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
