// import React from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Profile from './pages/Profile'
// import { Toaster } from "react-hot-toast"
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

// const App = () => {
//       const { authUser } = useContext(AuthContext)

//   return (
//     <div className='bg-contain bg-gradient-to-b from-black va-black to-violet-950'>
//       <Toaster/>
//       <Routes>
//         <Route path="/" element={authUser ? <Home/>: <Navigate to="/login"/>}/>
//         <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/"/>}/>
//         <Route path="/profile" element={authUser ? <Profile/> : <Navigate to="/login"/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App


import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { Toaster } from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


const App = () => {
  const { authUser } = useContext(AuthContext)

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-black via-black to-violet-950 overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Large gradient orbs */}
        <div className='absolute top-20 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl'></div>
        <div className='absolute top-40 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl'></div>
        
        {/* Grid pattern overlay */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]'></div>
        
        {/* Floating geometric shapes */}
        <div className='absolute top-1/4 left-1/4 w-32 h-32 border border-violet-500/10 rotate-45'></div>
        <div className='absolute top-2/3 right-1/4 w-24 h-24 border border-purple-500/10 rotate-12'></div>
        <div className='absolute bottom-1/4 left-1/2 w-40 h-40 border border-indigo-500/10 -rotate-12'></div>
        
        {/* Small accent dots */}
        <div className='absolute top-1/3 right-1/3 w-2 h-2 bg-violet-400/30 rounded-full'></div>
        <div className='absolute top-1/2 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full'></div>
        <div className='absolute bottom-1/3 right-1/2 w-2 h-2 bg-indigo-400/30 rounded-full'></div>
        <div className='absolute top-3/4 left-2/3 w-1.5 h-1.5 bg-violet-300/40 rounded-full'></div>
        
        {/* Subtle scan lines */}
        <div className='absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(139,92,246,0.02)_50%)] bg-[length:100%_4px]'></div>
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <Toaster/>
        <Routes>
          <Route path="/" element={authUser ? <Home/>: <Navigate to="/login"/>}/>
          <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/"/>}/>
          <Route path="/profile" element={authUser ? <Profile/> : <Navigate to="/login"/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App