import { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function AccountGoogleReAuthorization(props) {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(props.auth);
    ui.start("#firebaseContModal", {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],

      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: () => {
          props.handleAuthorize();
          return false;
        },
      },
    });
  }, [props.auth]);
  return <div className="bg-white w-full" id="firebaseContModal"></div>;
}

export default AccountGoogleReAuthorization;
