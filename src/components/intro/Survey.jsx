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
          label: '步骤一',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '步骤二',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
        {
          label: '步骤三',
          photo: 'https://image.wjx.com/images/newimg/index/banner.jpg',
        },
      ]}
    />
  )
}

export default Apply
