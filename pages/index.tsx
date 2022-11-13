// import axios, { AxiosRequestConfig } from "axios";
// import {useState} from "react";

// const http = axios.create({
//   // baseURL: "http://127.0.0.1:5000",
//   baseURL: "https://quiz-flask.azurewebsites.net/",
//   headers: {
//     // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
//     'Access-Control-Allow-Origin': 'https://quiz-flask.azurewebsites.net/',
//     'Content-Type': 'text/plain'
//   }
// })

// export default function Home() {
//   const [fetchedMessage, setFetchedMessage] = useState("");

//   const get_quiz=async()=>{
//     const response = await http.get("/");
//     setFetchedMessage(response.data)
//     };
  
//   return (
//     <>
//       <button onClick={get_quiz}>click</button>
//       <h1>{fetchedMessage.split(',')[0]}
//         <p>{fetchedMessage.split(',')[2]}</p>
//         <p>{fetchedMessage.split(',')[1]}</p>
//       </h1>
//     </>
//   )
// }

import axios, { AxiosRequestConfig } from "axios";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";
import { isBlock } from "typescript";
import { useRouter } from 'next/router'
const http = axios.create({
  baseURL: "https://quiz-flask.azurewebsites.net/",
  headers: {
    'Access-Control-Allow-Origin': 'https://quiz-flask.azurewebsites.net/',
    'Content-Type': 'text/plain'
  }
})

export default function Home() {
  if (typeof document !== 'undefined') { document.getElementById("ans_T")!.style.display = "none" };
  if (typeof document !== 'undefined') { document.getElementById("ans_F")!.style.display = "none" };
  if (typeof document !== 'undefined') { document.getElementById("reload")!.style.display = "none" };
  const router = useRouter()
  const [fetchedMessage, setFetchedMessage] = useState("");
  const get_quiz = async () => {
    const response = await http.get("/");
    const Q_only = response.data.split(',')
    setFetchedMessage(Q_only);

  };
  const get_answer = async (e: any) => {
    // console.log(e.target.innerText);
    const ans_T = document.getElementById("ans_T")!;
    const coice_1 = document.getElementById("coice_1")!;
    const coice_2 = document.getElementById("coice_2")!;
    const reload = document.getElementById("reload")!;
    if (e.target.innerText == fetchedMessage[3]) {
      ans_T.style.display = "block";
      coice_1.style.display = "none";
      coice_2.style.display = "none";
      reload.style.display = "block";
    } else {
      const ans_F = document.getElementById("ans_F")!;
      ans_F.style.display = "block";
      coice_1.style.display = "none";
      coice_2.style.display = "none";
      reload.style.display = "block";
    }
  };
  useEffect(() => {
    get_quiz();
  }, []);
  return (
    <>
      <h1>
        {fetchedMessage[0]}
        <p id='ans_T'>正解!!</p><p id='ans_F'>不正解</p>
      </h1>

      <button id="coice_1" onClick={(e) => get_answer(e)}>
        {fetchedMessage[1]}
      </button>
      <button id='coice_2' onClick={(e) => get_answer(e)}>
        {fetchedMessage[2]}
      </button>
      <button id='reload' type="button" onClick={() => router.reload()}>
        next Quiz
      </button>
    </>
  )
}
