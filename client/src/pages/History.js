import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListTransactions, fetchUser } from "../store/action";
import TableTrans from "../components/tableTrans";

export default function History() {
  const listTrans = useSelector((state) => state.user.historyVoucher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListTransactions());
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <div className="container" style={{ width: "800px" }}>
        <h1 className="text-center">History Transactions</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Voucher Name</th>
              <th scope="col">Price</th>
              <th scope="col">Time</th>
              {/* <th scope="col">Handle</th> */}
            </tr>
          </thead>
          <tbody>
            {listTrans.map((el, no) => (
              <TableTrans key={no} data={el} no={no} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
