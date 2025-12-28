import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase-client";
import useLoadingStore from "../store/useLoadingStore";

const ProtectedRoute = () => {
  const { start, stop } = useLoadingStore();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      start(); // Progress bar starts
      try {
        const { data } = await supabase.auth.getSession();
        if (isMounted) {
          setIsAuthenticated(!!data.session);
          setLoading(false);
        }
      } finally {
        if (isMounted) stop(); 
      }
    };

    checkSession();

    return () => {
      isMounted = false;
      stop();
    };
  }, [start, stop]);

  if (loading) {
    return null; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;