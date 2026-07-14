import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import styles from './Auth.module.scss'

const Login = () => {
    const [email,setEmail] = useState('')//인풋상자로받을값변수가필요하기때문에필수
    const [password,setPassword] = useState('') //인풋상자로받을값변수가필요하기때문에필수//패스워드받을장소
    const [error,setError] = useState('') //로그인 실패시 보여줄 메세지
    const navigate = useNavigate()
    const subminFun = async (e) => {
      //form 제출시 자동실행 방지
      e.preventDefault()
      setError('')
      try {
        // firebase 이메일/비밀번호 로그인
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/guestbook')//로그인하고어디어디로가라강제로지시
      } catch {
        // 이메일/비밀번호가 틀렸거나 존재하지 않는 계정인 경우
        setError('이메일 또는 비밀번호가 올바르지 않습니다')
      }
    }

  return (
    <section className={styles.auth}>
      <form onSubmit={subminFun} className={styles.card}>
        <p>환영합니다</p>
         <h1>로그인</h1>
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
            }} placeholder='6글자 이상 입력' required/>
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type='submit' className={styles.subminBtn}>로그인</button>
          <p>계정이 없으신가요?{'  '}<Link to='/signup'>회원가입</Link> </p>
      </form>
    </section>
  )
}

export default Login

//onSubmit={}인풋상자값
//placeholder='example@email.com'//샘플을넣어줌//서버가고장날때를대비OR이메일형식값을모를때대비
//프론트는값을제대로넣기위해최대한애를써야함
//required는백까지생각해서빈칸이라안넘어갈래최종적으로백으로갈때는? -> required는 브라우저 단에서만 막아주는거라 개발자도구로 지우거나 JS끄거나 API를 직접 호출하면 그냥 뚫림. 그래서 프론트 required는 UX용이고, 실제로 빈값 못들어오게 막는건 백엔드에서 반드시 다시 검증해야함
//button는온클릭으로넘기는것아님//onSubmit이라는친구에게맡긴다
//{'  '}띄어쓰기
//에러난게 subminFun 갈때가없어서 함수 만들어줌     
// const subminFun = (e) => {
//      e.preventDefault()
//    }