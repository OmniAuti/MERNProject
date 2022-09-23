import { useContext, createContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { auth } from "../firebase";


const UserContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
  };

  const reSendEmailVerification = async () => {
    return sendEmailVerification(auth.currentUser);
  };
  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  // PROFILE UPDATES

  const reAuth = (cred) => {
    return reauthenticateWithCredential(auth.currentUser, cred);
  };

  const updateUserPassword = (newPass) => {
    return updatePassword(auth.currentUser, newPass);
  };

  const updateUserEmail = (newEmail) => {
    return updateEmail(auth.currentUser, newEmail);
  };

  const deleteUserAndAllPosts = () => {
    return deleteUser(auth.currentUser);
  };

  // PASSWORD RESET
  const passwordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        logInUser,
        logOutUser,
        reAuth,
        updateUserEmail,
        updateUserPassword,
        deleteUserAndAllPosts,
        passwordReset,
        reSendEmailVerification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContextProvider;
// THIS IS WHAT IS IMPORTED AND USED AS A OBJECT/FUNCTION
export const UserAuth = () => {
  return useContext(UserContext);
};
