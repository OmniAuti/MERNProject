import ChatAsidePostContainer from "./ChatAsidePostContainer";

const ChatMessagesAside = ({
  allDocumentsData,
  modalDispatch,
  handleDisplayMessages,
  handleSetCurrentDoc,
  currentDoc
}) => {

  return (
    <aside className="w-[300px] h-[500px] max-h-[500px] overflow-scroll bg-sky-500 rounded-tr-md rounded-br-md p-2">
      <h2 className="text-center">Open Inquiries</h2>
    
      {allDocumentsData.length === 0 ? (
        <p className="text-center mt-10">No Messages</p>
      ) : (
        allDocumentsData.map((data) => (
          <ChatAsidePostContainer
            currentDoc={currentDoc}
            handleSetCurrentDoc={handleSetCurrentDoc}
            handleDisplayMessages={handleDisplayMessages}
            allDocumentsData={allDocumentsData}
            modalDispatch={modalDispatch}
            key={data.timeFirstInitiated}
            data={data.postData}
          />
        ))
      )}
    </aside>
  );
};

export default ChatMessagesAside;
