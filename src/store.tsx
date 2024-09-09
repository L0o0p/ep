import { atom, useAtom } from "jotai";

// 用户信息
export interface initUserInfo {
    userName: string,
    password: string,
}
export const initUserInfo = {
    userName: '',
    password: '',
}
export const userInfoAtom = atom<initUserInfo>(initUserInfo);
export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
    // 设置用户名
    const setUserName = (userName: string) => {
        setUserInfo({
            ...userInfo,
            userName
        })
    }
    // 设置密码
    const setPassword = (password: string) => {
        setUserInfo({
            ...userInfo,
            password
        })
    }
    // 判断用户名和密码是否为空
    const isEmpty: boolean = (userInfo.userName === '' || userInfo.password === '')
    // 返回用户信息
    return {
        isEmpty,
        userInfo,
        setUserInfo,
        setUserName,
        setPassword
    }
}

// 用户输入-地址
export const inputValueAtom = atom<string>('');
// 返沪信息
export const feedBackAtom = atom<string>('');

// 任务状态
export const taskStatusAtom = atom<boolean>(false);

// 待编辑文件
export const editFileAtom = atom<[]>([]);


// 用户信息
export const user = {
    BASE_URL: "https://dify.cyte.site:2097/v1",
    Authorization: 'app-28d3eOAJhHyp98d5UedhfGiK'
}