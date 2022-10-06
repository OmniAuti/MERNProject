
const ChatAsidePostContainer = ({
  data,
  modalDispatch,
  currentDoc,
  handleDelete,
  getAsideButtonChatMsgs,
}) => {
  const handleMatchChatDataWithPost = async (data) => {
    getAsideButtonChatMsgs(data)
  };

  const handleDeleteChat = (chatData) => {
    handleDelete(chatData);
  };

  return (
    <div
      className={
        currentDoc.postData._id === data._id
          ? " rounded-md w-[270px] min-w-[270px] h-[118px] mx-1 md:mx-0 bg-white border-4 shadow-md shadow-black border-sky-900 overflow-hidden my-1"
          : "rounded-md w-[270px] min-w-[270px] h-[112px]  mx-1 md:mx-0 bg-white border border-stone-900 overflow-hidden my-1"
      }
    >
      <div className="px-2 py-1">
        <p className="text-black ">
          {" "}
          Supplies: {data.type.slice(0, 1).toUpperCase() + data.type.slice(1)}
        </p>
        <p className="text-black">Quantity: {data.quantity}</p>
        <p className="text-black">
          {" "}
          Location:{" "}
          {data.location.slice(0, 1).toUpperCase() + data.location.slice(1)}
        </p>
      </div>
      <div className="flex h-[30px] overflow-hidden">
        {data.postType === "offer" ? (
          <button
            onClick={() =>
              modalDispatch({
                type: "MODAL-offer",
                payload: data._id,
              })
            }
            className="text-black w-1/3 hover:text-white bg-sky-200 hover:bg-sky-500"
          >
            See Post
          </button>
        ) : (
          <button
            onClick={() =>
              modalDispatch({
                type: "MODAL-ask",
                payload: data._id,
              })
            }
            className="text-black w-1/3 hover:text-white bg-sky-200 hover:bg-sky-500"
          >
            See Post
          </button>
        )}
        <button
          onClick={() => handleMatchChatDataWithPost(data)}
          className="text-black w-1/3 bg-gray-200 hover:bg-gray-500 hover:text-white"
        >
          See Chat
        </button>
        <button
          onClick={() => handleDeleteChat(currentDoc)}
          className="text-black w-1/3 hover:text-white bg-red-200 hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ChatAsidePostContainer;
