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
//         console.log("SENDOTP API RESPONSE............", response);

//         // console.log(response.data.error);

//         // if (!response.data.error) {
//             //   throw new Error(response.data.message);
//         // }

//         console.log("OTP Sent Successfully");
//         // navigate(path.verifyOTP);
//     } catch (error) {
//         console.log("SENDOTP API ERROR............", error);
//     }

//     dispatch(setLoading(false));
// };