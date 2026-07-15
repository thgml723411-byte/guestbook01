import React, {useEffect, useState} from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import useAuthStore from '../store/useAuthStore'
import GuestbookForm from '../components/GuestbookForm'
import CharacterAvatar from '../components/CharacterAvatar'
import styles from './Guestbook.module.scss'

// firestore에 방명록 글을 저장할 컬렉션 이름
const COLLECTION_NAME = 'guestbookPosts'
const PAGE_SIZE = 5 //한 페이지에 보여줄 기록 개수

const Guestbook = () => {
  // 로그인한 사용자 정보 (zustand). 없으면 비회원
  const user = useAuthStore((state) => state.user)

  const [post, setPost] = useState([])
  const [editingId, setEditingId] = useState(null) //현재 수정중인 글 id
  const [editMessage, setEditMessage] = useState('') //수정중인 메세지 내용
  const [currentPage, setCurrentPage] = useState(1) //방명록 목록 현재 페이지

  const totalPages = Math.max(1, Math.ceil(post.length / PAGE_SIZE))
  const pagedPost = post.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // 글이 삭제되어 현재 페이지가 총 페이지 수를 넘어가면 마지막 페이지로 보정
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [totalPages, currentPage])

  // firestore 방명록 목록을 실시간으로 구독 (비회원도 조회는 가능)
  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))
      setPost(list)
    })
    return () => unsubscribe()
  }, [])

  //글 등록은 로그인한 회원만 가능
  const addPostFun = async (fromData) => {
    if (!user) {
      window.alert('로그인 후 이용해주세요')
      return
    }
    await addDoc(collection(db, COLLECTION_NAME), {
      nickname : fromData.nickname,
      message : fromData.message,
      character : fromData.character,
      uid : user.uid, //작성자 식별용 (수정/삭제 권한 체크에 사용)
      createdAt : serverTimestamp(),
    })
  }

  //삭제는 작성자 본인만 가능
  const deleFun = async (postItem) =>{
      if (!user || user.uid !== postItem.uid) return

     /*월렛창말고알림창에선택할수있는것*/
      const delv = window.confirm("정말 삭제하나요")

      if (!delv) return
      await deleteDoc(doc(db, COLLECTION_NAME, postItem.id))
  }

  //수정모드 진입 (작성자 본인만 가능)
  const startEditFun = (postItem) => {
    if (!user || user.uid !== postItem.uid) return
    setEditingId(postItem.id)
    setEditMessage(postItem.message)
  }

  //수정 취소
  const cancelEditFun = () => {
    setEditingId(null)
    setEditMessage('')
  }

  //수정 내용 저장 (작성자 본인만 가능)
  const saveEditFun = async (postItem) => {
    if (!user || user.uid !== postItem.uid) return
    if (!editMessage.trim()) return

    await updateDoc(doc(db, COLLECTION_NAME, postItem.id), {
      message : editMessage,
      updatedAt : serverTimestamp(),
    })
    setEditingId(null)
    setEditMessage('')
  }

  return (
    <section className={styles.page}>
      {/* 방명록위에장식 */}
      <div className={styles.intro}>
         <span className={styles.eyebrow}>GUEST LICENSE</span>
         <h1 className={styles.title}>방명록</h1>
         <p className={styles.subtitle}>당신의 마음을 남겨주세요</p>
      </div>
      <div className={`${styles.container} ${!user ? styles.containerCentered : ''}`}>
         {
           /* 글 작성은 로그인한 회원만 가능, 비회원은 카드와 같은 톤의 안내 배지만 크게 중앙에 표시(읽기전용) */
           user ? (
             <GuestbookForm onAddpost={addPostFun} defaultNickname={user.displayName || ''}/>
           ) : (
             <div className={styles.loginNotice}>
               <span className={styles.cardClip} aria-hidden='true' />
               <div className={styles.noticePhoto}>
                 <span className={styles.photoPlaceholder}>?</span>
               </div>
               <p className={styles.noticeText}>로그인 후 캐릭터를 선택하고<br />방명록을 남겨보세요</p>
             </div>
           )
         }

         {
           /* 방명록 목록: 비로그인 + 게시글 없음 상태에서는 빈 목록을 보여주지 않음 */
           (user || post.length > 0) && (
             <div className={styles.list}>
              <div className={styles.listHeader}>
               <h2>여러분들의 기록</h2>
               <p>{post.length}개</p>
              </div>
              {
               post.length > 0 ? (
                 <div className={styles.postList}>
                 {
                   pagedPost.map((item) =>(
                     <div key={item.id} className={styles.postCard}>
                       {/* 카드 상단 집게 장식 */}
                       <span className={styles.cardClip} aria-hidden='true' />

                       <div className={styles.cardBody}>
                         {/* 왼쪽: 선택한 캐릭터가 배치되는 자리 */}
                         <div className={styles.cardPhoto}>
                           {
                             item.character ? (
                               <CharacterAvatar character={item.character} />
                             ) : (
                               <span className={styles.photoPlaceholder}>?</span>
                             )
                           }
                         </div>

                         {/* 오른쪽: 이모티콘이 섞인 글 내용 */}
                         <div className={styles.cardInfo}>
                           <strong className={styles.cardName}>{item.nickname}</strong>
                           {/* firestore의 createdAt은 서버 시간(Timestamp) 객체라서 날짜 문자열로 변환 */}
                           <span className={styles.cardDate}>
                             {item.createdAt ? item.createdAt.toDate().toLocaleDateString('ko-KR') : '방문일 미정'}
                           </span>
                           <div className={styles.cardDivider} />
                           {
                             editingId === item.id ? (
                               // 수정모드: 메세지를 textarea로 바꿔서 보여줌
                               <div className={styles.editWrap}>
                                 <textarea
                                   className={styles.editTextarea}
                                   value={editMessage}
                                   maxLength={500}
                                   onChange={(e)=>setEditMessage(e.target.value)}
                                 />
                                 <div className={styles.editActions}>
                                   <button type='button' className={styles.saveBtn} onClick={()=>saveEditFun(item)}>저장</button>
                                   <button type='button' className={styles.cancelBtn} onClick={cancelEditFun}>취소</button>
                                 </div>
                               </div>
                             ) : (
                               <p className={styles.cardMessage}>{item.message}</p>
                             )
                           }
                         </div>
                       </div>

                       {
                         /* 작성자 본인일 때만 수정/삭제 버튼 노출 */
                         user && user.uid === item.uid && editingId !== item.id && (
                           <div className={styles.cardBottomRow}>
                             <div className={styles.ownerActions}>
                               <button className={styles.editBtn} onClick={()=>startEditFun(item)}>수정</button>
                               {/* 클릭할때삭제함수를실행해달라 */}
                               <button className={styles.deleteBtn} onClick={()=>deleFun(item)}>삭제</button>
                             </div>
                           </div>
                         )
                       }
                     </div>
                   ))
                 }
                 </div>
               ) : (
                 <p className={styles.empty}>기록이 없습니다</p>
               )
              }
              {
                /* 기록이 5개를 넘어가면 페이지 번호로 넘겨볼 수 있게 표시 */
                totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      type='button'
                      className={styles.pageArrow}
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((page) => page - 1)}
                      aria-label='이전 페이지'
                    >
                      &lt;
                    </button>
                    {
                      Array.from({length: totalPages}, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type='button'
                          className={`${styles.pageBtn} ${currentPage === num ? styles.pageBtnActive : ''}`}
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      ))
                    }
                    <button
                      type='button'
                      className={styles.pageArrow}
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((page) => page + 1)}
                      aria-label='다음 페이지'
                    >
                      &gt;
                    </button>
                  </div>
                )
              }
             </div>
           )
         }
      </div>
    </section>
  )
}

export default Guestbook
