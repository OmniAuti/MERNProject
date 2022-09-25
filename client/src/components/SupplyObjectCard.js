import { useState, useEffect } from "react";

const SupplyObjectCard = ({ data, modalDispatch }) => {
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
    // NEED TO MAKE A LIKE OPTION TO STORE IN INTEREST SECTIO OF ACCOUNT

    <div
      onClick={() =>
        modalDispatch({ type: `MODAL-${data.postType}`, payload: data._id })
      }
      className="w-screen lg:w-[32.33333%] lg:min-w-[318px] rounded-md my-2 lg:ml-[9px] p-1 cursor-pointer group relative"
      style={{ backgroundColor: cardBgColor }}
    >
      <div className="relative bg-white w-full h-[310px] max-h-[310px] rounded-md overflow-hidden pt-2 shadow-inner transition-all duration-500 hover:shadow-black">
        <div className="h-52 max-h-52 min-h-52 w-full relative overflow-hidden">
          <div className="bg-black bg-opacity-80 w-fit absolute pr-10 pt-1 pb-20 -bottom-24 pl-40 -left-36 rounded-full text-2xl font-light">
            <p className="mb-5 -ml-2">
              {data.type.slice(0, 1).toUpperCase() + data.type.slice(1)}
            </p>
          </div>
          {data.postType === "offer" ? (
            <img
              className={
                data.photoInfo.url === ""
                  ? "h-52 max-h-52 min-h-52 w-full object-contain pb-1 object-center"
                  : "h-52 max-h-52 min-h-52 w-full object-contain object-center"
              }
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
        <ul className="flex flex-col justify-around shadow-inner group-hover:shadow-transparent transition-all duration-500">
          <div className="flex items-center justify-between w-full px-8">
            <li className="text-black m-1 mb-0 inline-block truncate ">
              <span className="text-black font-medium w-full">Location: </span>
              {data.location}
            </li>
            <li className="text-black m-1  mb-0 inline-block truncate">
              <span className="text-black font-medium w-full">Zipcode: </span>
              {data.zipcode}
            </li>
          </div>
          <hr></hr>
          <div className="flex items-center justify-around">
            <li className="text-black m-1 mt-0 font-medium inline-block max-w-[140px] w-[125px] truncate">
              Quantity:{" "}
              <span className="text-black font-light">{data.quantity}</span>
            </li>
            {data.postType === "ask" ? (
              <li className="text-black m-1 mt-0 font-medium inline-block truncate ">
                Accepted Condition:{" "}
                <span className="text-black font-light">
                  {" "}
                  {data.condition
                    .join("")
                    .slice(0, data.condition.join("").length - 2)}
                </span>{" "}
              </li>
            ) : (
              <li className="text-black m-1 mt-0 font-medium inline-block truncate ">
                Condition:{" "}
                <span className="text-black font-light bg">
                  {" "}
                  {data.condition}
                </span>{" "}
              </li>
            )}
          </div>
          <hr></hr>
        </ul>
        <button
          className="p-[6px] group-hover:text-white text-black group-hover:shadow-[0_2px_3px_3px_rgba(0,0,0,.5)] bg-slate-300 group-hover:bg-slate-400 absolute w-full left-1/2 -translate-x-1/2 bottom-0 rounded-b-md font-base transition-all duration-500"
        >
          Details
        </button>
      </div>
     
    </div>
  );
};

export default SupplyObjectCard;
