import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from './components/home/Home'
import { MyBlogs } from "./components/myBlogs/MyBlogs";
import { Login } from "./components/login/Login";
import { SignUp } from "./components/signUp/SignUp";
import { ReadBlog } from "./components/readBlog/ReadBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/my-blogs" element={<MyBlogs/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/:blogId" element={<ReadBlog />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
