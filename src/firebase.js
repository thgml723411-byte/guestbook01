// firebase 앱을 초기화하고 auth, firestore 인스턴스를 다른 파일에서 쓸 수 있게 내보냄
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// .env에 있는 값으로 firebase 프로젝트를 연결 (키 노출 방지를 위해 .env는 git에 올리지 않음)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

// 회원가입/로그인/로그아웃에 사용
export const auth = getAuth(app)
// 방명록 글 저장/조회/수정/삭제에 사용
export const db = getFirestore(app)

export default app
