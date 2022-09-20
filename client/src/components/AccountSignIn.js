import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const AccountSignIn = ({ handleActiveSignIn, activeSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [signInError, setSignInError] = useState(false);
  const [emailCheckPassReset, setEmailCheckPassReset] = useState(false);

  const navigate = useNavigate();


  const { logInUser, passwordReset } = UserAuth();

  const handlePasswordReset = async () => {
    if (email === "" || email === undefined) {
      setEmailCheckPassReset(true);
      return;
    }
    try {
      await passwordReset(email);
      setEmailCheckPassReset(false);
      setErrorMsg(
        "Please Check Your Email or Spam Folder For Password Reset Email"
      );
      setSignInError(true);
    } catch (err) {
      console.log(err);
      const erro = err.toString().slice(25, err.toString().length - 1);
      setErrorMsg(erro);
      setSignInError(true);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      await logInUser(email, password);
      setSignInError(false);
      setErrorMsg("");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      const erro = err.toString().slice(25, err.toString().length - 1);
      setErrorMsg(erro);
      setSignInError(true);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center py-2 w-full">
      <div className="m-1 w-full text-center">
        {activeSignUp ? (
          <button
            onClick={handleActiveSignIn}
            className="text-black underline underline-offset-0 text-center w-full"
          >
            Already Have An Account? Sign In Here
          </button>
        ) : (
          <>
            <p className="text-black text-2xl border-b pb-2 w-3/4 mx-auto text-center">
              Sign In
            </p>
            {signInError && (
              <p className="text-red-500 bg-white absolute font-thin w-full translate-x-[-50%] left-[50%]">
                {errorMsg}
              </p>
            )}
          </>
        )}
      </div>
      <form
        onSubmit={(e) => handleSignInSubmit(e)}
        className="text-black w-3/4"
      >
        <div className="flex flex-col mt-2 py-2">
          <label htmlFor="inemail" className="text-black">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={
              emailCheckPassReset
                ? "shadow-inner p-1 rounded-sm text-black my-1 border border-red-500"
                : "shadow-inner p-1 rounded-sm text-black my-1 border"
            }
            id="inemail"
            type="email"
            placeholder={
              emailCheckPassReset
                ? "ENTER EMAIL FOR PASSWORD RESET"
                : "Supplies@BorrowAPencil.org"
            }
          />
        </div>
        <div className="flex flex-col mb-1 py-2">
          <label htmlFor="inpassword" className="text-black">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-inner p-1 rounded-sm text-black my-1 border"
            id="inpassword-retype"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="border py-2 rounded-sm w-full my-1 bg-sky-500 hover:bg-sky-900 hover:text-white">
          Sign In
        </button>
      </form>
      <button
        onClick={() => handlePasswordReset()}
        className="text-black mt-2 hover:underline underline-offset-2"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default AccountSignIn;
