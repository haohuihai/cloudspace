import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/web/useCache'
import { appModules } from '@/config/app'
import type { AppState, LayoutType, ThemeTypes } from '@/config/app'
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage } from 'element-plus'

const { wsCache } = useCache()

export const useAppStore = defineStore('app', {
  state: (): AppState => appModules,
  persist: {
    enabled: true
  },
  getters: {
    getChatVisiable(): boolean {
      return this.chatVisible
    },
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getUniqueOpened(): boolean {
      return this.uniqueOpened
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getLockScreen(): boolean {
      return this.lockScreen
    },
    getLocale(): boolean {
      return this.locale
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getTitle(): string {
      return this.title
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getLockPassword(): string {
      return this.lockPassword
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getCurrentSize(): ElememtPlusSize {
      return this.currentSize
    },
    getSizeMap(): ElememtPlusSize[] {
      return this.sizeMap
    },
    getMobile(): boolean {
      return this.mobile
    },
    getTheme(): ThemeTypes {
      return this.theme
    },
    getFooter(): boolean {
      return this.footer
    },
    getNotice(): boolean {
      return this.notify
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened: boolean) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
    },
    setSize(size: boolean) {
      this.size = size
    },
    setLockScreen(lock: boolean) {
      this.lockScreen = lock
    },
    setLockPassword(lockpass: string) {
      this.lockPassword = lockpass
    }, 
    setNotice(notice: boolean) {
      this.notify = notice
    },
    setLocale(locale: boolean) {
      this.locale = locale
    },
    setChatVisible(visible: boolean) {
      this.chatVisible = visible
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其他布局')
        return
      }
      this.layout = layout
      wsCache.set('layout', this.layout)
    },
    setTitle(title: string) {
      this.title = title
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set('isDark', this.isDark)
    },
    setCurrentSize(currentSize: ElememtPlusSize) {
      this.currentSize = currentSize
      wsCache.set('currentSize', this.currentSize)
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setTheme(theme: ThemeTypes) {
      this.theme = Object.assign(this.theme, theme)
      wsCache.set('theme', this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setFooter(footer: boolean) {
      this.footer = footer
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
