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
          label: '创建报名问卷',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '限额填写问卷',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '分享报名问卷',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
      ]}
    />
  )
}

export default Apply
