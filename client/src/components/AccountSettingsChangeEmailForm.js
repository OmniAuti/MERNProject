import { useState } from "react";

const AccountSettingsChangeEmailForm = ({ handleSettingsChangeSubmit }) => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await handleSettingsChangeSubmit(newEmail, confirmPassword);
      setNewEmail("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="h-full text-black" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="newEmail" className="pl-2 text-black">
        Enter New Email
      </label>
      <input
        required
        id="newEmail"
        className="block my-1 mb-3 p-1 w-full border text-center rounded-md text-black"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        type="email"
        placeholder="New Email"
      />
      <label className="pl-2 text-black">Re-enter Password</label>
      <input
        required
        type="password"
        className="block text-black my-1 mb-3 p-1 w-full border text-center rounded-md "
        placeholder="Validation"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        className="bg-sky-500 w-full h-10 my-2 text-black rounded-sm hover:bg-sky-600 hover:text-white cursor-pointer"
        type="submit"
        value="Submit Changes"
      />
    </form>
  );
};

export default AccountSettingsChangeEmailForm;
