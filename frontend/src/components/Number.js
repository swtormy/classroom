import React, { useEffect, useState, useRef, useCallback } from 'react'
import Header from '../components/Header';
// `ws://127.0.0.1:6379/ws/chat/lobby/`
const Number = () => {
  const ws = useRef(null)
  const [status, setStatus] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket("ws://127.0.0.1:8000/ws/channel");
      ws.current.onopen = (e) => {
        setStatus(`Соединение открыто:`)
        // console.log(status);
        // console.log(e.code);
      }
      ws.current.onclose = () => setStatus("Соединение закрыто")
      

      gettingData()
    }
    return () => ws.current.close()
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    ws.current.onmessage = e => {                //подписка на получение данных по вебсокету

      const message = JSON.parse(e.data);
      alert(message.message);
      setData(message);
    };
  }, [data])

  const res = () => {
    ws.current.send(JSON.stringify({ 'message': 'начата работа над active sales' }))
  }
  // const [isPaused, setIsPaused] = useState(false);
  // const [data, setData] = useState(null);
  // const [status, setStatus] = useState("");
  // ;

  // useEffect(() => {
  //     if (!isPaused) {
  //         ws.current = new WebSocket("ws://127.0.0.1:6379/ws/chat/lobby/"); // создаем ws соединение
  //         ws.current.onopen = () => setStatus("Соединение открыто");  // callback на ивент открытия соединения
  //         ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

  //         gettingData();
  //     }

  //     return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  // }, [ws, isPaused]);

  // const gettingData = useCallback(() => {
  //     if (!ws.current) return;

  // ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
  //     if (isPaused) return;
  //     const message = JSON.parse(e.data);
  //     setData(message);
  // };
  // }, [isPaused]);

  return (
    <>
      {/* <div>{data.message}</div> */}
      <div className='pt-20 flex justify-center items-start'>
        {/* <Header /> */}
      </div>
      <div className='flex justify-center items-start'>
        <button className='mt-20 ml-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={res}>Изменить прогноз</button>
      </div>
    </>
  )
}

export default Number