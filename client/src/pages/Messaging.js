import firebaseApp from "../firebase";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import ChatBoxInputContainer from "../components/ChatBoxInputContainer";
import ChatMessagesAside from "../components/ChatMessagesAside";

import { useEffect, useState } from "react";
export const Messaging = () => {
  const [msgObjSubmit, setMsgObjSubmit] = useState({
    time: "",
    message: "",
  });
  const [currentMsgs, setCurrentMsgs] = useState({});
  const [newPull, setNewPull] = useState(false);

  const { user } = UserAuth();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    if (!user) return;
    getMessageArray();
  }, [user]);

  const getMessageArray = async () => {
    // GET THIS TO PULL RIGHT NAME
    const docRef = doc(db, user.uid, "K6latzvX3OQs4x6OOT3zOVddje93-633072bab82f285c13bf4805");
    const docData = await getDoc(docRef);
    setCurrentMsgs(docData.data())
  };


  const handleInput = (e) => {
    setMsgObjSubmit({
      ...msgObjSubmit,
      time: Date.now(),
      uidInitiated: user.uid,
      message: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    // NEED TO GET INFORMATION FROM POST TO COMPLETE THIS LIKE DOC NAME WHICH IS CONTACTED UID AND POSTID

    e.preventDefault();
    try {
      await updateDoc(
        doc(db, `${user.uid}`, "K6latzvX3OQs4x6OOT3zOVddje93-633072bab82f285c13bf4805"), {
          messages: arrayUnion(msgObjSubmit),
        },
      );
      setMsgObjSubmit({
        time: "",
        message: "",
      });
    } catch (e) {
      console.log(e);
    }
    await getMessageArray()
  };

  return (
    <section className="h-screen w-full flex items-center min-h-[550px]">
      <ChatBoxInputContainer
        user={user}
        msgObjSubmit={msgObjSubmit}
        currentMsgs={currentMsgs}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <ChatMessagesAside/>
    </section>
  );
};

export default Messaging;
