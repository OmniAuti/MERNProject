import AccountBookmarkSupplyObjectCard from "./AccountBookmarkSupplyObjectCard";
import AccountSupplyLoading from "./AccountSupplyLoading";

const AccountDashboardBookmarked = ({
  isBookmarkLoaded,
  accountBookmarked,
  modalDispatch,
  errorPlaceholder
}) => {
  return (
    <div className="row-start-6 row-end-8 h-[400px] -ml-5 sm:-ml-0 w-screen sm:w-full lg:h-fit lg:row-start-4 min-h-[400px] lg:row-end-7 max-h-[400px] col-start-1 sm:col-start-2 col-span-7 sm:col-span-6 bg-slate-400 rounded-b-md lg:rounded-md overflow-scroll">
      <p className="w-full text-2xl text-center py-5 sticky top-0 z-10 bg-slate-400 underline underline-offset-2">
        Bookmarked Posts
      </p>
      {errorPlaceholder !== "" ? 
        <div className="relative w-full h-fit rounded-md overflow-hidden py-2">
          <img
            className="w-[150px] mx-auto my-10"
            src="/imgs/error.svg"
            alt="Post Edit Saved Successfully Icon"
          />
          <p className="text-3xl mb-3 text-center">
            Sorry, I seem to have broken myself.
            <br></br>
            <br></br>
            <span className="text-red-500">{errorPlaceholder}</span>
          </p>
        </div>:
      <>
      {!isBookmarkLoaded ? (
        <div className="flex flex-wrap">
          <AccountSupplyLoading />
          <AccountSupplyLoading />
          <AccountSupplyLoading />
        </div>
      ) : (
        <div className="flex flex-wrap">
          {accountBookmarked.length > 0 ? (
            accountBookmarked.map((data) => (
              <AccountBookmarkSupplyObjectCard
                modalDispatch={modalDispatch}
                key={data._id}
                data={data}
              />
            ))
          ) : (
            <p className="text-2xl w-full font-thin text-center">
              You have not bookmarked any supplies
            </p>
          )}
        </div>
      )}
      </>}
    </div>
  );
};

export default AccountDashboardBookmarked;
