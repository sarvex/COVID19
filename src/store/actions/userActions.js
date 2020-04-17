import userTypes from "./userTypes";

export const userRegister = userData => ({
  type: userTypes.USER_REGISTER,
  payload: userData
});

export const setAnswer = answerData => ({
  type: userTypes.SET_ANSWER,
  payload: answerData
});
