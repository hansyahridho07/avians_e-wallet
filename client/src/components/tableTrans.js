import convertRupiah from "../helpers/convertRupiah";

export default function TableTrans({ data, no }) {
  function dateBuy() {
    const tanggal = new Date(data.createdAt);
    const hari = tanggal.getDate();
    const bulan = tanggal.getMonth();
    const tahun = tanggal.getFullYear();
    const jam = tanggal.getHours();
    const menit = tanggal.getMinutes();

    return `${hari + 1} - ${bulan + 1} - ${tahun} (${jam}:${menit})`;
  }
  return (
    <>
      <tr>
        <th scope="row">{no + 1}</th>
        <td>Voucher {data.Voucher.voucher_name}</td>
        <td>{convertRupiah(data.Voucher.price)}</td>
        <td>{dateBuy()}</td>
      </tr>
    </>
  );
}
