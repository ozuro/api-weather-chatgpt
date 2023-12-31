import OpenAI from 'openai';


import dotenv from "dotenv";

dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
// });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,// This is also the default, can be omitted
});
const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{"role": "user", "content": "Hello!"}],
});
console.log(chatCompletion.choices[0].message);