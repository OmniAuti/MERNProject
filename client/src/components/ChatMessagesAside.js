import ChatAsidePostContainer from "./ChatAsidePostContainer";

const ChatMessagesAside = ({
  allDocumentsData,
  modalDispatch,
  currentDoc,
  getInitialMessageArray,
  handleDelete,
  getAsideButtonChatMsgs,
}) => {

  return (
    <aside className="w-screen overflow-hidden md:w-[285px] md:h-[500px] max-h-[500px] bg-sky-500 md:overflow-scroll rounded-tr-md rounded-tl-md md:rounded-tl-none md:rounded-br-md p-1">
      <h2 className="text-center w-full sticky -top-1 py-2 bg-sky-500">Open Inquiries</h2>
      <div className="flex md:flex-col overflow-x-scroll pb-2">
        {allDocumentsData.length === 0 ? (
          <p className="text-center mt-10">No Messages</p>
        ) : (
          allDocumentsData.map((data) => (
            <ChatAsidePostContainer
              handleDelete={handleDelete}
              getInitialMessageArray={getInitialMessageArray}
              currentDoc={currentDoc}
              allDocumentsData={allDocumentsData}
              modalDispatch={modalDispatch}
              key={data.timeFirstInitiated}
              data={data.postData}
              getAsideButtonChatMsgs={getAsideButtonChatMsgs}
            />
          ))
        )}
      </div>
    </aside>
  );
};

export default ChatMessagesAside;
