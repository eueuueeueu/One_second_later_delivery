import { getUserInfo } from '@/services';
import { AppDispatch } from '../..';
import { UserActionTypes } from './types';

// action creator
export const setUserInfo = (userInfo: API.HomeUserData) => {
  return {
    type: UserActionTypes.SET_USER_INFO,
    payload: userInfo,
  };
};

export const fetchUserInfo = () => {
  return async function (dispatch: AppDispatch) {
    const result = await getUserInfo();
    dispatch(setUserInfo(result.data));
  };
};
export type UserAction = ReturnType<typeof setUserInfo>;
