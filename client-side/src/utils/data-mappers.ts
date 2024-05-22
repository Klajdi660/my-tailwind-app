// import camelCaseKeys from "camelcase-keys";
// import { Paginator } from "../types";

// export const mapPaginatorData = (obj: Paginator | undefined) => {
//   if (!obj) return null;

//   const { data, ...formattedValues } = camelCaseKeys(obj);

//   return {
//     ...formattedValues,
//     hasMorePages: formattedValues.lastPage !== formattedValues.currentPage,
//     firstItem: formattedValues.from,
//     lastItem: formattedValues.to,
//   };
// };
