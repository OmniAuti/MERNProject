import firebaseApp from "../firebase";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  collection,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import ChatBoxInputContainer from "../components/ChatBoxInputContainer";
import ChatMessagesAside from "../components/ChatMessagesAside";

import { useEffect, useState } from "react";
export const Messaging = ({modalDispatch}) => {
  const [msgObjSubmit, setMsgObjSubmit] = useState({
    time: "",
    message: "",
  });
  const [currentMsgs, setCurrentMsgs] = useState([]);
  const [allDocumentsData, setAllDocumentsData] = useState([]);

  const { user } = UserAuth();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    if (!user) return;
    getMessageArray();
  }, [user]);

  const getMessageArray = async () => {
    var arrHolder = []
    await getDocs(collection(db, user.uid)).then((res) => {
      res.forEach((msg) => {
        arrHolder.push(msg.data());
      });
      setAllDocumentsData(arrHolder.sort((a,b) => a.timeFirstInitiated - b.timeFirstInitiated))
    });

    handleDisplayMessages(arrHolder[0].messages)
  };

  const handleDisplayMessages = (data) => {
    setCurrentMsgs(data)
  }

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
        doc(
          db,
          `${user.uid}`,
          "K6latzvX3OQs4x6OOT3zOVddje93-633072bab82f285c13bf4805"
        ),
        {
          messages: arrayUnion(msgObjSubmit),
        }
      );
      setMsgObjSubmit({
        time: "",
        message: "",
      });
    } catch (e) {
      console.log(e);
    }
    await getMessageArray();
  };

  return (
    <section className="h-screen w-full flex items-center justify-center min-h-[550px]">
      <ChatBoxInputContainer
        user={user}
        msgObjSubmit={msgObjSubmit}
        currentMsgs={currentMsgs}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <ChatMessagesAside handleDisplayMessages={handleDisplayMessages} modalDispatch={modalDispatch} allDocumentsData={allDocumentsData} />
    </section>
  );
};

export default Messaging;
