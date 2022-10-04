const ChatMessages = ({ msg, user }) => {
  return (
    <div className={user.uid === msg.uidInitiated ? "bg-sky-200 w-fit px-2 rounded-md m-1 border border-black self-end" : "bg-sky-200 w-fit px-2 rounded-md my-1 border border-black"}>
      <p className="text-black">{msg.message}</p>
    </div>
  );
};

export default ChatMessages;
