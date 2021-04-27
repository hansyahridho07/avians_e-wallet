import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVoucher } from "../store/action";
import VoucherList from "../components/voucherList";

export default function Home() {
  const dispatch = useDispatch();
  const saldo = useSelector((state) => state.user.saldo);
  const vouchers = useSelector((state) => state.user.vouchers);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchVoucher());
  }, [saldo, dispatch]);

  function payButton(id) {
    axios
      .get("http://localhost:3000/user/transactionBuy", {
        params: { VoucherId: id },
        headers: { access_token: localStorage.getItem("access_token") },
      })
      .then((snapResponse) => {
        window.snap.pay(snapResponse.data.snapToken, {
          onSuccess: function (result) {
            swal("Good job!", "You clicked the button!", "success");
            history.push("/history");
          },
        });
      });
  }
  return (
    <>
      <div
        className="container"
        style={{
          boxShadow: "0px 4px 5px 0px rgba(145,145,145,1)",
          marginTop: "20px",
        }}
      >
        <h1 className="text-center">List Voucher E-Wallet</h1>
        <div className="row">
          {vouchers?.vouchers?.map((el) => (
            <VoucherList key={el.id} data={el} getToken={payButton} />
          ))}
        </div>
      </div>
    </>
  );
}
