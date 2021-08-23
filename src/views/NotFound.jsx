import Problem from 'components/utils/Problem'
import { Container } from '@material-ui/core'
import useTitle from 'hooks/useTitle'

function NotFound() {
  useTitle('找不到网页')
  const Questionare = [
    {
      id: 1,
      kind: 0,
      must: 1,
      title: '第一题 balabalabalabala',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      id: 2,
      kind: 1,
      must: 1,
      title: '第二题 balabalabalabala',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      id: 3,
      kind: 2,
      must: 0,
      title: '第三题',
      choices: [],
    },
    {
      id: 4,
      kind: 1,
      must: 0,
      title: '第四题',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      id: 5,
      kind: 2,
      must: 1,
      title: '第五题',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
  ]

  return (
    <>
      <h1>404 Not Found</h1>

      <Container maxWidth='md'>
        {Questionare.map((problem) => (
          <Problem problem={problem} />
        ))}
      </Container>
    </>
  )
}

export default NotFound
