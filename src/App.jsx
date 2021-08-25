import AppContent from 'components/global/AppContent'
import AppHeader from 'components/global/AppHeader'
import { useEffect } from 'react'
import { isLogin } from 'api/auth'
import { useDispatchStore } from 'store'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

function App() {
  const dispatch = useDispatchStore()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isLogin()
      .then((res) => {
        dispatch({ type: res.data.result === 1 ? 'login' : 'logout' })
        setLoading(true)
      })
      .catch(() => {
        dispatch({ type: 'login' })
        enqueueSnackbar('服务器正在重启，请稍后再试', { variant: 'warning' })
        setLoading(true)
      })
  }, [dispatch, enqueueSnackbar])

  return (
    <div className='App'>
      {loading && <AppHeader />}
      {loading && <AppContent />}
    </div>
  )
}

export default App
