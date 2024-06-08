import * as yup from "yup";

export const validationSchema = yup.object({
  site: yup.string().required("website name is required"),
  username: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  tags: yup
    .string("type tags with comma separated")
    .required("Tags are required"),
  description: yup.string().required("Description is required"),
  favorite: yup.boolean(),
  category: yup.string().required("Category is required"),
});
