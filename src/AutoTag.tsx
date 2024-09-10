import { useAtom } from 'jotai'
import { useEffect, useState } from "react"
// import { PathInput } from './component/PathInput'
import { editFileAtom, feedBackAtom, taskStatusAtom } from '@store'
import { SubmitButton } from './component/SubmitButton'
import { premise } from './ollamacli'



export const AutoTag = () => {
    const [pre, setPremise] = useState(premise)
    const [taskStatus] = useAtom<boolean>(taskStatusAtom)
    const state = taskStatus ? '打标中...' : '空闲中。。。'
    const [feedBack] = useAtom(feedBackAtom)
    const [editFile] = useAtom<[]>(editFileAtom)
    useEffect(() => {
        console.log('editFile', editFile, 'type', typeof editFile);
    }, [editFile]);  // 依赖数组中包含 editFile
    return (
        <>
            <textarea value={pre} onChange={(e) => setPremise(e.target.value)}></textarea>
            {/*输入：输入需要打标的文件路径 input/dropDown */}
            {/* <PathInput /> */}
            {/*处理- 执行：点击开始打标  */}
            <SubmitButton premise={pre} />
            {/*处理- 状态：点击开始打标  */}
            <div>{state}</div>
            {/*输出：输出打标结果 */}
            <div>feedBack:{(feedBack && feedBack.length >= 1) ? feedBack : '  🤔'}</div>
            {/* <div>editFile:{(editFile && editFile.length >= 1) ? editFile : '  🤔'}</div> */}
        </>
    )
}





