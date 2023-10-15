
import './App.css';
import { NavBar,Home,Welcome,Search,Profile,SignUp,EditProfile, Pages,Posts,Followed,PostDetail, 
        Error,SignInModal,SignUpModal,MnemonicModal,AddProfile, CreatePost,TransactModal,InfoModal,
        About,Faq } from './components';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useContext } from 'react';
import { ClientContext } from './components/context/ClientContext';


function App() {
  const { signInModalIsOpen,signUpModalIsOpen,mnemonicModalOpen,miscData,transactModalOpen } = useContext(ClientContext);
  return (
    <div className='h-screen'>
      <BrowserRouter>
        <div >
          <NavBar/>
        </div>
        <div className=' h-[50px] '/>
        <div className=''>
          {signInModalIsOpen && (<SignInModal/>)}
          {signUpModalIsOpen && (<SignUpModal/>)}
          {mnemonicModalOpen && (<MnemonicModal data = {miscData}/>)}
          {transactModalOpen && (<TransactModal/>)}
          {/* {!transactModalOpen && (<InfoModal/>)} */}
          <Routes>
            <Route exact path='/' element={<Welcome/>}/>
            <Route path='/post' element={<Home left = {<Followed/>} main ={<Posts/>}/>}/>
            <Route path='/creatpost' element={<Home left = {<Followed/>} main ={<CreatePost/>}/>}/>
            <Route path='/post/:post_index/:post_id' element={<Home left = {<Followed/>} main ={<PostDetail/>}/>}/>
            <Route path='/pages' element={<Home left = {<Followed/>} main ={<Pages/>}/>}/>
            <Route path='/search' element={<Home left = {<Search/>} main ={<Search/>}/>}/>
            <Route path='/:user_address' element={<Profile />}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='/addprofile' element={<AddProfile/>}/>
            <Route path='/:user_address/editprofile' element={<EditProfile/>}/>
            <Route exact path='*' element={<Error/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
