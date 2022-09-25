const AccountBookmarkSupplyObjectCard = ({ data, modalDispatch }) => {
  var cardBgColor;
  var askIcon;
  switch (data.type) {
    // THINGS THAT MARK OR WRITE

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
    <div
      onClick={() =>
        modalDispatch({ type: `MODAL-${data.postType}`, payload: data._id })
      }
      className=" w-full sm:rounded-md sm:my-1 sm:mx-[12px] p-1 cursor-pointer"
      style={{ backgroundColor: cardBgColor }}
    >
      <div className="flex justify-around flex-col bg-white w-full h-full pb-2 rounded-md shadow-inner transition-all hover:shadow-black outline">
        <p className="text-black text-center mt-1 underline">
          {data.postType === "offer"
            ? "Offered Supplies"
            : "Asked For Supplies"}
        </p>

        <div className="flex flex-col sm:flex-row justify-around w-full p-1 pb-0 sm:p-5 sm:pb-2">
          <div className="flex justify-around w-full relative overflow-hidden">
            <div className="bg-black bg-opacity-80 w-fit absolute pr-10 pt-1 pb-20 -bottom-24 pl-40 -left-36 rounded-full text-3xl font-light">
              <p className="mb-5 -ml-2">
                {data.type.slice(0, 1).toUpperCase() + data.type.slice(1)}
              </p>
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
          <ul className="w-1/2 pl-3 sm:pl-5 max-h-52 flex flex-col justify-center sm:justify-around">
            <li className="text-black my-1"><span className="text-black font-medium">Quantity: </span>{data.quantity}</li>
            {data.postType === "offer" ? (
              <li className="text-black my-1"><span className="text-black font-medium">Condition: </span>{data.condition}</li>
            ) : (
              <li className="text-black my-1">
                <span className="text-black font-medium">Accepted Condition:</span>{" "}
                {data.condition
                  .join("")
                  .slice(0, data.condition.join("").length - 2)}
              </li>
            )}
            <li className="text-black my-1 "><span className="text-black font-medium">Location: </span>{data.location}</li>
            <li className="text-black my-1"><span className="text-black font-medium">Zipcode: </span>{data.zipcode}</li>
          </ul>
        </div>
        <div className="pl-3 sm:px-5">
          <ul>
            {data.postType === "offer" && (
              <li className="text-black m-1 clear-left">
                <span className="text-black font-medium">Description: </span>{data.description}
              </li>
            )}
            {data.postType === "ask" && (
              <li className="text-black m-1 clear-left">
                <span className="text-black font-medium">Specifically Asked For: </span>{data.specify}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountBookmarkSupplyObjectCard;
