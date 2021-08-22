import AppContent from 'components/global/AppContent'
import AppHeader from 'components/global/AppHeader'
import { useEffect } from 'react'
import { isLogin } from 'api/auth'
import { useDispatchStore } from 'store'
import { useStateStore } from 'store'

function App() {
  const dispatch = useDispatchStore()
  const isLoading = useStateStore().isLoading

  useEffect(() => {
    isLogin().then((res) => {
      dispatch({ type: 'finishLoading', state: res.data.result })
    })
  })

  return (
    <div className='App'>
      {!isLoading && <AppHeader />}
      {!isLoading && <AppContent />}
    </div>
  )
}

export default App
