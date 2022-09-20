import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const AccountNeedsVerification = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false)

  const { reSendEmailVerification, user } = UserAuth();
  const handleReSendEmailVerification = async () => {
    await reSendEmailVerification();
    setEmailSent(true);
  };

useEffect(() => {
    if (user === undefined || !user) return
    setVerified(user.emailVerified)
}, [user])

  return (
    <section className="flex justify-center items-center h-screen w-screen">
      {verified === true ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          {emailSent ? (
            <div className="bg-white w-[500px] h-fit p-5 text-center rounded-md">
              <p className="text-black">Email Verification Sent.</p>
              <p className="text-black my-5">
                Please check your email or spam folder and refresh your browser after verifying!
              </p>
              <Link
                to="/dashboard"
                className="text-black rounded-sm bg-sky-500 hover:bg-sky-900 hover:text-white w-full px-5 py-2"
              >
                Return To Account Dashboard
              </Link>
            </div>
          ) : (
            <div className="bg-white w-[500px] h-fit p-5 text-center rounded-md">
              <h2 className="text-black text-2xl">
                You must verifiy your email before being able to offer, ask, or
                contact someone about supplies.
              </h2>
              <p className="text-black mt-5">
                Please check your email or spam folder and refresh your browser after verifying!
              </p>
              <button
                onClick={handleReSendEmailVerification}
                className="text-black rounded-sm mt-10 bg-sky-500 hover:bg-sky-900 hover:text-white w-full py-2"
              >
                Resend Verification Email
              </button>
             <Link to="/dashboard"><p className="w-full text-black bg-slate-400 rounded-sm mt-2 h-10 flex items-center justify-center">Account Dashboard</p></Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AccountNeedsVerification;
