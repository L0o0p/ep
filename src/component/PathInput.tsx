import { useAtom } from 'jotai'
import styles from './PathInput.module.scss'
import { inputValueAtom } from '../store'


export const PathInput=()=> {
const [path,setPath]=useAtom(inputValueAtom)


  return (
    <>
    {/*输入：输入需要打标的文件路径 input/dropDown */}
    <input 
        type="text"
        placeholder='请输入需要打标的文件路径'
        value={path}
        onChange={(e)=>setPath(e.target.value)}
       />
      {/*处理- 执行：点击开始打标  */}
      {/*处理- 状态：点击开始打标  */}
      {/*弹窗- 已完成   */}

      {/*输出：输出打标结果 output/dropDown  */}
    </>
  )
}

