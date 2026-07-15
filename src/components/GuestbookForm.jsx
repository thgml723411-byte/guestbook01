import React, {useState} from 'react'
import CharacterAvatar from './CharacterAvatar'
import CHARACTERS from './characterData'
import styles from './GuestbookForm.module.scss'

const EMOJIS = ['😀', '😊', '🥰', '😂', '😮', '😢', '😭', '😴', '🤔', '😎', '🥳']

const GuestbookForm = ({onAddpost, defaultNickname = ''}) => {
  //로그인한 회원이면 계정 닉네임을 기본값으로 채워줌
  const [nickname, setNickname] = useState(defaultNickname)
  const [message, setMessage] = useState('')
  const [character,setCharacter] = useState('')

  const addE = (emoji) => {
       setMessage((msg)=>msg + emoji)
       }
  const submitFnc = (e) => {
      e.preventDefault()
      const newPost = {
        nickname : nickname,
        message : message,
        character : character,
      }
      onAddpost(newPost)

      // 값을전달했으면비워주는역활
      setNickname("")
      setMessage("")
      setCharacter("")
  }
  return (
    <div className={styles.formWrap}>
      <form className={styles.form} onSubmit={submitFnc}>
        <span className={styles.formClip} aria-hidden='true' />
        <h2 className={styles.formTitle}>마음에 드는 동작을 고르고 방명록을 남겨주세요</h2>

        <div className={styles.formBody}>
          {/* 왼쪽: 캐릭터 선택 -> 선택한 캐릭터가 여기 배치됨 */}
          <div className={styles.charColumn}>
            <div className={styles.charPreview}>
              {
                character ? (
                  <CharacterAvatar character={character} />
                ) : (
                  <span className={styles.charPreviewEmpty}>?</span>
                )
              }
            </div>
            <div className={styles.charList}>
            {
              CHARACTERS.map((item)=>(
                <button key={item.id} type='button'
                className={`${styles.charBtn} ${character === item.id ? styles.selected : ''}`}
                onClick={()=>setCharacter(item.id)}>
                  <span className={styles.charBtnAvatar}>
                    <CharacterAvatar character={item.id} />
                  </span>
                  <span className={styles.charBtnLabel}>{item.label}</span>
                </button>
              ))
            }
            </div>
          </div>

          {/* 오른쪽: 닉네임 / 이모티콘 / 메세지 작성 */}
          <div className={styles.infoColumn}>
            <label className={styles.field}>
                닉네임
                <input type='text' value={nickname} onChange={(e)=>{
                      setNickname(e.target.value)
                }} placeholder='사용할 이름' maxLength={20} required/>
             </label>

             <div className={styles.emojiList}>
              {
                 EMOJIS.map((item)=>(
                     <button key={item} type='button' className={styles.emojiBtn} onClick={()=> addE(item)}>
                       {item}
                     </button>
                 ))
              }
             </div>

             <label className={`${styles.field} ${styles.messageField}`}>
                메세지
                <textarea type='text' value={message} onChange={(e)=>{
                      setMessage(e.target.value)
                }} placeholder='당신의 이야기를 들려주세요' maxLength={500} required/>
             </label>

             <div className={styles.submitWrap}>
               <button type='submit' className={styles.submitBtn}>등록하기</button>
             </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default GuestbookForm

//단락이아니기때문에색션을안씀
//onAddpost백으로넘어가면지워질것
//리액트에서는반복해서만드는선포가map//태그로나가게할꺼라서중괄호말고소괄호로
//자기성질이면onClick={}들어가고서밋이면들어가지못함
//&&은캐릭터가있으면작동해달라여태껏삼항연자를썼지만조건이없어서&&사용

//nickname,message,character,실무에서는같으거면이렇게사용
