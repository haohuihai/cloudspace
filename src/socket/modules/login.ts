import { ElNotification, ElMessage } from 'element-plus'
import { useLoginWithout } from '@/stores/modules/login'

const loginStore = useLoginWithout()
const connectLogin = (socket) => {
  // 监听服务器传的二维码等信息
  socket.on('login_sendQRcode', (data) => {
    console.log('data', data)

    loginStore.setQRimage(data.QRcode)
    loginStore.setQRId(data.QRId)
    ElNotification.error('连接成功')
  })
  // 监听二维码扫描成功  修改扫描成功的状态，等待用户确认
  // socket.on('login_successScanCode', () => {
  //   loginStore.setCodeStatus(true)
  // })
  // 等待扫码
  socket.on('login_waitScanCode', (data) => {
    console.log('等待扫码', data)
  })

  // 扫描成功，等待确认
  socket.on('login_scanCodeing', (data) => {
    loginStore.setCodeStatus(true)
    console.log('扫描成功，等待确认', data)
  })

  // 二维码失效  超时
  socket.on('login_scanCodeOvertime', (data) => {
    console.log('二维码失效')
    loginStore.setCodeOvertime(true)
  })
}
export default connectLogin
