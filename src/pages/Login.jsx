//  React Hooks
import { useState } from 'react';


//  React Compontents



//  Data




export default function Login() {
  return (
    <>
      <section className="flex items-center mx-auto h-screen bg-black">
        <section className="flex flex-col gap-8 mx-auto w-1/4 h-1/2 font-semibold p-6">

          <section className="text-xxl font-semibold uppercase">
            <h1>Starbase Portal</h1>
            <h2 className="text-base">Login</h2>
          </section>

          <section className="flex flex-col gap-3 text-l">
            <input className="bg-body/50 hover:bg-body/80 focus:bg-body/80 text-white ps-3 py-1 w-full outline-none " type="text" placeholder="Username" />
            <input className="bg-body/50 hover:bg-body/80 focus:bg-body/80 text-white ps-3 py-1 w-full outline-none" type="password" placeholder="Password" />
            <p className="font-normal text-danger2">Invalid username or password.</p>
          </section>

          <section className="flex">
            <button className='bg-accent/80 hover:bg-accent py-2 w-full'>Login</button>
          </section>
        </section>
      </section>
    </>
  )
}
