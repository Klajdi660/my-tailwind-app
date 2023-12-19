// import { endpoints } from "../apis";
// import { apiConnector } from "../apiconnector";
// import { setLoading } from "../slices/authSlice";
// import { Dispatch } from 'redux';
// import { AnyAction } from '@reduxjs/toolkit';

// const { 
//     SENDOTP_API
// } = endpoints;

// export const sendotp = (email: string, navigate: Function) => async (dispatch: Dispatch<AnyAction>) => {
//     dispatch(setLoading(true));
//     try {
//         const response = await apiConnector("POST", SENDOTP_API, {
//             email,
//             checkUserPresent: true,
//         });

//         // if (!response.data.error) {
//             //   throw new Error(response.data.message);
//         // }

//         // navigate(path.verifyOTP);
//     } catch (error) {
//         console.log("SENDOTP API ERROR............", error);
//     }

//     dispatch(setLoading(false));
// };