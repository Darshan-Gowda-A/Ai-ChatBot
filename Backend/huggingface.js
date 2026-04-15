import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function runChat() {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [
          {
            role: "user",
            content: req.body.message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

runChat();
