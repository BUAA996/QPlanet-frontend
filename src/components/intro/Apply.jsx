import { makeStyles } from '@material-ui/core/styles'
import IntroTemplate from './IntroTemplate'
import img1 from 'assets/intro_img/intro_apply/1.png'
import img2 from 'assets/intro_img/intro_apply/2.png'
import img3 from 'assets/intro_img/intro_apply/3.png'

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
          photo: img1,
        },
        {
          label: '限额填写问卷',
          photo: img2,
        },
        {
          label: '分享报名问卷',
          photo: img3,
        },
      ]}
    />
  )
}

export default Apply
