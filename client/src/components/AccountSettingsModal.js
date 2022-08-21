import AccountSettingsChangeEmailForm from "./AccountSettingsChangeEmailForm";
import AccountSettingsChangePasswordForm from "./AccountSettingsChangePasswordForm";
import AccountSettingsDeleteUserForm from "./AccountSettingsDeleteUserForm";

const AccountSettingsModal = ({
  modalState,
  settingsDispatch,
  userEmail,
  handleSettingsChangeSubmit,
  editSuccess,
}) => {
  return (
    <div
      className={
        modalState.active
          ? "fixed bg-black/50 z-40 w-full h-full top-0 left-0 right-0"
          : "fixed bg-black/50 z-40 w-full h-full top-0 left-0 right-0 hidden"
      }
    >
      <div className="z-50 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-fit p-5 pt-0  pb-2 w-[400px] bg-white rounded-tr-sm rounded-tl-sm relative">
          <div className="relative w-full h-fit min-h-[300px] rounded-md overflow-hidden py-2">
            {editSuccess ? (
              <div>
                <img
                  className="w-[100px] mx-auto my-10"
                  src="/imgs/postsavedCheck.svg"
                  alt="Post Edit Saved Successfully Icon"
                />
                <p className="text-black text-center text-2xl my-5">
                  Change Successful!
                </p>
                <button
                  onClick={() => settingsDispatch({ type: "CLOSE" })}
                  className="w-full h-10 bg-gray-400 rounded-sm rounded-bl-sm hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className=" min-h-52 w-full relative overflow-hidden">
                <h2 className="text-black text-center text-2xl underline underline-offset-1 mb-2">
                  {modalState.settingsType === "email" && "Change Email"}
                  {modalState.settingsType === "password" && "Change Password"}
                  {modalState.settingsType === "delete" && "Delete Account"}
                </h2>
                {modalState.settingsType === "delete" && (
                  <p className="text-black text-center ">
                    Are you sure you want delete your account and all your
                    posts?
                  </p>
                )}
                {modalState.settingsType === "email" && (
                  <p className="text-black text-center my-2">
                    Current Email: {userEmail}
                  </p>
                )}
                {modalState.settingsType === "email" && (
                  <AccountSettingsChangeEmailForm
                    handleSettingsChangeSubmit={handleSettingsChangeSubmit}
                    userEmail={userEmail}
                  />
                )}
                {modalState.settingsType === "password" && (
                  <AccountSettingsChangePasswordForm
                    handleSettingsChangeSubmit={handleSettingsChangeSubmit}
                  />
                )}
                {modalState.settingsType === "delete" && (
                  <AccountSettingsDeleteUserForm
                    handleSettingsChangeSubmit={handleSettingsChangeSubmit}
                  />
                )}
                <button
                  onClick={() => settingsDispatch({ type: "CLOSE" })}
                  className="w-full h-10 bg-gray-400 rounded-sm rounded-bl-sm hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsModal;