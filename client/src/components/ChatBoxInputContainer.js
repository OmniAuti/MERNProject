import ChatMessages from "./ChatMessages";
import ChatBoxInput from "./ChatBoxInput";
import { useEffect, useRef } from "react";

const ChatBoxInputContainer = ({
  handleSubmit,
  handleInput,
  currentMsgs,
  msgObjSubmit,
  user,
}) => {
  const scrollChat = useRef(null);

  useEffect(() => {
    if (currentMsgs === []) return;
    scrollChat.current.scrollTo({ bottom: scrollChat.current.scrollHeight, behavior: "smooth" });
  }, [currentMsgs]);

  return (
    <div className="bg-sky-500 mx-auto rounded-md w-[500px] h-[500px] p-1 overflow-hidden">
      <div
        ref={scrollChat}
        className="w-full bg-white rounded-md max-h-[432px] h-[432px] border border-transparent border-stone-900 flex flex-col justify-end overflow-scroll pb-1"
      >
        {Object.keys(currentMsgs).length === 0 ? (
          <p className="text-slate-500 text-center mt-[50px]">No Messages</p>
        ) : (
          currentMsgs.messages.map((msg) => (
            <ChatMessages user={user} key={msg.time} msg={msg}/>
          ))
        )}
      </div>
      <div className="bg-sky-500 w-full h-[60px] rounded-b-md overflow-hidden">
        <ChatBoxInput
          msgObjSubmit={msgObjSubmit}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatBoxInputContainer;
