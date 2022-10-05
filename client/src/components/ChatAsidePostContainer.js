const ChatAsidePostContainer = ({
  data,
  modalDispatch,
  handleDisplayMessages,
  allDocumentsData,
  handleSetCurrentDoc,
  currentDoc,
}) => {
  const handleMatchChatDataWithPost = async () => {
    var filteredData = allDocumentsData.filter(
      (post) => data._id === post.postData._id
    );
    handleDisplayMessages(filteredData[0].messages);
    handleSetCurrentDoc(filteredData[0]);
  };

  return (
    <div
      className={
        currentDoc.postData._id === data._id
          ? "w-full rounded-md bg-white border-4 shadow-md shadow-black border-sky-900 overflow-hidden my-1"
          : "w-full rounded-md bg-white border border-stone-900 overflow-hidden my-1"
      }
    >
      <div className="p-2 py-1">
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
      <div className="flex">
        {data.postType === "offer" ? (
          <button
            onClick={() =>
              modalDispatch({
                type: "MODAL-offer",
                payload: data._id,
              })
            }
            className="text-black w-1/2 bg-sky-200 hover:bg-sky-500"
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
            className="text-black w-1/2 bg-sky-200 hover:bg-sky-500"
          >
            See Post
          </button>
        )}
        <button
          onClick={() => handleMatchChatDataWithPost()}
          className="text-black w-1/2 bg-gray-200 hover:bg-gray-500"
        >
          See Chat
        </button>
      </div>
    </div>
  );
};

export default ChatAsidePostContainer;
