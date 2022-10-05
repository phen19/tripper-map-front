import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email required"),

  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit",
    })
    .required("Password required"),

  confirmPassword: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit",
    })
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Password required")
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email required"),

  password: yup.string().required("Password required"),
});
