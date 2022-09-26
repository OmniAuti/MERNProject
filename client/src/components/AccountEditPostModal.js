import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Loading from "./Loading";

import ModalEditAsk from "./ModalEditAsk";
import ModalEditOffer from "./ModalEditOffer";

const AccountEditPostModal = ({
  data,
  activeModal,
  handleCloseModal,
  handleOpenModal,
  modalLoaded,
  handleItemRefreshAfterEdit,
  handlePostFailure
}) => {
  var cardBgColor;
  switch (data.type) {
    // THINGS THAT MARK OR WRITE

    case "pencil":
      cardBgColor = "#fecaca";
      break;
    case "pen":
      cardBgColor = "#fecaca";
      break;
    case "highlighter":
      cardBgColor = "#fecaca";
      break;
    case "marker":
      cardBgColor = "#fecaca";
      break;
    case "colored pencil":
      cardBgColor = "#fecaca";
      break;
    case "crayon":
      cardBgColor = "#fecaca";
      break;
    case "paint brush":
      cardBgColor = "#fecaca";
      break;
    case "highlighter":
      cardBgColor = "#fecaca";
      break;
    // HOLDERS OF SUPPLIES
    case "binder":
      cardBgColor = "#fef08a";
      break;
    case "folder":
      cardBgColor = "#fef08a";
      break;
    case "pencil pouch/case":
      cardBgColor = "#fef08a";
      break;
    case "lunchbox":
      cardBgColor = "#fef08a";
      break;
    //PAPER
    case "notebook":
      cardBgColor = "#bae6fd";
      break;
    case "journal":
      cardBgColor = "#bae6fd";
      break;
    case "colored paper":
      cardBgColor = "#bae6fd";
      break;
    case "graphing paper":
      cardBgColor = "#bae6fd";
      break;
    case "sticky note":
      cardBgColor = "#bae6fd";
      break;
    case "notecard":
      cardBgColor = "#bae6fd";
      break;
    // STUDY MATERIAL
    case "flashcard":
      cardBgColor = "#bbf7d0";
      break;
    case "miscellaneous study material":
      cardBgColor = "#bbf7d0";
      break;
    //BOOKS
    case "book":
      cardBgColor = "#1e293b";
      break;
    case "miscellaneous books":
      cardBgColor = "#1e293b";
      break;
    // TOOLS
    case "ruler":
      cardBgColor = "#fed7aa";
      break;
    case "calculator":
      cardBgColor = "#fed7aa";
      break;
    case "protractor":
      cardBgColor = "#fed7aa";
      break;
    // BACKPACK
    case "backpack":
      cardBgColor = "#e9d5ff";
      break;
    default:
      cardBgColor = "#fff";
      break;
  }

  const [editSaved, setEditSaved] = useState(false);
  const [showbtn, setShowBtn] = useState(true)

  const { user } = UserAuth();

  useEffect(() => {
    if (data.length === 0 || data === undefined) return;
    if (Object.values(data).length <= 0) return;
    handleOpenModal();
  }, [data]);

  useEffect(() => {
    if (activeModal === false) {
      setEditSaved(false);
    }
  }, [activeModal]);

  const handleEditSuccess = () => {
    setEditSaved(true);
  };

  const handleShowBtn = (bool) => {
    setShowBtn(bool)
  }

  return (
    <div
      className={
        activeModal
          ? "fixed bg-black/75 z-50 w-full h-full top-0 left-0 right-0"
          : "fixed bg-black/75 z-50 w-full h-full top-0 left-0 right-0 hidden"
      }
    >
      {modalLoaded ? (
        <div className="z-50 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-fit max-h-screen overflow-scroll w-screen sm:w-[500px] bg-white px-2 py-2 rounded-md relative text-center"
            style={{ border: `3px solid ${cardBgColor}` }}
          >
            {editSaved ? (
              <div>
                <img
                  className="w-[100px] mx-auto my-5"
                  src="/imgs/postsavedCheck.svg"
                  alt="Post Edit Saved Successfully Icon"
                />
                <p className="text-black text-center text-2xl my-5">
                  Edit Successfully Saved
                </p>
              </div>
            ) : (
              <div className="relative w-full h-fit rounded-md overflow-hidden">
                {data.postType === "offer" ? (
                  <ModalEditOffer
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                    user={user}
                    handleItemRefreshAfterEdit={handleItemRefreshAfterEdit}
                    data={data}
                    handleEditSuccess={handleEditSuccess}
                    handleShowBtn={handleShowBtn}
                    handlePostFailure={handlePostFailure}
                  />
                ) : (
                  <ModalEditAsk
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                    user={user}
                    handleItemRefreshAfterEdit={handleItemRefreshAfterEdit}
                    data={data}
                    handleEditSuccess={handleEditSuccess}
                    handleShowBtn={handleShowBtn}
                    handlePostFailure={handlePostFailure}
                  />
                )}
              </div>
            )}

            {showbtn && <button
              onClick={() => handleCloseModal()}
              className="w-full h-10 bg-slate-300 rounded-sm rounded-bl-sm  hover:bg-slate-400"
            >
              {editSaved ? "Close" : "Discard Changes"}
            </button>}
          </div>
        </div>
      ) : (
        <Loading
          background={"bg-white"}
          outerBackground={"bg-black"}
          fontColor={"text-black"}
        />
      )}
    </div>
  );
};

export default AccountEditPostModal;
