import ChatAsidePostContainer from "./ChatAsidePostContainer";

const ChatMessagesAside = ({ allDocumentsData, modalDispatch }) => {
  return (
    <aside className="w-[300px] h-[500px] max-h-[500px] overflow-scroll bg-sky-500 rounded-tr-md rounded-br-md p-2">
      {allDocumentsData === [] ? (
        <p>No Messages</p>
      ) : (
        allDocumentsData.map((data) => (
          <ChatAsidePostContainer modalDispatch={modalDispatch} key={data.timeFirstInitiated} data={data.postData} />
        ))
      )}
                

    </aside>
  );
};

export default ChatMessagesAside;
