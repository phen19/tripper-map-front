import { useFormik } from "formik";
import styled from "styled-components";
import { basicSchema } from "./schemas/index";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
/* import API from "./shared/constants.jsx"; */

function SignUpPage() {
  const [enable, setEnable] = useState(true);
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    setEnable(false);

    axios({
      method: "POST",
      url: `http://localhost:5000/signup`,
      data: values,
    })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          alert("Email já cadastrado!");
        } else {
          alert(error);
        }
        setEnable(true);
      });
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <Container enable={enable}>
      <div className="logo">
        <h1>TRIPPER MAP </h1>
        <h3>BRAZIL 🌎</h3>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* <label htmlFor="email">Email</label> */}
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="e-mail"
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          {/* <label htmlFor="password">Password</label> */}
          <input
            id="password"
            type="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <input
            id="confirmPassword"
            type="password"
            placeholder="confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit">Sign Up</button>
          <Link to="/">
            <h6>Switch back to log in</h6>
          </Link>
        </form>
      </div>
    </Container>
  );
}

export default SignUpPage;

// Style

const Container = styled.div`
  background-color: #e7dbc3;
  width: 100vw;
  height: 100vh;

  .split {
    display: flex;
    flex-direction: row;
  }

  .form {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
  }

  .logo {
    text-align: center;
    padding-top: 100px;

    h1 {
      font-size: 50px;
      font-weight: 700;
      font-family: "Josefin Sans", sans-serif;
      color: #605e5a;
    }

    h3 {
      font-size: 50px;
      font-weight: 700;
      font-family: "Josefin Sans", sans-serif;
      color: #286240;
    }
  }

  .error {
    color: #fc8181;
    font-size: 0.75rem;
    text-align: left;
    margin-top: 0.2rem;
    margin-bottom: 0.6rem;
  }

  form {
    margin: 0 2vw 0 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    h6 {
      margin-top: 22px;
      text-decoration: underline;
      color: #605e5a;
      font-family: "Josefin Sans", sans-serif;
      font-size: 20px;
    }
  }

  input,
  select {
    width: 350px;
    padding: 0.65rem 0.5rem;
    margin-bottom: 13px;
    font-size: 27px;
    color: black;
    border: 2px solid #4a5568;
    background-color: #ffffff;
    border-radius: 6px;
    outline: none;
    font-family: "Josefin Sans", sans-serif;
  }

  input:focus,
  select:focus {
    border-color: #4299e1;
  }

  input::placeholder,
  select::placeholder {
    color: #a0aec0;
  }

  button {
    display: block;
    padding: 0.6rem 0.5rem;
    background-color: #6c8e9f;
    color: #ffffff;
    margin-top: 12px;
    border: none;
    border-radius: 6px;
    width: 300px;
    font-size: 27px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Josefin Sans", sans-serif;
    opacity: ${(props) => (props.enable ? "1" : "0.7")};
    pointer-events: ${(props) => (props.enable ? "auto" : "none")};
  }

  input.input-error,
  select.input-error {
    margin: 15px 0 15px 0;
    border-color: #fc8181;
    background-color: #49312b;
  }

  button:disabled {
    opacity: 0.35;
  }

  @media (max-width: 935px) {
    .split {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .form {
      padding-top: 40px;
      width: 100%;
      height: 100vh;
    }

    .logo {
      width: 100%;
      height: 175px;
      text-align: center;
      padding-top: 10px;

      h1 {
        padding: 0 0 0 0vw;
        font-size: 76px;
        font-weight: 700;
        line-height: 83px;
      }

      h3 {
        font-size: 23px;
        line-height: 34px;
        padding: 0em 0px 0em 0vw;
      }
    }

    form {
      width: 100%;

      h6 {
        font-size: 17px;
      }
    }

    input,
    select {
      font-size: 22px;
    }

    button {
      font-size: 22px;
    }
  }
`;
