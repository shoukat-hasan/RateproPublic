import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // ✅ Login function
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("authUser", JSON.stringify(userData))
  }

  // ✅ Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Custom hook for useAuth
export const useAuth = () => useContext(AuthContext)
