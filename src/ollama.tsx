import ollama from 'ollama';


(ollama as any).config.host = 'https://bjol.luxhub.top:9445/b/';
const premise = `对于你的返回内容，有以下几点要求：
1. 针对我发给你的图片，返回对图片内容和图片风格的描述标签，比如：“女孩”，“街景”，“赛博朋克风格”，不需要任何其他返回信息。
2. 针对多次对话中的相似内容或风格返回的词条应当相对固定，比如对于赛博朋克风格应该返回完全相同的词条“赛博朋克风格”，避免一次使用”赛博朋克“，另一次使用“赛博朋克风格”的情况`
export const get_ollama_res = async (image: Uint8Array, query: string = '请打标签') => {
    return ollama.chat({ model: 'aiden_lu/minicpm-v2.6:Q4_K_M', keep_alive: '72000s', messages: [{ role: 'system', content: premise }, { 'role': 'user', 'content': query, images: [image] }], stream: false });
};
