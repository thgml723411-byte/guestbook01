import React, {useEffect,useState} from 'react'
import styles from './Home.module.scss'


const videos = [
  { title : "get lost in thought", scr : '/mp4/m1.mp4'},
  { title : "get lost in thought", scr : '/mp4/m2.mp4'},
  { title : "get lost in thought", scr : '/mp4/m3.mp4'},
]
//리턴위에위치해도되지만

const Home = () => {
  //현재 보여줄 영상 번호
   const [activeIndex,setActiveIndex] = useState(0)

   //현재 보여줄 영상 객체
   //만약 사용하지 않는다면 src={activeVideo.src} 대신 videos[activeIndex].src
   const activeVideo = videos[activeIndex]

   //몇초마다바껴라(4초마다 다음으로 전환)
   useEffect(() => {
      const timer = setInterval(()=>{
        setActiveIndex((idx)=>{
          //마지막 영상이면 첫번째 영상으로
          if( idx === videos.length-1 ){
            return 0
          }
          //마지막 영상이 아니면 다음 영상으로 이동
          return idx + 1
      })
      },4000)
      
      return () => {
        clearInterval(timer)
      }
   },[])
  return (
  <section className={styles.home}>
    <div className={styles.slide}>
        <video key={activeVideo.scr} autoPlay muted loop playsInline>
           <source src={activeVideo.scr} type = "video/mp4" />
        </video>
    </div>
    <div className={styles.copy}>
       <h1>{activeVideo.label}</h1>
       <h2>{activeVideo.title}</h2>
    </div>

      {/* 동영상을 알려주는 점(dot) */}
      <div className={styles.dots}>
           {videos.map(( item , index )=>{
               return(
                <button key={index}
                className={ index === activeIndex ? styles.activeDot : "" } 
                onClick={()=>{
                  setActiveIndex(index)
                }}/>
               )
           }) }
      </div>
  </section>
  )
}

export default Home

//동영상이미지캐지는걸사용자에게책임/그래서public에서관리할려고함
//public절대주소가됨/그래서점이필요없음
//className은파일이름하고동일하게하는게좋음
//<source/>귀찮게이걸하는이유는최신웹브라우저가없으면영상이안됨내가하나플레이가안되면이걸로플레이해주세요여러플레이가될수있음
//{videos.mpa()}자바스크립트이기때문에중괄호를한다