<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'
// import { loginOutApi } from '@/api/login'
import { useDesign } from '@/hooks/web/useDesign'
import { useTagsViewStore } from '@/stores/modules/tagsView'
import { useAppStoreWithOut } from '@/stores/modules/app'
const tagsViewStore = useTagsViewStore()
const appStore = useAppStoreWithOut()
const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('user-info')

const { t } = useI18n()

const { wsCache } = useCache()

const { replace } = useRouter()

const userInfo = wsCache.get(appStore.getUserInfo)

const loginOut = () => {
  ElMessageBox.confirm(t('common.loginOutMessage'), t('common.reminder'), {
    confirmButtonText: t('common.ok'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  })
    .then(async () => {
      //   const res = await loginOutApi().catch(() => {})
      const res = {} || []
      if (res) {
        wsCache.clear()
        tagsViewStore.delAllViews()
        resetRouter() // 重置静态路由表
        replace('/login')
      }
    })
    .catch(() => {})
}
// const goHome = () => {
//   replace('/dashboard')
// }
</script>
<template>
  <ElDropdown :class="prefixCls" trigger="click">
    <div class="flex items-center">
      <img
        src="@/assets/imgs/avatar.jpeg"
        alt=""
        class="w-[calc(var(--logo-height)-25px)] rounded-[50%]"
      />
      <span class="<lg:hidden text-14px pl-[5px] text-[var(--top-header-text-color)]">{{
        userInfo.username
      }}</span>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <!-- <ElDropdownItem>
          <div @click="goHome">返回首页</div>
        </ElDropdownItem> -->
        <ElDropdownItem divided>
          <div @click="loginOut">{{ t('common.loginOut') }}</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
