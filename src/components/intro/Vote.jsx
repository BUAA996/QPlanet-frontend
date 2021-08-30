import IntroTemplate from './IntroTemplate'
import img1 from 'assets/intro_img/intro_vote/1.png'
import img2 from 'assets/intro_img/intro_vote/2.png'
import img3 from 'assets/intro_img/intro_vote/3.png'

function Apply({ open, setOpen }) {
  return (
    <IntroTemplate
      open={open}
      setOpen={setOpen}
      steps={[
        {
          label: '添加投票题型',
          photo: img1,
        },
        {
          label: '添加候选选项',
          photo: img2,
        },
        {
          label: '查看投票结果',
          photo: img3,
        },
      ]}
    />
  )
}

export default Apply
