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

export const SubmitButton = () => {
    const [path] = useAtom<string>(inputValueAtom)
    const [, setFeedBack] = useAtom(feedBackAtom)
    // const [, setEditFile] = useAtom<[]>(editFileAtom)

    const handleClick = useCallback(async () => {
        console.log('点击了')
        const responseJson = await toImage(path)
        // console.log('uploaded', responseJson)
        await sendMessage(responseJson['id'], setFeedBack)
        // await tagItems(editFile)
    }, [path, setFeedBack])

    return (
        <button onClick={handleClick}>Submit</button>
    )
}

// 方法：从输入的路径获取图片(假设目标路径下只有一个文件）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toImage = async (path: string) => {
    // if (typeof eagle !== 'undefined') {
    console.log('shihou可执行', path);

    // 取得指定 id 对应的文件夹
    const id = 'L64W6ZJPSJ1D7';
    const folder = await window.eagle.folder.get({
        id: id
    });
    console.log("no use folder", folder);

    // 从文件夹中获取图片
    const items = await window.eagle.item.get({
        folders: folder.map((d: { id: string }) => d.id),
    });
    console.log(items)
    const item = await window.eagle.item.getById(items[0].id);
    console.log('item', item);

    const itemPath = item.filePath;
    console.log('itemPath', itemPath)


    // 读取文件，并且转换为Uint8Array格式

    const data = await window.fs.readFileSync(itemPath)
    // const uint8Array = new Uint8Array(data);
    //     setEditFile(uint8Array); // 更新状态

    //     // 准备 FormData
    const formData = new FormData();
    formData.append('file', new Blob([data], { type: 'image/png' }), 'file.png');
    formData.append('user', 'user123');

    //     // 发送请求
    const url = 'https://dify.cyte.site:2097/v1/files/upload';
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
        console.log('Upload successful:', responseJson);
        return responseJson
    } catch (error) {
        console.error('Upload failed:', error);
    }
}

// 方法：最终发送图片到AI服务器
async function sendMessage(editFile: string, setFeedBack: { (args_0: string | ((prev: string) => string)): void; (arg0: string): void }) {
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
        setFeedBack(feedBack)

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

// // 方法：将返回信息tag给图片
// const tagItems = async (editFile: string[]) => {
//     if (editFile.length > 0) {
//         let selectedItem = editFile[0];
//         // 修改标签
//         selectedItem.tags = ['tag1', 'tag2'];

//         // 保存修改
//         await selectedItem.save();
//     }
// }


