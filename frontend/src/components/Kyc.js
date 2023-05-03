import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidenav from "./Sidenav";
import { storage } from "./googleSignin/config";
import { postKyc, getKyc } from "../services/kyc";

const regForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Kyc() {
  const id = localStorage.getItem("id");

  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [sname, setsname] = useState("");
  const [pnum, setpnum] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pin, setpin] = useState("");
  const [ad, setad] = useState("");
  const [pan, setPan] = useState();
  const [adharImg, setAdharImg] = useState("");
  const navigate = useNavigate();
  const [panImg, setPanImg] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const [checkMale, setCheckMale] = useState(false);
  const [checkFemale, setCheckFemale] = useState(false);
  const [checkOther, setCheckOther] = useState(false);

  const [checkMarried, setCheckMarried] = useState(false);
  const [checkUnMarried, setCheckUnMarried] = useState(false);
  const [show, setShow] = useState(false);
  const [showp, setShowp] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleshowp = () => {
    setShowp(true);
  };

  const handleclosep = () => setShowp(false);

  const successAlert = () => {
    Swal.fire({
      title: "Your KYC application is under process",
      icon: "success",
    });
  };
  const ProcessAlert = () => {
    Swal.fire({
      title: "KYC under process",
      icon: "Process",
    });
  };

  const id1 = localStorage.getItem("id");

  const handleSubmit = (e) => {
    e.preventDefault();

    const aadharImageRef = ref(storage, `kyc/${id1}_${ad}`);
    const panImageRef = ref(storage, `kyc/${id1}_${pan}`);

    let data = {};

    uploadBytes(aadharImageRef, adharImg).then(() => {
      getDownloadURL(aadharImageRef).then((pic) => {
        uploadBytes(panImageRef, panImg).then(() => {
          getDownloadURL(panImageRef).then((panImg) => {
            data = {
              fName: fname,
              lName: lname,
              sName: sname,
              phone: pnum,
              gender: gender,
              maritalStatus: maritalStatus,
              address: address,
              city: city,
              email: email,
              pin: pin,
              aadharNumber: ad,
              panCard: pan,
              aadImg: pic,
              panImg: panImg,
            };
            postKyc(id, data).then(() => {
              successAlert();
              navigate("/dashboard");
            });
          });
        });
      });
    });

  };

  useEffect(() => {
    getKyc(id).then((res) => {
      if (res.status === 200) {
        ProcessAlert();
        setFname(res.data.data.fName);
        setlname(res.data.data.lName);
        setsname(res.data.data.sName);
        setpnum(res.data.data.phone);
        setemail(res.data.data.email);
        setgender(res.data.data.gender);
        setaddress(res.data.data.address);
        setcity(res.data.data.city);
        setpin(res.data.data.pin);
        setMaritalStatus(res.data.data.maritalStatus);
        setad(res.data.data.aadharNumber);
        setPan(res.data.data.panCard);
        setDisableBtn(true);
        setPanImg(res.data.data.panImg);
        setAdharImg(res.data.data.aadImg);

        // eslint-disable-next-line no-nested-ternary
        res.data.data.gender === "Male"
          ? setCheckMale(true)
          : res.data.data.gender === "Female"
          ? setCheckFemale(true)
          : setCheckOther(true);

        res.data.data.maritalStatus === "married"
          ? setCheckMarried(true)
          : setCheckUnMarried(true);
      }
    });
  }, []);

  return (
    <>
      <Sidenav />

      <div className="container  pt-4 ">
        {" "}
        <br />
        <div
          className="py-4 border-bottom text-center pb-4 text-white mt-3 mb-3 "
          style={{ background: "#b8565f" }}
        >
          <h1>KYC</h1>
        </div>
        <div>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton />
            <Modal.Body>
              <img src={adharImg} alt="aadharimg" style={{ width: "450px" }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showp} onHide={handleclosep} animation={false}>
            <Modal.Header closeButton />
            <Modal.Body>
              <img src={panImg} alt="panimg" style={{ width: "450px" }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleclosep}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <form onSubmit={handleSubmit}>
          <Card.Header className=""> </Card.Header>

          <div className="form-group">
            <Row>
              <Col>
                {" "}
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  First Name{" "}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Your First Name"
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                  required
                  value={fname}
                />
                {fname !== "" && fname?.length < 2 && (
                  <span className="text-danger"> Enter valid first name</span>
                )}
              </Col>
              <Col>
                {" "}
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Last Name{" "}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Your last Name"
                  onChange={(event) => {
                    setlname(event.target.value);
                  }}
                  required
                  value={lname}
                />
                {lname !== "" && lname.length < 2 && (
                  <span className="text-danger"> Enter valid lastname</span>
                )}
              </Col>
            </Row>
          </div>

          <div className="form-group">
            <label htmlFor="checkbox-2" className="checkbox__label mb-1">
              {" "}
              Father"s/ Spouse"s Name{" "}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Father/Spouse Name"
              onChange={(event) => {
                setsname(event.target.value);
              }}
              required
              value={sname}
            />
            {sname !== "" && sname.length < 2 && (
              <span className="text-danger"> Enter valid name</span>
            )}
          </div>

          <div className="form-group">
            <Row>
              <Col>
                {" "}
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Email Address{" "}
                </label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Your Email Adress"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                  required
                  value={email}
                />
                {email !== "" && !regForEmail.test(email) && (
                  <span className="text-danger"> Enter valid input</span>
                )}
              </Col>
              <Col>
                {" "}
                <div className="form-group">
                  <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                    {" "}
                    Phone Number{" "}
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter Your Phone Number"
                    onChange={(event) => {
                      setpnum(event.target.value);
                    }}
                    required
                    value={pnum}
                  />
                  {pnum !== "" && pnum.length < 9 && (
                    <span className="text-danger">
                      {" "}
                      Enter valid phone number
                    </span>
                  )}
                </div>{" "}
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Gender{" "}
                </label>{" "}
                <br />
                {checkMale ? (
                  <input
                    type="radio"
                    id="m"
                    value="Male"
                    name="gender"
                    checked={checkMale}
                    onChange={(event) => {
                      setgender(event.target.value);
                    }}
                  />
                ) : (
                  <input
                    type="radio"
                    id="m"
                    value="Male"
                    name="gender"
                    // checked={checkMale}
                    onChange={(event) => {
                      setgender(event.target.value);
                    }}
                  />
                )}{" "}
                Male &nbsp;
                {checkFemale ? (
                  <input
                    type="radio"
                    id="f"
                    value="Female"
                    name="gender"
                    checked={checkFemale}
                    onChange={(event) => {
                      setgender(event.target.value);
                    }}
                  />
                ) : (
                  <input
                    type="radio"
                    id="f"
                    value="Female"
                    name="gender"
                    // checked={checkFemale}
                    onChange={(event) => {
                      setgender(event.target.value);
                    }}
                  />
                )}{" "}
                Female &nbsp;
                {checkOther ? (
                  <input
                    type="radio"
                    id="o"
                    value="Other"
                    checked={checkOther}
                    name="gender"
                    onChange={(event) => {
                      setgender(event.target.value);
                    }}
                  />
                ) : (
                  <input
                    type="radio"
                    id="o"
                    value="Other"
                    // checked={checkOther}
                    name="gender"
                    onChange={(event) => {
                      setgender(event.target.value);
                    }}
                  />
                )}{" "}
                Other
              </Col>
              <Col>
                {" "}
                <div className="form-group" required>
                  <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                    {" "}
                    Marital Status{" "}
                  </label>{" "}
                  <br />
                  {checkMarried ? (
                    <input
                      type="radio"
                      value="married"
                      name="maritalStatus"
                      checked={checkMarried}
                      onClick={() => setMaritalStatus("married")}
                    />
                  ) : (
                    <input
                      type="radio"
                      value="married"
                      name="maritalStatus"
                      onClick={() => setMaritalStatus("married")}
                    />
                  )}{" "}
                  Married &nbsp;
                  {checkUnMarried ? (
                    <input
                      type="radio"
                      value="unmarried"
                      name="maritalStatus"
                      checked={checkUnMarried}
                      onClick={() => setMaritalStatus("unmarried")}
                    />
                  ) : (
                    <input
                      type="radio"
                      value="unmarried"
                      name="maritalStatus"
                      onClick={() => setMaritalStatus("unmarried")}
                    />
                  )}{" "}
                  Unmarried
                </div>
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <label htmlFor="checkbox-2" className="checkbox__label mb-1">
              {" "}
              Address{" "}
            </label>
            <input
              className="form-control"
              type=""
              placeholder="Enter Your Permanent Adress"
              onChange={(event) => {
                setaddress(event.target.value);
              }}
              required
              value={address}
            />
            {address !== "" && address.length < 9 && (
              <span className="text-danger"> Enter valid input</span>
            )}
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <div className="form-group" required>
                  <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                    {" "}
                    City{" "}
                  </label>
                  <input
                    className="form-control"
                    type=" Text"
                    placeholder="Enter Your  City"
                    onChange={(event) => {
                      setcity(event.target.value);
                    }}
                    required
                    value={city}
                  />
                  {city !== "" && city.length < 2 && (
                    <span className="text-danger"> Enter valid city</span>
                  )}
                </div>{" "}
              </Col>
              <Col>
                {" "}
                <div className="form-group">
                  <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                    {" "}
                    Pincode{" "}
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    onChange={(event) => {
                      setpin(event.target.value);
                    }}
                    required
                    value={pin}
                  />
                  {pin !== "" && pin.length < 4 && (
                    <span className="text-danger"> Enter valid input</span>
                  )}
                </div>{" "}
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Aadhar Card Number
                </label>
                <input
                  className="form-control"
                  type="number"
                  onChange={(event) => {
                    setad(event.target.value);
                  }}
                  required
                  value={ad}
                />
                {ad !== "" && ad.length < 12 && (
                  <span className="text-danger">
                    {" "}
                    Aadhar number should be of 12 digits
                  </span>
                )}
              </Col>
              <Col>
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Upload aadhar Image
                </label>

                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => {
                    setAdharImg(event.target.files[0]);
                  }}
                  required
                />
                <Button onClick={handleShow}>View</Button>
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Pan Card Number
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="pan"
                  onChange={(event) => {
                    setPan(event.target.value);
                  }}
                  required
                  value={pan}
                />
                {pan !== "" && pan?.length < 10 && (
                  <span className="text-danger"> Enter valid input</span>
                )}
              </Col>
              <Col>
                <label htmlFor="checkbox-2" className="checkbox__label mb-1">
                  {" "}
                  Upload PAN Image
                </label>

                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => {
                    setPanImg(event.target.files[0]);
                  }}
                  required
                />
                <Button onClick={handleshowp}>View</Button>
              </Col>
            </Row>
          </div>
          <br />
          {disableBtn ? null : (
            <div className="mt-2" style={{ textAlign: "center" }}>
              <button
                className="square border border-dark bg-warning"
                type="submit"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
