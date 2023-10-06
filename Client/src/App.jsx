
import './App.css';
import { NavBar,Home,Welcome,Search,Profile,SignUp,EditProfile, Pages,Posts,Followed,PostDetail, 
        Error,SignInModal,SignUpModal,MnemonicModal,AddProfile, CreatePost } from './components';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useContext } from 'react';
import { ClientContext } from './components/context/ClientContext';


function App() {
  const { signInModalIsOpen,signUpModalIsOpen,mnemonicModalOpen } = useContext(ClientContext);
  return (
    <div className=''>
      <BrowserRouter>
        <div >
          <NavBar/>
        </div>
        <div className=' h-[50px] '/>
        <div className=''>
          {signInModalIsOpen && (<SignInModal/>)}
          {signUpModalIsOpen && (<SignUpModal/>)}
          {mnemonicModalOpen && (<MnemonicModal/>)}
          <Routes>
            <Route exact path='/' element={<Welcome/>}/>
            <Route path='/post' element={<Home left = {<Followed/>} main ={<Posts/>}/>}/>
            <Route path='/creatpost' element={<Home left = {<Followed/>} main ={<CreatePost/>}/>}/>
            <Route path='/post/:post_id' element={<Home left = {<Followed/>} main ={<PostDetail/>}/>}/>
            <Route path='/pages' element={<Home left = {<Followed/>} main ={<Pages/>}/>}/>
            <Route path='/search' element={<Home left = {<Search/>} main ={<Search/>}/>}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/addprofile' element={<AddProfile/>}/>
            <Route path='/editprofile' element={<EditProfile/>}/>
            <Route exact path='*' element={<Error/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
