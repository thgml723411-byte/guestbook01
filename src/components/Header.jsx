import React from 'react'
import { Link,NavLink,useNavigate,useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import useAuthStore from '../store/useAuthStore'
import styles from './Header.module.scss'

const Header = () => {
  // zustand에 저장된 로그인 사용자 정보 (없으면 비회원)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  // 홈(영상 히어로)을 제외한 모든 페이지는 밝은 사진 배경이라 헤더도 밝은 톤으로 통일
  const isLight = location.pathname !== '/'

  // 로그아웃 처리 후 홈으로 이동
  const logoutFun = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <header className={`${styles.header} ${isLight ? styles.light : ''}`} >
      <div className={styles.inner} >
         <Link to='/' className={styles.logo}>GUESTBOOK</Link>
         <nav>
           <NavLink to='/' className={({isActive})=> isActive ? styles.active : undefined} >홈으로</NavLink>
           <NavLink to='/guestbook' className={({isActive})=> isActive ? styles.active : undefined}>방명록</NavLink>
         </nav>
         <div>
          {
            user ? (
              // 로그인된 상태: 닉네임(또는 이메일)과 로그아웃 버튼 표시
              <>
                <span className={styles.username}>{user.displayName || user.email}님</span>
                <button type='button' className={styles.login} onClick={logoutFun}>로그아웃</button>
              </>
            ) : (
              // 비회원 상태: 로그인/회원가입 링크 표시
              <>
                <Link to="/login" className={styles.login}>로그인</Link>
                <Link to="/signup" className={styles.signup}>회원가입</Link>
              </>
            )
          }
         </div>
      </div>
    </header>
  )
}

export default Header
