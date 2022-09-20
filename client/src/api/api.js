import axios from "axios";

const url = "/api/v1/items";
const urlTwo = "/api/v1/items/filter";
const urlThree = "/api/v1/items/ask";
const urlFour = "/api/v1/items/modal";
const urlFive = "/api/v1/items/account-items";
const urlSix = "/api/v1/items/account-asked";
const urlSeven = "/api/v1/items/bookmarked";
const urlEight = "/api/v1/items/delete-single-item";
const urlNine = "/api/v1/items/get-asked-items";
const urlTen = "/api/v1/items/bookmarked-account";
const urlEleven = "/api/v1/items/single-ask-item";
const urlTwelve = "/api/v1/items/account-offered-edit";
const urlThirteen = "/api/v1/items/account-asked-edit";
const urlFourteen = "/api/v1/items/delete-all-account-data";
const urlFifteen = "/api/v1/items/filter-asked";
const urlSixteen = "/api/v1/items/bookmark-ask-item";
const urlSeventeen = "/api/v1/items/attach-photo-info";

export const fetchAllItems = async () => {
  return axios.get(url);
};
export const postSingleItem = async (item) => {
  return axios.post(url, item);
};

export const filteredQuery = async (params) => {
  return axios.get(urlTwo, { params: params });
};

export const filteredAskedQuery = async (params) => {
  return axios.get(urlFifteen, { params: params });
};

export const postAskItem = (askItem) => {
  return axios.post(urlThree, askItem);
};

export const getSingleItem = async (id) => {
  return axios.get(urlFour, { params: id });
};
export const getSingleItemAsk = async (id) => {
  return axios.get(urlEleven, { params: id });
};

export const getAccountItems = async (_uid) => {
  return axios.get(urlFive, { params: _uid });
};
export const getAccountItemsAsked = async (_uid) => {
  return axios.get(urlSix, { params: _uid });
};

export const addBookmark = async (bookmark) => {
  return axios.put(urlSeven, bookmark);
};

export const deleteSingleItem = async (id) => {
  return axios.delete(urlEight, { data: { _id: id } });
};

export const getAskedForItems = async () => {
  return axios.get(urlNine);
};

export const getAccountBookmarked = async (uid) => {
  return axios.get(urlTen, { params: uid });
};

export const editAccountOffered = async (data) => {
  return axios.put(urlTwelve, data);
};

export const editAccountAsked = async (data) => {
  return axios.put(urlThirteen, data);
};

export const deleteAllAccountData = async (id) => {
  return axios.delete(urlFourteen, { data: { uid: id } });
};

export const bookmarkAskItem = async (bookmark) => {
  return axios.put(urlSixteen, bookmark)
}

export const attachPhotoInfo = async (imageInfoObj) => {
  return axios.put(urlSeventeen, imageInfoObj)
}