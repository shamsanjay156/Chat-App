import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login';
import {Register} from './pages/register'
import { Chats } from './pages/chat';
import {SetAvatar} from './components/setAvatar';
function App() {
  return (
    <div className="App">
   <BrowserRouter>
        <Routes>
            <Route exact path='/' element={< Login />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/register' element={< Register />}></Route>
            <Route exact path='/chats' element={< Chats />}></Route>
            <Route exact path='/setAvatar' element={< SetAvatar />}></Route>

        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
