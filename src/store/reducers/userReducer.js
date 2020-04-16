import userTypes from "../actions/userTypes";

const initialState = {
  userEmail: "",
  userNumber: "",
  answerSet: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_REGISTER:
      return {
        userEmail: action.payload.email,
        userNumber: action.payload.number
      };

    case userTypes.SET_ANSWER:
      return {
        answerSet: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
