import convertRupiah from "../helpers/convertRupiah";

export default function VoucherList({ data, getToken }) {
  return (
    <>
      <div
        className="card"
        style={{ width: "18rem", margin: "10px 10px 20px 60px" }}
      >
        <div className="card-body">
          <h5 className="card-title">
            Voucher {convertRupiah(data.voucher_name)}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Price: {convertRupiah(data.price)}
          </h6>
          <p className="card-text">Voucher E-Wallet</p>
          <button className="btn btn-primary" onClick={() => getToken(data.id)}>
            Buy
          </button>
        </div>
      </div>
    </>
  );
}
