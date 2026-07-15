import React from 'react'
import { Link,NavLink,useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import useAuthStore from '../store/useAuthStore'
import styles from './Header.module.scss'

const Header = () => {
  // zustand에 저장된 로그인 사용자 정보 (없으면 비회원)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  // 로그아웃 처리 후 홈으로 이동
  const logoutFun = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner} >
         <Link to='/' className={styles.logo}>GUESTBOOK</Link>
         <nav>
           <NavLink to='/' className={({isActive})=> isActive ? styles.active : undefined} >Home</NavLink>
           <NavLink to='/about' className={({isActive})=> isActive ? styles.active : undefined} >About</NavLink>
           <NavLink to='/guestbook' className={({isActive})=> isActive ? styles.active : undefined}>Guestbook</NavLink>
         </nav>
         <div>
          {
            user ? (
              // 로그인된 상태: 닉네임(또는 이메일)과 로그아웃 버튼 표시
              <>
                <span className={styles.username}>{user.displayName || user.email}님</span>
                <button type='button' className={styles.logout} onClick={logoutFun}>로그아웃</button>
              </>
            ) : (
              // 비회원 상태: 로그인/회원가입을 아이콘 버튼으로 표시
              <>
                <Link to="/login" className={styles.login} aria-label='로그인' title='로그인'>
                  <svg viewBox='0 0 24 24' width='19' height='19' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
                    <polyline points='10 17 15 12 10 7' />
                    <line x1='15' y1='12' x2='3' y2='12' />
                  </svg>
                </Link>
                <Link to="/signup" className={styles.signup} aria-label='회원가입' title='회원가입'>
                  <svg viewBox='0 0 24 24' width='19' height='19' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <line x1='19' y1='8' x2='19' y2='14' />
                    <line x1='22' y1='11' x2='16' y2='11' />
                  </svg>
                </Link>
              </>
            )
          }
         </div>
      </div>
    </header>
  )
}

export default Header
