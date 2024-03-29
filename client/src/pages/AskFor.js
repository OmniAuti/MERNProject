import { useEffect, useState } from "react";

import { getAccountItemsAsked } from "../api/api";
import AskAccountColumn from "../components/AskAccountColumn";
import AskItemForm from "../components/AskItemForm";

const AskFor = ({ modalDispatch,refreshAfterEdit, handlePostFailure }) => {
  const [isAskLoaded, setIsAskLoaded] = useState(false);
  const [accountAskedData, setAccountAskData] = useState([]);
  const [updateAfterPost, setUpdateAfterPost] = useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = useState('')


  useEffect(() => {
    handleLoading();
  }, []);

  useEffect(() => {
    handleLoading();
  }, [updateAfterPost, refreshAfterEdit]);

  const handleLoading = async () => {
    setIsAskLoaded(false);
    try {
      await getAccountItemsAsked().then((res) => setAccountAskData(res.data));
      setIsAskLoaded(true);
    } catch (err) {
      setIsAskLoaded(true)
      setErrorPlaceholder(err.toString())
      console.log(err);
    }
  };

  const handleUpdateAfterPost = () => {
    setUpdateAfterPost(!updateAfterPost);
  };

  return (
    <section>
      <h1 className="text-5xl mb-5 text-center">Ask For Supplies</h1>
      <div className="flex flex-col lg:flex-row">
        <AskAccountColumn
          modalDispatch={modalDispatch}
          accountAskedData={accountAskedData}
          isAskLoaded={isAskLoaded}
          errorPlaceholder={errorPlaceholder}
        />

        <AskItemForm handlePostFailure={handlePostFailure} handleUpdateAfterPost={handleUpdateAfterPost} />
      </div>
    </section>
  );
};

export default AskFor;
