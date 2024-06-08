import { validationSchema } from "../../utils/Utils"; // Assuming validationSchema is defined
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import {
  fetchPasswords,
  savePasswordToExpress,
} from "../../redux/password/PasswordSlice";
import { useState } from "react";
import TextField from "../common/TextField";
import { fetchLogo } from "../../redux/logo/LogoSlice";

const PasswordForm = () => {
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState("");

  const handleSavePassword = async (values, resetForm) => {
    const { site, url, username, password, description, tags, favorite } =
      values;
    const result = await dispatch(
      savePasswordToExpress({
        site,
        url,
        username,
        password,
        description,
        tags,
        favorite,
      })
    );
    if (savePasswordToExpress.fulfilled.match(result)) {
      console.log("Password saved successfully");
      dispatch(fetchPasswords()); // Fetch updated password list
      resetForm();
      setBrandName("");
    } else {
      console.log("Try again.");
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          site: "",
          url: "",
          username: "",
          password: "",
          description: "",
          favorite: false,
          category: "",
          tags: [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const logo = await dispatch(fetchLogo(brandName));
            const url = await logo.payload.data[0].image;
            const tagsArray = values.tags.split(",");
            const newValues = { ...values, url: url, tags: tagsArray };
            console.log(newValues);
            await handleSavePassword(newValues, resetForm);
          } catch (err) {
            console.log("No logo found");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex-1 flex flex-col mt-5 ">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <Field
                  name="category"
                  as="select"
                  className="button flex-1 py-2"
                >
                  <option id="option" disabled value="">
                    Select type*
                  </option>
                  <option id="option" value="social">
                    Socials
                  </option>
                  <option id="option" value="search">
                    Search
                  </option>
                  <option id="option" value="shopping">
                    Shopping
                  </option>
                  <option id="option" value="video">
                    Video
                  </option>
                  <option id="option" value="forum">
                    Forum
                  </option>
                  <option id="option" value="professional">
                    Professional
                  </option>
                </Field>
              </div>
              {errors.category && touched.category && (
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-sm text-red-300"
                />
              )}
            </div>
            <TextField
              className="rounded-md ps-2"
              placeholder="Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
            <div className="mb-5">
              <Field
                name="site"
                placeholder="www.example.com"
                className="block rounded-md h-12 mt-2 w-full text-white ps-2"
              />
              {errors.site && touched.site && (
                <ErrorMessage
                  name="site"
                  component="div"
                  className="text-sm text-red-300"
                />
              )}
            </div>
            <div className="mb-5">
              <Field
                name="username"
                placeholder="Username"
                className="block rounded-md h-12 mt-2 w-full text-white ps-2"
              />
              {errors.username && (
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-300"
                />
              )}
            </div>
            <div className="mb-5">
              <Field
                name="password"
                placeholder="Password"
                type="password"
                className="block rounded-md h-12 mt-2 w-full text-white ps-2"
                autoComplete="true"
              />
              {errors.password && (
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-300"
                />
              )}
            </div>
            <div className="mb-5">
              <Field
                as="textarea"
                rows="8"
                name="description"
                placeholder="Description"
                className="block rounded-md mt-2 w-full text-white ps-2"
              />
              {errors.description && (
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-300"
                />
              )}
            </div>
            <div className="mb-5">
              <Field
                name="tags"
                placeholder="Tags (comma separated)"
                className="block rounded-md h-12 mt-2 w-full text-white ps-2"
              />
              {errors.tags && (
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-sm text-red-300"
                />
              )}
            </div>
            <div className="mb-5 flex items-center justify-start gap-3">
              <label className="checkbox_label">
                <Field
                  className="w-10 h-10 checkbox opacity-0"
                  type="checkbox"
                  name="favorite"
                />
                <div className="checkbox_wrapper"></div>
              </label>
              Make it favorite
            </div>

            <div className="button">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-inside rounded-md text-gray-100 font-medium"
              >
                {isSubmitting ? (
                  <span className="loader"></span>
                ) : (
                  "Save Password"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PasswordForm;
