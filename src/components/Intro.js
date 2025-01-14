import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Intro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const response1 = location.state ? JSON.parse(location.state.response) : null;

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form values
    

    try {
      console.log(response1)
      if (response1) {
        console.log("Before", name, email, major)
        setName(response1.name)
        setEmail(response1.email)
        setMajor(response1.major)
        console.log("After", name, email, major)
      }
      const data = {
        name: name,
        email: email,
        major: major,
        interests: interest,
      };
      const response = await fetch("http://localhost:8000/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully sent to the server:", result);
        console.log(JSON.parse(result)["Branch 1.1"]);
        console.log(data);
        navigate("/main", { state: { formData: data, response: result } });
      } else {
        console.error("Failed to send data to the server.");
      }
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div style={{ width: "95%", margin: "0 auto", minHeight: "100vh", backgroundColor: "#E8FFED"}} className="d-flex align-items-center justify-content-center" >
      <div className="p-3" style={{ margin: "0 50px", padding: "20px" }}>
        <h1 className="mt-5" style={{ fontSize: "50px", marginBottom: "35px", fontFamily: 'Jaques Francois', textShadow: '1px 1px 1px #000'}}>Welcome to Academia!</h1>
        <p style={{ fontSize: "22px", marginBottom: "60px", fontFamily: 'Jaques Francois'}}>
        Enter your name, major, and field of interest, to be presented with a dynamic knowledge tree crafted specifically for your background.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="form-control"
              style={{ borderRadius: "25px", borderColor:"black" }}
              onChange={(e) => setName(e.target.value)}
              defaultValue={response1 ? response1.name : null}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              style={{ borderRadius: "25px", borderColor:"black" }}
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={response1 ? response1.email : null}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="major" className="form-label">Major:</label>
            <input
              type="text"
              id="major"
              name="major"
              placeholder="Enter your major"
              className="form-control"
              style={{ borderRadius: "25px", borderColor:"black" }}
              onChange={(e) => setMajor(e.target.value)}
              defaultValue={response1 ? response1.major : null}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="interest" className="form-label">Interest:</label>
            <input
              type="text"
              id="interest"
              name="interest"
              placeholder="Enter your interest"
              className="form-control"
              style={{ borderRadius: "25px", borderColor:"black" }}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>

          <button 
          type="submit"
           className="btn btn-primary mb-2 mt-3"
           style={{
            backgroundColor: "#014328",
            color: "white",
            borderRadius: "66px",
            padding: "8px 20px",
           }}
           >Submit</button>

        </form>
      </div>
      <div className="mt-5" style={{ margin: "0 50px" }}>
        <img
          src={process.env.PUBLIC_URL + '/images/nodeimage.png'}
          alt="Node Image"
          style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  );
};

export default Intro;