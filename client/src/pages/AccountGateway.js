import { useState } from "react";
import AccountSignUp from "../components/AccountSignUp";
import AccountSignIn from "../components/AccountSignIn";

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
    <section className="flex items-center justify-center flex-col pt-16">
      <div
        className={
          activeSignUp
            ? "mt-16  transition-[height] duration-500 bg-white w-96 py-2 rounded-sm relative h-[440px] overflow-hidden"
            : "mt-16   transition-[height] duration-500 bg-white w-96 py-2 rounded-sm relative h-[360px] overflow-hidden"
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
    </section>
  );
};

export default AccountGateway;
