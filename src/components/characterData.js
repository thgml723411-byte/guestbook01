// '빛과 몸의 움직임' 컨셉: 캐릭터마다 발레 동작 하나를 실루엣으로 표현
// 스타일 가이드: 실루엣은 항상 순검정(#000~#111), 배경만 캐릭터별 컬러/그라데이션으로 구분
// c1~c8 사진 실제 자세에 맞춰 동작 이름을 다시 매칭함 (8개로 확정)
const CHARACTERS = [

{ id: 'arabesque', label: '아라베스크', src: '/img/c2.jpg', bg: 'linear-gradient(160deg, #ff2d2d 0%, #8f0d0d 100%)' },

{ id: 'grandjete', label: '그랑제떼', src: '/img/c7.jpg', bg: 'radial-gradient(circle at 50% 40%, #e2233d 0%, #7a0f1f 80%)' },

{ id: 'développé', label: '데벨로페', src: '/img/c8.jpg', bg: 'linear-gradient(145deg, #3a2f8f 0%, #8a1f5c 100%)' },

{ id: 'dveloppéecarté', label: '디벨로프 에카르테', src: '/img/c6.jpg', bg: 'linear-gradient(135deg, #2ba9d6 0%, #7a1fb0 100%)' },

{ id: 'cambre', label: '캄블레', src: '/img/c1.jpg', bg: 'radial-gradient(circle at 50% 35%, #4a4a78 0%, #14122c 75%)' },

{ id: 'attitude2', label: '에티튜드', src: '/img/c3.jpg', bg: 'linear-gradient(160deg, #c7db4a 0%, #2e3a10 100%)' },

{ id: 'attitude', label: '에티튜드', src: '/img/c5.jpg', bg: '#efece4' },

{ id: 'passe', label: '파세', src: '/img/c4.jpg', bg: 'radial-gradient(circle at 50% 45%, #6b6b6b 0%, #141414 75%)' },

]

export default CHARACTERS