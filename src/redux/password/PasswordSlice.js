import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// fetch passwords from firebase2
// export const fetchPasswordsFromFirebase = createAsyncThunk(
//   "password/fetchPasswords",
//   async (_, { rejectWithValue }) => {
//     return new Promise((resolve, reject) => {
//       onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           try {
//             const uid = user.uid;
//             const q = query(
//               collection(db, "users", uid, "passwords"),
//               orderBy("createdAt", "desc")
//             );
//             const querySnapshot = await getDocs(q); // Corrected to getDocs
//             const passwordData = querySnapshot.docs.map((doc) => {
//               const data = doc.data();
//               const decryptedPassword = CryptoJS.AES.decrypt(
//                 data.password,
//                 "your-secret-key"
//               ).toString(CryptoJS.enc.Utf8);
//               const createdAt = data.createdAt.toDate().toISOString();
//               return {
//                 id: doc.id,
//                 ...data,
//                 password: decryptedPassword,
//                 createdAt,
//               };
//             });
//             resolve(passwordData);
//           } catch (err) {
//             reject(rejectWithValue({ code: err.code, message: err.message }));
//           }
//         } else {
//           reject(
//             rejectWithValue({
//               code: "auth/no-current-user",
//               message: "No user is currently signed in.",
//             })
//           );
//         }
//       });
//     });
//   }
// );
// save the password from firebase
// export const savePasswordToFirebase = createAsyncThunk(
//   "password/savePassword",
//   async (
//     { site, username, password, description, tags, favorite },
//     { rejectWithValue }
//   ) => {
//     const user = auth.currentUser;
//     if (user) {
//       const uid = user.uid;
//       const encryptedPassword = CryptoJS.AES.encrypt(
//         password,
//         "your-secret-key"
//       ).toString();
//       const passwordData = {
//         site,
//         username,
//         password: encryptedPassword,
//         description,
//         tags,
//         favorite,
//         createdAt: serverTimestamp(),
//       };
//       try {
//         const result = await addDoc(
//           collection(db, "users", uid, "passwords"),
//           passwordData
//         );
//         return {
//           id: result.id,
//           site,
//           username,
//           password,
//           description,
//           tags,
//           favorite,
//           createdAt: serverTimestamp(),
//         };
//       } catch (err) {
//         return rejectWithValue({ code: err.code, message: err.message });
//       }
//     } else {
//       return rejectWithValue({
//         code: "auth/no-current-user",
//         message: "No user is currently signed in.",
//       });
//     }
//   }
// );

// delete the password from firebase
// export const deletePasswordFromFirebase = createAsyncThunk(
//   "password/deletePassword",
//   async (id, { rejectWithValue }) => {
//     const user = auth.currentUser;
//     if (user) {
//       const uid = user.uid;
//       try {
//         await deleteDoc(doc(db, "users", uid, "passwords", id));
//         return id;
//       } catch (err) {
//         return rejectWithValue({ code: err.code, message: err.message });
//       }
//     } else {
//       return rejectWithValue({
//         code: "auth/no-current-user",
//         message: "No user is currently signed in.",
//       });
//     }
//   }
// );

// toggle fav the password from firebase
// export const toggleFavoritePasswordInFirebase = createAsyncThunk(
//   "password/toggleFavoritePassword",
//   async ({ passwordId, currentFavoriteStatus }, { rejectWithValue }) => {
//     const user = auth.currentUser;
//     if (user) {
//       const uid = user.uid;
//       try {
//         await updateDoc(doc(db, "users", uid, "passwords", passwordId), {
//           favorite: !currentFavoriteStatus,
//         });
//         return { passwordId, newFavoriteStatus: !currentFavoriteStatus };
//       } catch (err) {
//         return rejectWithValue({ code: err.code, message: err.message });
//       }
//     } else {
//       return rejectWithValue({
//         code: "auth/no-current-user",
//         message: "No user is currently signed in.",
//       });
//     }
//   }
// );

//express server

export const savePasswordToExpress = createAsyncThunk(
  "password/savePasswordToExpress",
  async ({
    site,
    url,
    username,
    category,
    password,
    description,
    tags,
    favorite,
  }) => {
    try {
      const dataToSave = {
        id: uuidv4(),
        site,
        url,
        username,
        category,
        password,
        description,
        tags,
        favorite,
        createdAt: new Date(),
      };
      const response = await axios.post(
        "http://localhost:3001/saveData",
        dataToSave
      );
      return response;
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
);

export const fetchPasswords = createAsyncThunk(
  "password/fetchPasswords",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetchPasswords");
      return response.data.passwords;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

export const deletePasswords = createAsyncThunk(
  "password/delete",
  async ({ passwordId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deletePassword/${passwordId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      return error;
    }
  }
);

export const toggleFavPass = createAsyncThunk(
  "password/toggleFavPass",
  async (passwordId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/toggleFavorite/${passwordId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      return error;
    }
  }
);

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPasswords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPasswords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPasswords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchPasswordsFromFirebase.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchPasswordsFromFirebase.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchPasswordsFromFirebase.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //       state.data = [];
  //     })
  //     .addCase(savePasswordToFirebase.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(savePasswordToFirebase.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data.push(action.payload);
  //     })
  //     .addCase(savePasswordToFirebase.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(deletePasswordFromFirebase.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(deletePasswordFromFirebase.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data = state.data.filter((item) => item.id !== action.payload);
  //     })
  //     .addCase(deletePasswordFromFirebase.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(toggleFavoritePasswordInFirebase.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(toggleFavoritePasswordInFirebase.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data = state.data.map((item) => {
  //         if (item.id === action.payload.passwordId) {
  //           return {
  //             ...item,
  //             favorite: action.payload.newFavoriteStatus,
  //           };
  //         }
  //       });
  //     })
  //     .addCase(toggleFavoritePasswordInFirebase.rejected, (state, action) => {
  //       state.error = action.payload;
  //     });
  // },
});

export const { addPassword, removePassword, toggleFavoritePassword } =
  passwordSlice.actions;

export default passwordSlice.reducer;
