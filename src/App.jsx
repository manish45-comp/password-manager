import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PasswordContainer from "./pages/PasswordContainer";
import PropTypes from "prop-types";
import LandingPage from "./component/common/LandingPage";

const App = () => {
  const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/" replace />;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <>
      <BrowserRouter>
        <div>
          <section>
            <Routes>
              <Route index path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              >
                <Route index element={<LandingPage />} />
                <Route
                  path="all"
                  element={<PasswordContainer category={"all"} />}
                />
                <Route
                  path="social"
                  element={<PasswordContainer category={"social"} />}
                />
                <Route
                  path="search"
                  element={<PasswordContainer category={"search"} />}
                />
                <Route
                  path="shopping"
                  element={<PasswordContainer category={"shopping"} />}
                />
                <Route
                  path="videos"
                  element={<PasswordContainer category={"video"} />}
                />
                <Route
                  path="favorites"
                  element={<PasswordContainer category={"favorite"} />}
                />
                <Route
                  path="forum"
                  element={<PasswordContainer category={"forum"} />}
                />
                <Route
                  path="professional"
                  element={<PasswordContainer category={"professional"} />}
                />
              </Route>
            </Routes>
          </section>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
