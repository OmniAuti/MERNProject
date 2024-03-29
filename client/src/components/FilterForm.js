import { filteredQuery } from "../api/api";
import { useState } from "react";

const FilterForm = ({ handleFilterForm, handlePostFailure }) => {
  const [filterQuery, setFilterQuery] = useState({
    type: "",
    quantity: "",
    condition: "",
    location: "",
    zipcode: "",
    photoFilter: false,
  });

  // THEN FILTERS COMPONET

  const handleQuantitiy = (e) => {
    if (e.target.value.length > 3) return;
    setFilterQuery({ ...filterQuery, quantity: e.target.value });
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    try {
      await filteredQuery(filterQuery).then((res) => {
        if (filterQuery.photoFilter === true) {
          handleFilterForm(
            res.data.filter((item) => item.photoInfo.url !== "")
          );
          console.log(res.data);
        } else if (filterQuery.photoFilter === false) {
          handleFilterForm(res.data);
          console.log(res.data);
        }
      });
    } catch (e) {
      handlePostFailure(e);
      console.log(e);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const clearedSearch = {
        type: "",
        quantity: "",
        condition: "",
        location: "",
        zipcode: "",
        photoFilter: false,
      };
      setFilterQuery(clearedSearch);
      await filteredQuery(clearedSearch).then((res) =>
        handleFilterForm(res.data)
      );
    } catch (e) {
      handlePostFailure(e);
      console.log(e);
    }
  };

  return (
    <form
      className="text-black flex w-full md:w-1/2 lg:w-full mx-auto flex-col items-center"
      onSubmit={(e) => handleQuery(e)}
    >
      <div className="text-white flex flex-col lg:flex-row justify-around items-center w-full mt-2">
        <div className="flex flex-col items-center w-3/4 lg:w-fit justify-around">
          <label className="my-2 text-xl" htmlFor="type">
            Type Of Supplies
          </label>
          <select
            className="text-black text-2xl w-full text-center lg:w-11/12 rounded-sm"
            id="type"
            value={filterQuery.type}
            onChange={(e) =>
              setFilterQuery({ ...filterQuery, type: e.target.value })
            }
          >
            {" "}
            <option value="">Looking for a . . .</option>
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
            <option value="misc. study material">Misc. Study Material</option>
            <option value="sticky note">Sticky Note</option>
            <option value="folder">Folder</option>
            <option value="binder">Binder</option>
            <option value="backpack">Backpack/Bookbag</option>
            <option value="pencil pouch/case">Pencil Pouch/Case</option>
            <option value="lunchbox">Lunchbox</option>
            <option value="highlighter">Highlighter</option>
            <option value="marker">Marker</option>
            <option value="colored pencil">Colored Pencil</option>
            <option value="crayon">Crayon</option>
            <option value="paint brush">Paint Brush</option>
            <option value="calculator">Calculator</option>
            <option value="book">Book</option>
            <option value="misc. books">Misc. Books</option>
          </select>
        </div>
        <div className="flex flex-col items-center justify-around w-3/4 lg:w-fit">
          <label className="my-2 text-xl" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="text-black w-full  text-center lg:w-11/12 text-2xl rounded-sm"
            id="quantity"
            value={filterQuery.quantity}
            onChange={(e) => handleQuantitiy(e)}
            type="number"
            name="quantity"
            max="999"
            min="0"
            maxLength={3}
            placeholder="1"
          />
        </div>
        <div className="flex flex-col items-center justify-around w-3/4 lg:w-fit">
          <label className="my-2 text-xl" htmlFor="condition">
            Condition
          </label>
          <select
            className="text-black w-full text-center  lg:w-11/12 text-2xl rounded-sm"
            id="condition"
            value={filterQuery.condition}
            onChange={(e) =>
              setFilterQuery({ ...filterQuery, condition: e.target.value })
            }
          >
            {" "}
            <option value="">How Used?</option>
            <option value="New">New</option>
            <option value="Slightly Used">Slightly Used</option>
            <option value="Moderately Used">Moderately Used</option>
            <option value="Heavily Used">Heavily Used</option>
          </select>
        </div>
        <div className="flex flex-col items-center justify-around w-3/4 lg:w-fit">
          <label className="my-2 text-xl" htmlFor="location">
            General Location
          </label>
          {/* <input
            className="text-black text-center w-full lg:w-11/12 text-2xl rounded-sm "
            id="location"
            value={filterQuery.location}
            onChange={(e) =>
              setFilterQuery({ ...filterQuery, location: e.target.value })
            }
            type="text"
            name="location"
            maxLength="49"
            placeholder="Somewhere City"
          /> */}

          <select
            className="text-black text-center w-full lg:w-11/12 text-2xl rounded-sm "
            id="location"
            value={filterQuery.location}
            onChange={(e) =>
              setFilterQuery({ ...filterQuery, location: e.target.value })
            }
            type="text"
            name="location"
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
        </div>
        <div className="flex flex-col  items-center justify-around w-3/4 lg:w-fit">
          <label className="my-2 text-xl" htmlFor="zipcode">
            Zipcode
          </label>
          {/* <input
            className="text-black text-center w-full text-2xl rounded-sm "
            id="zipcode"
            value={filterQuery.zipcode}
            onChange={(e) =>
              setFilterQuery({ ...filterQuery, zipcode: e.target.value })
            }
            type="text"
            pattern="[0-9]{5}"
            maxLength="5"
            name="zipcode"
            placeholder="12345"
          /> */}
          <select
            className="text-black text-center w-full text-2xl rounded-sm "
            id="zipcode"
            value={filterQuery.zipcode}
            onChange={(e) =>
              setFilterQuery({ ...filterQuery, zipcode: e.target.value })
            }
            type="text"
            pattern="[0-9]{5}"
            maxLength="5"
            name="zipcode"
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
        </div>
        <div className="flex items-center w-3/4 lg:w-fit justify-around text-center mt-5 flex-col">
          <p className="my-2 text-xl">With or Without Photo</p>
          <div className="flex w-full justify-around items-center">
            <div className="flex items-center ">
              <label htmlFor="with-photo" className="cursor-pointer">
                With
              </label>
              <input
                onChange={(e) =>
                  setFilterQuery({
                    ...filterQuery,
                    photoFilter: true,
                  })
                }
                name="photo"
                id="with-photo"
                type="radio"
                className="ml-2 cursor-pointer"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="without-photo" className="cursor-pointer">
                Either
              </label>
              <input
                defaultChecked
                onChange={(e) =>
                  setFilterQuery({
                    ...filterQuery,
                    photoFilter: false,
                  })
                }
                name="photo"
                id="without-photo"
                type="radio"
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-around">
        <button className="text-white text-center border py-3 mt-7 mx-auto min-w-[200px] rounded-sm w-2/5 hover:bg-white hover:text-sky-900">
          Filter Supplies
        </button>
        <input
          onClick={(e) => handleReset(e)}
          className="text-white text-center border py-3 mt-7 mx-auto rounded-sm w-2/5 min-w-[200px] cursor-pointer hover:bg-white hover:text-sky-900"
          type="reset"
          value="Clear Filters"
        />
      </div>
    </form>
  );
};

export default FilterForm;
