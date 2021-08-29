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
          label: '添加投票题型',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '添加候选选项',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '查看投票结果',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
      ]}
    />
  )
}

export default Apply
