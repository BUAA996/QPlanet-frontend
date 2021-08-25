import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// 进入该路由的时候是否要跳转到另一个路由
// assert满足就跳转, to为空则返回主页, msg为跳转的提示信息
function useRouteDefender({
  assert = true,
  method = 'push',
  to = '/',
  msg = '未赋值的信息',
} = {}) {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (assert) {
      if (method === 'replace') {
        history.replace(to)
      } else if (method === 'push') {
        history.push(to)
      }
      enqueueSnackbar(msg, { variant: 'warning' })
    }
  }, [])
}

export default useRouteDefender
