import { useState, useEffect } from "react";
import { postAskItem } from "../api/api";
import Loading from "./Loading";

import SuccessfulPost from "./SuccessfulPost";

import { UserAuth } from "../context/AuthContext";

const AskItemForm = ({ handleUpdateAfterPost, handlePostFailure }) => {
  const { user } = UserAuth();
  const [postSuccess, setPostSuccess] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [acceptableConditionCheck, setAcceptableConditionCheck] =
    useState(false);
  const [askObj, setAskObj] = useState({
    who: "",
    type: "",
    quantity: 1,
    specify: "",
    condition: [],
    location: "",
    zipcode: "",
    postType: "ask",
    _uid: "",
  });
  const handleCloceSuccessfulPost = () => {
    setPostSuccess(false);
  };
  const handleConditionCheck = () => {
    setAcceptableConditionCheck(false);
  };

  const handleUIDChange = async (user) => {
    if (!user) return;
    try {
      if (user.uid === undefined) return;
      var uid = await user.uid;
      setAskObj({ ...askObj, _uid: uid });
    } catch (e) {
      console.log(e);
    }
  };

  const handleQuantityChange = (e) => {
    if (e.target.value.length > 3) return;
    setAskObj({ ...askObj, quantity: e.target.value });
  };

  useEffect(() => {
    handleUIDChange(user);
  }, [askObj.type]);

  const checkBoxArr = [
    { id: 1, value: "New", checked: false },
    { id: 2, value: "Slightly Used", checked: false },
    { id: 3, value: "Moderately Used", checked: false },
    { id: 4, value: "Heavily Used", checked: false },
  ];

  const handleCheckBoxes = (e) => {
    if (e.target.checked === true) {
      setAskObj({
        ...askObj,
        condition: [...askObj.condition, `${e.target.value}, `],
      });
    } else if (e.target.checked === false) {
      const idx = askObj.condition.indexOf(`${e.target.value}, `);
      const arr = askObj.condition;
      arr.splice(idx, 1);
      setAskObj({ ...askObj, condition: arr });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (askObj.condition.length <= 0) {
      setAcceptableConditionCheck(true);
      e.target.reset();
      setAskObj({
        who: "",
        type: "",
        quantity: 1,
        specify: "",
        condition: [],
        location: "",
        zipcode: "",
        postType: "ask",
        _uid: "",
      });
      return;
    }
    try {
      setPostLoading(true);
      await postAskItem(askObj);
      setPostLoading(false);
      handleUpdateAfterPost();
      setPostSuccess(true);
      e.target.reset();
      setAskObj({
        who: "",
        type: "",
        quantity: 1,
        specify: "",
        condition: [],
        location: "",
        zipcode: "",
        postType: "ask",
        _uid: "",
      });
    } catch (err) {
      setPostLoading(false);
      handlePostFailure(err);
      console.log(err);
    }
  };
  return (
    <div className="relative text-center block sm:w-3/4 w-full lg:w-1/2 xl:w-1/3 mx-auto xl:mx-auto lg:ml-5 max-h-screen h-[750px] min-h-[750px]">
      {acceptableConditionCheck ? (
        <div className="h-fit p-3 w-screen -ml-5 sm:w-[400px] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2  sm:mx-auto bg-white rounded-sm ">
          <div className="relative w-full h-fit rounded-md overflow-hidden py-2">
            <img
              className="w-[150px] mx-auto my-10"
              src="/imgs/error.svg"
              alt="Post Edit Saved Successfully Icon"
            />
            <p className="text-black text-3xl mb-3">
              Please Enter An{" "}
              <span className="text-black underline underline-offset-2">
                Acceptable Condition
              </span>{" "}
              For This Item
            </p>
            <button
              onClick={handleConditionCheck}
              className="w-full h-10 bg-gray-400 rounded-sm rounded-bl-sm hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl underline mb-5">Ask For Supplies</h2>
          {postLoading && (
            <div className="absolute bg-black w-full h-full">
              {" "}
              <Loading
                background={"bg-black"}
                outerBackground={"bg-white"}
                fontColor={"bg-black"}
              />
            </div>
          )}
          {!postSuccess && (
            <form
              className="text-white text-xl"
              onSubmit={(e) => handleSubmit(e)}
            >
              <label htmlFor="who">I am a . . .</label>
              <select
                onChange={(e) => setAskObj({ ...askObj, who: e.target.value })}
                id="who"
                name="who"
                className="w-full text-black h-10 my-2 pl-1 text-center rounded-md"
                required
                value={setAskObj.who}
              >
                <option default value="">
                  Who Are You?
                </option>
                <option default value="Teacher">
                  Teacher
                </option>

                <option value="Parent">Parent</option>
              </select>
              <label htmlFor="type">In need of a . . .</label>
              <select
                value={askObj.type}
                id="type"
                className="w-full text-black h-10 my-2 pl-1 text-center rounded-md"
                required
                onChange={(e) => setAskObj({ ...askObj, type: e.target.value })}
              >
                <option value="">Select A Type Of Supplies</option>
                <option value="pencil">Pencil</option>
                <option value="pen">Pen</option>
                <option value="ruler">Ruler</option>
                <option value="protractor">Protractor</option>
                <option value="notebook">Notebook</option>
                <option value="journal">Journal</option>
                <option value="graphing paper">Graphing Paper</option>
                <option value="colored paper">Colored Paper</option>
                <option value="notecard">Notecards</option>
                <option value="flashcard">Flashcards</option>
                <option value="misc. study material">
                  Misc. Study Material
                </option>
                <option value="sticky note">Sticky Note</option>
                <option value="folder">Folder</option>
                <option value="binder">Binder</option>
                <option value="backpack">Backpack/Bookbag</option>
                <option value="pencil pouch/case">Pencil Pouch/Case</option>
                <option value="lunchbox">Lunchbox</option>
                <option value="highlighter">Highlighter</option>
                <option value="marker">Marker</option>
                <option value="colored pencil">Colored Pencil</option>
                <option value="paint brush">Paint Brush</option>
                <option value="crayon">Crayon</option>
                <option value="calculator">Calculator</option>
                <option value="book">Book</option>
                <option value="misc. books">Misc. Books</option>
              </select>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                required
                className="block w-1/2 h-10 text-black my-2 mx-auto pl-1 text-center rounded-md"
                type="number"
                name="quantity"
                max="999"
                min="1"
                value={askObj.quantity}
                onChange={(e) => handleQuantityChange(e)}
              />
              <label htmlFor="specify">Needed For . . .</label>
              <input
                id="specify"
                required
                className="block w-full text-black h-10 my-2 pl-1 text-center rounded-md"
                type="text"
                name="specify"
                maxLength="49"
                onChange={(e) =>
                  setAskObj({ ...askObj, specify: e.target.value })
                }
                placeholder="This is for . . ."
              />

              <label
                htmlFor="condition"
                className="underline underline-offset-2"
              >
                Acceptable Condition
              </label>
              <div className="flex flex-wrap items-center justify-around mb-7 mx-5">
                {checkBoxArr.map((checkbox) => {
                  return (
                    <div
                      className="mt-4 h-1 mb-3 cursor-pointer"
                      key={checkbox.id}
                    >
                      <label
                        className="mr-2 cursor-pointer"
                        htmlFor={checkbox.value}
                      >
                        {checkbox.value}
                      </label>
                      <input
                        onChange={(e) => handleCheckBoxes(e)}
                        id={checkbox.value}
                        type="checkbox"
                        value={checkbox.value}
                        className="cursor-pointer text-black"
                      />
                    </div>
                  );
                })}
              </div>
              <label htmlFor="location">General Location</label>
              {/* <input
                id="location"
                required
                className="block w-full h-10 my-2 pl-1 text-center rounded-md"
                type="text"
                name="location"
                maxLength="49"
                onChange={(e) =>
                  setAskObj({ ...askObj, location: e.target.value })
                }
                placeholder="Somewhere City"
              /> */}
              <select
                id="location"
                required
                className="block w-full text-black h-10 my-2 pl-1 text-center rounded-md"
                type="text"
                name="location"
                onChange={(e) =>
                  setAskObj({ ...askObj, location: e.target.value })
                }
              >
                <option value="">Select Neighborhood</option>
                <option value="Rogers Park">Rogers Park</option>
                <option value="West Ridge">West Ridge</option>
                <option value="Uptown">Uptown</option>
                <option value="Lincoln Square">Lincoln Square</option>
                <option value="Edison Park">Edison Park</option>
                <option value="Norwood Park">Norwood Park</option>
                <option value="Jefferson Park">Jefferson Park</option>
                <option value="Forest Glen">Forest Glen</option>
                <option value="North Park">North Park</option>
                <option value="Albany Park">Albany Park</option>
                <option value="O'Hare">O’Hare</option>
                <option value="Edgewater">Edgewater</option>
                <option value="North Center">North Center</option>
                <option value="Lakeview">Lakeview</option>
                <option value="Lincoln Park">Lincoln Park</option>
                <option value="Avondale">Avondale</option>
                <option value="Logan Square">Logan Square</option>
                <option value="Portage Park">Portage Park</option>
                <option value="Irving Park">Irving Park</option>
                <option value="Dunning">Dunning</option>
                <option value="Montclare">Montclare</option>
                <option value="Belmont Cragin">Belmont Cragin</option>
                <option value="Hermosa">Hermosa</option>
                <option value="Near North Side">Near North Side</option>
                <option value="Loop">Loop</option>
                <option value="Near South Side">Near South Side</option>
                <option value="Humboldt Park">Humboldt Park</option>
                <option value="West Town">West Town</option>
                <option value="Austin">Austin</option>
                <option value="West Garfield Park">West Garfield Park</option>
                <option value="East Garfield Park">East Garfield Park</option>
                <option value="Near West Side">Near West Side</option>
                <option value="North Lawndale">North Lawndale</option>
                <option value="South Lawndale">South Lawndale</option>
                <option value="Lower West Side">Lower West Side</option>
                <option value="Garfield Ridge">Garfield Ridge</option>
                <option value="Archer Heights">Archer Heights</option>
                <option value="Brighton Park">Brighton Park</option>
                <option value="McKinley Park">McKinley Park</option>
                <option value="New City">New City</option>
                <option value="West Elsdon">West Elsdon</option>
                <option value="Gage Park">Gage Park</option>
                <option value="Clearing">Clearing</option>
                <option value="West Lawn">West Lawn</option>
                <option value="Chicago Lawn">Chicago Lawn</option>
                <option value="West Englewood">West Englewood</option>
                <option value="Englewood">Englewood</option>
                <option value="Armour Square">Armour Square</option>
                <option value="Douglas">Douglas</option>
                <option value="Oakland">Oakland</option>
                <option value="Fuller Park">Fuller Park</option>
                <option value="Grand Boulevard">Grand Boulevard</option>
                <option value="Kenwood">Kenwood</option>
                <option value="Washington Park">Washington Park</option>
                <option value="Hyde Park">Hyde Park</option>
                <option value="Woodlawn">Woodlawn</option>
                <option value="South Shore">South Shore</option>
                <option value="Bridgeport">Bridgeport</option>
                <option value="Greater Grand Crossing">
                  Greater Grand Crossing
                </option>
                <option value="Ashburn">Ashburn</option>
                <option value="Auburn Gresham">Auburn Gresham</option>
                <option value="Beverly">Beverly</option>
                <option value="Washington Heights">Washington Heights</option>
                <option value="Mount Greenwood">Mount Greenwood</option>
                <option value="Morgan Park">Morgan Park</option>
                <option value="Chatham">Chatham</option>
                <option value="Avalon Park">Avalon Park</option>
                <option value="South Chicago">South Chicago</option>
                <option value="Burnside">Burnside</option>
                <option value="Calumet Heights">Calumet Heights</option>
                <option value="Roseland">Roseland</option>
                <option value="Pullman">Pullman</option>
                <option value="South Deering">South Deering</option>
                <option value="East Side">East Side</option>
                <option value="West Pullman">West Pullman</option>
                <option value="Riverdale">Riverdale</option>
                <option value="Hegewisch">Hegewisch</option>
              </select>
              <label htmlFor="zipcode">Zipcode</label>
              {/* <input
                id="zipcode"
                required
                className="block w-full h-10 my-2 pl-1 text-center rounded-md"
                type="text"
                pattern="[0-9]{5}"
                maxLength="5"
                name="zipcode"
                onChange={(e) =>
                  setAskObj({ ...askObj, zipcode: e.target.value })
                }
                placeholder="12345"
              /> */}
              <select
                id="zipcode"
                required
                className="block w-full text-black h-10 my-2 pl-1 text-center rounded-md"
                type="text"
                pattern="[0-9]{5}"
                maxLength="5"
                name="zipcode"
                onChange={(e) =>
                  setAskObj({ ...askObj, zipcode: e.target.value })
                }
              >
                
                <option value="">Select ZIP Code</option>
                <option value="60290">60290</option>
                <option value="60601">60601</option>
                <option value="60602">60602</option>
                <option value="60603">60603</option>
                <option value="60604">60604</option>
                <option value="60605">60605</option>
                <option value="60606">60606</option>
                <option value="60607">60607</option>
                <option value="60608">60608</option>
                <option value="60610">60610</option>
                <option value="60611">60611</option>
                <option value="60614">60614</option>
                <option value="60615">60615</option>
                <option value="60618">60618</option>
                <option value="60619">60619</option>
                <option value="60622">60622</option>
                <option value="60623">60623</option>
                <option value="60624">60624</option>
                <option value="60628">60628</option>
                <option value="60609">60609</option>
                <option value="60612">60612</option>
                <option value="60613">60613</option>
                <option value="60616">60616</option>
                <option value="60617">60617</option>
                <option value="60620">60620</option>
                <option value="60621">60621</option>
                <option value="60625">60625</option>
                <option value="60626">60626</option>
                <option value="60629">60629</option>
                <option value="60630">60630</option>
                <option value="60632">60632</option>
                <option value="60636">60636</option>
                <option value="60637">60637</option>
                <option value="60631">60631</option>
                <option value="60633">60633</option>
                <option value="60634">60634</option>
                <option value="60638">60638</option>
                <option value="60641">60641</option>
                <option value="60642">60642</option>
                <option value="60643">60643</option>
                <option value="60646">60646</option>
                <option value="60647">60647</option>
                <option value="60652">60652</option>
                <option value="60653">60653</option>
                <option value="60656">60656</option>
                <option value="60660">60660</option>
                <option value="60661">60661</option>
                <option value="60664">60664</option>
                <option value="60639">60639</option>
                <option value="60640">60640</option>
                <option value="60644">60644</option>
                <option value="60645">60645</option>
                <option value="60649">60649</option>
                <option value="60651">60651</option>
                <option value="60654">60654</option>
                <option value="60655">60655</option>
                <option value="60657">60657</option>
                <option value="60659">60659</option>
                <option value="60666">60666</option>
                <option value="60668">60668</option>
                <option value="60673">60673</option>
                <option value="60677">60677</option>
                <option value="60669">60669</option>
                <option value="60670">60670</option>
                <option value="60674">60674</option>
                <option value="60675">60675</option>
                <option value="60678">60678</option>
                <option value="60680">60680</option>
                <option value="60681">60681</option>
                <option value="60682">60682</option>
                <option value="60686">60686</option>
                <option value="60687">60687</option>
                <option value="60688">60688</option>
                <option value="60689">60689</option>
                <option value="60694">60694</option>
                <option value="60695">60695</option>
                <option value="60697">60697</option>
                <option value="60699">60699</option>
                <option value="60684">60684</option>
                <option value="60685">60685</option>
                <option value="60690">60690</option>
                <option value="60691">60691</option>
                <option value="60693">60693</option>
                <option value="60696">60696</option>
                <option value="60701">60701</option>
              </select>
              <input
                value="Ask For Supplies"
                type="submit"
                className="text-white w-full cursor-pointer hover:bg-sky-900 bg-sky-500 px-10 py-2 mt-5 rounded-md"
              />
            </form>
          )}
          {postSuccess && (
            <SuccessfulPost
              handleCloceSuccessfulPost={handleCloceSuccessfulPost}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AskItemForm;
