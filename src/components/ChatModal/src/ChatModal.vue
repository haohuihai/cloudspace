<template>
  <div :class="prefixCls">
    <div>
      <ElDialog
        v-model="visible"
        title="Shipping address"
        destroy-on-close
        draggable
        :show-close="false"
        @close="handleCloseChat"
      >
        <template #header>
          <div class="h-15 flex items-center justify-between">
            <ElAvatar :size="40" class="" src="../../../assets/imgs/users/avatar-1.jpg"/>
            <Icon
              icon="ic:round-close"
              @click="handleCloseChat"
              class="text-blue-400 cursor-pointer"
              :size="30"
          /></div>
        </template>
        <div class="chat_container flex h-150">
          <div class="chat_left w-60">
            <ElTabs
              v-model="editableTabsValue"
              @tab-change="tabChange"
              type="card"
              stretch
              class="demo-tabs"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                class="over"
              >
                <template v-if="editableTabsValue === 'chat'">
                  <div
                    class="flex w-full list_item"
                    v-for="i in [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15]"
                    :key="i"
                  >
                    <ElAvatar :size="35"  :src="item.avatar"/>
                    <div class="ml-3 flex-1 max">
                      <div class="user_top">
                        <span class="truncate">张三</span>
                        <span>13:13</span>
                      </div>
                      <div class="user_bottom"> 张三李四王麻烦的事 </div>
                    </div>
                  </div>
                </template>
                <div v-show="editableTabsValue === 'user'">User</div>
              </el-tab-pane>
            </ElTabs>
          </div>
          <div class="chat_right flex-1">
            <div class="content_top flex flex-col" ref="messageRef">
              <!-- 其他用户 -->
              <div v-for="item in messageList.messages" :key="item.messageId">
                <div
                  class="flex"
                  :class="[item.senderId === currentUser ? 'chat_item_right' : 'chat_item_left']"
                >
                  <ElAvatar :src="item.avatar"/>
                  <div
                    class="chat_contents"
                    :class="[item.senderId === currentUser ? 'chat_mycontent' : 'chat_itcontent']"
                    >{{ item.content }}</div
                  >
                </div>
              </div>
            </div>

            <div class="content_bottom">
              <div class="content_bottom_top">
                <div class="chat_tools">
                  <Icon icon="bi:emoji-smile" size="20" class="emoji_icon" />
                  <Icon icon="ph:image-square-fill" size="24" class="image_icon" />
                </div>
              </div>
              <div class="content_bottom_bottom">
                <ElInput
                  v-model="textareaValue"
                  resize="none"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                  placeholder="请输入要发送的内容..."
                  @keydown="handleKeydown"
                  @keyup="handleSendMessage"
                />
              </div>
            </div>
          </div>
        </div>
      </ElDialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, onMounted, nextTick } from 'vue'
import { ElDialog, ElAvatar, ElTabs, ElTabPane, ElInput, ElMessage } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/stores/modules/app'
import { useChatStore } from '@/stores/modules/chat'
import { useCache } from '@/hooks/web/useCache'

import { randomString } from '@/utils/utils.js'

const { wsCache } = useCache()
const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('chat-modal')
const appStore = useAppStore()
const chatStore = useChatStore()

