import { getAskedForItems } from "../api/api";

import { useEffect, useState } from "react";
import SupplyObjectCard from "../components/SupplyObjectCard";
import FilterFormAsked from "../components/FilterFormAsked";
import Loading from "../components/Loading";
import EmptyFilteredSuppliesPlaceHolder from "../components/EmptyFilteredSuppliesPlaceholder";
import EmptyAskSuppliesPlaceHolder from "./EmptyAskSuppliesPlaceHolder";


const AskedForItems = ({ modalDispatch, handlePostFailure }) => {

  const handleFilterForm = (data) => {
    setDataDump(data)
  }
  const [isLoaded, setIsLoaded] = useState(false);

  const [dataDump, setDataDump] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = useState('')

  useEffect(() => {
    handleLoading();
  }, []);

  const handleLoading = async () => {
    try {
      await getAskedForItems().then((res) => setDataDump(res.data));
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setErrorPlaceholder(err.toString())
      console.log(err);
    }
  };
  return (
    <div>
      <div className="mx-auto h-fit w-fit my-5">
        <button
          className="p-2 mx-auto"
          onClick={() => setActiveFilter(!activeFilter)}
        >          <img
            src="./imgs/filterIcon.svg"
            alt="Filter Form Icon And Button"
            className="h-[40px] w-[40px]"
          />
        </button>
      </div>
      <div
        className={
          activeFilter
            ? "bg-sky-900 w-screen -ml-5 sm:-ml-0 sm:w-full  transition-all overflow-hidden rounded-md pb-5"
            : "h-0 transition-all overflow-hidden"
        }
      >
        <h3 className="text-center text-4xl pt-2 underline underline-offset-2 font-light">
          Filter
        </h3>
        <FilterFormAsked handlePostFailure={handlePostFailure} handleFilterForm={handleFilterForm} />
      </div>

      {isLoaded ? (
        <div
          className={
            dataDump.length <= 0
              ? "w-full flex flex-col items-center justify-around"
              : "sm:w-full sm:-ml-0 w-screen -ml-5 flex flex-wrap items-center justify-start"
          }
        >
          {dataDump.length <= 0 ? (
            <div>
              {activeFilter ? (
                <EmptyFilteredSuppliesPlaceHolder errorPlaceholder={errorPlaceholder} />
              ) : (
                <EmptyAskSuppliesPlaceHolder errorPlaceholder={errorPlaceholder} />
              )}
            </div>
          ) : (
            dataDump.map((data) => (
              <SupplyObjectCard
                modalDispatch={modalDispatch}
                key={data._id}
                data={data}
              />
            ))
          )}
        </div>
      ) : (
        <Loading
          background={"bg-black"}
          outerBackground={"bg-white"}
          fontColor={"font-white"}
        />
      )}
    </div>
  );
};

export default AskedForItems;
