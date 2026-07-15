import { createRoot } from 'react-dom/client'
import GuestbookForm from './components/GuestbookForm'

createRoot(document.getElementById('root')).render(
  <GuestbookForm onAddpost={() => {}} defaultNickname="테스트" />
)
