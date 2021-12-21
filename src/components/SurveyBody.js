import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "antd/dist/antd.css";

const SurveyBody = () => {
  const [searchNumber, setSearchNumber] = useState(null);
  const [dList, setDlist] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);
  const [q4, setQ4] = useState(null);
  const [q5, setQ5] = useState(null);
  const [q6, setQ6] = useState(null);
  const [q7, setQ7] = useState(null);
  const [q8, setQ8] = useState(null);
  const [q9dot1, setQ9dot1] = useState(null);
  const [q9dot2, setQ9dot2] = useState(null);

  const handleText = (e) => {
    setSearchNumber(e.target.value);
  };
  const handleSearch = () => {
    fetch(`http://192.168.10.14:7000/dMatched/${searchNumber}`)
      .then((res) => res.json())
      .then((data) => setConsumer(data));
    setNotFound(true);
  };
  const q1value = (e) => {
    setQ1(e.target.value);
  };
  const q2value = (e) => {
    setQ2(e.target.value);
  };
  const q3value = (e) => {
    console.log(e.target.value);
    setQ3(e.target.value);
  };
  const q4value = (e) => {
    setQ4(e.target.value);
  };
  const q5value = (e) => {
    setQ5(e.target.value);
  };
  const q6value = (e) => {
    setQ6(e.target.value);
  };
  const q7value = (e) => {
    setQ7(e.target.value);
  };
  const q8value = (e) => {
    setQ8(e.target.value);
  };
  const q9dot1value = (e) => {
    setQ9dot1(e.target.value);
  };
  const q9dot2value = (e) => {
    setQ9dot2(e.target.value);
  };
  const agent = sessionStorage.getItem("agent");
  const handleSubmit = (e) => {
    const answer = {
      ans1: q1,
      ans2: q2,
      ans3: q3,
      ans4: q4,
      ans5: q5,
      ans6: q6,
      ans7: q7,
      ans8: q8,
      ans9dot1: q9dot1,
      ans9dot2: q9dot2,
      agentID: agent,
      callDate: new Date().toLocaleDateString(),
      callTime: new Date().toLocaleTimeString(),
    };
    fetch(`http://192.168.10.14:7000/answers/${consumer?._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(answer),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(answer);
    window.location.reload(false);
  };

  return (
    <div>
      <div style={{ display: consumer === null ? "block" : "none" }}>
        <input
          onChange={handleText}
          className="form-control w-50"
          type="text"
          name="serachNumber"
        />
        <br />
        <button onClick={handleSearch} className="btn btn-danger">
          Search
        </button>
      </div>
      <div
        style={{
          display: consumer === null ? "none" : "block",
        }}
      >
        <h6>
          ১. আসসালামুআলাইকুম, আমি কি <b>{consumer?.r_name}</b> স্যারের সাথে কথা
          বলছি?
        </h6>
        <p className="text-secondary">
          (উত্তর যাই হোক, পরবর্তী ২নং প্রশ্নে চলে যান)
        </p>
        <Form.Group onChange={q1value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q1 === "yes" || q1 === "no" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>
          ২. আমি একটি রিসার্চ কোম্পানি থেকে ফোন করেছি । আমি কি আপনার সাথে একটু
          কথা বলতে পারি?
        </h6>
        <p className="text-secondary">
          (যদি উত্তর হ্যাঁ আসে তবে কথা বলা চালিয়ে যাবেন, নতুনবা কথা শেষ করে
          সংযোগ কেটে দিন)
        </p>
        <Form.Group onChange={q2value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
            <option value="busy">ব্যাস্ত</option>
          </Form.Control>
        </Form.Group>
      </div>
      <p
        className="font-weight-bold"
        style={{ display: q2 === "yes" ? "block" : "none" }}
      >
        * আপনার অবগতির জন্য জনানো যাচ্ছে যে আপনার কলটি রেকর্ড করা হচ্ছে এবং তা
        ভবিষ্যতে পর্যালোচনা এর কাজে ব্যবহার করা হতে পারে।
      </p>
      <div
        style={{ display: q2 === "yes" ? "block" : "none" }}
        className="mt-2"
      >
        <h6>
          ৩. স্যার, আমাদের রিসার্চটি ১৮ বছরের বেশী বয়সের ধূমপায়ীদের জন্য। তাই
          বয়স জানা জরুরী। অনুগ্রহ করে আপনার বয়স জানতে পারি?
        </h6>
        <p className="text-secondary">
          (যদি উত্তর আসে ‘১৮ বছরের বেশি’ তবে কথা বলা চালিয়ে যাবেন, নতুবা
          ধন্যবাদ দিয়ে কথা শেষ করে সংযোগ কেটে দিন)
        </p>
        <Form.Group onChange={q3value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="-18">১৮ এর নিচে</option>
            <option value="18-23">১৮-২৩</option>
            <option value="24-29">২৪-২৯</option>
            <option value="30-35">৩০-৩৫</option>
            <option value="35+">৩৫+</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display:
            q3 === "18-23" || q3 === "24-29" || q3 === "30-35" || q3 === "35+"
              ? "block"
              : "none",
        }}
        className="mt-2"
      >
        <h6>৪. স্যার, আমি কি জানতে পারি আপনি ধূমপান করেন কিনা?</h6>
        <p className="text-secondary">
          (যদি উত্তর হ্যাঁ হয় তবে জিজ্ঞসা করবে ৫নং প্রশ্ন। যদি উত্তর না আসে তবে
          ধন্যবাদ দিয়ে সংযোগ কেটে দিন)
        </p>
        <Form.Group onChange={q4value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q4 === "yes" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>
          ৫. স্যার, আমি কি জানতে পারি, আপনি কোন ব্র্যান্ড এর সিগারেট ধুমপান
          করেন?
        </h6>
        <Form.Group onChange={q5value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="navy">নেভি</option>
            <option value="star">ষ্টার</option>
            <option value="starNext">ষ্টার নেক্সট</option>
            <option value="jpgl">JPGL</option>
            <option value="luckyStrike">লাকি স্ট্রাইক</option>
            <option value="others">অন্যান্য</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display:
            q5 === "navy" ||
            q5 === "star" ||
            q5 === "starNext" ||
            q5 === "jpgl" ||
            q5 === "luckyStrike" ||
            q5 === "others"
              ? "block"
              : "none",
        }}
        className="mt-2"
      >
        <h6>
          ৬. স্যার, গত এক সপ্তাহের মধ্যে আপনার সাথে কি কোন নেভি সিগারেটের
          প্রতিনিধির দেখা হয়েছিল?
        </h6>
        <Form.Group onChange={q6value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{ display: q6 === "yes" ? "block" : "none" }}
        className="mt-2"
      >
        <h6>
          ৭. ধন্যবাদ স্যার। সিগারেটের নাম, দাম এবং স্বাদ নিয়ে আমাদের প্রতিনিধি
          আপনাকে কি বলেছিল তা কি বলতে পারবেন?
        </h6>
        <Form.Group onChange={q7value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="7taka">৭ টাকা</option>
            <option value="navyOption">নেভি অপশন</option>
            <option value="navySwitch">নেভি সুইচ</option>
            <option value="berry">বেরি</option>
            <option value="berryTaste">বেরি স্বাদ</option>
            <option value="capsule">ক্যাপসুল</option>
            <option value="berryCapsule">বেরি ক্যাপসুল</option>
            <option value="navyBerry">নেভি বেরি</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display:
            q7 === "7taka" ||
            q7 === "navyOption" ||
            q7 === "navySwitch" ||
            q7 === "berry" ||
            q7 === "berryTaste" ||
            q7 === "capsule" ||
            q7 === "berryCapsule" ||
            q7 === "navyBerry"
              ? "block"
              : "none",
        }}
        className="mt-2"
      >
        <h6>
          ৮. আমাদের প্রতিনিধির সাথে কথা বলার পর আপনি দোকান থেকে কত শলাকা নেভি
          অপশন সিগারেট কিনেছিলেন?
        </h6>
        <Form.Group onChange={q8value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="noPurchase">কিনি নাই</option>
            <option value="1stick">১ শলাকা</option>
            <option value="2stick">২ শলাকা</option>
            <option value="5stick">৫ শলাকা</option>
            <option value="20sticks1packet">২০ শলাকার ১ টি প্যাকেট</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q8 === "5stick" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>
          ৯.১. আপনি কি সিগারেট রাখার জন্য প্লাস্টিকের বক্স/স্যাশে পেয়েছেন?
        </h6>
        <Form.Group onChange={q9dot1value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q8 === "20sticks1packet" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>৯.২ আপনি কি কোন লাইটার সহ বক্স পেয়েছেন?</h6>
        <Form.Group onChange={q9dot2value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      {/* Final Question */}
      <div
        style={{
          display:
            q8 === "noPurchase" ||
            q8 === "1stick" ||
            q8 === "2stick" ||
            q9dot1 === "yes" ||
            q9dot1 === "no" ||
            q9dot2 === "yes" ||
            q9dot2 === "no"
              ? "block"
              : "none",
        }}
        className="mt-3"
      >
        <h5>
          ধন্যবাদ স্যার, আপনার মূল্যবান সময় দেয়ার জন্য।{" "}
          <b>
            {" "}
            মনে রাখবেন, নেভি অপশন মানেই ৭ টাকায় বেরি ক্যাপসুলে স্মার্ট অপশন।
          </b>{" "}
          ভালো থাকবেন। আপনার দিনটি শুভ হোক
        </h5>
        <br />
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Survey
        </button>
      </div>
      <div
        style={{
          display:
            q2 === "no" ||
            q2 === "busy" ||
            q3 === "-18" ||
            q4 === "no" ||
            q6 === "no"
              ? "block"
              : "none",
        }}
        className="mt-3"
      >
        <h5>ধন্যবাদ স্যার আপনার সময়ের জন্য, ভালো থাকবেন।</h5>
        <br />
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Survey
        </button>
      </div>
    </div>
  );
};

export default SurveyBody;
