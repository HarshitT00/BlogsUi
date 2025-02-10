import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from './components/home/Home'
import { MyBlogs } from "./components/myBlogs/MyBlogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/blogs" element={<Home/>} />
        <Route path="/blogs/my-blogs" element={<MyBlogs/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
