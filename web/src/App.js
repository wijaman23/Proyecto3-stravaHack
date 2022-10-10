import { Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/login/LoginScreen";
import Home from "./screens/Home/Home";

import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import RegisterScreen from "./screens/Register/RegisterScreen";
import HomeInicio from "./screens/Home-inicio/HomeInicio";

function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/home"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route path="/" element={<HomeInicio />}></Route>
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
}

export default App;
