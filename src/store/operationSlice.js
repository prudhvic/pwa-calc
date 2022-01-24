import { createSlice } from "@reduxjs/toolkit";
let operationSlice = createSlice({
  name: "caluclator",
  initialState: {
    resultList: [],
    result: "",
  },
  reducers: {
    calculate(state, action) {
      console.log(state.resultList);
      state.resultList.push(action.payload);

      let isvalid =
        state.resultList[0] === "+" ||
        state.resultList[0] === "-" ||
        state.resultList[0] === "*" ||
        state.resultList[0] === "/" ||
        state.resultList[0] === "." ||
        state.resultList[0] === "%";
      if (isvalid) {
        state.resultList = [];
      } else {
        state.result = state.resultList.join("");
      }
      //   console.log(state.resultList);
    },
    resultDeclare(state, action) {
      state.result = eval(state.result);
      state.resultList = [];
      state.resultList.push(state.result);
    },
    clearItem(state) {
      state.resultList = [];
      state.result = "";
    },
    clearLastItem(state) {
      state.resultList.pop();
      state.result = state.result.slice(0, -1);
    },
  },
});
export let calculateActions = operationSlice.actions;
export default operationSlice.reducer;
