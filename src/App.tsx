import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedLayout from "./layouts/FeedLayout";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./common/components/ProtectedRoute";
import SlimProgressBar from "./common/components/SlimProgressBar";

const App = () => {
  return (
    <>
      <SlimProgressBar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={< RegisterPage/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<FeedLayout />}>
            <Route index element={<FeedPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App