// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  const redirect = useCommonStore()
  if (process.server) return

  // รายการหน้า/พาธที่ต้องล็อกอินก่อนเข้า
  const protectedRoots = ['/admin', '/users']
  const needAdmin = protectedRoots.some(p => to.path === p || to.path.startsWith(p + '/'))

  if (!auth.token && to.path !== '/login') {
    redirect.forceLogin()
  }
  if (auth.token && to.path === '/login') {
    redirect.approvedRedirect()
  }
  if (needAdmin && auth.user?.role !== 'admin') {
    redirect.approvedRedirect()
  }
})