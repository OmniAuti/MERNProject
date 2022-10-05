const ChatCurrentChatItem = ({ data }) => {
  var cardBgColor;
  var askIcon;
  switch (data.type) {
    case "pencil":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "pen":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "highlighter":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "marker":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "colored pencil":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "crayon":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "paint brush":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "highlighter":
      cardBgColor = "#fecaca";
      askIcon = "./imgs/ask-writing.svg";
      break;
    // HOLDERS OF SUPPLIES
    case "binder":
      cardBgColor = "#fef08a";
      askIcon = "./imgs/ask-cases.svg";
      break;
    case "folder":
      cardBgColor = "#fef08a";
      askIcon = "./imgs/ask-cases.svg";
      break;
    case "pencil pouch/case":
      cardBgColor = "#fef08a";
      askIcon = "./imgs/ask-cases.svg";
      break;
    case "lunchbox":
      cardBgColor = "#fef08a";
      askIcon = "./imgs/ask-cases.svg";
      break;
    //PAPER
    case "notebook":
      cardBgColor = "#bae6fd";
      askIcon = "./imgs/ask-paper.svg";
      break;
    case "journal":
      cardBgColor = "#bae6fd";
      askIcon = "./imgs/ask-paper.svg";
      break;
    case "colored paper":
      cardBgColor = "#bae6fd";
      askIcon = "./imgs/ask-paper.svg";
      break;
    case "graphing paper":
      cardBgColor = "#bae6fd";
      askIcon = "./imgs/ask-paper.svg";
      break;
    case "sticky note":
      cardBgColor = "#bae6fd";
      askIcon = "./imgs/ask-writing.svg";
      break;
    case "notecard":
      cardBgColor = "#bae6fd";
      askIcon = "./imgs/ask-paper.svg";
      break;
    // STUDY MATERIAL
    case "flashcard":
      cardBgColor = "#bbf7d0";
      askIcon = "./imgs/ask-study.svg";
      break;
    case "misc. study material":
      cardBgColor = "#bbf7d0";
      askIcon = "./imgs/ask-study.svg";
      break;
    //BOOKS
    case "book":
      cardBgColor = "#1e293b";
      askIcon = "./imgs/ask-books.svg";
      break;
    case "misc. books":
      cardBgColor = "#1e293b";
      askIcon = "./imgs/ask-books.svg";
      break;
    // TOOLS
    case "ruler":
      cardBgColor = "#fed7aa";
      askIcon = "./imgs/ask-tools.svg";
      break;
    case "calculator":
      cardBgColor = "#fed7aa";
      askIcon = "./imgs/ask-tools.svg";
      break;
    case "protractor":
      cardBgColor = "#fed7aa";
      askIcon = "./imgs/ask-tools.svg";
      break;
    // BACKPACK
    case "backpack":
      cardBgColor = "#e9d5ff";
      askIcon = "./imgs/ask-backpack.svg";
      break;
    default:
      cardBgColor = "#fff";
      askIcon = "./imgs/missing-file.svg";
      break;
  }
  return (
    <aside>
      <div className="">
        <div
          className="h-fit p-2 w-screen sm:w-[500px] bg-white rounded-md relative"
          style={{ border: `3px solid ${cardBgColor}` }}
        >
          <p className="text-black text-center mb-3 underline">
            {data.postType === "offer"
              ? "Offered Supplies"
              : "Asked For Supplies"}
          </p>
          <div className="relative w-full h-fit min-h-[400px] rounded-md overflow-hidden">
            <div className="h-52 max-h-52 min-h-52 w-full relative overflow-hidden">
              <div className="bg-black bg-opacity-80 w-fit absolute pr-10 pt-5 pb-24 -bottom-20 pl-40 -left-36 rounded-full text-2xl font-light">
                {/* {data.type.slice(0, 1).toUpperCase() + data.type.slice(1)} */}
              </div>
              {data.postType === "offer" ? (
                <img
                  className="h-52 max-h-52 min-h-52 w-full object-contain object-center"
                  src={
                    data.photoInfo.url !== ""
                      ? data.photoInfo.url
                      : "./imgs/missing-file.svg"
                  }
                  alt="Supply Item Picture"
                />
              ) : (
                <img
                  className="h-52 max-h-52 min-h-52 w-full object-contain object-center"
                  src={askIcon}
                  alt="Ask Item Icon"
                />
              )}
            </div>
            <ul className="p-2 shadow-inner flex flex-col justify-between rounded-tr-sm rounded-b-sm h-[192px]">
              {data.postType === "ask" ? (
                <li className="text-black font-light max-w-[80%]">
                  {" "}
                  <span className=" text-black font-medium ">
                    Specifically Asked For:{" "}
                  </span>
                  {data.specify}
                </li>
              ) : (
                <li className="text-black font-light max-w-[80%]">
                  {" "}
                  <span className=" text-black font-medium ">
                    Description:{" "}
                  </span>
                  {data.description}
                </li>
              )}
              <hr></hr>
              <li className="text-black m-1 mt-2 font-medium">
                Quantity:{" "}
                <span className="text-black font-light">{data.quantity}</span>
              </li>
              <hr></hr>
              {data.postType === "ask" ? (
                <li className="text-black m-1 mt-2 font-medium">
                  Accepted Condition:{" "}
                  <span className="text-black font-light">
                    {data.condition
                      .join("")
                      .slice(0, data.condition.join("").length - 2)}
                  </span>{" "}
                </li>
              ) : (
                <li className="text-black m-1 mt-2 font-medium">
                  Condition:{" "}
                  <span className="text-black font-light">
                    {data.condition}
                  </span>{" "}
                </li>
              )}
              <hr></hr>
              <li className="text-black m-1 mt-2 font-medium">
                {/* General Location:{" "}
                <span className="text-black font-light">
                  {data.location.slice(0, 1).toUpperCase() +
                    data.location.slice(1)}
                </span> */}
              </li>
              <hr></hr>

              <li className="text-black m-1 mt-2 font-medium">
                Zipcode:{" "}
                <span className="text-black font-light">{data.zipcode}</span>
              </li>
              <hr></hr>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatCurrentChatItem;
