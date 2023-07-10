import { useChat } from '@/stores/modules/chat'
import { ElNotification, ElMessage } from 'element-plus'
import { useChatStore } from '@/stores/modules/chat'
const chatStore = useChatStore()

const connectChat = (socket) => {

  chatStore.setCurrentSocketId(socket.id)
  socket.on('send_server_message', (data) => {
    ElNotification.success(data)
  })
  socket.on('user_connect', (user) => {
    useChatStore.setUserList(user)
  })
}
export default connectChat
