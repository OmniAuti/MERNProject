import AccountSupplyObjectCard from "./AccountSupplyObjectCard";
import AccountSupplyLoading from "./AccountSupplyLoading";

const OfferedAccountColumn = ({ accountItemsData, isItemsLoaded }) => {
  return (
    <div className="w-screen -ml-5 sm:-ml-0 sm:w-full mb-10 lg:w-1/2 bg-slate-400 max-h-screen min-h-[750px] rounded-sm overflow-scroll relative">
      <p className="w-full text-3xl underline text-center py-2 sticky top-0 bg-slate-400">
        Currently Offered
      </p>
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
                <AccountSupplyObjectCard key={data._id} data={data} />
              ))
          ) : (
            <p className="text-2xl flex items-center justify-center w-full font-thin">
              You have not offered any supplies
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OfferedAccountColumn;