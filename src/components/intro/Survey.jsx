import { makeStyles } from '@material-ui/core/styles'
import IntroTemplate from './IntroTemplate'

const useStyles = makeStyles((theme) => ({}))

function Apply({ open, setOpen }) {
  const classes = useStyles()

  return (
    <IntroTemplate
      open={open}
      setOpen={setOpen}
      steps={[
        {
          label: '按需添加题目',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '设置问卷逻辑',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '多渠道发放',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '查看下载数据',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
      ]}
    />
  )
}

export default Apply
