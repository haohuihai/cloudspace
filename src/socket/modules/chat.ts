import { useChat } from '@/stores/modules/chat'
import { ElNotification, ElMessage } from 'element-plus'
const connectChat = (socket) => {
  socket.on('chat_test', () => {
    ElNotification.error('连接成功')
  })
}
export default connectChat
