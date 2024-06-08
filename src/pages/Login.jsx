import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "../component/common/TextField";
import googleIco from "../assets/images/google.png";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithEmailAndPassword,
  signUpWithGoogle,
} from "../redux/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const onLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      loginWithEmailAndPassword({ email, password })
    );
    if (loginWithEmailAndPassword.rejected.match(result)) {
      console.log(result.payload.code);
    }
    if (loginWithEmailAndPassword.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await dispatch(signUpWithGoogle());
    if (signUpWithGoogle.fulfilled.match(result)) {
      navigate("/home");
    }
    if (signUpWithGoogle.rejected.match(result)) {
      console.log(result.payload.code);
    }
  };

  return (
    <>
      <main>
        {error && <p>error</p>}
        <section className="h-screen w-screen flex items-center justify-center">
          <div className="justShadow p-5 rounded-lg">
            <h1 className="mb-3 h1">Log in</h1>
            <p className="text-sm text-gray-500">
              Ready to Dive In? Enter Your Credentials below
            </p>
            <div className="my-5 button">
              <button
                onClick={handleGoogleSignIn}
                className="button-inside flex items-center justify-center gap-2"
              >
                <span>
                  <img className="h-6" src={googleIco} />
                </span>
                <span className="text-sm">Continue with google</span>
              </button>
            </div>
            <form>
              <TextField
                className="rounded-md ps-2"
                type="email"
                label="Email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="rounded-md ps-2"
                type="password"
                label="Password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="mt-7 my-5 button">
                <button
                  type="submit"
                  className="button-inside"
                  onClick={onLogin}
                >
                  {loading ? <span className="loader"></span> : "Login"}
                </button>
              </div>
            </form>

            <p className="text-sm text-center text-gray-500">
              No account yet?{" "}
              <NavLink to="/signup" className="text-blue-500">
                Sign up
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
