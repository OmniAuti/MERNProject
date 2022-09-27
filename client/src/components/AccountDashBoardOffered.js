import AccountSupplyObjectCard from "./AccountSupplyObjectCard";
import AccountSupplyLoading from "./AccountSupplyLoading";

const AccountDashboardOffered = ({ accountItemsData, isItemsLoaded, modalDispatch,errorPlaceholder }) => {  
  return (
    <div className="row-start-4 row-end-6 md:h-fit lg:rounded-md -ml-5 sm:-ml-0 w-screen sm:w-full lg:row-start-1 lg:row-end-4 min-h-[500px] max-h-[500px] col-start-1 sm:col-start-2 lg:col-start-5 col-end-8 bg-slate-400 overflow-scroll">
      <p className="w-full text-2xl text-center py-5 sticky top-0 bg-slate-400 z-10 underline underline-offset-2">
        Offered
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
        </div> :
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
                <AccountSupplyObjectCard  key={data._id} data={data} modalDispatch={modalDispatch}/>
              ))
          ) : (
            <p className="text-2xl flex items-center justify-center w-full font-thin">
              You have not offered any supplies
            </p>
          )}
        </div>
      )}
      </>}
    </div>
  );
};

export default AccountDashboardOffered;
