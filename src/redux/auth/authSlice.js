import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginWithEmailAndPassword = createAsyncThunk(
  "auth/loginWithEmailAndPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
      };
      localStorage.setItem("isLoggedIn", "true");
      return user;
    } catch (err) {
      return rejectWithValue({ code: err.code, message: err.message });
    }
  }
);

export const signUpWithGoogle = createAsyncThunk(
  "auth/signUpWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        displayImage: result.user.displayImage,
      };
      localStorage.setItem("isLoggedIn", "true");
      return user;
    } catch (err) {
      return rejectWithValue({ code: err.code, message: err.message });
    }
  }
);
export const signUpWithEmail = createAsyncThunk(
  "auth/signUpWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (err) {
      return rejectWithValue({ code: err.code, message: err.message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      return true;
    } catch (err) {
      return rejectWithValue({ code: err.code, message: err.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
