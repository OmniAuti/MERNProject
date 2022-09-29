import firebaseApp from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";

export const Messaging = () => {
  const [msgObj, setMsgObj] = useState({
    time: "",
    uidInitiated: "",
    uidReceived: "",
    postId: "",
    message: "",
  });

  const { user } = UserAuth();
  const db = getFirestore(firebaseApp);

  //   const demoDoc = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, user.uid), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   };

  //   const readDoc = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "users"));
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  const handleSubmit = async (e) => {
    try {
      console.log("ok");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="h-screen w-full pt-[25px]">
      <div className="bg-sky-500 mx-auto rounded-md w-[500px] h-[500px] p-1 overflow-hidden">
        <div className="w-full bg-white rounded-md h-[432px] border border-transparent border-stone-900 ">
          Chat
        </div>
        <div className="bg-sky-500 w-full h-[60px] rounded-b-md overflow-hidden">
          <form
            className="flex items-center justify-around h-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              className="w-3/4 h-[45px] rounded-md text-black pl-2 border border-stone-900 focus:outline-none"
            />
            <input
              type="submit"
              value="Send"
              className="bg-slate-500 h-[45px] rounded-md w-[100px] border border-stone-900 hover:bg-slate-900 hover:cursor-pointer active:scale-95"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Messaging;
