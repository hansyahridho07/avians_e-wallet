const initialState = {
  name: "",
  username: "",
  saldo: "",
  vouchers: [],
  historyVoucher: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "USER/SETNAME":
      return { ...state, name: payload };
    case "USER/SETUSERNAME":
      return { ...state, username: payload };
    case "USER/SETSALDO":
      return { ...state, saldo: payload };
    case "USER/SETVOUCHER":
      return { ...state, vouchers: payload };
    case "USER/SETLISTTRANSACTIONS":
      return { ...state, historyVoucher: payload };
    default:
      return state;
  }
}

export default reducer;
