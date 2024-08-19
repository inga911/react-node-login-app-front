import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import Toolbar from "./components/Toolbar";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import GetUserPage from "./pages/GetUserPage";
import CreatePostPage from "./pages/CreatePostPage";
import AllPostsPage from "./pages/AllPostsPage";
import GetUserPostsPage from "./pages/GetUserPostsPage";
import ViewPostPage from "./pages/ViewPostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import SavedPostsPage from "./pages/SavedPostsPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar />
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<ProfilePage />} path="/profile" />
          <Route element={<GetUserPage />} path="/user/:username" />
          <Route element={<CreatePostPage />} path="/createPost" />
          <Route element={<AllPostsPage />} path="/allPosts" />
          <Route element={<GetUserPostsPage />} path="/posts/:username" />
          {/* <Route element={<SinglePostPage />} path="/post/:username/:id" /> */}
          <Route element={<ViewPostPage />} path="/post/:username/:id" />
          <Route element={<ChatPage />} path="/chat" />
          <Route element={<ChatPage />} path="/chat/:username" />
          <Route
            element={<UpdatePostPage />}
            path="/updatePost/:username/:id"
          />
          <Route element={<SavedPostsPage />} path="/savedPosts" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
