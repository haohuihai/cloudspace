export interface GrowCardItem {
  icon: string
  title: string
  value?: number
  total: number
  color?: string
  action?: string
  footer?: string
}

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '月'
  },
  {
    title: '成交额',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '月'
  },
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '周'
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '年'
  }
]

export const chartCardList: GrowCardItem[] = [
  {
    title: '总销售额',
    icon: 'visit-count|svg',
    total: 126560,
    value: 234.56,
    footer: '日均销售额'
  },
  {
    title: '订单量',
    icon: 'total-sales|svg',
    value: 1234,
    total: 8846,
    color: 'blue',
    footer: '日订单量'
  },
  {
    title: '支付笔数',
    icon: 'download-count|svg',
    value: 60,
    total: 6560,
    color: 'orange',
    footer: '转化率'
  },
  {
    title: '运营活动效果',
    icon: 'transaction|svg',
    total: 78
  }
]
export const bdcCardList: GrowCardItem[] = [
  {
    title: '受理量',
    icon: 'ant-design:info-circle-outlined',
    total: 100,
    value: 60,
    footer: '今日受理量'
  },
  {
    title: '办结量',
    icon: 'ant-design:info-circle-outlined',
    value: 54,
    total: 87,
    color: 'blue',
    footer: '今日办结量'
  },
  {
    title: '用户受理量',
    icon: 'ant-design:info-circle-outlined',
    value: 13,
    total: 15,
    color: 'orange',
    footer: '用户今日受理量'
  },
  {
    title: '用户办结量',
    icon: 'ant-design:info-circle-outlined',
    total: 9,
    value: 7,
    footer: '用户今日办结量'
  }
]

export const table = {
  dataSource: [
    {
      reBizCode: '1',
      type: '转移登记',
      acceptBy: '张三',
      acceptDate: '2019-01-22',
      curNode: '任务分派',
      flowRate: 60
    },
    {
      reBizCode: '2',
      type: '抵押登记',
      acceptBy: '李四',
      acceptDate: '2019-01-23',
      curNode: '领导审核',
      flowRate: 30
    },
    {
      reBizCode: '3',
      type: '转移登记',
      acceptBy: '王武',
      acceptDate: '2019-01-25',
      curNode: '任务处理',
      flowRate: 20
    },
    {
      reBizCode: '4',
      type: '转移登记',
      acceptBy: '赵楼',
      acceptDate: '2019-11-22',
      curNode: '部门审核',
      flowRate: 80
    },
    {
      reBizCode: '5',
      type: '转移登记',
      acceptBy: '钱就',
      acceptDate: '2019-12-12',
      curNode: '任务分派',
      flowRate: 90
    },
    {
      reBizCode: '6',
      type: '转移登记',
      acceptBy: '孙吧',
      acceptDate: '2019-03-06',
      curNode: '任务处理',
      flowRate: 10
    },
    {
      reBizCode: '7',
      type: '抵押登记',
      acceptBy: '周大',
      acceptDate: '2019-04-13',
      curNode: '任务分派',
      flowRate: 100
    },
    {
      reBizCode: '8',
      type: '抵押登记',
      acceptBy: '吴二',
      acceptDate: '2019-05-09',
      curNode: '任务上报',
      flowRate: 50
    },
    {
      reBizCode: '9',
      type: '抵押登记',
      acceptBy: '郑爽',
      acceptDate: '2019-07-12',
      curNode: '任务处理',
      flowRate: 63
    },
    {
      reBizCode: '20',
      type: '抵押登记',
      acceptBy: '林有',
      acceptDate: '2019-12-12',
      curNode: '任务打回',
      flowRate: 59
    },
    {
      reBizCode: '11',
      type: '转移登记',
      acceptBy: '码云',
      acceptDate: '2019-09-10',
      curNode: '任务签收',
      flowRate: 87
    }
  ],
  columns: [
    {
      title: '业务号',
      align: 'center',
      dataIndex: 'reBizCode'
    },
    {
      title: '业务类型',
      align: 'center',
      dataIndex: 'type'
    },
    {
      title: '受理人',
      align: 'center',
      dataIndex: 'acceptBy'
    },
    {
      title: '受理时间',
      align: 'center',
      dataIndex: 'acceptDate'
    },
    {
      title: '当前节点',
      align: 'center',
      dataIndex: 'curNode'
    },
    {
      title: '办理时长',
      align: 'center',
      dataIndex: 'flowRate',
      slots: { customRender: 'flowRate' }
    }
  ],
  ipagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条'
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0
  }
}
export const table1 = {
  dataSource: [
    {
      reBizCode: 'A001',
      type: '转移登记',
      acceptBy: '张四',
      acceptDate: '2019-01-22',
      curNode: '任务分派',
      flowRate: 12
    },
    {
      reBizCode: 'A002',
      type: '抵押登记',
      acceptBy: '李吧',
      acceptDate: '2019-01-23',
      curNode: '任务签收',
      flowRate: 3
    },
    {
      reBizCode: 'A003',
      type: '转移登记',
      acceptBy: '王三',
      acceptDate: '2019-01-25',
      curNode: '任务处理',
      flowRate: 24
    },
    {
      reBizCode: 'A004',
      type: '转移登记',
      acceptBy: '赵二',
      acceptDate: '2019-11-22',
      curNode: '部门审核',
      flowRate: 10
    },
    {
      reBizCode: 'A005',
      type: '转移登记',
      acceptBy: '钱大',
      acceptDate: '2019-12-12',
      curNode: '任务签收',
      flowRate: 8
    },
    {
      reBizCode: 'A006',
      type: '转移登记',
      acceptBy: '孙就',
      acceptDate: '2019-03-06',
      curNode: '任务处理',
      flowRate: 10
    },
    {
      reBizCode: 'A007',
      type: '抵押登记',
      acceptBy: '周晕',
      acceptDate: '2019-04-13',
      curNode: '部门审核',
      flowRate: 24
    },
    {
      reBizCode: 'A008',
      type: '抵押登记',
      acceptBy: '吴有',
      acceptDate: '2019-05-09',
      curNode: '部门审核',
      flowRate: 30
    },
    {
      reBizCode: 'A009',
      type: '抵押登记',
      acceptBy: '郑武',
      acceptDate: '2019-07-12',
      curNode: '任务分派',
      flowRate: 1
    },
    {
      reBizCode: 'A0010',
      type: '抵押登记',
      acceptBy: '林爽',
      acceptDate: '2019-12-12',
      curNode: '部门审核',
      flowRate: 16
    },
    {
      reBizCode: 'A0011',
      type: '转移登记',
      acceptBy: '码楼',
      acceptDate: '2019-09-10',
      curNode: '部门审核',
      flowRate: 7
    }
  ],
  columns: [
    {
      title: '业务号',
      align: 'center',
      dataIndex: 'reBizCode'
    },
    {
      title: '受理人',
      align: 'center',
      dataIndex: 'acceptBy'
    },
    {
      title: '发起时间',
      align: 'center',
      dataIndex: 'acceptDate'
    },
    {
      title: '当前节点',
      align: 'center',
      dataIndex: 'curNode'
    },
    {
      title: '超时时间',
      align: 'center',
      dataIndex: 'flowRate',
      slots: { customRender: 'flowRate' }
    }
  ],
  ipagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条'
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0
  }
}
interface GroupItem {
  title: string
  icon: string
  color: string
  desc: string
  date: string
  group: string
}

