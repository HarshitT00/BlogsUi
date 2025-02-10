import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from './components/home/Home'
import { MyBlogs } from "./components/myBlogs/MyBlogs";
import { Login } from "./components/login/Login";
import { SignUp } from "./components/signUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/blogs" element={<Home/>} />
        <Route path="/blogs/my-blogs" element={<MyBlogs/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
