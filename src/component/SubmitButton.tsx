import { useAtom } from "jotai"
import { feedBackAtom, inputValueAtom, user } from "../store"
import axios, { AxiosError } from "axios"


export const SubmitButton = () => {
    const [path] = useAtom(inputValueAtom)
    const [, setFeedBack] = useAtom(feedBackAtom)

    const handleClick = async () => {
        console.log('点击了')
        await sendMessage(path, setFeedBack)
    }
    return (
        <button onClick={handleClick}>Submit</button>
    )
}

// 方法：从输入的路径获取图片
// export const toImage = async (path: string) => {
//     // 取得指定 id 对应的文件夹
//     const folder = await eagle.folder.get({
//         name: path,
//     });
//     let items = await eagle.item.get({
//         // ids: [],
//         // isSelected: true,
//         // isUnfiled: true,
//         // isUntagged: true,
//         // keywords: [""],
//         // ext: "",
//         // tags: [],
//         folders: [folder],
//         // shape: "square",
//         // rating: 5,
//         // annotation: "",
//         // url: ""
//     });
//     for (const item of items) { }

// }

// 方法：发送消息到服务器
async function sendMessage(prompt: string, setFeedBack: { (args_0: string | ((prev: string) => string)): void; (arg0: string): void }) {
    const url = `${user.BASE_URL}/chat-messages`; // 替换为正确的 URL
    // const imgURl = prompt ? prompt : "https://cloud.dify.ai/logo/logo-site.png"
    const imgURl = "https://cloud.dify.ai/logo/logo-site.png"
    const imgID = "/1.png"
    const data = {
        query: prompt,//"你好，我想了解更多信息。",
        response_mode: "blocking",
        user: "user123",
        auto_generate_name: true,
        inputs: {},
        "files": [
            {
                "type": "image",
                "transfer_method": "remote_url",
                "url": imgURl
            },
            {
                "type": "image",
                "transfer_method": "local_file",
                "url": imgID
            }
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

