// 로그인 상태를 전역으로 관리하는 zustand 스토어
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null, // 로그인한 사용자 정보 (없으면 비회원)
  isReady: false, // firebase가 로그인 여부 확인을 끝냈는지 (새로고침 시 깜빡임 방지용)

  // 로그인 성공 / 새로고침 후 로그인 유지될 때 호출
  setUser: (user) => set({ user, isReady: true }),

  // 로그아웃 / 로그인 안 된 상태일 때 호출
  clearUser: () => set({ user: null, isReady: true }),
}))

export default useAuthStore
