import React, { useState } from "react";
import ReactExport from "react-export-excel";
import { NavLink } from "react-router-dom";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadReport = () => {
  const [reportDate, setReportDate] = useState("");
  const [brReport, setBRReport] = useState([]);
  const [territoryReport, setTerritoyReport] = useState([]);
  const [areaReport, setAreaReport] = useState([]);
  const [regionReport, setRegionReport] = useState([]);
  console.log(territoryReport);
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
    fetch(`http://192.168.200.11:7000/getTerritoryReport/${reportDate}`)
      .then((res) => res.json())
      .then((data) => setTerritoyReport(data));
    fetch(`http://192.168.200.11:7000/getAreaReport/${reportDate}`)
      .then((res) => res.json())
      .then((data) => setAreaReport(data));
    fetch(`http://192.168.200.11:7000/getRegionReport/${reportDate}`)
      .then((res) => res.json())
      .then((data) => setRegionReport(data));
  };
  return (
    <div>
      {/* <input
        onChange={manageReportDate}
        className="form-control w-25"
        placeholder="yyyy/mm/dd"
        name="date"
        type="date"
        required
      />
      <button className="btn btn-primary mt-3" onClick={handleReport}>
        get Report
      </button>
      <br /> */}
      <div>
        <NavLink
          className="btn btn-primary"
          to={{ pathname: "http://localhost:3000/view/dailyBrReport" }}
          target="_blank"
        >
          Get Daily BR Report
        </NavLink>
      </div>
    </div>
  );
};

export default DownloadReport;
