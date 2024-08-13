import { useAtom } from 'jotai'
import { PathInput } from './component/PathInput'
import { SubmitButton } from './component/SubmitButton'
import { feedBackAtom, taskStatusAtom } from './store'



function App() {
  const [taskStatus] = useAtom<boolean>(taskStatusAtom)
  const state = taskStatus ? '打标中...' : '空闲中。。。'
  const [feedBack] = useAtom(feedBackAtom)
  return (
    <>
      {/*输入：输入需要打标的文件路径 input/dropDown */}
      <PathInput />
      {/*处理- 执行：点击开始打标  */}
      <SubmitButton />
      {/*处理- 状态：点击开始打标  */}
      <div>{state}</div>
      {/*输出：输出打标结果 */}
      <div>feedBack:{(feedBack && feedBack.length >= 1) ? feedBack : '  🤔'}</div>
    </>
  )
}

export default App




