import { atom } from "jotai";

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