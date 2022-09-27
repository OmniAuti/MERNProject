import AccountSupplyObjectCard from "./AccountSupplyObjectCard";
import AccountSupplyLoading from "./AccountSupplyLoading";

const AccountDashboardAsked = ({ accountAskedData, isAskLoaded, modalDispatch, errorPlaceholder }) => {
  return (
    <div className="row-start-2 row-end-4 lg:row-start-1 lg:row-end-4 min-h-[500px] max-h-[500px] col-start-1 -ml-5 sm:-ml-0 w-screen sm:w-full sm:col-start-2 col-end-8 lg:col-end-5 bg-slate-400 rounded-t-md lg:rounded-md overflow-scroll">
      <p className="w-full text-2xl text-center py-3 sticky top-0 z-10 bg-slate-400 underline underline-offset-2">
        Asked
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
      {!isAskLoaded ? (
        <div className="flex flex-wrap">
          <AccountSupplyLoading /> <AccountSupplyLoading />{" "}
          <AccountSupplyLoading />
        </div>
      ) : (
        <div className="flex flex-wrap">
          {accountAskedData.length > 0 ? (
            accountAskedData
              .filter((data) => data.postType === "ask")
              .map((data) => (
                <AccountSupplyObjectCard modalDispatch={modalDispatch} key={data._id} data={data} />
              ))
          ) : (
            <p className="text-2xl flex items-center justify-center w-full font-thin">
              You have not asked for any supplies
            </p>
          )}
        </div>
      )}
      </>}
    </div>
  );
};

export default AccountDashboardAsked;
