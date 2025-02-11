import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './components/home/Home';
import { MyBlogs } from './components/myBlogs/MyBlogs';
import { Login } from './components/login/Login';
import { SignUp } from './components/signUp/SignUp';
import { ReadBlog } from './components/readBlog/ReadBlog';
import { EditBlog } from './components/editBlog/EditBlog';
import { AddBlog } from './components/editBlog/AddBlogs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/:blogId" element={<ReadBlog />} />
        <Route path="edit-blog/:blogId" element={<EditBlog />} />
        <Route path="add-blog" element={<AddBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
