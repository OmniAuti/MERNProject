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

  const getAsideButtonChatMsgs = async (dataDump) => {
    await getDoc(
      doc(db, user.uid, `${dataDump._uid}-${dataDump._id}`)
    ).then((res) => {
     setCurrentMsgs(res.data().messages)
     setCurrentDoc(res.data())
    });
  }

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
        setCurrentDoc([]);
        setCurrentMsgs([]);
        setAllDocumentsData([]);
        return;
      }
      setCurrentDoc(arrHolder[0]);
      setCurrentMsgs(arrHolder[0].messages);
    } catch (e) {
      console.error(e);
    }
  };
  const getCurrentMessageArray = async (dataDump) => {
    try {
      await getDoc(
        doc(
          db,
          user.uid,
          `${dataDump.postData._uid}-${dataDump.postData._id}`
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
            `${currentDoc.uidFirstInitiated}`,
            `${currentDoc.postData._uid}-${currentDoc.postData._id}`
          )
        );
        // CHECK FOR EXISTING DOCUMENT
        if (docCheckOne.exists()) {
          //UPDATES CHAT INITIATOR MESSAGE ARRAY
          await updateDoc(
            doc(
              db,
              `${currentDoc.uidFirstInitiated}`,
              `${currentDoc.postData._uid}-${currentDoc.postData._id}`
            ),
            {
              messages: arrayUnion(msgObjSubmit),
            }
          );
        } else {
          if (currentDoc.postData.postType === "ask") {
            await setDoc(
              doc(
                db,
                `${currentDoc.uidFirstInitiated}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  specify: currentDoc.postData.specify,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  who: currentDoc.postData.who,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          } else if (currentDoc.postData.postType === "offer") {
            // CHAT INTIATOR  --------------------------------------------
            await setDoc(
              doc(
                db,
                `${currentDoc.uidFirstInitiated}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  description: currentDoc.postData.description,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          }
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
          if (currentDoc.postData.postType === "ask") {
            await setDoc(
              doc(
                db,
                `${user.uid}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  specify: currentDoc.postData.specify,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  who: currentDoc.postData.who,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          } else if (currentDoc.postData.postType === "offer") {
            // CHAT INTIATOR  --------------------------------------------
            await setDoc(
              doc(
                db,
                `${user.uid}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  description: currentDoc.postData.description,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          }
        }
      } else if (user.uid === currentDoc.uidFirstInitiated) {
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
          if (currentDoc.postData.postType === "ask") {
            await setDoc(
              doc(
                db,
                `${user.uid}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  specify: currentDoc.postData.specify,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  who: currentDoc.postData.who,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          } else if (currentDoc.postData.postType === "offer") {
            // CHAT INTIATOR  --------------------------------------------
            await setDoc(
              doc(
                db,
                `${user.uid}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  description: currentDoc.postData.description,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          }
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
          if (currentDoc.postData.postType === "ask") {
            await setDoc(
              doc(
                db,
                `${currentDoc.postData._uid}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  specify: currentDoc.postData.specify,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  who: currentDoc.postData.who,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          } else if (currentDoc.postData.postType === "offer") {
            // CHAT INTIATOR  --------------------------------------------
            await setDoc(
              doc(
                db,
                `${currentDoc.postData._uid}`,
                `${currentDoc.postData._uid}-${currentDoc.postData._id}`
              ),
              {
                messages: [msgObjSubmit],
                timeFirstInitiated: currentDoc.timeFirstInitiated,
                uidFirstInitiated: currentDoc.uidFirstInitiated,
                postData: {
                  condition: currentDoc.postData.condition,
                  description: currentDoc.postData.description,
                  location: currentDoc.postData.location,
                  postType: currentDoc.postData.postType,
                  quantity: currentDoc.postData.quantity,
                  type: currentDoc.postData.type,
                  zipcode: currentDoc.postData.zipcode,
                  _id: currentDoc.postData._id,
                  _uid: currentDoc.postData._uid,
                },
              }
            );
          }
        }
      }
      await getCurrentMessageArray(currentDoc);

      setMsgObjSubmit({
        time: "",
        message: "",
      });
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
          modalDispatch={modalDispatch}
          allDocumentsData={allDocumentsData}
          getAsideButtonChatMsgs={getAsideButtonChatMsgs}
        />
      </div>
    </section>
  );
};

export default Messaging;
