import mongoose from "mongoose";
import express, { Configuration, OpenAIApi  } from "express";
import moment from "moment";

const router = express.Router();({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInput.trim()) return;

    setMessages([...messages, { role: 'user', content: userInput }]);

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', 
        messages: [...messages, { role: 'user', content: userInput }], 
      });

      setMessages([...messages, { role: 'assistant', content: response.data.choices[0].message.content }]);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message to the user)
    }

    setUserInput('');
  };

  return (
    <div>
      {/* Chat window */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>

      {/* Input field */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}