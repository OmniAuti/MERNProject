import AccountSupplyObjectCard from "./AccountSupplyObjectCard";
import AccountSupplyLoading from "./AccountSupplyLoading";

const OfferedAccountColumn = ({
  accountItemsData,
  isItemsLoaded,
  modalDispatch,
  errorPlaceholder,
}) => {
  return (
    <div className="w-screen -ml-5 sm:-ml-0 sm:w-full mb-10 lg:w-1/2 bg-slate-400 max-h-[750px] h-[750px] min-h-[750px] rounded-md overflow-scroll">
      <p className="w-full text-3xl underline text-center py-2 z-40 sticky top-0 bg-slate-400">
        Your Currently Offered
      </p>
      {errorPlaceholder !== "" ? (
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
        </div>
      ) : (
        <>
          {!isItemsLoaded ? (
            <div className="flex flex-wrap">
              <AccountSupplyLoading />
              <AccountSupplyLoading />
              <AccountSupplyLoading />
            </div>
          ) : (
            <div className="flex flex-wrap">
              {accountItemsData.length > 0 ? (
                accountItemsData
                  .filter((data) => data.postType === "offer")
                  .map((data) => (
                    <AccountSupplyObjectCard
                      modalDispatch={modalDispatch}
                      key={data._id}
                      data={data}
                    />
                  ))
              ) : (
                <p className="text-2xl flex items-center justify-center w-full font-thin">
                  You have not offered any supplies
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OfferedAccountColumn;
