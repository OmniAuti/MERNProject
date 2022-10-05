import "./App.css";
// FUNCTIONALITY
import { Routes, Route } from "react-router-dom";
import { useReducer, useState, useEffect, useCallback } from "react";
// ROUTER
import { useLocation, useNavigate } from "react-router-dom";
// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleItemFocusModal from "./components/SingleItemFocusModal";
import AccountEditPostModal from "./components/AccountEditPostModal";
import DeleteSinglePostModal from "./components/DeleteSinglePostModal";
import UnSuccessfulPostModal from "./components/UnSuccessfulPostModal";
//PAGES
import Home from "./pages/Home";
import Borrow from "./pages/Borrow";
import Asked from "./pages/Asked";
import AskFor from "./pages/AskFor";
import AboutPage from "./pages/AboutPage";
import Offer from "./pages/Offer";
import AccountGateway from "./pages/AccountGateway";
import AccountDashboard from "./pages/AccountDashboard";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import ProtectedUserRouteVerified from "./components/ProtectedUserRouteVerified";
import ProtectedUserRouteLoggedIn from "./components/ProtecedUserRouteLoggedIn";
import AccountSettings from "./pages/AccountSettings";
import AccountNeedsVerification from "./pages/AccountNeedsVerification";
import ErrorPage from "./pages/ErrorPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Messaging from "./pages/Messaging";
//WRAP FOR SCROLL TO TOP ON NEW ROUTE
import ScrollToTop from "./components/ScrollToTop";
// REDUCERS
import { modalReducer, inquireReducer } from "./reducers/modalReducer";
//CONTEXT IMPORT
import AuthContextProvider from "./context/AuthContext";
// API CALLS
import { getSingleItem, getSingleItemAsk } from "./api/api";
// FIREBASE DB
import firebaseApp from "./firebase";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

