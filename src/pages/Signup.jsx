import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import useAuthStore from '../store/useAuthStore'
import styles from './Auth.module.scss'

const Signup = () => {
  const [nickname, setNicname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') //가입 실패시 보여줄 메세지

  const navigate = useNavigate()

  const subminFun = async (e) => {
      //form 제출시 자동실행 방지
      e.preventDefault()
      setError('')
      try {
        // firebase 계정 생성 (이메일/비밀번호)
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        // 입력한 닉네임을 계정 프로필 이름으로 저장
        await updateProfile(user, { displayName: nickname })
        // updateProfile은 스토어에 자동 반영되지 않을 수 있어 최신 정보로 다시 채워줌
        useAuthStore.getState().setUser(auth.currentUser)
        navigate('/guestbook')//가입하고어디어디로가라강제로지시
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          setError('이미 사용 중인 이메일입니다')
        } else if (err.code === 'auth/weak-password') {
          setError('비밀번호는 6글자 이상이어야 합니다')
        } else if (err.code === 'auth/invalid-email') {
          setError('이메일 형식이 올바르지 않습니다')
        } else {
          setError('회원가입에 실패했습니다')
        }
      }
    }

  return (
    <section className={styles.auth}>
      <form onSubmit={subminFun} className={styles.card}>
         <h1>회원가입</h1>
         <label className={styles.field}>
            닉네임
            <input type='text' value={nickname} onChange={(e)=>{
                  setNicname(e.target.value)
            }} placeholder='사용할 이름' maxLength={10} required/>
         </label>
         <label className={styles.field}>
            이메일
            <input type='email' value={email} onChange={(e)=>{
                  setEmail(e.target.value)
            }} placeholder='example@email.com' required/>
         </label>
         <label className={styles.field}>
            패스워드
            <input type='password' value={password} onChange={(e)=>{
                  setPassword(e.target.value)
            }} placeholder='6글자 이상 입력' minLength={6} required/>
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type='submit' className={styles.subminBtn}>가입하기</button>
          <p>계정이 있으신가요?{'  '}<Link to='/login'>로그인</Link> </p>
      </form>
    </section>
  )
}

export default Signup
//email,password을쓰야하는것은왜? -> input은 controlled component라서 value를 화면에 보여주려면 그 값을 담을 state가 필요함. state 없이는 입력값을 읽거나 검증하거나 제출 후 초기화할 방법이 없음
//useState는한번튕겨줘야함왜? -> onChange에서 setEmail/setPassword를 호출해야 state가 바뀌고, state가 바뀌어야 리액트가 리렌더링해서 화면에 입력값이 반영됨. setter를 안부르면 state가 그대로라 인풋이 안바뀐 것처럼 보임
//maxLength글자수제한