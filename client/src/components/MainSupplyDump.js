import SupplyObjectCard from "./SupplyObjectCard";
import Loading from "./Loading";
import EmptySuppliesPlaceHolder from "./EmptySuppliesPlaceholder";

import { useCallback, useEffect, useState } from "react";
import { fetchAllItems } from "../api/api";

const MainSupplyDump = ({ modalDispatch }) => {
  const [dumpData, setDumpData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = useState('')

  useEffect(() => {
    handleLoadPreviewOfItems()
  }, []);

  const handleLoadPreviewOfItems = async () => {
    try {
      await fetchAllItems().then((res) => setDumpData(res.data));
      handleLoad();
    } catch (err) {
      setErrorPlaceholder(err.toString())
      setIsLoaded(true);
    }
  }

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, [dumpData]);

  return (
    <section className="mt-24 mb-0 w-screen -ml-5 h-full overflow-hidden sm:px-5 bg-sky-900">
      <h3 className="text-center text-3xl mt-4 font-light underline underline-offset-2">
        Available Supplies
      </h3>
      {isLoaded ? (
        <div className="flex items-center justify-around flex-wrap mb-10">
          {dumpData.length <= 0 ? (
            <EmptySuppliesPlaceHolder errorPlaceholder={errorPlaceholder} />
          ) : (
            dumpData
              .slice(0, 3)
              .map((data) => (
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
          background={"bg-sky-900"}
          fontColor={"text-white"}
          outerBackground={"bg-white"}
        />
      )}
    </section>
  );
};

export default MainSupplyDump;
