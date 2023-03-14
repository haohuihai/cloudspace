import { useChat } from '@/stores/modules/chat'
import { ElNotification, ElMessage } from 'element-plus'
import { useChatStore } from '@/stores/modules/chat'
const chatStore = useChatStore()

const connectChat = (socket) => {
  console.log('socket', socket.id)

  chatStore.setCurrentSocketId(socket.id)
  socket.on('send_server_message', (data) => {
    console.log(12321)

    ElNotification.success(data)
  })
  socket.on('user_connect', (user) => {
    useChatStore.setUserList(user)
  })
}
export default connectChat
