import { fetchAllItems } from "../api/api";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

import SupplyObjectCard from "../components/SupplyObjectCard";
import FilterForm from "../components/FilterForm";
import Loading from "../components/Loading";
import EmptyFilteredSuppliesPlaceHolder from "../components/EmptyFilteredSuppliesPlaceholder";
import EmptySuppliesPlaceHolder from "../components/EmptySuppliesPlaceholder";

const Borrow = ({ modalDispatch, handlePostFailure }) => {
  const handleFilterForm = (data) => {
    setDataDump(data.filter(userHide => user.uid !== userHide._uid));
  };
  // NEEDS DEFINE CUT OFF POINT, THEN WHEN SCROLL FAR ENOUGH IT LOADS THE NEXT BATCH OF ITEMS SO ON AND SO ON.
  const [isLoaded, setIsLoaded] = useState(false);

  const [dataDump, setDataDump] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = useState('')

  const {user} = UserAuth()

  useEffect(() => {
    handleLoading();
  }, []);

  const handleLoading = async () => {
    try {
      if (user) {
        await fetchAllItems().then((res) => setDataDump(res.data.filter(userHide => user.uid !== userHide._uid)));
        setIsLoaded(true);
      } else {
        await fetchAllItems().then((res) => setDataDump(res.data));
        setIsLoaded(true);
      }
    } catch (err) {
      setErrorPlaceholder(err.toString())
      setIsLoaded(true);
    }
  };

  return (
    <section>
      <h1 className="text-5xl text-center mb-5">Available Supplies</h1>

      <div className="mx-auto h-fit w-fit my-5">
        <button
          className="p-2 mx-auto"
          onClick={() => setActiveFilter(!activeFilter)}
        >
          <img
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
        <FilterForm
          handleFilterForm={handleFilterForm}
          handlePostFailure={handlePostFailure}
        />
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
                <EmptySuppliesPlaceHolder errorPlaceholder={errorPlaceholder} />
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
    </section>
  );
};

export default Borrow;
