import { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from 'firebase/compat/app'


function AccountSignInGoogle(props) {

    

    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(props.auth)
        ui.start('#firebaseCont', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              ],
            signInFlow: 'popup',
            signInSuccessUrl: '/dashboard'
        })
    }, [props.auth])
  return <div className="bg-white w-96" id="firebaseCont"></div>;
}

export default AccountSignInGoogle;
