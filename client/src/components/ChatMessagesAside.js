import ChatAsidePostContainer from "./ChatAsidePostContainer";

const ChatMessagesAside = ({
  allDocumentsData,
  modalDispatch,
  handleDisplayMessages,
  handleSetCurrentDoc,
  currentDoc,
  getInitialMessageArray
}) => {

  return (
    <aside className="w-screen md:w-[285px] md:h-[500px] max-h-[500px] bg-sky-500 md:overflow-scroll rounded-tr-md rounded-tl-md md:rounded-tl-none md:rounded-br-md p-1">
      <h2 className="text-center">Open Inquiries</h2>
    <div className="flex md:flex-col overflow-x-scroll pb-2">
      {allDocumentsData.length === 0 ? (
        <p className="text-center mt-10">No Messages</p>
      ) : (
        allDocumentsData.map((data) => (
          <ChatAsidePostContainer
          getInitialMessageArray={getInitialMessageArray}
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
      </div>
    </aside>
  );
};

export default ChatMessagesAside;
