import { useState } from "react";
import AccountSignUp from "../components/AccountSignUp";
import AccountSignIn from "../components/AccountSignIn";
import AccountSignInGoogle from "../components/AccountSignInGoogle";
import { auth } from "../firebase";

const AccountGateway = () => {
  const [activeSignUp, setActiveSignUp] = useState(false);

  const handleActiveSignUp = () => {
    if (activeSignUp === true) {
      return;
    }
    setActiveSignUp(true);
  };
  const handleActiveSignIn = () => {
    if (activeSignUp === false) {
      return;
    }
    setActiveSignUp(false);
  };

  return (
    <section className="flex items-center justify-center flex-col">
      <div
        className={
          activeSignUp
            ? "mt-16  transition-[height] duration-500 bg-white w-screen sm:w-96 py-2 rounded-t-sm relative h-[440px] overflow-hidden"
            : "mt-16   transition-[height] duration-500 bg-white w-screen sm:w-96 py-2 rounded-t-sm relative h-[380px] overflow-hidden"
        }
      >
        <AccountSignIn
          handleActiveSignIn={handleActiveSignIn}
          activeSignUp={activeSignUp}
        />
        <AccountSignUp
          handleActiveSignUp={handleActiveSignUp}
          activeSignUp={activeSignUp}
        />
      </div>
      
      <p className="bg-white relative after:absolute after:h-[1px] after:w-[40%] after:right-[5%] after:top-1/2 after:bg-slate-300 before:absolute before:h-[1px] before:w-[40%] before:left-[5%] before:top-1/2 before:bg-slate-300 text-black w-screen sm:w-96 text-center">or</p><div></div>
      <AccountSignInGoogle auth={auth} />
    </section>
  );
};

export default AccountGateway;
