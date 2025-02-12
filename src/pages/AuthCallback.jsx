import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import { socket } from "../utils/socketIOHandler";



export default function AuthCallback() {
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);



  useEffect(() => {
    

    // Get auth code from URL
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      fetch('http://localhost:3002/auth/exchange_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),  // Sending the code to the backend
        credentials: 'include'
      })
      .then(async (res) => {
        // token req result
        let resData = await res.json();

        // token res status
        if (resData.error) { setErr(resData.error); console.error(resData); }
        setMessage(resData.message);

        // check auth after getting token
        !resData.error && (window.location.href = '/prod');
      })
      .catch(error => {
        setMessage(error);
        setErr(true);
        console.error(error);
      });
    }
    else {
      setMessage('No callback code provided.');
      setErr(400);
      console.error('No callback code provided.');
    }



    return () => {
      // socket.off("auth_success"); // Clean up when component unmounts
    };
  }, []);



  return (
    <>
      <section className="flex items-center mx-auto h-screen bg-black">
        <section className="flex items-center justify-center flex-col gap-8 mx-auto w-full h-1/2 font-semibold p-6">

          <section className="text-xxl font-semibold uppercase w-full md:w-1/2">
            <h1>Starbase Portal</h1>
            <h2 className="text-base">Team Login</h2>
          </section>


          <section className="flex flex-col gap-1 w-full md:w-1/2">
            {!err && <p>Authenticating...</p>}
            {err && <p>Authentication Error :/</p>}

            {(!err && message) && <p>{message}</p>}

            {(err && message) && <p className="mt-3 text-red-500 bg-primary/20 p-2 rounded-md font-mono text-sm break-words">{message}<br></br>{err}</p>}
          </section>
        </section>
      </section>
    </>
  )
}