function App() {
  // REDUCERS ---------------------------------------------------
  const [state, modalDispatch] = useReducer(modalReducer, {
    modalId: "",
    active: false,
    modalType: "",
  });
  const [stateInquire, inquireDispatch] = useReducer(inquireReducer, {
    postData: {},
    userData: {},
  });
  // STATE ---------------------------------------------------
  const [modalDataSingleFocus, setModalDataSingleFocus] = useState([]);
  const [modalDataEdit, setModalDataEdit] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);
  const [activeModalDelete, setActiveModalDelete] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);
  const [modalLoadedEdit, setModalLoadedEdit] = useState(false);
  const [bookmarkRefresh, setBookmarkRefresh] = useState(false);
  const [postFailure, setPostFailure] = useState(false);
  const [postFailureMsg, setPostFailureMsg] = useState(false);
  const [refreshAfterEdit, setRefreshAfterEdit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // USE EFFECTS -----------------------------------------------------
  // CREATED INQUIRE IN FIRESTORE
  useEffect(() => {
    if (stateInquire.postData === {}) return;
    handleInquire(stateInquire.userData, stateInquire.postData);
  }, [stateInquire.postData]);

  // USED TO CLOSE MODAL ON PAGE CHANGE
  useEffect(() => {
    handleCloseModal();
  }, [location.pathname]);
  // REFRESH THE DATA TO SHOW CHANGING BOOKMARK
  useEffect(() => {
    if (state.modalId.length <= 0) return;
    handleModalData(state.modalId);
  }, [state.active, bookmarkRefresh]);

  const handleModalBookmark = () => {
    setBookmarkRefresh(!bookmarkRefresh);
  };

  const handleModalData = async (id) => {
    try {
      if (state.modalType === "singleFocusOffer") {
        await getSingleItem(id)
          .then((res) => setModalDataSingleFocus(res.data))
          .catch((err) => {
            console.log(err);
            setModalLoaded(false);
            handlePostFailure(err);
          });
        setActiveModal(true);
      } else if (state.modalType === "singleFocusAsk") {
        await getSingleItemAsk(id)
          .then((res) => setModalDataSingleFocus(res.data))
          .catch((err) => {
            console.log(err);
            setModalLoaded(false);
            handlePostFailure(err);
          });
        setActiveModal(true);
      } else if (state.modalType === "accountEditOffer") {
        await getSingleItem(id)
          .then((res) => setModalDataEdit(res.data))
          .catch((err) => {
            console.log(err);
            setModalLoaded(false);
            handlePostFailure(err);
          });
        setActiveModalEdit(true);
      } else if (state.modalType === "accountEditAsk") {
        await getSingleItemAsk(id)
          .then((res) => setModalDataEdit(res.data))
          .catch((err) => {
            console.log(err);
            setModalLoaded(false);
            handlePostFailure(err);
          });
        setActiveModalEdit(true);
      } else if (state.modalType === "deleteSinglePost") {
        setActiveModalDelete(true);
      }
    } catch (e) {
      setModalLoaded(false);
      handlePostFailure(e);
      console.log(e);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(false);
    setActiveModalEdit(false);
    setModalLoaded(false);
    setModalLoadedEdit(false);
    setActiveModalDelete(false);
    setPostFailure(false);
  };

  const handleOpenModal = () => {
    setModalLoaded(true);
  };
  const handleOpenModalEdit = () => {
    setModalLoadedEdit(true);
  };

  const handleItemRefreshAfterEdit = () => {
    setRefreshAfterEdit(!refreshAfterEdit);
  };

  const handlePostFailure = (err) => {
    setPostFailureMsg(err.toString());
    setPostFailure(true);
  };
  // THIS IS FOR THE MODAL INQUIRE CHAT FROM THE FIREBASE STORE ---------------
  const db = getFirestore(firebaseApp);

  const handleInquire = async (user, data) => {
    try {
      const docRef = doc(db, user.uid, `${data._uid}-${data._id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        navigate("/message-center");
        return;
      } else {
        if (data.postType === "ask") {
          //  CHAT INTIATOR  -----------------------------------------------------
          await setDoc(doc(db, user.uid, `${data._uid}-${data._id}`), {
            messages: [
              {
                message: "Hello, I'm interested in your post!",
                time: Date.now(),
                uidInitiated: user.uid,
              },
            ],
            timeFirstInitiated: Date.now(),
            postData: {
              condition: data.condition,
              specify: data.specify,
              location: data.location,
              postType: data.postType,
              quantity: data.quantity,
              type: data.type,
              who: data.who,
              zipcode: data.zipcode,
              _id: data._id,
              _uid: data._uid,
            },
          });
          // CHAT RECIEVED  ----------------------------------------------
          await setDoc(doc(db, data._uid, `${data._uid}-${data._id}`), {
            messages: [
              {
                message: "Hello! I'm interested in your post",
                time: Date.now(),
                uidInitiated: user.uid,
              },
            ],
            timeFirstInitiated: Date.now(),
            postData: {
              condition: data.condition,
              specify: data.specify,
              location: data.location,
              postType: data.postType,
              quantity: data.quantity,
              type: data.type,
              who: data.who,
              zipcode: data.zipcode,
              _id: data._id,
              _uid: data._uid,
            },
          });
        } else if (data.postType === "offer") {
          // CHAT INTIATOR  --------------------------------------------
          await setDoc(doc(db, user.uid, `${data._uid}-${data._id}`), {
            messages: [
              {
                message: "Hello! I'm interested in your post",
                time: Date.now(),
                uidInitiated: user.uid,
              },
            ],
            timeFirstInitiated: Date.now(),
            postData: {
              condition: data.condition,
              description: data.description,
              location: data.location,
              photoInfo: data.photoInfo,
              postType: data.postType,
              quantity: data.quantity,
              type: data.type,
              zipcode: data.zipcode,
              _id: data._id,
              _uid: data._uid,
            },
          });
          // CHAT RECIEVED  ----------------------------------------------
          await setDoc(doc(db, data._uid, `${data._uid}-${data._id}`), {
            messages: [
              {
                message: "Hello! I'm interested in your post",
                time: Date.now(),
                uidInitiated: user.uid,
              },
            ],
            timeFirstInitiated: Date.now(),
            postData: {
              condition: data.condition,
              description: data.description,
              location: data.location,
              photoInfo: data.photoInfo,
              postType: data.postType,
              quantity: data.quantity,
              type: data.type,
              zipcode: data.zipcode,
              _id: data._id,
              _uid: data._uid,
            },
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <AuthContextProvider>
        <Header />

        <SingleItemFocusModal
          data={modalDataSingleFocus}
          activeModal={activeModal}
          handleModalData={handleModalData}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          modalLoaded={modalLoaded}
          handleModalBookmark={handleModalBookmark}
          handlePostFailure={handlePostFailure}
          inquireDispatch={inquireDispatch}
        />

        <AccountEditPostModal
          data={modalDataEdit}
          activeModal={activeModalEdit}
          handleModalData={handleModalData}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModalEdit}
          modalLoaded={modalLoadedEdit}
          handleItemRefreshAfterEdit={handleItemRefreshAfterEdit}
          handlePostFailure={handlePostFailure}
        />

        <DeleteSinglePostModal
          postId={state}
          handleItemRefreshAfterEdit={handleItemRefreshAfterEdit}
          activeModalDelete={activeModalDelete}
          handleCloseModal={handleCloseModal}
        />

        <UnSuccessfulPostModal
          postFailureMsg={postFailureMsg}
          postFailure={postFailure}
          handleCloseModal={handleCloseModal}
        />

        <main className="App  bg-black h-full min-h-screen w-screen px-5 pb-5 relative">
          <ScrollToTop>
            <Routes>
              <Route
                path="/"
                element={<Home modalDispatch={modalDispatch} />}
              />
              <Route path="/about" element={<AboutPage />} />

              <Route
                path="/borrow"
                element={
                  <Borrow
                    modalDispatch={modalDispatch}
                    handlePostFailure={handlePostFailure}
                  />
                }
              />
              <Route
                path="/account-gateway"
                element={
                  <ProtectedUserRouteLoggedIn>
                    {" "}
                    <AccountGateway />{" "}
                  </ProtectedUserRouteLoggedIn>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedUserRoute>
                    {" "}
                    <AccountDashboard
                      handlePostFailure={handlePostFailure}
                      refreshAfterEdit={refreshAfterEdit}
                      modalDispatch={modalDispatch}
                    />{" "}
                  </ProtectedUserRoute>
                }
              />
              <Route
                path="/account-settings"
                element={
                  <ProtectedUserRoute>
                    <AccountSettings />
                  </ProtectedUserRoute>
                }
              />
              <Route
                path="/message-center"
                element={
                  <ProtectedUserRoute>
                    <Messaging modalDispatch={modalDispatch} />
                  </ProtectedUserRoute>
                }
              />

              <Route
                path="/offer"
                element={
                  <ProtectedUserRoute>
                    {" "}
                    <ProtectedUserRouteVerified>
                      <Offer
                        handlePostFailure={handlePostFailure}
                        refreshAfterEdit={refreshAfterEdit}
                        modalDispatch={modalDispatch}
                      />
                    </ProtectedUserRouteVerified>
                  </ProtectedUserRoute>
                }
              />

              <Route
                path="/asked"
                element={
                  <Asked
                    modalDispatch={modalDispatch}
                    handlePostFailure={handlePostFailure}
                  />
                }
              />

              <Route
                path="/ask-for"
                element={
                  <ProtectedUserRoute>
                    <ProtectedUserRouteVerified>
                      <AskFor
                        handlePostFailure={handlePostFailure}
                        refreshAfterEdit={refreshAfterEdit}
                        modalDispatch={modalDispatch}
                      />
                    </ProtectedUserRouteVerified>
                  </ProtectedUserRoute>
                }
              />
              <Route
                path="/account-needs-verification"
                element={
                  <ProtectedUserRoute>
                    <AccountNeedsVerification />
                  </ProtectedUserRoute>
                }
              />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </ScrollToTop>
        </main>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
