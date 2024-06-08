import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import passwordSlice from "./password/PasswordSlice";
import generalSlice from "./GeneralSlice";
import LogoSlice from "./logo/LogoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    password: passwordSlice,
    general: generalSlice,
    logo: LogoSlice,
  },
});
