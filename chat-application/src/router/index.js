import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/login'
import { Register } from '../pages/register'
import { Chat } from '../pages/chat'
export const Routers = () => {
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={< Login />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/register' element={< Register />}></Route>
            <Route exact path='/chats' element={< Chat />}></Route>
        </Routes>
    </BrowserRouter>
}