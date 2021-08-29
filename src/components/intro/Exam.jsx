import { makeStyles } from '@material-ui/core/styles'
import IntroTemplate from './IntroTemplate'
import img1 from 'assets/intro_img/intro_exam/1.png'
import img2 from 'assets/intro_img/intro_exam/2.png'
import img3 from 'assets/intro_img/intro_exam/3.png'

const useStyles = makeStyles((theme) => ({}))

function Apply({ open, setOpen }) {
  const classes = useStyles()

  return (
    <IntroTemplate
      open={open}
      setOpen={setOpen}
      steps={[
        {
          label: '添加考试题型',
          photo: img1,
        },
        {
          label: '设置正确答案',
          photo: img2,
        },
        {
          label: '设置考试倒计时',
          photo: img3,
        },
      ]}
    />
  )
}

export default Apply
