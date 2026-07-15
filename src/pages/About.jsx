import React from 'react'
import CHARACTERS from '../components/characterData'
import styles from './About.module.scss'

const About = () => {
  return (
    <div className={styles.page}>
      {/* 히어로: 어둠 속에서 떠도는 빛으로 컨셉을 먼저 보여줌 */}
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden='true'>
          <span className={styles.orb} />
          <span className={styles.orb} />
          <span className={styles.orb} />
        </div>
        <span className={styles.eyebrow}>CONCEPT</span>
        <h1 className={styles.title}>빛과 몸의 움직임</h1>
        <p className={styles.lead}>
          어둠 속을 떠도는 빛처럼, 멈춰있지 않고 흘러가는 순간을 담습니다.<br />
          방명록에 남기는 캐릭터 하나하나는 정지한 그림이 아니라, 빛이 스친 한 동작입니다.
        </p>
      </section>

      {/* 동작 갤러리: 캐릭터별 발레 동작을 실루엣 + 빛(그라데이션)으로 표현 */}
      <section className={styles.gallery}>
        <div className={styles.galleryHead}>
          <span className={styles.eyebrow}>MOVEMENT</span>
          <h2>여덟 개의 동작, 여덟 개의 빛</h2>
          <p>같은 어둠 위에서 저마다 다른 빛깔로 움직입니다</p>
        </div>
        <div className={styles.grid}>
          {CHARACTERS.map((item) => (
            <div key={item.id} className={styles.card} style={{ background: item.bg }}>
              <span className={styles.sweep} aria-hidden='true' />
              <img
                src={item.src}
                alt={item.label}
                className={styles.silhouette}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
