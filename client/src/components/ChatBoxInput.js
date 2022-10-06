const ChatBoxInput = ({ handleInput, handleSubmit, msgObjSubmit }) => {
  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        required
        onChange={(e) => handleInput(e)}
        value={msgObjSubmit.message}
        type="text"
        className="w-3/4 h-[45px] rounded-md rounded-br-none rounded-tr-none text-black pl-2 border border-stone-900 focus:outline-none"
      />
      <input
        type="submit"
        value="Send"
        className="bg-slate-500 h-[45px] rounded-md rounded-tl-none rounded-bl-none w-[100px] border border-stone-900 hover:bg-slate-900 hover:cursor-pointer active:scale-95"
      />
    </form>
  );
};

export default ChatBoxInput;
