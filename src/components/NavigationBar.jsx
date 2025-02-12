//  React Hooks



//  React Compontents
import { Link, useLocation } from "react-router-dom";



import { camelToCapitalized, toggleInputGroup } from '../utils/utils.js';



export default function NavigationBar({ logout, user }) {
  const location = useLocation();
  let activeClasses = 'bg-body/50 text-blue-300';



  return (

    <section className="w-2/12 min-w-[320px] fixed h-full flex flex-col bg-primary z-20">
      <section className="text-xl font-semibold uppercase p-6 ">
        <h1>Starbase Portal</h1>
        <h2 className="text-base">{user && user.username}</h2>
      </section>

      <section className="flex flex-col text-sm overflow-y-scroll h-screen">
        
        <div className="collapse-wrapper">
          <p className={`py-1 border-t border-black px-5 font-semibold collapse-content-heading ${location.pathname == '/prod' && activeClasses}`} onClick={toggleInputGroup}>
            <Link to="/prod" className="hover:text-blue-400 hover:underline w-full">Production Site</Link>
          </p>
        </div>

        <div className="collapse-wrapper">
          <p className={`py-1 border-t border-black px-5 font-semibold collapse-content-heading cursor-pointer ${location.pathname == '/lc' && activeClasses}`} onClick={toggleInputGroup}>
            <i className="bi bi-plus-square"></i>
            <Link to="/lc" className="hover:text-blue-400 hover:underline w-1/2">Launch Site</Link>
          </p>
          <div className={`collapse-content ${!['/pad', '/otf'].includes(location.pathname) && 'hidden'}`}>

            <div className={`py-1 border-t border-black px-7 pe-5 flex inspector-option-field ${location.pathname == '/pad' && location.search == '?pad=a' && activeClasses}`}>
              <Link to="/pad?pad=a" className="hover:text-blue-400 hover:underline font-semibold w-full">Pad A</Link>
            </div>
            <div className={`py-1 border-t border-black px-7 pe-5 flex inspector-option-field ${location.pathname == '/pad' && location.search == '?pad=b' && activeClasses}`}>
              <Link to="/pad?pad=b" className="hover:text-blue-400 hover:underline font-semibold w-full">Pad B</Link>
            </div>
            <div className={`py-1 border-t border-black px-7 pe-5 flex inspector-option-field ${location.pathname == '/otf' && activeClasses}`}>
              <Link to="/otf" className="hover:text-blue-400 hover:underline font-semibold w-full">Tank Farm</Link>
            </div>

          </div>
        </div>

        <div className="collapse-wrapper">
          <p className={`py-1 border-t border-black px-5 font-semibold collapse-content-heading ${location.pathname == '/massey' && activeClasses}`}>
            <Link to="/massey" className="hover:text-blue-400 hover:underline w-full">Massey's</Link>
          </p>
        </div>


        <div className="collapse-wrapper mt-auto">
          <p className="py-1 border-t border-black px-5 font-semibold collapse-content-heading">
            <Link to="/prod" className="hover:text-blue-400 hover:underline w-full">Settings</Link>
          </p>
        </div>
        <div className="collapse-wrapper">
          <p className="py-1 border-t border-black px-5 font-semibold collapse-content-heading">
            <a className="hover:text-blue-400 hover:underline w-full cursor-pointer" onClick={logout}>Logout</a>
          </p>
        </div>
        <div className="collapse-wrapper">
          <p className="py-9 border-t border-black px-5 font-semibold collapse-content-heading"></p>
        </div>

      </section>
    </section>
  )
}
