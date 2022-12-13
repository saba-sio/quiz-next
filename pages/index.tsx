import axios from "axios";
import styles from '../styles/Home.module.css'
// import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
const http = axios.create({
  // baseURL: "https://quiz-flask.azurewebsites.net/",
  baseURL: "http://127.0.0.1:5000/",
  // baseURL: "http://127.0.0.1:8080/",
  headers: {
    // 'Access-Control-Allow-Origin': 'https://quiz-flask.azurewebsites.net/',
    'Access-Control-AlloSw-Origin': 'http://127.0.0.1:5000/',
    // 'Access-Control-Allow-Origin': '*' //'http://127.0.0.1:8080/',
    // 'Content-Type': 'text/plain'
  }
})
export default function Home() {
  const [fetchedMessage, setFetchedMessage] = useState([""]);
  const get_quiz = async () => {
    // const res = await http.get("/user/1");
    const res = await http.get("/quiz");
    console.log(res)
    const Q_only = JSON.parse(JSON.stringify(res.data));
    // const text = new Array(4);
    const text = new Array(4);
    // [currentUser, setCurrentUser] = useState<string | null>()
    text[0] = Q_only.quiz
    text[1] = Q_only.answer1
    text[2] = Q_only.answer2
    text[3] = Q_only.correct_answer
    setFetchedMessage(text)
    if (typeof document !== 'undefined') { document.getElementById("ans_T")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("ans_F")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("reload")!.style.display = "none" };
    const coice_1 = document.getElementById("coice_1")!;
    const coice_2 = document.getElementById("coice_2")!;
    coice_1.style.display = "inline";
    coice_2.style.display = "inline";
    };
  const get_answer = async (e: any) => {
    // console.log(e.target.innerText);
    const coice_1 = document.getElementById("coice_1")!;
    const coice_2 = document.getElementById("coice_2")!;
    const reload = document.getElementById("reload")!;
    const ans_T = document.getElementById("ans_T")!;
    const ans_F = document.getElementById("ans_F")!;
    // if (e.target.innerText == fetchedMessage[3]) {
    if (e == fetchedMessage[3]) {
      ans_T.style.display = "block";
      ans_F.style.display = "none";
      coice_1.style.display = "none";
      coice_2.style.display = "none";
      reload.style.display = "block";
    } else {
      ans_T.style.display = "none";
      ans_F.style.display = "block";
      coice_1.style.display = "none";
      coice_2.style.display = "none";
      reload.style.display = "block";
    }
  };
  const handlers = useSwipeable({
    onSwiped: (event) => {
      console.log(event);
      if (event.dir == "Left") {
        // 左にスワイプしたときに発火するイベント
        get_answer(fetchedMessage[1])
        // hogehoge()
      }
      if (event.dir == "Right") {
        // 右にスワイプしたときに発火するイベント
        get_answer(fetchedMessage[2])
        // hogehoge()
      }
      if (event.dir == "Up"){
        get_quiz()
      }
    },
    trackMouse: true,
  });
  useEffect(() => {
    get_quiz();
  }, []);
  return (
    <>
      <div {...handlers}>
        aaaaaaaaaaaa
      </div>
      <div className={styles.container}>
        {/* <Head>
          <title>サバ塩</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <main className={styles.main}>
          <h1 className={styles.title}>
            サバ<span>塩</span>
          </h1>
          <h1>問題</h1>
          <div id="wrap">
            <div className={styles.box}>
              <h1>
                {fetchedMessage[0]}
                <p id='ans_T'>正解!!</p>
                <p id='ans_F'>不正解</p>
              </h1>
              <button id="coice_1" onClick={(e) => get_answer(e)}>
                {fetchedMessage[1]}
              </button>
              <button id='coice_2' onClick={(e) => get_answer(e)}>
                {fetchedMessage[2]}
              </button>
              <button id='reload' type="button" onClick={() => get_quiz()}>
                next Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
