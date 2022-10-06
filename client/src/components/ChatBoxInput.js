const ChatBoxInput = ({
  handleInput,
  handleSubmit,
  msgObjSubmit,
  disabledInputCheck,
}) => {
  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        disabled={disabledInputCheck}
        required
        onChange={(e) => handleInput(e)}
        value={msgObjSubmit.message}
        type="text"
        className="w-3/4 h-[45px] rounded-md disabled:cursor-not-allowed rounded-br-none rounded-tr-none text-black pl-2 border border-stone-900 focus:outline-none"
      />
      <input
        disabled={disabledInputCheck}
        type="submit"
        value="Send"
        className="bg-slate-500 h-[45px] disabled:cursor-not-allowed rounded-md rounded-tl-none border-l-0 rounded-bl-none w-[100px] border border-stone-900 hover:bg-slate-900 hover:cursor-pointer active:scale-95"
      />
    </form>
  );
};

export default ChatBoxInput;
