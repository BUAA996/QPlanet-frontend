import Problem from "components/utils/Problem";
import { Container } from "@material-ui/core";


function NotFound () {
  const Questionare = [
    {
      kind: 0,
      must: 1,
      title: '第一题 balabalabalabala',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
    {
      kind: 1,
      must: 1,
      title: '第二题 balabalabalabala',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
    {
      kind: 2,
      must: 0,
      title: '第三题',
      choices: []
    },
    {
      kind: 1,
      must: 0,
      title: '第四题',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
    {
      kind: 2,
      must: 1,
      title: '第五题',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
  ]

  return (
    <>
      <h1>404 Not Found</h1>
      
      <Container maxWidth='md'>
        {Questionare.map((problem) => <Problem problem={problem}/>)}
      </Container>
    </>
  );
}

export default NotFound;