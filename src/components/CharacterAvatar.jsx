import React from 'react'
import CHARACTERS from './characterData'
import styles from './CharacterAvatar.module.scss'

const CharacterAvatar = ({character}) => {
   const characterData = CHARACTERS.find((item)=>item.id === character) //찾으면돌려준다
   if(!characterData) return null //에러메세지못찾으면
  return (
    <div className={styles.avatarBox} style={{background: characterData.bg}}>
      <img key={characterData.src} className={styles.avatar} src = {characterData.src} alt={characterData.label}
        onError={(e)=>{ e.target.style.display = 'none' }} />
    </div>
  )
}
 
export default CharacterAvatar

//리액트의개념호출하는놈이보냈음이캐릭터를클릭할때아이템을보냈음
//이파일의역활임
//여러줄이면중괄호열어야함하나이면소괄호해도됨