interface NavItem {
  title: string
  icon: string
  color: string
}

interface DynamicInfoItem {
  avatar: string
  name: string
  date: string
  desc: string
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca'
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c'
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525'
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f'
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9'
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff'
  }
]

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '刚刚',
    desc: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '艾文',
    date: '1个小时前',
    desc: `关注了 <a>威廉</a> `
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '克里斯',
    date: '1天前',
    desc: `发布了 <a>个人动态</a> `
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: 'Jeecg',
    date: '2天前',
    desc: `发表文章 <a>如何编写一个Vite插件</a> `
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '皮特',
    date: '3天前',
    desc: `回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>`
  },
  {
    avatar: 'dynamic-avatar-6|svg',
    name: '杰克',
    date: '1周前',
    desc: `关闭了问题 <a>如何运行项目</a> `
  },
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '1周前',
    desc: `发布了 <a>个人动态</a> `
  },
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '2021-04-01 20:00',
    desc: `推送了代码到 <a>Github</a>`
  }
]

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'carbon:logo-github',
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '开源组',
    date: '2021-04-01'
  },
  {
    title: 'Vue',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '现在的你决定将来的你。',
    group: '算法组',
    date: '2021-04-01'
  },
  {
    title: 'Html5',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    date: '2021-04-01'
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '2021-04-01'
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '健康的身体是实目标的基石。',
    group: '技术牛',
    date: '2021-04-01'
  },
  {
    title: 'Js',
    icon: 'ion:logo-javascript',
    color: '#4daf1bc9',
    desc: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    date: '2021-04-01'
  }
]
export const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: 'CirclePlus'
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  },
  {
    content: '<a>李四</a>登录系统',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46'
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46'
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46'
  }
]
