const ChatAsidePostContainer = ({ data, modalDispatch }) => {
  return (
    <div className="w-full rounded-md bg-white cursor-pointer border border-stone-900 overflow-hidden my-1">
      <div className="p-2 py-1">
        <p className="text-black ">
          {" "}
          Supplies: {data.type.slice(0, 1).toUpperCase() + data.type.slice(1)}
        </p>
        <p className="text-black">Quantity: {data.quantity}</p>
        <p className="text-black">
          {" "}
          Location: {data.location.slice(0, 1).toUpperCase() + data.location.slice(1)}
        </p>
      </div>
      <div className="flex">
   { data.postType === 'offer' ?  <button
          onClick={() =>
            modalDispatch({
              type: "MODAL-offer",
              payload: data._id,
            })
          }
          className="text-black w-1/2 bg-sky-200 hover:bg-sky-500"
        >
          See Post
        </button> : <button
          onClick={() =>
            modalDispatch({
              type: "MODAL-ask",
              payload: data._id,
            })
          }
          className="text-black w-1/2 bg-sky-200 hover:bg-sky-500"
        >
          See Post
        </button>}
        <button className="text-black w-1/2 bg-gray-200 hover:bg-gray-500">
          See Chat
        </button>
      </div>
    </div>
  );
};

export default ChatAsidePostContainer;
