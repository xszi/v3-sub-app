import store from '@/store'
import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { accountLogin } from '@/api/login'

interface IUserState {
  token: string
  roles: string[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: getToken() || '',
      roles: []
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles: string[]) {
      this.roles = roles
    },
    /** 登录 */
    login(userInfo: { username: string, password: string }) {
      return new Promise((resolve, reject) => {
        accountLogin({
          username: userInfo.username.trim(),
          password: userInfo.password
        })
          .then((res: any) => {
            setToken(res.data.accessToken)
            this.token = res.data.accessToken
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 获取用户详情 */
    getInfo() {
      return new Promise((resolve) => {
        this.roles = ['editor']
        const res = {
          code: 20000,
          data: {
            user: {
              avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
              email: 'editor@test.com',
              id: 1,
              roles: ['editor']
            }
          }
        }
        resolve(res)
        // userInfoRequest()
        //   .then((res: any) => {
        //     this.roles = res.data.user.roles
        //     resolve(res)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //     // resolve(error)
        //   })
      })
    },
    /** 切换角色 */
    async changeRoles(role: string) {
      const token = role + '-token'
      this.token = token
      setToken(token)
      await this.getInfo()
    },
    /** 登出 */
    logout() {
      removeToken()
      this.token = ''
      this.roles = []
      // resetRouter()
    },
    /** 重置 token */
    resetToken() {
      removeToken()
      this.token = ''
      this.roles = []
    }
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
