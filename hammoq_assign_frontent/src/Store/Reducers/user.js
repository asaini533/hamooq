import { updatedObject } from "../Utility";
import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  userName: null,
  user: null,
};

const authStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.token,
    userId: action.userId,
    userName: action.userName,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updatedObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updatedObject(state, {
    token: null,
    userId: null,
    userName: null,
  });
};

// Social Authentication
const socialAuthStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const socialAuthSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.token,
    userId: action.userId,
    userName: action.userName,
    error: null,
    loading: false,
  });
};

const socialAuthFail = (state, action) => {
  return updatedObject(state, { error: action.error, loading: false });
};

// Get selected user
const getSelectedUserStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const getSelectedUserSuccess = (state, action) => {
  return updatedObject(state, {
    user: action.data,
    error: null,
    loading: false,
  });
};

const getSelectedUserFail = (state, action) => {
  return updatedObject(state, { error: action.error, loading: false });
};

// Update selected user
const updateSelectedUserStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const updateSelectedUserSuccess = (state, action) => {
  return updatedObject(state, {
    user: action.data,
    error: null,
    loading: false,
  });
};

const updateSelectedUserFail = (state, action) => {
  return updatedObject(state, { error: action.error, loading: false });
};

// Update user image
const updateUserImageStart = (state, action) => {
  return updatedObject(state, { error: null });
};

const updateUserImageSuccess = (state, action) => {
  return updatedObject(state, {
    user: action.data,
    error: null,
    loading: false,
  });
};

const updateUserImageFail = (state, action) => {
  return updatedObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SOCIAL_AUTH_START:
      return socialAuthStart(state, action);
    case actionTypes.SOCIAL_AUTH_SUCCESS:
      return socialAuthSuccess(state, action);
    case actionTypes.SOCIAL_AUTH_FAIL:
      return socialAuthFail(state, action);

    case actionTypes.GET_SELECTED_USER_START:
      return getSelectedUserStart(state, action);
    case actionTypes.GET_SELECTED_USER_SUCCESS:
      return getSelectedUserSuccess(state, action);
    case actionTypes.GET_SELECTED_USER_FAIL:
      return getSelectedUserFail(state, action);

    case actionTypes.UPDATE_SELECTED_USER_START:
      return updateSelectedUserStart(state, action);
    case actionTypes.UPDATE_SELECTED_USER_SUCCESS:
      return updateSelectedUserSuccess(state, action);
    case actionTypes.UPDATE_SELECTED_USER_FAIL:
      return updateSelectedUserFail(state, action);

    case actionTypes.UPDATE_USER_IMAGE_START:
      return updateUserImageStart(state, action);
    case actionTypes.UPDATE_USER_IMAGE_SUCCESS:
      return updateUserImageSuccess(state, action);
    case actionTypes.UPDATE_USER_IMAGE_FAIL:
      return updateUserImageFail(state, action);

    default:
      return state;
  }
};

export default reducer;
