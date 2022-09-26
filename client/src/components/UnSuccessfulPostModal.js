const UnSuccessfulPostModal = ({ handleCloseModal, postFailure, postFailureMsg }) => {



  return (
    <div className={postFailure ? "bg-black/75 w-full h-full top-0 left-0 right-0 fixed z-50 block" : "hidden bg-black/75 w-full h-full top-0 left-0 right-0 fixed z-50"}>
      <div className="h-fit p-3 w-screen -ml-5 sm:w-[400px] sm:mx-auto bg-white rounded-md  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative w-full h-fit rounded-md overflow-hidden py-2">
          <img
            className="w-[150px] mx-auto my-10"
            src="/imgs/error.svg"
            alt="Post Edit Saved Successfully Icon"
          />
          <p className="text-black text-3xl mb-3 text-center">
            Sorry, I seem to have broken myself. 
            <br></br>
            <span className="text-red-500">{postFailureMsg}</span>
          </p>
          <button
            onClick={handleCloseModal}
            className="w-full h-10 bg-gray-400 rounded-sm rounded-bl-sm hover:bg-gray-700"
          >
            Try Again!
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnSuccessfulPostModal;
