const ChatMessages = ({ msg, user }) => {
  return (
    <div className={user.uid === msg.uidInitiated ? "bg-sky-200 w-fit px-2 rounded-md m-1 border border-black self-end max-w-1/2 text-right first-of-type:mt-auto" : "bg-green-200 w-fit max-w-1/2 px-2 rounded-md m-1 border self-start border-black text-left first-of-type:mt-auto"}>
      <p className="text-black">{msg.message}</p>
    </div>
  );
};

export default ChatMessages;
