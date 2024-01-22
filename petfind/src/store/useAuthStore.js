import { create } from 'zustand'
import Cookies from 'js-cookie'

const useAuthStore = create((set, get) => ({
  accessToken: Cookies.get('accessToken') || null,
  isLoged: !!Cookies.get('accessToken'),

  setTokens: (accessToken) => {
    set((state) => ({
      accessToken: state.accessToken,
      isLoged: !!accessToken
    }))
  }
}))

export default useAuthStore
