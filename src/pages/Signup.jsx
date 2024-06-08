import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import googleIco from "../assets/images/google.png";
import TextField from "../component/common/TextField";
import { useDispatch, useSelector } from "react-redux";
import { signUpWithEmail, signUpWithGoogle } from "../redux/auth/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signUpWithEmail({ email, password }));
    if (signUpWithEmail.fulfilled.match(result)) {
      navigate("/");
    }
    if (signUpWithEmail.rejected.match(result)) {
      console.log(result.payload.code);
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
    <main>
      {error && <p>error</p>}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="justShadow p-5 rounded-lg">
          <div>
            <h1 className="h1 mb-2">Create your account</h1>
            <p className="text-sm text-slate-500">
              Sign Up Now: Because Remembering Passwords
              <br /> is So 1999
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
                  className="button-inside flex items-center justify-center"
                  onClick={onSubmit}
                >
                  {loading ? <span className="loader"></span> : "Sign up"}
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-600">
              Already have an account?{"  "}
              <NavLink to="/" className="text-blue-500">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
