import * as yup from "yup";


export const basicSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
  message: yup.string()
          .required("Message is required")
          .min(10, "Message must be at least 10 characters")
});

