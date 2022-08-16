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
}) => {
  const { user } = UserAuth();

  useEffect(() => {
    if (data.length === 0 || data === undefined) return;
    if (Object.values(data).length <= 0) return;
    handleOpenModal();

    return () => {
      console.log("cleared");
    };
  }, [data]);

  return (
    <div
      className={
        activeModal
          ? "fixed bg-black/50 z-40 w-full h-full top-0 left-0 right-0"
          : "fixed bg-black/50 z-40 w-full h-full top-0 left-0 right-0 hidden"
      }
    >
      {modalLoaded ? (
        <div className="z-50 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-fit w-[500px] bg-white pb-2 rounded-tr-sm rounded-tl-sm relative text-center">
            <div className="relative w-full h-fit rounded-md overflow-hidden">
              {data.postType === 'offer' ? <ModalEditOffer handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} user={user} handleItemRefreshAfterEdit={handleItemRefreshAfterEdit} data={data}/>: <ModalEditAsk handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} user={user} handleItemRefreshAfterEdit={handleItemRefreshAfterEdit} data={data}/>}
            </div>

            <button
              onClick={() => handleCloseModal()}
              className="h-9 bg-gray-400 rounded-md w-1/2 hover:bg-gray-700"
            >
              Discard Changes
            </button>
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
