import ollama from 'ollama/browser';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ollama as any).config.host = 'https://bjol.luxhub.top:9445/b/';
export const premise = `针对我发给你的图片，给图片打标签:
1.标签可以是作画/拍摄/渲染风格、画面内容、光照、颜色、感情等，必须简短，含义唯一。
2.打3-6个中文标签，用逗号分隔不同标签，不要有额外内容，务必按照以下例格式返回。
例："tag1","tag2","tag3"...`
export const get_ollama_res = async (image: Uint8Array, query: string) => {
    return ollama.chat({
        model: 'aiden_lu/minicpm-v2.6:Q4_K_M', keep_alive: '72000s', messages: [{ 'role': 'user', 'content': query, images: [image] }], stream: false
    });
};
