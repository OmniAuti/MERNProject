import AccountSettingsModal from "../components/AccountSettingsModal";

import { settingsReducer } from "../reducers/modalReducer";

import { UserAuth } from "../context/AuthContext";
import { useState, useEffect, useReducer } from "react";
import { EmailAuthProvider } from "firebase/auth";
import { deleteAllAccountData } from "../api/api";

const AccountSettings = () => {
  const {
    user,
    updateUserEmail,
    updateUserPassword,
    deleteUserAndAllPosts,
    reAuth,
  } = UserAuth();
  const [submitEdit, setSubmitEdit] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signInError, setSignInError] = useState(false);
  const [userProviderData, setUserProviderData] = useState("");

  const handleError = (err, bool) => {
    const erro = err.toString().slice(25, err.toString().length - 1);
    setErrorMsg(erro);
    setSignInError(bool);
  };

  const [state, settingsDispatch] = useReducer(settingsReducer, {
    settingsType: "",
    active: false,
  });

  const [userEmail, setUserEmail] = useState("");

  const handleReAuthEmail = async (providedP) => {
    try {
      const cred = EmailAuthProvider.credential(user.email, providedP);
      return cred;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setEditSuccess(false);
    setSignInError(false);
  }, [state.active]);

  useEffect(() => {
    if (user === undefined) return;
    setUserEmail(user.email);
    setUserProviderData(user.providerData[0].providerId);
  }, [user, submitEdit]);

  const handleSettingsChangeSubmit = async (newInfo, rePassword) => {
    try {
      if (userProviderData === "password") {
        const cred = await handleReAuthEmail(rePassword);
        await reAuth(cred);
      }

      if (state.settingsType === "email") {
        await updateUserEmail(newInfo);
        setSubmitEdit(!submitEdit);
        setEditSuccess(true);
      }
      if (state.settingsType === "password") {
        await updateUserPassword(newInfo);
        setSubmitEdit(!submitEdit);
        setEditSuccess(true);
      }
      if (state.settingsType === "delete") {
        await deleteAllAccountData(user.uid);
        await deleteUserAndAllPosts();
        setSubmitEdit(!submitEdit);
        setEditSuccess(true);
      }
    } catch (e) {
      console.log(e);
      handleError(e, true);
    }
  };
  console.log(user);
  return (
    <section className="pt-10">
      <p className="text-5xl underline underline-offset-3 text-center mb-10 font-light">
        Account Settings
      </p>

      <AccountSettingsModal
        userProviderData={userProviderData}
        errorMsg={errorMsg}
        signInError={signInError}
        settingsDispatch={settingsDispatch}
        modalState={state}
        userEmail={userEmail}
        handleSettingsChangeSubmit={handleSettingsChangeSubmit}
        editSuccess={editSuccess}
      />

      <div className="flex justify-around flex-col md:flex-row">
        {" "}
        {userProviderData === "password" && (
          <>
            <div className="text-center my-10">
              <img
                className="md:w-[100px] w-[215px] mx-auto my-10"
                src="/imgs/emailChange.svg"
                alt="Change Email Icon"
              />{" "}
              <button
                onClick={() => settingsDispatch({ type: "EMAIL" })}
                className="bg-sky-500 w-full md:w-[225px] md:px-5 text-xl py-3 rounded-sm hover:bg-sky-900"
              >
                Change Email
              </button>
            </div>

            <div className="text-center my-10">
              <img
                className="md:w-[100px] w-[215px] mx-auto my-10"
                src="/imgs/passwordChange.svg"
                alt="Change Password Icon"
              />
              <button
                onClick={() => settingsDispatch({ type: "PASSWORD" })}
                className="bg-sky-500 w-full md:w-[225px] md:px-5 text-xl  py-3 rounded-sm  hover:bg-sky-900"
              >
                Change Password
              </button>
            </div>
          </>
        )}
        <div className="text-center my-10">
          <img
            className="md:w-[115px] w-[215px] pl-[32px] md:pl-[17px] mx-auto my-10"
            src="/imgs/deleteAccount.svg"
            alt="Delete Account Icon"
          />
          <button
            onClick={() => settingsDispatch({ type: "DELETE" })}
            className="bg-sky-500 w-full md:w-[225px] md:px-5 text-xl py-3 mt-[2px] rounded-sm hover:bg-sky-900"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
