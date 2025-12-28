import { Outlet } from "react-router-dom";
import Navbar from "../common/components/Navbar";

const FeedLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default FeedLayout