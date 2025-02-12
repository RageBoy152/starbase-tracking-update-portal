//  React Hooks
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authenticator.jsx';
import { useEffect } from 'react';


//  React Compontents



//  Data




export default function Login() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (user !== undefined) {
      if (user) {
        navigate('/prod');
      }
    }
  }, [user]); // Only re-run when `user` changes


  return (
    <>
      <section className="flex items-center mx-auto h-screen bg-black">
        <section className="flex items-center justify-start flex-col gap-8 mx-auto w-full h-1/3 font-semibold p-6">

          <section className="text-xxl font-semibold uppercase w-full md:w-1/2">
            <h1>Starbase Portal</h1>
            <h2 className="text-base">Team Login</h2>
          </section>


          <section className="flex w-full md:w-1/2">
            <button className='bg-accent/80 hover:bg-accent py-2 w-full flex justify-center gap-2' onClick={login}><i className="bi bi-discord"></i> Login with Discord</button>
          </section>
        </section>
      </section>
    </>
  )
}
