import { defineStore } from 'pinia'
import socket from '@/socket'
import { store } from '../index'

export const useChat = defineStore('chat', {
  state: () => {
    return {
      message: {},
      socketId: '',
      usersList: []
    }
  },
  getters: {
    getSocketId(state) {
      return state.socketId
    }
  },
  actions: {
    setCurrentSocketId(socketId) {
      this.socketId = socketId
    },
    sendMessage(data) {
      console.log('data', this.socketId)

      socket.emit('send_client_message', { data, id: this.socketId })
    },
    setUserList(user) {
      for (let i = 0; i < this.usersList.length; i++) {
        const existingUser = this.usersList[i]
        if (existingUser.userID === user.userID) {
          existingUser.connected = true
          return
        }
      }
      this.usersList.push({ ...user, hasNewMessages: false })
    }
  }
})

export const useChatStore = () => {
  return useChat(store)
}
