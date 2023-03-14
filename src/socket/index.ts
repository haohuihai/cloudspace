import io from 'socket.io-client'

import connectGame from './modules/game'
import connectChat from './modules/chat'
import connectLogin from './modules/login'
const socket = io()

// 创建连接
// 进行连接监听
socket.on('connect', () => {
  console.log(123)

  // 绘画
  connectGame(socket)
  // 聊天
  connectChat(socket)
  // 登录
  connectLogin(socket)
})

export default socket
