import io from 'socket.io-client'

import connectGame from './modules/game'

const socket = io()

// 创建连接
// 进行连接监听
socket.on('connect', () => {
  connectGame(socket)
})


// connectGame(socket)
//  // 监听socke的连接，为了控制按钮
// // 监听socket的断开
socket.on('disconnect', () => {
  drawOneDraw.updateConnected(false)
})

// socket
export default socket
