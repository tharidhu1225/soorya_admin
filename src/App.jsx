import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/logingPage'
import HomePage from './pages/homePage'
import BlockPage from './pages/blockPage'



function App() {
  const [count, setCount] = useState(0)



  return (
    <div className='bg-primary'>
     <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes path="/*">          
        <Route path="/*" element={<BlockPage/>}/>
        <Route path="/login" element={<BlockPage/>}/>             
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
