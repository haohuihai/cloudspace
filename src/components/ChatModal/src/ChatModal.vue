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
            <ElAvatar :size="40" class="" />
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
                    <ElAvatar :size="35" />
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
            <div class="content_top"></div>
            <div class="content_bottom">
              <div class="content_bottom_top"></div>
              <div class="content_bottom_bottom"> </div>
            </div>
          </div>
        </div>
      </ElDialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { ElDialog, ElAvatar, ElTabs, ElTabPane } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/stores/modules/app'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('chat-modal')
const appStore = useAppStore()

export default defineComponent({
  components: { ElDialog, ElAvatar, ElTabPane, ElTabs },
  setup() {
    const editableTabsValue = ref('chat')
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
    return {
      prefixCls,
      visible,
      handleCloseChat,
      editableTabsValue,
      editableTabs,
      tabChange
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
        color: #696969;
      }
    }
  }
  .chat_right {
    padding: 5px;
    display: flex;
    flex-direction: column;
  }
  .content_top {
    flex: 1;
    width: 100%;
    background: blue;
  }
  .content_bottom {
    height: 100px;
    width: 100%;
    background: red;
    .content_bottom_top {
    }
    .content_bottom_bottom {
    }
  }
}
</style>
