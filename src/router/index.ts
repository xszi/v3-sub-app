import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  // {
  //   path: '/',
  //   redirect: '/dashboard/index'
  // },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'LightSong',
        meta: {
          title: '夜曲',
          icon: 'dashboard'
          // affix: true
        }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/monitor/index.vue'),
        name: 'North',
        meta: {
          title: '一路向北',
          icon: 'bug'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/page.vue'),
        name: 'Drift',
        meta: {
          title: '漂移',
          icon: 'bug'
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限的路由
 * 必须带有 name 属性
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // 或者在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限' // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  }
]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: constantRoutes
// })

/** 重置路由 */
// export function resetRouter() {
//   // 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
//   try {
//     router.getRoutes().forEach((route) => {
//       const { name, meta } = route
//       if (name && meta.roles?.length) {
//         router.hasRoute(name) && router.removeRoute(name)
//       }
//     })
//   } catch (error) {
//     // 强制刷新浏览器，不过体验不是很好
//     window.location.reload()
//   }
// }

// export default router
