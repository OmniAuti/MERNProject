import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import AccountGoogleReAuthorization from "./AccountGoogleReAuthorization";
import { auth } from "../firebase";

const AccountSettingsDeleteUserForm = ({ handleSettingsChangeSubmit }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [radio, setRadio] = useState("no");
  const [showNo, setShowNo] = useState(false);

  const { user } = UserAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (radio === "no") {
      setShowNo(true);
      return;
    } else if (radio === "yes") {
      try {
        await handleSettingsChangeSubmit("Nothing to pass", confirmPassword);
        setConfirmPassword("");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      {showNo && (
        <p className="text-red-500 text-center font-light">
          Confirm by selecting <u className="text-red-500">Yes</u>
        </p>
      )}
      <form className="h-full text-black" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center justify-center my-2">
          <label htmlFor="yes" className="mx-2 cursor-pointer text-black">
            Yes
          </label>
          <input
            onChange={(e) => setRadio(e.target.value)}
            value="yes"
            name="delete-confirm"
            id="yes"
            type="radio"
            className="mr-5 cursor-pointer"
          />
          <label htmlFor="no" className="mx-2 ml-5 text-black cursor-pointer">
            No
          </label>

          <input
            required
            defaultChecked
            onChange={(e) => setRadio(e.target.value)}
            value="no"
            name="delete-confirm"
            id="no"
            type="radio"
            className="cursor-pointer"
          />
        </div>
        {user.providerData[0].providerId === "password" && (
          <>
            <label className="pl-2 text-black">Re-enter Password</label>
            <input
              required
              type="password"
              className="block text-black my-1 mb-3 p-1 w-full border text-center rounded-md "
              placeholder="Validation"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <input
          className={
            user.providerData[0].providerId !== "password"
              ? "bg-sky-500 w-full h-10 my-2 mt-10 text-black rounded-sm hover:bg-sky-900 cursor-pointer"
              : "bg-sky-500 w-full h-10 my-2 text-black rounded-sm hover:bg-sky-900 cursor-pointer"
          }
          type="submit"
          value="Delete Account"
        />
      </form>
    </>
  );
};

export default AccountSettingsDeleteUserForm;
