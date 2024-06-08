import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";
import PasswordForm from "../component/common/PasswordForm";
import { toggleState } from "../redux/GeneralSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const { show } = useSelector((state) => state.general);

  const [user, setUser] = useState({
    name: "",
    photoURL: "",
  });

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      console.log("Logged out successfully");
      navigate("/");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          ...user,
          name: user.displayName || user.email,
          photoURL: user.photoURL,
        });
      } else {
        console.log("user is logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  const userMemo = useMemo(() => user, [user]);

  const handleToggle = () => {
    dispatch(toggleState());
  };

  return (
    <>
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="wrapper justShadow flex container border-4 border-gray-600">
          <div className="sidebar boxShadow h-full w-20 md:w-72 flex flex-col md:items-start items-center md:px-5 pt-5">
            {/* title logo */}
            <div className="flex gap-3 items-center justify-start p-3">
              <i className="fa-solid text-3xl text-purple-600 fa-fingerprint"></i>
              <h1 className="text-3xl hidden md:inline">SecureVault</h1>
            </div>

            <div className="mt-8 flex-1 w-full">
              <div className="button hidden md:block">
                <button disabled className="hidden md:inline button-inside">
                  Categories
                </button>
              </div>
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0, height: "0%" }}
                whileInView={{ opacity: 1, height: "100%" }}
                transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
              >
                <ul className="w-full ">
                  <NavLink to="all">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-list-ul md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="All"
                      ></i>
                      <span className="hidden md:inline">All</span>
                    </li>
                  </NavLink>
                  <NavLink to="favorites">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-star md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Favorites"
                      ></i>
                      <span className="hidden md:inline">Favorites</span>
                    </li>
                  </NavLink>
                  <NavLink to="social">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md w-100">
                      <i
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Social"
                        className="fa-solid fa-hashtag md:me-3"
                      ></i>
                      <span className="hidden md:inline">Socials</span>
                    </li>
                  </NavLink>
                  <NavLink to="Search">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-magnifying-glass md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="search"
                      ></i>
                      <span className="hidden md:inline">Search</span>
                    </li>
                  </NavLink>
                  <NavLink to="shopping">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-tag md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Shopping"
                      ></i>
                      <span className="hidden md:inline">shopping</span>
                    </li>
                  </NavLink>
                  <NavLink to="videos">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-play md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="videos"
                      ></i>
                      <span className="hidden md:inline">video</span>
                    </li>
                  </NavLink>
                  <NavLink to="forum">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-book md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Forums"
                      ></i>
                      <span className="hidden md:inline">forums</span>
                    </li>
                  </NavLink>
                  <NavLink to="professional">
                    <li className="flex justify-center items-center md:block p-2 m-2 rounded-md">
                      <i
                        className="fa-solid fa-user md:me-3"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Professional"
                      ></i>
                      <span className="hidden md:inline">Professional</span>
                    </li>
                  </NavLink>
                </ul>
              </motion.div>
            </div>

            {/* profile */}
            <div className="account w-full relative flex flex-col items-center justify-center md:flex-row md:mb-4">
              <img
                onClick={() => setShowProfile((prev) => !prev)}
                className="h-10 w-10 mb-3 md:mb-0 rounded-full md:me-2 md:h-12 md:w-12"
                src={userMemo.photoURL}
              />
              {showProfile && (
                <motion.div
                  layoutId="profile-container"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  className="origin-bottom absolute left-6 bottom-20  rounded-lg md:hidden"
                >
                  <ul className="flex flex-col">
                    <li className="h-10 grid button">
                      <button
                        onClick={handleLogout}
                        className="button-inside px-2 flex gap-2 items-center justify-start hover:text-blue-300"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
              <span className="flex-1 hidden md:inline">{userMemo.name}</span>
              <button className="hidden md:inline" onClick={handleLogout}>
                <i
                  className="fa-solid fa-power-off hover:text-red-400"
                  data-tooltip-id="tooltip-md"
                  data-tooltip-content="logout"
                ></i>
              </button>
            </div>
          </div>

          <div className="flex-1 h-full p-5">
            <Outlet />
          </div>

          <div
            className={`formBar hidden md:block boxShadow overflow-hidden origin-right m-2 my-8 rounded-xl transition-all absolute right-0 top-0 bottom-0 bg-zinc-800 ${
              show ? "w-[400px]" : "w-[50px]"
            }`}
          >
            <div className={`flex flex-col h-full ${show ? "block" : "block"}`}>
              {/* button */}
              <div
                className={`h-10 w-100 flex items-center m-2 ${
                  show ? "justify-end" : "justify-center"
                }`}
              >
                <button
                  className="hover:bg-zinc-900 h-10 w-10 rounded-full"
                  onClick={handleToggle}
                >
                  {show ? (
                    <i className="fa-solid fa-angles-right"></i>
                  ) : (
                    <i className="fa-solid fa-angles-left"></i>
                  )}
                </button>
              </div>

              <div className="flex-1">
                <div className="text-center">
                  {show ? (
                    <h2 className="h1 text-center">Add New Password</h2>
                  ) : (
                    ""
                  )}
                </div>
                <div className="px-2">{show && <PasswordForm />}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Tooltip
        className="block md:hidden"
        id="tooltip"
        effect="solid"
        place="right"
        variant="light"
      ></Tooltip>
      <Tooltip
        id="tooltip-md"
        effect="solid"
        place="top"
        variant="light"
      ></Tooltip>
    </>
  );
};

export default Home;
