const AccountSupplyObjectCard = ({ data, modalDispatch }) => {
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
      className=" w-full sm:rounded-md my-1 sm:mx-[12px] shadow-lg p-1"
      style={{ backgroundColor:cardBgColor}}
    >
      <div className="flex justify-around flex-col bg-white w-full h-full pb-2 rounded-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-around w-full p-2 pb-1 sm:p-5 sm:px-2 sm:pb-2">
          <div className="relative overflow-hidden">
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
          <ul className="w-full sm:w-1/2 pl-2 sm:h-full max-h-52 flex flex-col justify-center sm:justify-around ">
            {data.postType === "ask" && (
              <>
                <li className="text-black my-1">
                  <span className="text-black font-medium">Who: </span>
                  {data.who}
                </li>
                <hr></hr>
              </>
            )}

            <li className="text-black my-1 ">
              <span className="text-black font-medium">Quantity: </span>
              {data.quantity}
            </li>
            <hr></hr>

            {data.postType === "ask" ? (
              <>
                <li className="text-black my-1">
                  <span className="text-black font-medium">
                    Accepted Condition:
                  </span>{" "}
                  {data.condition
                    .join("")
                    .slice(0, data.condition.join("").length - 2)}
                </li>
                <hr></hr>
              </>
            ) : (
              <>
                <li className="text-black my-1">
                  <span className="text-black font-medium">Condition:</span>{" "}
                  {data.condition}
                </li>
                <hr></hr>
              </>
            )}
            <li className="text-black my-1">
              <span className="text-black font-medium">Location: </span>
              {data.location}
            </li>
            <hr></hr>

            <li className="text-black my-1">
              <span className="text-black font-medium">Zipcode: </span>
              {data.zipcode}
            </li>
            <hr></hr>
          </ul>
        </div>
        {data.postType === "ask" && (
          <ul className="block sm:pl-5 pt-0 pl-4 sm:pt-0">
            <li className="text-black">
              <span className="text-black font-medium">
                Specifically Asked For:{" "}
              </span>
              {data.specify}
            </li>
          </ul>
        )}
        {data.postType === "offer" && (
          <div className="pt-0 sm:pt-0 sm:pl-5 pl-4 block">
            <ul>
              <li className="text-black">
                <span className="text-black font-medium">Description: </span>
                {data.description}
              </li>
            </ul>
          </div>
        )}

        <button
          onClick={() =>
            modalDispatch({
              type: `ACCOUNT_MODAL-${data.postType}`,
              payload: data._id,
            })
          }
          className="text-center cursor-pointer border absolute -right-2 -top-2 pr- p-2 hover:shadow-lg rounded-lg bg-white"
        >
          <img
            className="w-10 mx-auto mt-1 "
            src="./imgs/editPost.svg"
            alt="Edit Post Icon"
          />
        </button>
        <button
          onClick={() => {
            {
              data.postType === "offer"
                ? modalDispatch({
                    type: "DELETE_SINGLE_POST",
                    payload: [data._id, data.postType, data.photoInfo],
                  })
                : modalDispatch({
                    type: "DELETE_SINGLE_POST",
                    payload: [data._id, data.postType],
                  });
            }
          }}
          className="bg-white hidden sm:block border text-center cursor-pointer absolute -right-2 -bottom-2 py-2 pl-1 pr-3 hover:shadow-[-1px_-4px_15px_-3px_rgb(0,0,0,0.1),-1px_-3px_6px_-4px_rgb(0,0,0,0.1)] rounded-lg"
        >
          <img
            className="w-10 mx-auto mb-1 "
            src="./imgs/deletePost.svg"
            alt="Edit Post Icon"
          />
        </button>
        <button
          onClick={() => {
            {
              data.postType === "offer"
                ? modalDispatch({
                    type: "DELETE_SINGLE_POST",
                    payload: [data._id, data.postType, data.photoInfo],
                  })
                : modalDispatch({
                    type: "DELETE_SINGLE_POST",
                    payload: [data._id, data.postType],
                  });
            }
          }}
          className="bg-white sm:hidden text-center border cursor-pointer absolute -left-2 -top-2 py-2 pl-2 pr-1 sm:pr-3 hover:shadow-[1px_4px_15px_0px_rgb(0,0,0,0.1),-1px_-3px_6px_-10px_rgb(0,0,0,0.1)] rounded-lg"
        >
          <img
            className="w-10 mx-auto mt-1 "
            src="./imgs/deletePost.svg"
            alt="Edit Post Icon"
          />
        </button>
      </div>
    </div>
  );
};

export default AccountSupplyObjectCard;
