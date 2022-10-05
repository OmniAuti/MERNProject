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
export const Messaging = ({ modalDispatch }) => {
  const [msgObjSubmit, setMsgObjSubmit] = useState({
    time: "",
    message: "",
  });
  const [currentMsgs, setCurrentMsgs] = useState([]);
  const [allDocumentsData, setAllDocumentsData] = useState([]);
  const [currentDoc, setCurrentDoc] = useState({});

  const { user } = UserAuth();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    if (!user) return;
    getInitialMessageArray();
  }, [user]);

  const getInitialMessageArray = async () => {
    var arrHolder = [];
    try {
      await getDocs(collection(db, user.uid)).then((res) => {
        res.forEach((msg) => {
          arrHolder.push(msg.data());
        });
        setAllDocumentsData(
          arrHolder.sort((a, b) => b.timeFirstInitiated - a.timeFirstInitiated)
        );
      });

      if (arrHolder.length === 0) return;
      handleSetCurrentDoc(arrHolder[0]);
      handleDisplayMessages(arrHolder[0].messages);
    } catch (e) {
      console.error(e);
    }
  };

  const getCurrentMessageArray = async () => {
    try {
      await getDoc(
        doc(
          db,
          user.uid,
          `${currentDoc.postData._uid}-${currentDoc.postData._id}`
        )
      ).then((res) => setCurrentMsgs(res.data().messages));
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisplayMessages = (data) => {
    setCurrentMsgs(data);
  };

  const handleInput = (e) => {
    setMsgObjSubmit({
      ...msgObjSubmit,
      time: Date.now(),
      uidInitiated: user.uid,
      message: e.target.value,
    });
  };

  const handleSetCurrentDoc = (data) => {
    setCurrentDoc(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.uid === currentDoc.postData._uid) {
        //UPDATES CHAT INITIATOR MESSAGE ARRAY
        await updateDoc(
          doc(
            db,
            `${currentDoc.messages[0].uidInitiated}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          ),
          {
            messages: arrayUnion(msgObjSubmit),
          }
        );
        // UPDATES POST USER MESSAGE ARRAY
        await updateDoc(
          doc(
            db,
            `${user.uid}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          ),
          {
            messages: arrayUnion(msgObjSubmit),
          }
        );
      } else if (user.uid === currentDoc.messages[0].uidInitiated) {
        await updateDoc(
          doc(
            db,
            `${user.uid}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          ),
          {
            messages: arrayUnion(msgObjSubmit),
          }
        );
        await updateDoc(
          doc(
            db,
            `${currentDoc.postData._uid}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          ),
          {
            messages: arrayUnion(msgObjSubmit),
          }
        );
      }
      setMsgObjSubmit({
        time: "",
        message: "",
      });
      await getCurrentMessageArray();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="h-screen w-full flex flex-col items-center  min-h-[550px]">
      <h1 className="text-3xl my-10">Message Center</h1>
      <div className="flex items-center justify-center">
      <ChatBoxInputContainer
        user={user}
        msgObjSubmit={msgObjSubmit}
        currentMsgs={currentMsgs}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <ChatMessagesAside
        currentDoc={currentDoc}
        handleSetCurrentDoc={handleSetCurrentDoc}
        handleDisplayMessages={handleDisplayMessages}
        modalDispatch={modalDispatch}
        allDocumentsData={allDocumentsData}
      />
      </div>
    </section>
  );
};

export default Messaging;
