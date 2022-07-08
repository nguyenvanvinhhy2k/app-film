let user = localStorage.getItem("user");
let userID = localStorage.getItem("userID");
let photoURL = localStorage.getItem("photoURL");

export default {
  user: user ? JSON.parse(user) : null,
  userID: userID ? JSON.parse(userID) : null,
  photoURL: photoURL ? JSON.parse(photoURL) : null,
};
