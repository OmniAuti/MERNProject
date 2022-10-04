export const modalReducer = (state, action) => {
  switch (action.type) {
    case "MODAL-offer":
      return {
        modalId: action.payload,
        active: !state.active,
        modalType: "singleFocusOffer",
      };
    case "MODAL-ask":
      return {
        modalId: action.payload,
        active: !state.active,
        modalType: "singleFocusAsk",
      };
    case "ACCOUNT_MODAL-offer":
      return {
        modalId: action.payload,
        active: !state.active,
        modalType: "accountEditOffer",
      };
    case "ACCOUNT_MODAL-ask":
      return {
        modalId: action.payload,
        active: !state.active,
        modalType: "accountEditAsk",
      };
    case "DELETE_SINGLE_POST":
      return {
        modalId: action.payload,
        active: !state.active,
        modalType: "deleteSinglePost",
      };
  }
};

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return { settingsType: "email", active: true };
    case "PASSWORD":
      return { settingsType: "password", active: true };
    case "DELETE":
      return { settingsType: "delete", active: true };
    case "CLOSE":
      return { settingsType: "", active: false };
  }
};

export const inquireReducer = (stateInquire, action) => {
  switch (action.type) {
    case "CHAT-INQUIRE":
      return {
        postData: action.payload.postData,
        userData: action.payload.userData,
      };
  }
};
