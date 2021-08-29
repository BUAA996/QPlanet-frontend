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
          label: '添加考试题型',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '设置正确答案',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '设置题目分值',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
      ]}
    />
  )
}

export default Apply
