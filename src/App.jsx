import AppContent from 'components/global/AppContent'
import AppHeader from 'components/global/AppHeader'
import { useEffect } from 'react'
import { isLogin } from 'api/auth'
import { useDispatchStore } from 'store'
import { useStateStore } from 'store'
import { useSnackbar } from 'notistack'

function App() {
  const dispatch = useDispatchStore()
  const isLoading = useStateStore().isLoading
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    isLogin()
      .then((res) => {
        dispatch({ type: 'finishLoading', state: res.data.result })
      })
      .catch(() => {
        dispatch({ type: 'finishLoading', state: true })
        enqueueSnackbar('服务器正在重启，请稍后再试', { variant: 'warning' })
      })
  }, [dispatch, enqueueSnackbar])

  return (
    <div className='App'>
      {!isLoading && <AppHeader />}
      {!isLoading && <AppContent />}
    </div>
  )
}

export default App
