import * as actionTypes from "./actionTypes.js";

// Authentication

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, userName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    userName: userName,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  // window.location.reload(false);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authSignup = (data, navigate) => {
  return async (dispatch) => {
    dispatch(authStart());

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.firstName + " " + data.lastName,
          phnNumber: data.phnNumber,
          email: data.email,
          password: data.password,
          gender: data.gender,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const expirationDate = new Date(
        new Date().getTime() + responseData.expiresIn * 1000
      );
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", responseData.user._id);
      localStorage.setItem("userName", responseData.user.name);
      dispatch(
        authSuccess(
          responseData.token,
          responseData.user._id,
          responseData.user.name
        )
      );
      dispatch(checkAuthTimeout(responseData.expiresIn));
      navigate("/profile/" + responseData.user._id);
      window.location.reload(false);
    } catch (err) {
      dispatch(authFail(err.message));
    }
  };
};

export const authSignIn = (data, navigate) => {
  return async (dispatch) => {
    dispatch(authStart());

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const expirationDate = new Date(
        new Date().getTime() + responseData.expiresIn * 1000
      );

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", responseData.user._id);
      localStorage.setItem("userName", responseData.user.name);
      dispatch(
        authSuccess(
          responseData.token,
          responseData.user._id,
          responseData.user.name
        )
      );
      dispatch(checkAuthTimeout(responseData.expiresIn));
      navigate("/profile/" + responseData.user._id);
      window.location.reload(false);
    } catch (err) {
      dispatch(authFail(err.message));
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");

        dispatch(authSuccess(token, userId, userName));

        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

// Social Authentication
export const socialAuthStart = () => {
  return {
    type: actionTypes.SOCIAL_AUTH_START,
  };
};

export const socialAuthSuccess = (token, userId, userName) => {
  return {
    type: actionTypes.SOCIAL_AUTH_SUCCESS,
    token: token,
    userId: userId,
    userName: userName,
  };
};

export const socialAuthFail = (error) => {
  return {
    type: actionTypes.SOCIAL_AUTH_FAIL,
    error: error,
  };
};

export const socialAuth = (expires_in, email, name, token, navigate) => {
  return async (dispatch) => {
    dispatch(socialAuthStart());

    try {
      const response = await fetch("http://localhost:5000/api/user/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const expirationDate = new Date(new Date().getTime() + expires_in * 1000);

      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", responseData.user._id);
      localStorage.setItem("userName", responseData.user.name);
      dispatch(
        socialAuthSuccess(token, responseData.user._id, responseData.user.name)
      );
      dispatch(checkAuthTimeout(expires_in));
      navigate("/profile/" + responseData.user._id);
      window.location.reload(false);
    } catch (err) {
      dispatch(socialAuthFail(err.message));
    }
  };
};

//Get selected user /****************************************************************************************************/
export const getSelectedUserStart = () => {
  return {
    type: actionTypes.GET_SELECTED_USER_START,
  };
};

export const getSelectedUserSuccess = (data) => {
  return {
    type: actionTypes.GET_SELECTED_USER_SUCCESS,
    data: data,
  };
};

export const getSelectedUserFail = (error) => {
  return {
    type: actionTypes.GET_SELECTED_USER_FAIL,
    error: error,
  };
};

export const getSelectedUser = (userId) => {
  return async (dispatch) => {
    dispatch(getSelectedUserStart());

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/getselecteduser/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(getSelectedUserSuccess(responseData.user));
    } catch (err) {
      dispatch(getSelectedUserFail(err.message));
    }
  };
};

//Update selected user /****************************************************************************************************/
export const updateSelectedUserStart = () => {
  return {
    type: actionTypes.UPDATE_SELECTED_USER_START,
  };
};

export const updateSelectedUserSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_SELECTED_USER_SUCCESS,
    data: data,
  };
};

export const updateSelectedUserFail = (error) => {
  return {
    type: actionTypes.UPDATE_SELECTED_USER_FAIL,
    error: error,
  };
};

export const updateSelectedUser = (data) => {
  return async (dispatch) => {
    dispatch(updateSelectedUserStart());

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/updateselecteduser",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            phnNumber: data.phnNumber,
            gender: data.gender,
            address_one: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(updateSelectedUserSuccess(responseData.user));
    } catch (err) {
      dispatch(updateSelectedUserFail(err.message));
    }
  };
};

//Update user image /****************************************************************************************************/
export const updateUserImageStart = () => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE_START,
  };
};

export const updateUserImageSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE_SUCCESS,
    data: data,
  };
};

export const updateUserImageFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE_FAIL,
    error: error,
  };
};

export const updateUserImage = (userid, image) => {
  return async (dispatch) => {
    dispatch(updateUserImageStart());

    try {
      const formData = new FormData();

      formData.append("image", image);

      const response = await fetch(
        "http://localhost:5000/api/user/updateimage/" + userid,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(updateUserImageSuccess(responseData.user));
    } catch (err) {
      dispatch(updateUserImageFail(err.message));
    }
  };
};
