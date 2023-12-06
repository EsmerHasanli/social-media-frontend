import * as Yup from "yup";

const editSchema = Yup.object({
    fullName: Yup.string(),
    username: Yup.string(),
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  export default editSchema