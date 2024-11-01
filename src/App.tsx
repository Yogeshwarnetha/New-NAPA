import './App.css'
import Navbar from './navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/footer'

function App() {

  return (
    <>
   
     <Navbar/>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
     </BrowserRouter>
     <Footer/>
    </>
  )
}

export default App
