import ChatMessages from "./ChatMessages";
import ChatBoxInput from "./ChatBoxInput";
import { useEffect, useRef, useState } from "react";

const ChatBoxInputContainer = ({
  handleSubmit,
  handleInput,
  currentMsgs,
  msgObjSubmit,
  user,
}) => {
  const [disabledInputCheck, setDisabledInputCheck] = useState(true);

  const scrollChat = useRef(null);

  useEffect(() => {
    scrollChat.current.scrollTo({
      top: scrollChat.current.scrollHeight,
      behavior: "smooth",
    });
    if (currentMsgs.length === 0) {
      setDisabledInputCheck(true);
    } else {
      setDisabledInputCheck(false)
    }
  }, [currentMsgs]);

  return (
    <div className="bg-sky-500 rounded-b-md md:rounded-tl-md md:rounded-br-none rounded-bl-md w-screen md:w-[500px] h-[500px]  p-1 pt-0">
      <p className="p-1 h-[33px] text-center">
        Put post info here - block user/Report
      </p>
      <div
        ref={scrollChat}
        className="w-full bg-white rounded-md h-[399px] max-h-[399px] border border-stone-900 flex flex-col overflow-scroll pb-1"
      >
        {currentMsgs.length === 0 ? (
          <p className="text-slate-500 text-center mt-[50px]">No Messages</p>
        ) : (
          currentMsgs.map((msg) => (
            <ChatMessages user={user} key={msg.time} msg={msg} />
          ))
        )}
      </div>
      <div className="bg-sky-500 w-full h-[60px] rounded-b-md overflow-hidden">
        <ChatBoxInput
          disabledInputCheck={disabledInputCheck}
          msgObjSubmit={msgObjSubmit}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatBoxInputContainer;
