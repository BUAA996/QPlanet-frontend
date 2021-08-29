import IntroTemplate from './IntroTemplate'
import img1 from 'assets/intro_img/intro_survey/1.png'
import img2 from 'assets/intro_img/intro_survey/2.png'
import img3 from 'assets/intro_img/intro_survey/3.png'

function Apply({ open, setOpen }) {
  return (
    <IntroTemplate
      open={open}
      setOpen={setOpen}
      steps={[
        {
          label: '按需添加题目',
          photo: img1,
        },
        {
          label: '设置问卷逻辑',
          photo: img2,
        },
        {
          label: '查看下载数据',
          photo: img3,
        },
      ]}
    />
  )
}

export default Apply
