import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getAccountItems,
  getAccountItemsAsked,
  getAccountBookmarked,
} from "../api/api";
import AccountDashboardAsked from "../components/AccountDashBoardAsked";
import AccountDashboardBookmarked from "../components/AccountDashBoardBookmarked";
import AccountDashboardOffered from "../components/AccountDashBoardOffered";
import AccountDashboardSettingsBar from "../components/AccountDashboardSettingsBar";

const AccountDashboard = ({ modalDispatch, refreshAfterEdit, handlePostFailure }) => {
  const navigate = useNavigate();

  const { user, logOutUser } = UserAuth();

  const [accountItemsData, setAccountItemsData] = useState([]);
  const [accountAskedData, setAccountAskedData] = useState([]);
  const [accountBookmarked, setAccountBookmarked] = useState([]);
  const [isAskLoaded, setIsAskLoaded] = useState(false);
  const [isItemsLoaded, setIsItemsLoaded] = useState(false);
  const [isBookmarkLoaded, setIsBookmarkLoaded] = useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = useState('')

  // THIS IS OFFERED/BORROWED DATA
  useEffect(() => {
    if (user === undefined) return;
    handleOfferedLoading(user);
    return () => {
      setIsItemsLoaded(false);
    };
  }, [user, refreshAfterEdit]);

  //THIS IS ASKED DATA
  useEffect(() => {
    if (user === undefined) return;
    handleAskedLoading(user);
    return () => {
      setIsAskLoaded(false);
    };
  }, [user, refreshAfterEdit]);
  // BOOKMARKED LOADING
  useEffect(() => {
    if (user === undefined) return;
    handleBookmarkedLoaded(user);
    return () => {
      setIsBookmarkLoaded(false);
    };
  }, [user, refreshAfterEdit]);

  
  const handleAskedLoading = async (user) => {
    try {
      await getAccountItemsAsked({ _uid: user.uid }).then((res) =>
        setAccountAskedData(res.data)
      );
      setIsAskLoaded(true);
    } catch (e) {
      setIsAskLoaded(true)
      setErrorPlaceholder(e.toString())
      console.log(e);
    }
  };

  const handleOfferedLoading = async (user) => {
    try {
      await getAccountItems({ _uid: user.uid }).then((res) =>
        setAccountItemsData(res.data)
      );
      setIsItemsLoaded(true);
    } catch (e) {
      setIsItemsLoaded(true)
      setErrorPlaceholder(e.toString())
      console.log(e);
    }
  };

  const handleBookmarkedLoaded = async (user) => {
    try {
      await getAccountBookmarked({ _uid: user.uid }).then((res) =>
        setAccountBookmarked(res.data)
      );
      setIsBookmarkLoaded(true);
    } catch (e) {
      setIsBookmarkLoaded(true)
      setErrorPlaceholder(e.toString())
    }
  };

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      navigate("/account-gateway");
    } catch (e) {
      handlePostFailure(e)
      console.log(e);
    }
  };

  const refreshItemsLoaded = () => {
    setIsItemsLoaded(false);
    setTimeout(() => {
      setIsItemsLoaded(true);
    }, 1000);
  };

  return (
    <section className=" grid grid-cols-7 grid-rows-8 lg:grid-rows-6 lg:gap-3 pt-5 max-h-fit h-fit">
      <AccountDashboardSettingsBar handleLogOutUser={handleLogOutUser} />
      <AccountDashboardAsked
        modalDispatch={modalDispatch}
        isAskLoaded={isAskLoaded}
        accountAskedData={accountAskedData}
        errorPlaceholder={errorPlaceholder}
      />
      <AccountDashboardOffered
        refreshItemsLoaded={refreshItemsLoaded}
        isItemsLoaded={isItemsLoaded}
        accountItemsData={accountItemsData}
        modalDispatch={modalDispatch}
        errorPlaceholder={errorPlaceholder}
      />
      <AccountDashboardBookmarked
        modalDispatch={modalDispatch}
        isBookmarkLoaded={isBookmarkLoaded}
        accountBookmarked={accountBookmarked}
        errorPlaceholder={errorPlaceholder}
      />
    </section>
  );
};

export default AccountDashboard;
