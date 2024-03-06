import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { Layout, getParentLayout } from '@/utils/routerHelper'
const { result_code } = config

const timeout = 1000

const adminList = [
  {
    path: '/dashboard',
    component: '#',
    name: 'Dashboard',
    redirect: '/dashboard/analysis',
    meta: {
      title: 'router.dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: 'views/Dashboard/Analysis',
        name: 'Analysis',
        meta: {
          title: 'router.analysis',
          noCache: true
        }
      },
      {
        path: 'workplace',
        component: 'views/Dashboard/Workplace',
        name: 'Workplace',
        meta: {
          title: 'router.workplace',
          noCache: true
        }
      }
    ]
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   meta: {
  //     title: 'router.dashboard',
  //     icon: 'ant-design:dashboard-filled',
  //     alwaysShow: true
  //   },
  //   component: 'views/Test/test'
  // },
  // {
  //   path: '/component',
  //   component: '#',
  //   name: 'Component',
  //   meta: {
  //     title: 'router.component',
  //     icon: 'fluent-mdl2:web-components',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'common',
  //       fullPath: '/component/common',
  //       component: 'views/Component/common',
  //       name: 'Currency',
  //       meta: {
  //         icon: 'carbon:assembly-cluster',
  //         title: 'router.common',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'custom',
  //       fullPath: '/component/custom',
  //       component: 'views/Component/custom',
  //       name: 'Custom',
  //       meta: {
  //         icon: 'mdi:assembly',
  //         title: 'router.custom',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/visualization',
    name: 'Visiual',
    meta: {
      title: '可视化',
      hidden: true
    },
    children: [
      {
        path: 'home',
        component: 'views/Visualization/Home',
        name: 'home',
        meta: {
          title: 'router.home',
          noCache: true
        }
      },
      {
        path: 'shopping',
        component: 'views/Visualization/shopping',
        name: 'shopping',
        meta: {
          title: 'router.shopping',
          noCache: true
        }
      },
      {
        path: 'traffic',
        component: 'views/Visualization/Traffic/Traffic',
        name: 'traffic',
        meta: {
          title: 'router.traffic',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/game',
    name: 'Game',
    meta: {
      title: 'GameList',
      hidden: true
    },
    children: [
      {
        path: 'index',
        component: 'views/Game/game',
        name: 'GameList',
        meta: {
          title: 'router.gamelist',
          noCache: true
        }
      },
      {
        path: 'drawonedraw',
        component: 'views/Game/DrawAndDraw/DrawOneDraw',
        name: '猜一猜',
        meta: {
          title: 'router.guess',
          noCache: true
        }
      },
      {
        path: 'drawInto',
        component: 'views/Game/DrawAndDraw/IntoBefore',
        name: '登录游戏',
        meta: {
          title: 'router.logingame',
          noCache: true
        }
      }
    ]
  },
  // {
  //   path: '/external-link',
  //   component: '#',
  //   meta: {},
  //   name: 'ExternalLink',
  //   children: [
  //     {
  //       path: 'https://element-plus-admin-doc.cn/',
  //       name: 'DocumentLink',
  //       meta: {
  //         title: 'router.document',
  //         icon: 'clarity:document-solid'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: '#',
  //   name: 'Guide',
  //   meta: {},
  //   children: [
  //     {
  //       path: 'index',
  //       component: 'views/Guide/Guide',
  //       name: 'GuideDemo',
  //       meta: {
  //         title: 'router.guide',
  //         icon: 'cib:telegram-plane'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/components/form',
    redirect: 'form',
    component: '#',
    name: 'ComponentsDemo',
    meta: {
      title: 'router.form',
      icon: 'ant-design:form-outlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'base-form',
        component: 'views/Components/Form/BaseForm/BaseForm',
        name: 'BaseForm',
        meta: {
          title: 'router.baseForm',
          noCache: true
        }
      },
      {
        path: 'distribution-form',
        component: 'views/Components/Form/Distribution/Distribution',
        name: 'Distribution',
        meta: {
          title: 'router.distributionForm',
          noCache: true
        }
      },
      {
        path: 'high-form',
        component: 'views/Components/Form/HighForm/HighForm',
        name: 'highForm',
        meta: {
          title: 'router.highForm',
          noCache: true
        }
      },
      {
        path: 'calendar',
        component: 'views/Components/Form/Calendar/Calendar',
        name: 'calendar',
        meta: {
          title: 'router.calendar'
        }
      }
    ]
  },
  {
    path: '/components/list',
    component: '#',
    redirect: 'timeLine',
    name: 'ComponentsList',
    meta: {
      title: 'router.list',
      icon: 'ant-design:unordered-list',
      alwaysShow: true
    },

    children: [
      {
        path: 'timeLine',
        component: 'views/Components/List/TimeLine/TimeLine',
        name: 'TimeLine',
        meta: {
          title: 'router.timeLine'
        }
      },
      {
        path: 'lazyLoad',
        component: 'views/Components/List/LazyLoad/LazyLoad',
        name: 'LazyLoad',
        meta: {
          title: 'router.lazyLoad'
        }
      },
      {
        path: 'skeleton',
        component: 'views/Components/List/Skeleton/Skeleton',
        name: 'Skeleton',
        meta: {
          title: 'router.skeleton'
        }
      },
      {
        path: 'descriptionList',
        component: 'views/Components/List/DescriptionList/DescriptionList',
        name: 'DescriptionList',
        meta: {
          title: 'router.descriptionList'
        }
      },
      {
        path: 'virtualList',
        component: 'views/Components/List/VirtualList/VirtualList',
        name: 'virtualList',
        meta: {
          title: 'router.virtualList'
        }
      }
    ]
  },
  {
    path: '/lockScreen',
    name: 'lockScreen',
    component: '/views/LockScreen/LockScreen.vue',
    meta: {
      hidden: true,
      title: 'router.upload',
      icon: 'ant-design:cloud-upload-outlined',
      alwaysShow: true
    },
  },
  {
    path: '/components/upload',
    component: '#',
    redirect: 'upload',
    name: 'ComponentsUpload',
    meta: {
      title: 'router.upload',
      icon: 'ant-design:cloud-upload-outlined',
      alwaysShow: true
    },

    children: [
      {
        path: 'baseUpload',
        component: 'views/Components/Upload/BaseUpload/BaseUpload',
        name: 'BaseUpload',
        meta: {
          title: 'router.baseUpload'
        }
      },
      {
        path: 'splitUpload',
        component: 'views/Components/Upload/SplitUpload/SplitUpload',
        name: 'SplitUpload',
        meta: {
          title: 'router.splitUpload'
        }
      },
      {
        path: 'batchUpload',
        component: 'views/Components/Upload/BatchUpload/BatchUpload',
        name: 'BatchUpload',
        meta: {
          title: 'router.batchUpload'
        }
      },
      {
        path: 'complexUpload',
        component: 'views/Components/Upload/ComplexUpload/ComplexUpload',
        name: 'ComplexUpload',
        meta: {
          title: 'router.complexUpload'
        }
      }
    ]
  },
  {
    path: '/table',
    component: '#',
    name: 'TableDemo',
    meta: {
      title: 'router.table',
      alwaysShow: true,
      icon: 'ant-design:table-outlined'
    },
    children: [
      {
        path: 'default-table',
        component: 'views/Components/Table/DefaultTable/DefaultTable',
        name: 'DefaultTable',
        meta: {
          title: 'router.defaultTable'
        }
      },
      {
        path: 'complex-table',
        component: 'views/Components/Table/ComplexTable/ComplexTable',
        name: 'ComplexTable',
        meta: {
          title: 'router.complexTable'
        }
      }
    ]
  },
  {
    path: '/editor-comp',
    component: '#',
    redirect: 'editor',
    name: 'EditorComp',
    meta: {
      title: 'router.editor',
      alwaysShow: true,
      icon: 'dashicons:editor-spellcheck'
    },
    children: [
      {
        path: 'editor',
        component: 'views/Components/Editor/Editor/Editor',
        name: 'Editor',
        meta: {
          title: 'router.markdown'
        }
      },
      {
        path: 'flowChart',
        component: 'views/Components/Editor/FlowChart/FlowChart',
        name: 'FlowChart',
        meta: {
          title: 'router.flowChart'
        }
      }
    ]
  },
  {
    path: '/tree',
    component: '#',
    name: 'Editor',
    meta: {
      title: 'router.treeComp',
      alwaysShow: true,
      icon: 'iconoir:pine-tree'
    },
    children: [
      {
        path: 'simpleTree',
        component: 'views/Components/Tree/SimpleTree/SimpleTree',
        name: 'SimpleTree',
        meta: {
          title: 'router.simpleTree'
        }
      },
      {
        path: 'complexTree',
        component: 'views/Components/Tree/ComplexTree/ComplexTree',
        name: 'ComplexTree',
        meta: {
          title: 'router.complexTree'
        }
      }
    ]
  },
  {
    path: '/utilityComp',
    component: '#',
    name: 'UtilityComp',
    meta: {
      title: 'router.utilityComp',
      alwaysShow: true,
      icon: 'iconoir:tools'
    },
    children: [
      {
        path: 'croppingImg',
        component: 'views/Components/UtilityComp/CroppingImg/CroppingImg',
        name: 'CroppingImg',
        meta: {
          title: 'router.croppingImg'
        }
      },
      {
        path: 'qrcode',
        component: 'views/Components/UtilityComp/Qrcode/Qrcode',
        name: 'qrcode',
        meta: {
          title: 'router.qrcode'
        }
      },
      {
        path: 'previewImg',
        component: 'views/Components/UtilityComp/PreviewImg/PreviewImg',
        name: 'PreviewImg',
        meta: {
          title: 'router.previewImg'
        }
      },
      {
        path: 'carousel',
        component: 'views/Components/UtilityComp/Carousel/Carousel',
        name: 'Carousel',
        meta: {
          title: 'router.carousel'
        }
      },
      {
        path: 'previewPDF',
        component: 'views/Components/UtilityComp/PreviewPDF/PreviewPDF',
        name: 'PreviewPDF',
        meta: {
          title: 'router.previewPDF'
        }
      },
      {
        path: 'watermark',
        component: 'views/Components/UtilityComp/Watermark/Watermark',
        name: 'Watermark',
        meta: {
          title: 'router.watermark'
        }
      },
      {
        path: 'previewExcel',
        component: 'views/Components/UtilityComp/PreviewExcel/PreviewExcel',
        name: 'PreviewExcel',
        meta: {
          title: 'router.previewExcel'
        }
      },
      {
        path: 'verification',
        component: 'views/Components/UtilityComp/Verification/Verification',
        name: 'Verification',
        meta: {
          title: 'router.verification'
        }
      },
      {
        path: 'guide-Page',
        component: 'views/Components/UtilityComp/GuidePage/GuidePage',
        name: 'GuidePage',
        meta: {
          title: 'router.guidePage'
        }
      }
      // {
      //   path: 'dialog',
      //   component: 'views/Components/Dialog',
      //   name: 'Dialog',
      //   meta: {
      //     title: 'router.dialog'
      //   }
      // },
      // {
      //   path: 'icon',
      //   component: 'views/Components/Icon',
      //   name: 'Icon',
      //   meta: {
      //     title: 'router.icon'
      //   }
      // },
      // {
      //   path: 'echart',
      //   component: 'views/Components/Echart',
      //   name: 'Echart',
      //   meta: {
      //     title: 'router.echart'
      //   }
      // },
      // {
      //   path: 'count-to',
      //   component: 'views/Components/CountTo',
      //   name: 'CountTo',
      //   meta: {
      //     title: 'router.countTo'
      //   }
      // },
      // {
      //   path: 'qrcode',
      //   component: 'views/Components/Qrcode',
      //   name: 'Qrcode',
      //   meta: {
      //     title: 'router.qrcode'
      //   }
      // },
      // {
      //   path: 'highlight',
      //   component: 'views/Components/Highlight',
      //   name: 'Highlight',
      //   meta: {
      //     title: 'router.highlight'
      //   }
      // },
      // {
      //   path: 'infotip',
      //   component: 'views/Components/Infotip',
      //   name: 'Infotip',
      //   meta: {
      //     title: 'router.infotip'
      //   }
      // },
      // {
      //   path: 'input-password',
      //   component: 'views/Components/InputPassword',
      //   name: 'InputPassword',
      //   meta: {
      //     title: 'router.inputPassword'
      //   }
      // },
      // {
      //   path: 'sticky',
      //   component: 'views/Components/Sticky',
      //   name: 'Sticky',
      //   meta: {
      //     title: 'router.sticky'
      //   }
      // }
    ]
  },
  // {
  //   path: '/hooks',
  //   component: '#',
  //   redirect: '/hooks/useWatermark',
  //   name: 'Hooks',
  //   meta: {
  //     title: 'hooks',
  //     icon: 'ic:outline-webhook',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'useWatermark',
  //       component: 'views/hooks/useWatermark',
  //       name: 'UseWatermark',
  //       meta: {
  //         title: 'useWatermark'
  //       }
  //     },
  //     {
  //       path: 'useCrudSchemas',
  //       component: 'views/hooks/useCrudSchemas',
  //       name: 'UseCrudSchemas',
  //       meta: {
  //         title: 'useCrudSchemas'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/level',
  //   component: '#',
  //   redirect: '/level/menu1/menu1-1/menu1-1-1',
  //   name: 'Level',
  //   meta: {
  //     title: 'router.level',
  //     icon: 'carbon:skill-level-advanced'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       name: 'Menu1',
  //       component: '##',
  //       redirect: '/level/menu1/menu1-1/menu1-1-1',
  //       meta: {
  //         title: 'router.menu1'
  //       },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           name: 'Menu11',
  //           component: '##',
  //           redirect: '/level/menu1/menu1-1/menu1-1-1',
  //           meta: {
  //             title: 'router.menu11',
  //             alwaysShow: true
  //           },
  //           children: [
  //             {
  //               path: 'menu1-1-1',
  //               name: 'Menu111',
  //               component: 'views/Level/Menu111',
  //               meta: {
  //                 title: 'router.menu111'
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-2',
  //           name: 'Menu12',
  //           component: 'views/Level/Menu12',
  //           meta: {
  //             title: 'router.menu12'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'Menu2Demo',
  //       component: 'views/Level/Menu2',
  //       meta: {
  //         title: 'router.menu2'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: '#',
  //   redirect: '/example/example-dialog',
  //   name: 'Example',
  //   meta: {
  //     title: 'router.example',
  //     icon: 'ep:management',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'example-dialog',
  //       component: 'views/Example/Dialog/ExampleDialog',
  //       name: 'ExampleDialog',
  //       meta: {
  //         title: 'router.exampleDialog'
  //       }
  //     },
  //     {
  //       path: 'example-page',
  //       component: 'views/Example/Page/ExamplePage',
  //       name: 'ExamplePage',
  //       meta: {
  //         title: 'router.examplePage'
  //       }
  //     },
  //     {
  //       path: 'example-add',
  //       component: 'views/Example/Page/ExampleAdd',
  //       name: 'ExampleAdd',
  //       meta: {
  //         title: 'router.exampleAdd',
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         showMainRoute: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     },
  //     {
  //       path: 'example-edit',
  //       component: 'views/Example/Page/ExampleEdit',
  //       name: 'ExampleEdit',
  //       meta: {
  //         title: 'router.exampleEdit',
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         showMainRoute: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     },
  //     {
  //       path: 'example-detail',
  //       component: 'views/Example/Page/ExampleDetail',
  //       name: 'ExampleDetail',
  //       meta: {
  //         title: 'router.exampleDetail',
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         showMainRoute: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/error',
    component: '#',
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: 'router.errorPage',
      icon: 'ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: 'views/Error/404',
        name: '404Demo',
        meta: {
          title: '404'
        }
      },
      {
        path: '403-demo',
        component: 'views/Error/403',
        name: '403Demo',
        meta: {
          title: '403'
        }
      },
      {
        path: '500-demo',
        component: 'views/Error/500',
        name: '500Demo',
        meta: {
          title: '500'
        }
      }
    ]
  }
]
export default [
  // 列表接口
  {
    url: '/role/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { roleName } = query
      return {
        code: result_code,
        data: adminList
      }
    }
  }
] as MockMethod[]
