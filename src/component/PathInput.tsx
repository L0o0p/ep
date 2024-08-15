import { useAtom } from 'jotai'
import styles from './PathInput.module.scss'
import { inputValueAtom } from '../store'


export const PathInput = () => {
  const [path, setPath] = useAtom(inputValueAtom)
  console.log(path);
  


  return (
    <>
      {/*输入：输入需要打标的文件路径 input/dropDown */}
      <input
        type="text"
        placeholder='请输入需要打标的文件路径'
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className={styles.input}
      />

    </>
  )
}

