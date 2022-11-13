import axios, { AxiosRequestConfig } from "axios";
import {useState} from "react";

const http = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://quiz-flask.azurewebsites.net/",
  headers: {
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
    'Access-Control-Allow-Origin': 'https://quiz-flask.azurewebsites.net/',
    'Content-Type': 'text/plain'
  }
})

export default function Home() {
  const [fetchedMessage, setFetchedMessage] = useState("");

  const get_quiz=async()=>{
    const response = await http.get("/");
    setFetchedMessage(response.data)
    };
  
  return (
    <>
      <button onClick={get_quiz}>click</button>
      <h1>{fetchedMessage.split(',')[0]}
        <p>{fetchedMessage.split(',')[2]}</p>
        <p>{fetchedMessage.split(',')[1]}</p>
      </h1>
    </>
  )
}
