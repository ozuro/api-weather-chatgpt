import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    // organization: "org-eQs2LKFSpkdFAISfaP8QQjmo",
    apiKey: process.env.OPENAI_API_KEY,
});

console.log("hola")