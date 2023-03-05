import { defineStore } from 'pinia'
import { store } from '../index'
import socket from '@/socket'
interface LoginState {
  QRimage: string
  QRId: string
  isSuccessStatus: boolean
  isOverTime: boolean
}
export const useLogin = defineStore('login', {
  state: (): LoginState => {
    return {
      QRimage: '',
      QRId: '',
      isOverTime: false,
      isSuccessStatus: false
    }
  },
  getters: {
    getQRimage(): string {
      return this.QRimage
    },
    getCodeStatus(): boolean {
      return this.isSuccessStatus
    },
    getCodeOvertime(): boolean {
      return this.isOverTime
    }
  },
  actions: {
    httpQRcode: () => {
      socket.emit('login_getQRcode')
    },
    setQRimage(image: string) {
      this.QRimage = image
    },
    setQRId(id: string) {
      this.QRId = id
    },
    checkScanStatus(id: string) {
      socket.emit('login_checkScanCode', id)
    },
    setCodeStatus(flag: boolean) {
      this.isSuccessStatus = flag
    },
    setCodeOvertime(flag: boolean) {
      this.isOverTime = flag
      this.isSuccessStatus = false
    },
    resetQRcode() {
      this.isOverTime = false
      this.isSuccessStatus = false
      this.QRId = ''
      this.QRimage = ''
    }
  }
})
export const useLoginWithout = () => {
  return useLogin(store)
}
