export const getUser = ({ commit }, user) => {
  commit("SET_USER", user);
};

export const getUserID = ({ commit }, userID) => {
  commit("SET_USER_ID", userID);
};

export const getPhotoURL = ({ commit }, url) => {
  commit("SET_PHOTO_URL", url);
};
