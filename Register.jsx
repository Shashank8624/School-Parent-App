import axios from "axios";
import { useState } from "react";
export const Register = () => {
  //const [parentId, setParentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const [studentRegisterNumber, setStudentRegisterNumber] = useState("");
  const [parentsName, setParentsName] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [primaryConatctPerson, setPrimaryConatctPerson] = useState("");
  const [primaryContactPersonMobile, setPrimaryContactPersonMobile] =
    useState("");
  const [secondaryContactPerson, setSecondaryContactPerson] = useState("");
  const [secondaryContactPersonMobile, setSecondaryContactPersonMobile] =
    useState("");

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7019/api/Parents/AddParent", {
        StudentName: studentName,
        StudentRegisterNumber: studentRegisterNumber,
        ParentName: parentsName,
        Address: parentAddress,
        City: city,
        State: state,
        ZipCode: zipCode,
        Country: country,
        EmailAddress: emailAddress,
        PrimaryConatctPerson: primaryConatctPerson,
        PrimaryContactPersonMobile: primaryContactPersonMobile,
        SecondaryContactPerson: secondaryContactPerson,
        SecondaryContactPersonMobile: secondaryContactPersonMobile,
      });
      alert("Student Registation Successfully");
      //setParentId("");
      setStudentName("");
      setStudentRegisterNumber("");
      setParentsName("");
      setParentAddress("");
      setState("");
      setCity("");
      setCountry("");
      setZipCode("");
      setEmailAddress("");
      setPrimaryConatctPerson("");
      setPrimaryContactPersonMobile("");
      setSecondaryContactPerson("");
      setSecondaryContactPersonMobile("");

      Load();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <div className="register-container">
        <form className="register-form">
          <label>
            <p>Student Name</p>
            <input
              id="StudentName"
              type="text"
              onChange={(event) => {
                setStudentName(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Student Register Number</p>
            <input
              id="StudentRegisterNumber"
              type="text"
              onChange={(event) => {
                setStudentRegisterNumber(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Parent Name</p>
            <input
              id="ParentsName"
              type="text"
              onChange={(event) => {
                setParentsName(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Parent Address</p>
            <input
              id="ParentAddress"
              type="text"
              onChange={(event) => {
                setParentAddress(event.target.value);
              }}
            />
          </label>
          <label>
            <p>City</p>
            <input
              id="City"
              type="text"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </label>
          <label>
            <p>State</p>
            <input
              id="State"
              type="text"
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Zip Code</p>
            <input
              id="ZipCode"
              type="text"
              pattern="[0-9]{6}"
              title="Six digit zip code"
              onChange={(event) => {
                setZipCode(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Country</p>
            <input
              id="Country"
              type="text"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Email Address</p>
            <input
              id="EmailAddress"
              type="email"
              onChange={(event) => {
                setEmailAddress(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Primary Contact Person</p>
            <input
              id="PrimaryConatctPerson"
              type="text"
              onChange={(event) => {
                setPrimaryConatctPerson(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Primary Contact Person Mobile</p>
            <input
              type="text"
              id="PrimaryContactPersonMobile"
              name="phone"
              pattern="[0-9]{10}"
              onChange={(event) => {
                setPrimaryContactPersonMobile(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Secondary Contact Person</p>
            <input
              id="SecondaryContactPerson"
              type="text"
              onChange={(event) => {
                setSecondaryContactPerson(event.target.value);
              }}
            />
          </label>
          <label>
            <p>Secondary Contact Person Mobile</p>
            <input
              type="text"
              id="SecondaryContactPersonMobile"
              name="phone"
              pattern="[0-9]{10}"
              onChange={(event) => {
                setSecondaryContactPersonMobile(event.target.value);
              }}
            />
          </label>
          <br></br>
          <div>
            <button onClick={save}>Register</button>
          </div>
        </form>
      </div>
      <br></br>
    </>
  );
};
