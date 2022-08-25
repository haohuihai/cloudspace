import { defineStore } from 'pinia'
import { store } from '../index'

export interface DictState {
  theme: string
}

export const useVisionStore = defineStore('vision', {
  state: (): DictState => {
    return {
      theme: 'chalk'
    }
  },
  persist: {
    enabled: true
  },
  getters: {
    getVisionTheme() {
      return this.theme
    }
  },
  actions: {
    setVisionTheme(theme: string) {
      if (this.theme === 'chalk') {
        this.theme = 'vintage'
      } else {
        this.theme = 'chalk'
      }
    }
  }
})

export const useDictStoreWithOut = () => {
  return useVisionStore(store)
}
