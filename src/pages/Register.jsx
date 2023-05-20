import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";


import { useState } from "react";

const Register = () => {
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(fname,email,password);
    fetch("http://localhost:5000/register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"#",
      },
      body:JSON.stringify({
        fname,email,password
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data,"userRegister");
    })
    alert("Your data has been registered");
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text" name="fname"
                    placeholder="Full name"
                    required
                    ref={signupNameRef}
                    onChange={(e)=>setFname(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email" name="email"
                    placeholder="Email"
                    required
                    ref={signupEmailRef}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password" name="password"
                    placeholder="Password"
                    required
                    ref={signupPasswordRef}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
