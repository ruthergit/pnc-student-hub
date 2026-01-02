import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedLayout from "./layouts/FeedLayout";
import ProtectedRoute from "./common/components/ProtectedRoute";
import HomeRedirect from "./common/components/HomeRedirect";
import SlimProgressBar from "./common/components/SlimProgressBar";
import UnifiedFeed from "./pages/navigation/UnifiedFeed"
import Search from "./pages/navigation/Search";
import Create from "./pages/navigation/Create";
import Chats from "./pages/navigation/Chats";
import Profile from "./pages/navigation/Profile";


const App = () => {
  return (
    <>
      <SlimProgressBar />
      <Routes>

        <Route path="/" element={<HomeRedirect />} />
        <Route path="/welcome" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={< RegisterPage/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<FeedLayout />}>
            <Route index element={<UnifiedFeed />} />
            <Route path="search" element={<Search />} />
            <Route path="create" element={<Create />} />
            <Route path="chats" element={<Chats />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App