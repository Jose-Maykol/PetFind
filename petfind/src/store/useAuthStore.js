import { create } from 'zustand'
import Cookies from 'js-cookie'

const useAuthStore = create((set, get) => ({
  accessToken: Cookies.get('accessToken') || null,
  jwtToken: Cookies.get('jwtToken') || null,
  isLoged: !!(Cookies.get('accessToken') || Cookies.get('jwtToken')),

  setTokens: (accessToken, jwtToken) => {
    set((state) => ({
      accessToken: state.accessToken,
      jwtToken: state.jwtToken,
      isLoged: !!accessToken || !!jwtToken
    }))
  }
}))

export default useAuthStore
