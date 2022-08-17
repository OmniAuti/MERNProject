import {useState, useEffect} from 'react'
import { editAccountOffered } from "../api/api";


const ModalEditOffer = ({data,handleItemRefreshAfterEdit,handleCloseModal}) => {

      const [formData, setFormData] = useState({
          type: "",
          quantity: 1,
          description: "",
          condition: "",
          location: "",
          zipcode: "",
          postType: "",
          _uid: "",
          bookmarked: "",
          _id:"",
        });
    
        useEffect(() => {
          setFormData({
            type: data.type,
            quantity: data.quantity,
            description: data.description,
            condition: data.condition,
            location: data.location,
            zipcode: data.zipcode,
            postType: data.postType,
            _uid: data.uid,
            bookmarked: data.bookmarked,
            _id:data._id,
          });
        }, [data])
    
      //  APPENDING FIREBASE USER ID ONTO ITEM POST
    
      const handleTypeChange = (e) => {
        setFormData({ ...formData, type: e.target.value });
      };
      const handleDescriptionChange = (e) => {
        setFormData({ ...formData, description: e.target.value });
      };
      const handleQuantityChange = (e) => {
        if (e.target.value.length > 3) return;
        setFormData({ ...formData, quantity: e.target.value });
      };
      const handleConditionChange = (e) => {
        setFormData({ ...formData, condition: e.target.value });
      };
      const handleLocationChange = (e) => {
        setFormData({ ...formData, location: e.target.value });
      };
      const handleZIPChange = (e) => {
        setFormData({ ...formData, zipcode: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await editAccountOffered(formData);
          handleItemRefreshAfterEdit() 
          e.target.reset();
          setFormData({
            type: "",
            quantity: 1,
            description: "",
            condition: "",
            location: "",
            zipcode: "",
            postType: data.postType,
            _uid: "",
            bookmarked: data.bookmarked,
            _id: "",
          });
    
          // MAKE SOMETHING IN HERE THAT LEAVES A CHECK MARK FOR SUCCESSFUL EDIT BEFORE CLOSE
          handleCloseModal()
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <form
                onSubmit={(e) => handleSubmit(e)}
                className="text-black w-full mx-auto"
              >
                <legend className="text-black text-xl mb-2 underline underline-offset-1">Offer Item Edit: </legend>

                <label htmlFor="type" className="text-black">Type of supplies</label>
                <select
                  id="type"
                  className="w-full p-1 my-1 mb-3 text-center rounded-md border"
                  required
                  onChange={(e) => handleTypeChange(e)}
                  value={formData.type}
                >
                  <option value="">Select A Type Of Supplies</option>
                  <option value="pencil">Pencil</option>
                  <option value="pen">Pen</option>
                  <option value="ruler">Ruler</option>
                  <option value="protractor">Protractor</option>
                  <option value="notebook">Notebook</option>
                  <option value="graphing paper">Graphing Paper</option>
                  <option value="colored paper">Colored Paper</option>
                  <option value="notecard/flashcard">Notecard/Flashcard</option>
                  <option value="sticky note">Sticky Note</option>
                  <option value="folder">Folder</option>
                  <option value="binder">Binder</option>
                  <option value="backpack">Backpack</option>
                  <option value="pencil pouch/case">Pencil Pouch/Case</option>
                  <option value="lunchbox">Lunchbox</option>
                  <option value="highlighter">Highlighter</option>
                  <option value="marker">Marker</option>
                  <option value="colored pencil">Colored Pencil</option>
                  <option value="crayon">Crayon</option>
                  <option value="calculator">Calculator</option>
                </select>
                <label htmlFor="description" className="text-black">Description</label>
                <input
                  id="description"
                  onChange={(e) => handleDescriptionChange(e)}
                  className="block w-full p-1 my-1 mb-3 text-center rounded-md border"
                  type="text"
                  name="type"
                  maxLength="49"
                  value={formData.description}
                  placeholder="This has . . ."
                />
                <label htmlFor="quantity" className="text-black">Quantity</label>
                <input
                  id="quantity"
                  required
                  onChange={(e) => handleQuantityChange(e)}
                  className="block w-1/2 mx-auto p-1 my-1 mb-3 text-center rounded-md border"
                  type="number"
                  name="quantity"
                  max="999"
                  min="1"
                  value={formData.quantity}
                />
                <label htmlFor="condition" className="text-black">Condition</label>
                <select
                  id="condition"
                  required
                  onChange={(e) => handleConditionChange(e)}
                  className="block w-full p-1 my-1 mb-3 text-center rounded-md border"
                  value={formData.condition}
                >
                  <option default value="">
                    Select Condition Of Supplies
                  </option>
                  <option default value="new">
                    New
                  </option>
                  <option value="slightly used">Slightly Used</option>
                  <option value="moderately used">Moderately Used</option>
                  <option value="heavily used">Heavily Used</option>
                </select>
                <label htmlFor="location" className="text-black">General Location</label>
                <input
                  id="location"
                  required
                  onChange={(e) => handleLocationChange(e)}
                  className="block w-full p-1 my-1 mb-3 text-center rounded-md border"
                  type="text"
                  name="location"
                  maxLength="49"
                  value={formData.location}
                  placeholder="Somewhere City"
                />
                <label htmlFor="zipcode" className="text-black">Zipcode</label>
                <input
                  id="zipcode"
                  required
                  onChange={(e) => handleZIPChange(e)}
                  className="block w-full p-1 my-1 mb-3 text-center rounded-md border"
                  type="text"
                  pattern="[0-9]{5}"
                  maxLength="5"
                  name="zipcode"
                  value={formData.zipcode}
                  placeholder="12345"
                />
                <input
                  value="Save Changes"
                  type="submit"
                  className="bg-sky-500 w-full h-10 my-2 rounded-sm hover:bg-sky-900 cursor-pointer"
                />
              </form>
    )
}

export default ModalEditOffer;