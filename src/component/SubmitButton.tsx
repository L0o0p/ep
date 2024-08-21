import { useAtom } from "jotai"
import {
  // editFileAtom,
  feedBackAtom,
  inputValueAtom,
  user
} from "../store"
import axios, { AxiosError } from "axios"
import { useCallback } from "react"
// import * as fs from 'fs'
const url = user.BASE_URL + '/files/upload';

export const SubmitButton = () => {
  const [path] = useAtom<string>(inputValueAtom)
  const [, setFeedBack] = useAtom(feedBackAtom)
  // const [, setEditFile] = useAtom<[]>(editFileAtom)

  const handleClick = useCallback(async () => {
    const items: {
      save(): unknown;
      tags: string[];
      id: string;
      ext: string;
      filePath: string;
      thumbnailPath: string | null
    }[] = await selectItem(path)
    console.log('点击了', items)

    for (const item of items) {
      const ext_right = ['jpg', 'jpeg', 'png', 'webp'].includes(item.ext)
      if (!ext_right && !item.thumbnailPath) {
        setFeedBack(`${item.id} 不是图片`)
        continue
      }
      const itemPath = ext_right ? item.filePath : item.thumbnailPath;
      // 读取文件，并且转换为Uint8Array格式

      const data = await window.fs.readFileSync(itemPath)
      const formData = new FormData();
      formData.append('file', new Blob([data], { type: 'image/png' }), 'file.png');
      formData.append('user', 'user123');

      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${user.Authorization}`, // 替换 {api_key} 为你的实际 API 密钥
            'Content-Type': 'multipart/form-data'
          }
        };

        // 执行 POST 请求
        const responseJson = await axios.post(url, formData, config)
          .then(response => {
            console.log('文件上传成功:', response.data);
            return response.data
          })
          .catch(error => {
            console.error('上传文件时出错:', error);
          });
        // 保存文件信息
        // setEditFile(responseJson)
        const feedback = await sendMessage(responseJson['id'])
        console.log('feedback:', feedback, 'type', typeof feedback);
        // const Regex = /，|,/
        const Regex = /[，,.。]+/; // 定义了中文逗号、英文逗号、中文句号、英文句号作为分隔符
        const useToTags = feedback.split(Regex)
        console.log('useToTags:', useToTags, 'type', typeof useToTags);
        for (const tag of useToTags) {
          item.tags.push(tag)
          console.log(item);
        }

        await item.save();
        setFeedBack(feedback)
        // await tagItems(editFile)
        // alert('finished')
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

  }, [path, setFeedBack])

  return (
    <button onClick={handleClick}>Submit</button>
  )
}

// 方法：从输入的路径获取图片(假设目标路径下只有一个文件）
const selectItem = async (path: string) => {
  // if (typeof eagle !== 'undefined') {
  console.log('shihou可执行', path);

  // 取得指定 id 对应的文件夹
  // const id = 'L64W6ZJPSJ1D7';
  // const folder = await window.eagle.folder.get({
  //     id: id
  // });
  const folders = await window.eagle.folder.getSelected();
  // console.log("no use folder", folder);
  const res: { id: string }[][] = await Promise.all(folders.map(async (f: { id: string }) => {
    const items = await window.eagle.item.get({
      folders: [f.id],
    });
    return items
  }))
  const ids = res.flat().map(r => r.id);
  // 去重
  const idsSet = new Set(ids);
  const idsArray = Array.from(idsSet);
  console.log('idsArray', idsArray);


  // 从文件夹中获取图片
  const items = await window.eagle.item.getByIds(idsArray);
  // console.log('item', item);
  return items
}

// 方法：最终发送图片到AI服务器
async function sendMessage(editFile: string) {
  const url = `${user.BASE_URL}/chat-messages`; // 替换为正确的 URL
  const query = '你好，我想了解更多信息。'
  // const imgURl = prompt ? prompt : "https://cloud.dify.ai/logo/logo-site.png"
  const imgURl = editFile
  const data = {
    query,//"你好，我想了解更多信息。",
    response_mode: "blocking",
    user: "user123",
    auto_generate_name: false,
    inputs: {},
    "files": [
      {
        "type": "image",
        "transfer_method": "local_file",
        "upload_file_id": imgURl
      },

    ]
  };

  try {
    const response = await axios.post(
      url,
      data,
      {
        headers: { 'Authorization': `Bearer ${user.Authorization}` }
      });
    const feedBack = response.data.answer
    console.log('Response:', feedBack);
    return feedBack

  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response) {
      console.error('Error Status:', axiosError.response.status);
      console.error('Error Data:', axiosError.response.data);
      return { feedBack: "Error: " + axiosError.response.data.message };  // 提供默认反馈
    } else if (axiosError.request) {
      console.error('No response received.');
      return { feedBack: "No response received" };  // 提供默认反馈
    } else {
      console.error('Error Message:', axiosError.message);
      return { feedBack: "Request setup error" };  // 提供默认反馈
    }
  }
}




