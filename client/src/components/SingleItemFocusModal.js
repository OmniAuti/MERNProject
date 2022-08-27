import { useEffect, useState } from "react";
import { addBookmark, bookmarkAskItem } from "../api/api";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Loading from "./Loading";

const SingleItemFocusModal = ({
  data,
  activeModal,
  handleCloseModal,
  handleOpenModal,
  modalLoaded,
  handleModalBookmark,
}) => {
  const { user } = UserAuth();
  const [bookmarkCheck, setBookmarkCheck] = useState(false);
  const [logInCheck, setLogInCheck] = useState(false);

  useEffect(() => {
    if (Object.values(data).length <= 0) return;
    handleOpenModal();
    handleBookmarkCheck();
    return () => {};
  }, [data]);

  useEffect(() => {
    if (user === undefined || !user) {
      setLogInCheck(true);
      return;
    }
    setLogInCheck(false);
  }, [user]);

  const handleBookmark = async () => {
    if (!user || user === undefined) return;

    var bookmark = { _uid: user.uid, postId: data._id };
    try {
      if (data.postType === "ask") {
        await bookmarkAskItem(bookmark).then((res) => {
          {
            if (res.status >= 200 && res.status <= 299) {
              handleModalBookmark();
            } else if (res.status >= 400 && res.status <= 499) {
              alert("Bookmark Failed. Try Again.");
            }
          }
        });
      } else if (data.postType === "offer") {
        await addBookmark(bookmark).then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            handleModalBookmark();
          } else if (res.status >= 400 && res.status <= 499) {
            alert("Bookmark Failed. Try Again.");
          }
        });
      }
    } catch (err) {
      alert("Bookmark Failed. Try Again.");
      console.log(err);
    }
  };

  const handleBookmarkCheck = async () => {
    if (!user || user === undefined) return;
    try {
      if (data.bookmarked.indexOf(user.uid) >= 0) {
        setBookmarkCheck(true);
      } else {
        setBookmarkCheck(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={
        activeModal
          ? "fixed bg-black/50 z-50 w-full h-full top-0 left-0 right-0 overflow-scroll"
          : "fixed bg-black/50 z-50 w-full h-full top-0 left-0 right-0 hidden"
      }
    >
      {modalLoaded ? (
        <div className="z-50 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-fit p-5 pt-2 w-screen sm:w-[500px] bg-white rounded-tr-sm rounded-tl-sm relative">
            <p className="text-black text-center mb-3 underline">
              {data.postType === "offer"
                ? "Offered Supplies"
                : "Asked For Supplies"}
            </p>
            <div className="relative w-full h-fit min-h-[400px] rounded-md overflow-hidden py-2">
              <div className="h-52 max-h-52 min-h-52 w-full relative overflow-hidden">
                <div className="bg-black bg-opacity-80 w-fit absolute pr-10 pt-5 pb-24 -bottom-20 pl-40 -left-36 rounded-full text-2xl font-light">
                  {data.type.slice(0, 1).toUpperCase() + data.type.slice(1)}
                </div>
                <img
                  className="w-full h-full object-contain object-center"
                  src="./imgs/astockphoto.jpg"
                  alt=""
                />
              </div>
              {data.postType === "ask" ? (
                <p className="text-black m-5 font-light max-w-[80%]">
                  {" "}
                  <span className=" text-black font-medium ">
                    Specifically Asked For:{" "}
                  </span>
                  {data.specify}
                </p>
              ) : (
                <p className="text-black m-5 font-light max-w-[80%]">
                  {" "}
                  <span className=" text-black font-medium ">
                    Description:{" "}
                  </span>
                  {data.description}
                </p>
              )}

              <ul className="mt-5 ml-2 px-2">
                <li className="text-black m-1 mt-2 font-medium">
                  Quantity:{" "}
                  <span className="text-black font-light">{data.quantity}</span>
                </li>

                {data.postType === "ask" ? (
                  <li className="text-black m-1 mt-2 font-medium">
                    Condition:{" "}
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

                <li className="text-black m-1 mt-2 font-medium">
                  General Location:{" "}
                  <span className="text-black font-light">
                    {data.location.slice(0, 1).toUpperCase() +
                      data.location.slice(1)}
                  </span>
                </li>

                <li className="text-black m-1 mt-2 font-medium">
                  Zipcode:{" "}
                  <span className="text-black font-light">{data.zipcode}</span>
                </li>
              </ul>

              {!logInCheck && (
                <div
                  onClick={() => handleBookmark()}
                  className="h-12 absolute rounded-full w-12 top-1/2 -right-1 cursor-pointer hover:scale-105"
                >
                  {bookmarkCheck ? (
                    <img
                      className=""
                      src="/imgs/bookmarkBooked.svg"
                      alt="Add Post Icon"
                    />
                  ) : (
                    <img
                      className=""
                      src="/imgs/bookmark.svg"
                      alt="Add Post Icon"
                    />
                  )}
                </div>
              )}
            </div>

            {!logInCheck ? (
              <>
                <button className="bg-sky-500 w-full h-10 my-2 rounded-sm hover:bg-sky-900">
                  Inquire
                </button>
                <button
                  onClick={() => handleCloseModal()}
                  className="w-full h-10 bg-gray-400 rounded-sm rounded-bl-sm hover:bg-gray-700"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <Link to="account-gateway">
                  <p className="flex items-center justify-center bg-sky-500 w-full my-2 h-10 rounded-sm hover:bg-sky-900">
                    Please Log In For More Details
                  </p>
                </Link>
                <button
                  onClick={() => handleCloseModal()}
                  className="w-full h-10 bg-gray-400 rounded-sm rounded-bl-sm hover:bg-gray-700"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <Loading
          background={"bg-white"}
          outerBackground={"bg-black"}
          fontColor={"text-black"}
        />
      )}
    </div>
  );
};

export default SingleItemFocusModal;
