// ~/stores/common.js
export const useCommonStore = defineStore('common', {
  state: () => ({
    user: null
  }),
  actions: {
    getUserRole() {
        const auth = useAuthStore()
        return auth.user?.role
    },
    approvedRedirect() {
        const router = useRouter()
        const role = this.getUserRole()

        if (role === 'admin') {
            console.log('301', 'Redirecting to admin'),
            router.push('/admin',{
              replace: true
            })
        } else {
            console.log('301', 'Redirecting to dashboard'),
            router.push('/',{
              replace: true
            })
        }
    }
  }
})