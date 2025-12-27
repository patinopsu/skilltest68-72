// ~/stores/common.js
export const useCommonStore = defineStore('common', {
  actions: {
    getUserRole() {
        const auth = useAuthStore()
        return auth.user?.role
    },
    forceLogin() {
      navigateTo('/login', {
        replace: true,
        external: true
      })
    },
    approvedRedirect({ hardReload = false }= {}) {
        const role = this.getUserRole()

        if (role === 'admin') {
            console.log('301', 'Redirecting to admin'),
            navigateTo('/admin',{
              replace: true,
              external: hardReload
            })
        } else {
            console.log('301', 'Redirecting to dashboard'),
            navigateTo('/',{
              replace: true,
              external: hardReload
            })
        }
    }
  }
})