import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from './utils/socketIOHandler';
import { Navigate, useLocation } from 'react-router-dom';



const AuthContext = createContext(null);



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);


  useEffect(() => {



    // Ask backend to check session validity on page load

    const checkAuth = async () => {
      try {
        const response = await fetch(`http://localhost:3002/auth/check?socketId=${socket.id}`, {    ///   SOCKET.ID IS NOT DEFINED HERE COZ WE HAVEN'T CONNECTED YET - NEED TO WRAP AUTHENTICATOR IN SOCKET USE CONTEXT
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        
        if (!response.ok) {
          // print errors if res isn't 200
          setMessage(response.statusText);
          setErr(response.status);
          console.log(response);
          
          setLoading(false);
          return;
        }


        // parse res data
        const userData = await response.json();
        
        if (userData.error) {
          // print errors if res isn't 200
          setMessage(userData.message);
          setErr(userData.error);
          console.error(userData);

          setLoading(false);
          return;
        }

        // set user data from res
        setUser(userData);
        setLoading(false);

      } catch (error) {
        // print errors if error in fetch
        setMessage('Error checking validity of session.');
        setErr(error.toString());
        console.error(error);
      }
    };


    socket.on('connect', checkAuth);
    socket.on('oauth_url', (url) => window.location.href = url);



    //    CLEAN UP LISTENERS    \\

    return () => {
      socket.off('oauth_url');
      socket.off('connect');
    };

  }, []);


  const login = () => { socket.emit('request_oauth', 'http://localhost:5173/auth/callback'); }
  const logout = () => {
    
    fetch(`http://localhost:3002/auth/logout?socketId=${socket.id}`, { credentials: 'include' })
    .then(async (res) => {
      // get logout req result
      let resData = await res.json();

      // token res status
      if (resData.error) { setErr(resData.error); console.error(resData); }
      setMessage(resData.message);

      // if logout was ok, clear user and go to /login
      if (!resData.error) {
        socket.emit('logout'); // ask SOCKET to logout - clears backend session
        setUser(null);
        window.location.href = '/login';
      }
    })
    .catch(error => {
      setMessage('Error logging out.');
      setErr(error.toString());
      console.error(error);
    });
  };


  if (loading) {
    return (
      <>
      <section className="flex items-center mx-auto h-screen bg-black">
        <section className="flex items-center justify-start flex-col gap-8 mx-auto w-full h-1/3 font-semibold p-6">

          <section className="text-xxl font-semibold uppercase w-full md:w-1/2">
            <h1>Starbase Portal</h1>
            <h2 className="text-base">{err ? 'Authentication Error :/' : 'Authenticating...'}</h2>
          </section>


          <section className="flex flex-col gap-1 w-full md:w-1/2">
            {(!err && message) && <p>{message}</p>}

            {(err && message) && <p className="mt-3 text-red-500 bg-primary/20 p-2 rounded-md font-mono text-sm break-words">{message}<br></br>{err}</p>}
          </section>
        </section>
      </section>
    </>
    );
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}



export function useAuth() {
  return useContext(AuthContext);
}



export function AuthGuard({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