const userInfo = wsCache.get(appStore.getUserInfo)
export default defineComponent({
  components: { ElDialog, ElAvatar, ElTabPane, ElTabs, ElInput },
  setup() {
    const editableTabsValue = ref('chat')
    const currentUser = ref('123222')
    const messageRef = ref<HTMLElement | null>(null)
    const messageList = reactive({
      messages: [
        {
          messageId: '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
          name: 'Juanita',
          password: '123',
          avatar: '/assets/imgs/avatar-1.png',
          email: 'Juanita@goeasy.io',
          content: '你好啊',
          phone: '138xxxxxxxx',
          senderId: '123222'
        },
        {
          messageId: '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
          name: 'Juanita',
          password: '123',
          avatar: '/assets/imgs/avatar-1.png',
          email: 'Juanita@goeasy.io',
          phone: '138xxxxxxxx',
          senderId: '444444',
          content: '我很好啊'
        }
      ]
    })

    const textareaValue = ref('')
    const editableTabs = ref([
      {
        title: '聊天',
        name: 'chat'
      },
      {
        title: '好友',
        name: 'user'
      }
    ])

    const visible = computed(() => {
      return appStore.getChatVisiable
    })
    function handleCloseChat() {
      appStore.setChatVisible(false)
    }

    function tabChange(name: string) {
      console.log('name', name)
    }

    // 回车事件
    function handleSendMessage(event) {
      if (event.keyCode === 13) {
        event.preventDefault() // 阻止浏览器默认换行操作
        sendMessage() // 发送文本
        // 滚动条始终在底部
        nextTick(() => {
          messageRef.value && messageRef.value.scrollTo({ top: messageRef.value.scrollHeight, behavior: 'smooth' })
        })
        return false
      }
    }
    // 发送文本事件
    function sendMessage() {
      // 每次生成随机的messageId,

      if (!textareaValue.value.trim()) {
        ElMessage.error('请输入内容')
        return
      }
      messageList.messages.push({
        messageId: '33c3693b-dbb0-4bc9' + messageList.messages.length + 'adsdfd',
        name: 'Juanita',
        password: '123',
        avatar: '/assets/imgs/avatar-1.png',
        email: 'Juanita@goeasy.io',
        phone: '138xxxxxxxx',
        senderId: '123222',
        content: textareaValue.value
      })

      const aaa = randomString(true, 18, 32)

      chatStore.sendMessage({
        myUserId: userInfo.userId,
        heUserId: 2,
        id: chatStore.getSocketId,
        content: textareaValue.value,
        messageId: aaa
      })
      textareaValue.value = ''
      scrollToBottom()
    }
    // 按下enter时禁止
    function handleKeydown(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
      }
    }
    onMounted(() => {
      // 当界面挂载出来后就会自动执行
    })
    // 滚动到底部
    function scrollToBottom() {}
    return {
      prefixCls,
      visible,
      handleCloseChat,
      editableTabsValue,
      editableTabs,
      currentUser,
      tabChange,
      textareaValue,
      messageRef,
      messageList,
      handleSendMessage,
      handleKeydown
    }
  }
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-chat-modal';
.@{prefix-cls} {
  :deep(.el-dialog__header) {
    padding: 0 10px;
    width: 100%;
    background: #c6e2ff;
  }
  :deep(.el-dialog__body) {
    padding: 0;
  }

  .chat_left {
    padding: 0;
    border-right: 1px solid #e6e8eb;
    :deep(.el-tabs) {
      height: 100%;
    }
    :deep(.el-tabs__nav) {
      border: none;
    }
    :deep(.el-tabs__header) {
      margin-bottom: 0;
    }
    :deep(.is-active) {
      border-bottom: none;
    }
    :deep(.el-tabs__content) {
      height: calc(100% - 40px);
      width: 100%;
      background: #f2f2f2;
      overflow-y: overlay;
    }
    .list_item {
      cursor: pointer;
      padding: 4px;
      background: #fbfbfb;
      align-items: center;
      &:hover {
        background: #e4e4e4;
      }
      .user_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 4px;
        span:nth-child(1) {
          color: #000;
          display: inline-block;
          font-size: 14px;
        }
        span:nth-child(2) {
          font-size: 13px;
          color: #b9b9b9;
          display: inline-block;
        }
      }
      .user_bottom {
        font-size: 13px;
        color: #b8b8b8;
      }
    }
  }
  .chat_right {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
  }
  .content_top {
    flex: 1;
    width: 100%;
    overflow-y: overlay;
    overflow-anchor: none;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px !important; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
  }
  .chat_item_left,
  .chat_item_right {
    margin: 6px 0;
    padding: 0 15px;
  }
  .chat_contents {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    margin: 0 14px;
    border-radius: 8px;
    max-width: calc(100% - 110px);
    word-break: break-word;
    font-size: 14px;
    min-height: 28px;
  }
  .chat_mycontent {
    background: #2683f5;
    color: #fff;
    &::after {
      position: absolute;
      width: 0;
      height: 0;
      right: -9px;
      top: 11px;
      content: '';
      border-left: solid 10px #2683f5;
      border-top: solid 10px transparent;
      border-bottom: solid 10px transparent;
    }
  }
  .chat_itcontent {
    float: left;
    background: #eee;
    color: #000;
    &:before {
      position: absolute;
      width: 0;
      height: 0;
      left: -9px;
      top: 9px;
      content: '';
      border-right: solid 10px #eee;
      border-top: solid 10px transparent;
      border-bottom: solid 10px transparent;
    }
  }
  .chat_item_left {
  }
  .chat_item_right {
    display: flex;
    align-self: self-end;
    flex-direction: row-reverse;
    width: 100%;
  }
  .content_bottom {
    height: 150px;
    width: 100%;
    .content_bottom_top {
      .chat_tools {
        border-bottom: 1px solid #f5f0f0;
        border-top: 1px solid #f5f0f0;
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0px 3px;
        :deep(.el-icon) {
          height: 100% !important;
          width: 35px !important;
          &:hover {
            cursor: pointer;
            background: #f7f5f5;
          }
        }
      }
    }
    .content_bottom_bottom {
      :deep(.el-textarea__inner) {
        height: 100%;
        box-shadow: none;
      }
    }
  }
}
</style>
