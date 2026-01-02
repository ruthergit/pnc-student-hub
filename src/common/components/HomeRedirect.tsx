import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../../supabase-client"

const HomeRedirect = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean| null>(null) // null = loading

  useEffect(() => {
    let isMounted = true

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (isMounted) {
        setIsAuthenticated(!!data.session)
      }
    }

    checkSession()

    return () => {
      isMounted = false
    }
  }, [])

  // ⏳ wait for Supabase
  if (isAuthenticated === null) return null // or loader

  return isAuthenticated
    ? <Navigate to="/feed" replace />
    : <Navigate to="/welcome" replace />
}

export default HomeRedirect
