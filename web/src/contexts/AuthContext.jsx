const { createContext, useState } = require("react");

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function login(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  const value = {
    user,
    setUser: login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
