import firebaseApp from "../firebase";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  collection,
  deleteDoc,
  setDoc,
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
      const collectionCheck = await getDocs(collection(db, user.uid));
      collectionCheck.forEach((msg) => {
        if (msg.exists()) {
          arrHolder.push(msg.data());
          setAllDocumentsData(
            arrHolder.sort(
              (a, b) => b.timeFirstInitiated - a.timeFirstInitiated
            )
          );
        } 
      });
      if (arrHolder.length === 0) {
        handleSetCurrentDoc([]);
        handleDisplayMessages([]);
        setAllDocumentsData([])
        return;
      }
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
        const docCheckOne = await getDoc(
          doc(
            db,
            `${currentDoc.messages[0].uidInitiated}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          )
        );
        // CHECK FOR EXISTING DOCUMENT
        if (docCheckOne.exists()) {
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
        } else {
          await setDoc(
            doc(
              db,
              `${currentDoc.messages[0].uidInitiated}`,
              `${currentDoc.postData._uid}-${currentDoc.postData._id}`
            ),
            msgObjSubmit
          );
        }
        const docCheckTwo = await getDoc(
          doc(
            db,
            `${user.uid}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          )
        );
        if (docCheckTwo.exists()) {
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
        } else {
          await setDoc(
            doc(
              db,
              `${user.uid}`,
              `${currentDoc.postData._uid}-${currentDoc.postData._id}`
            ),
            msgObjSubmit
          );
        }
      } else if (user.uid === currentDoc.messages[0].uidInitiated) {
        const docCheckOne = await getDoc(
          doc(
            db,
            `${user.uid}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          )
        );
        if (docCheckOne.exists()) {
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
        } else {
          await setDoc(
            doc(
              db,
              `${user.uid}`,
              `${currentDoc.postData._uid}-${currentDoc.postData._id}`
            ),
            msgObjSubmit
          );
        }

        const docCheckTwo = await getDoc(
          doc(
            db,
            `${currentDoc.postData._uid}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          )
        );
        if (docCheckTwo.exists()) {
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
        } else {
          await setDoc(
            doc(
              db,
              `${currentDoc.postData._uid}`,
              `${currentDoc.postData._uid}-${currentDoc.postData._id}`
            ),
            msgObjSubmit
          );
        }
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
  const handleDelete = async (data) => {
    console.log();
    try {
      await deleteDoc(
        doc(db, user.uid, `${data.postData._uid}-${data.postData._id}`)
      );
      getInitialMessageArray();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="h-screen w-full flex flex-col min-h-[600px]">
      <h1 className="text-3xl my-10 text-center">Message Center</h1>
      <div className="flex flex-col-reverse md:flex-row items-start z-40 md:mx-auto -ml-5">
        <ChatBoxInputContainer
          user={user}
          msgObjSubmit={msgObjSubmit}
          currentMsgs={currentMsgs}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        />
        <ChatMessagesAside
          handleDelete={handleDelete}
          getInitialMessageArray={getInitialMessageArray}
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
