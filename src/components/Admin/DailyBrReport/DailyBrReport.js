import React from "react";
import { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const DailyBrReport = () => {
  const [reportDate, setReportDate] = useState("");
  const [brReport, setBRReport] = useState([]);
  const manageReportDate = (e) => {
    const d = new Date(e.target.value);
    let dt = d.getDate();
    let mn = d.getMonth() + 1;
    let yy = d.getFullYear();
    setReportDate(
      yy + "-" + (mn <= 9 ? "0" + mn : mn) + "-" + (dt <= 9 ? "0" + dt : dt)
    );
  };
  const handleReport = () => {
    fetch(`http://192.168.200.11:7000/getBRReport/${reportDate}`)
      .then((res) => res.json())
      .then((data) => setBRReport(data));
  };
  return (
    <div>
      <input
        onChange={manageReportDate}
        className="form-control w-25"
        placeholder="yyyy/mm/dd"
        name="date"
        type="date"
        required
      />
      <button className="btn btn-primary" onClick={handleReport}>
        View Report
      </button>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="brReportDaily"
        sheet="brReportDaily"
        buttonText="Download Daily BR Report"
      />
      <div className="m-3">
        <div className="text-center">
          <table id="table-to-xls" className="table bordered table-hover">
            <thead>
              <tr>
                <th
                  Style="color:blue;"
                  className="text-center"
                  colspan="6"
                  scope="colgroup"
                >
                  BA Details
                </th>
                <th
                  colspan="9"
                  scope="colgroup"
                  Style="color:blue;"
                  className="text-center"
                >
                  Data Details
                </th>
                <th
                  colspan="11"
                  scope="colgroup"
                  Style="color:blue;"
                  className="text-center"
                >
                  Call Details
                </th>
                <th
                  colspan="4"
                  scope="colgroup"
                  Style="color:blue;"
                  className="text-center"
                >
                  KPI Details(For Variable Calculation)
                </th>
                <th
                  colspan="5"
                  scope="colgroup"
                  Style="color:blue;"
                  className="text-center"
                >
                  KPI Details (For variable calculation %)
                </th>
              </tr>
              <tr>
                <th className="align-middle">Date</th>
                <th className="align-middle">Micro site LOG IN ID</th>
                <th className="align-middle">Region</th>
                <th className="align-middle">Area</th>
                <th className="align-middle">Territory</th>
                <th className="align-middle">Agency Name</th>

                <th className="align-middle">Total Allocation</th>
                <th className="align-middle">Total Data Achieved</th>
                <th className="align-middle">Total Data Achieved %</th>
                <th className="align-middle">Valid Data</th>
                <th className="align-middle">Valid Data %</th>
                <th className="align-middle">Duplicate Data</th>
                <th className="align-middle">Duplicate Data %</th>
                <th className="align-middle">Error Data</th>
                <th className="align-middle">Error Data %</th>

                <th className="align-middle">Total Dial Call</th>
                <th className="align-middle">Total Connected Call</th>
                <th className="align-middle">Total Connected Call %</th>
                <th className="align-middle">
                  EAS Did not Gave permission to continue call
                </th>
                <th className="align-middle">
                  EAS Gave permission to continue call
                </th>
                <th className="align-middle">Call Continue permission (%)</th>
                <th className="align-middle">Below 18 & Above 35</th>
                <th className="align-middle">EAS is a Non-Smoker</th>
                <th className="align-middle">BA Did not pay Visit</th>
                <th className="align-middle">Total Fake Call</th>
                <th className="align-middle">Fake Call %</th>

                <th className="align-middle">BA Did Visit</th>
                <th className="align-middle">
                  Right SOB/Franchise (Current brand: Navy, Star,Star Next,
                  JPGL,Lucky Strike)
                </th>
                <th className="align-middle">Minimum 1stick purchase</th>
                <th className="align-middle">Brand Message</th>

                <th className="align-middle">BA Did Visit</th>
                <th className="align-middle">
                  Right SOB/Franchise (Current brand: Navy, Star,Star Next,
                  JPGL,Lucky Strike)
                </th>
                <th className="align-middle">Minimum 1stick purchase</th>
                <th className="align-middle">Brand Message</th>
                <th className="align-middle">Total Achivement</th>
              </tr>
            </thead>
            <tbody>
              {brReport.map((query, index) => (
                <tr>
                  <td>{new Date(query.date).toLocaleDateString()}</td>
                  <td>{query.userId}</td>
                  <td>{query.region}</td>
                  <td>{query.area}</td>
                  <td>{query.territory}</td>
                  <td>{query.agencyName}</td>

                  <td>{query.allocated_target}</td>
                  <td>{query.total_data_count}</td>
                  <td>
                    {parseFloat(query.total_data_achived_percentage).toFixed(
                      2
                    ) + "%"}
                  </td>
                  <td>{query.valid_Data_count}</td>
                  <td>{query.valid_data_percentage + "%"}</td>
                  <td>{query.dublicate_Data_count}</td>
                  <td>{query.dublicate_data_percentage + "%"}</td>
                  <td>{query.error_Data_count}</td>
                  <td>{query.error_data_percentage + "%"}</td>

                  <td>{query.total_dial_call}</td>
                  <td>{query.total_connected_call}</td>
                  <td>{query.total_connected_call_percentage + "%"}</td>
                  <td>{query.not_permitted_to_call}</td>
                  <td>{query.permitted_to_call}</td>
                  <td>
                    {parseFloat(query.call_permission_percentage).toFixed(2) +
                      "%"}
                  </td>
                  <td>{query.bellow_18_above_35}</td>
                  <td>{query.non_smoker}</td>
                  <td>{query.ba_did_not_pay_visit}</td>
                  <td>{query.total_fake_call}</td>
                  <td>
                    {parseFloat(query.fake_call_percentage).toFixed(2) + "%"}
                  </td>

                  <td>{query.ba_did_visit}</td>
                  <td>{query.right_franchise}</td>
                  <td>{query.stick_purchase}</td>
                  <td>{query.brand_message}</td>

                  <td>
                    {parseFloat(query.ba_did_visit_percentage).toFixed(2) + "%"}
                  </td>
                  <td>
                    {parseFloat(query.right_sob_percentage).toFixed(2) + "%"}
                  </td>
                  <td>
                    {parseFloat(query.stick_purchase_percentage).toFixed(2) +
                      "%"}
                  </td>
                  <td>
                    {parseFloat(query.brand_message_percentage).toFixed(2) +
                      "%"}
                  </td>
                  <td>
                    {parseFloat(query.total_achivement_average).toFixed(2) +
                      "%"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                  colspan="6"
                >
                  Total
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.total_allocation_sum}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.total_data_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {parseFloat(
                    (brReport[0]?.total_data_sum /
                      brReport[0]?.total_allocation_sum) *
                      100
                  ).toFixed(2) + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.valid_data_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.valid_data_sum_percentage + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.dublicate_data_sum}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.dublicate_data_sum_percentage + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.error_data_sum}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.error_data_sum_percentage + "%"}
                </td>
                <td style={{ fontWeight: "bold", backgroundColor: "yellow" }}>
                  {brReport[0]?.total_dial_call_sum}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.connected_call_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.connected_call_percentage + "%"}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.not_permitted_to_call_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.permitted_to_call_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.call_permission_sum_percentage + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.bellow_18_above_35_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.non_smoker_sum}
                </td>
                <td style={{ fontWeight: "bold", backgroundColor: "yellow" }}>
                  {brReport[0]?.ba_did_not_pay_visit_sum}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.total_fake_call_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.fake_call_sum_percentage + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.ba_did_visit_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.right_franchise_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.stick_purchase_sum}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {brReport[0]?.brand_message_sum}
                </td>

                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {parseFloat(brReport[0]?.ba_did_visit_sum_percentage).toFixed(
                    2
                  ) + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {parseFloat(
                    brReport[0]?.right_franchise_sum_percentage
                  ).toFixed(2) + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {parseFloat(
                    brReport[0]?.stick_purchase_sum_percentage
                  ).toFixed(2) + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {parseFloat(
                    brReport[0]?.brand_message_sum_percentage
                  ).toFixed(2) + "%"}
                </td>
                <td
                  style={{ fontWeight: "bold", backgroundColor: "lightgray" }}
                >
                  {parseFloat(
                    brReport[0]?.tota_achivement_sum_percentage
                  ).toFixed(2) + "%"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyBrReport;
