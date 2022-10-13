import { Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/login/LoginScreen";
import Home from "./screens/Home/Home";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import RegisterScreen from "./screens/Register/RegisterScreen";
import HomeInicio from "./screens/Home-inicio/HomeInicio";
import CreateTrainingScreen from "./screens/training/create-training/CreateTrainingScreen";
import ProfileUser from "./screens/user/profile-screen/ProfileUser";

function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <div className="bg-light">
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
        <Route
          path="/createtraining"
          element={
            <AuthGuard>
              <CreateTrainingScreen />
            </AuthGuard>
          }
        />
        <Route
          path="/profileuser"
          element={
            <AuthGuard>
              <ProfileUser />
            </AuthGuard>
          }
        ></Route>
        <Route path="/" element={<HomeInicio />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
}

export default App;
