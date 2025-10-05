import React from "react";
import Left from "./home/left/left";
import Right from "./home/right/right";
import Logout from "./home/left1/logout";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Loading from "./components/Loading.jsx";
import { useAuth } from "./context/AuthProvider.jsx";
import { Navigate, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
                
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
