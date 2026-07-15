import React, { useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import useAuthStore from './store/useAuthStore'
import Home from './pages/Home'
import Guestbook from './pages/Guestbook'
import Login from './pages/Login'
import Header from './components/Header'
import Signup from './pages/Signup'
import styles from './App.module.scss'
import About from './pages/About'

const App = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)

  // firebase 로그인 상태가 바뀔 때마다(로그인/로그아웃/새로고침) zustand 스토어에 반영
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        clearUser()
      }
    })
    return () => unsubscribe()
  }, [setUser, clearUser])

  return (
    <div>
       <Header />
       <main className={styles.main}>
       <Routes>
          {/* 내주소루트이면연결시켜라*/}
          <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guestbook" element={<Guestbook />} />
          {/* 만들지 않은 주소로 접근하면 홈으로 이동시킨다 */}
          <Route path='*' element={<Navigate to='/' replace/>} />
          <Route path='/guestbook' element={<Guestbook /> }/>
       </Routes>
       </main>
    </div>
  )
}

export default App

//Navigate강제로어디어디로가라/replace엉터리주소를지워주세요

/*
guestbook 만들기
프론트 - 서버연결(firebase)

폴더 구조

 src
 -main.jsx(BrowserRouter 생성)
 -App.jsx(Routes,Route)
 -components (풋터도여기에넣음)
   -Header.jsx(Link,NavLink)()
   -Header.module.scss()
   -CharacterAvatar.jsx(캐릭터데이터)
   -CharacterAvatar.module.scss()
   -characterData.js(캐릭터데이터)
   -GuestbookForm.jsx(글입력,캐릭터선택,이모티콘선택등)
   -GuestbookForm.module.scss
 -pages (각각의메뉴를갖고있음)
  -Home.jsx (동영상 3개 무한 전환)
  -Home.module.scss()
  -Guestbook.jsx(GuestbookForm.jsx import)
  -Guestbook.module.scss()
  -Login.jsx(위치마음대로인데헷갈리지말라고강제로여기에넣음)
  -Signup.jsx(위치마음대로인데헷갈리지말라고강제로여기에넣음)
  -Auth.module.scss(Login+signup)(위치마음대로인데헷갈리지말라고강제로여기에넣음)
*/
