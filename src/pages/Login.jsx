import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Context/authentication";

export default function Login() {
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setToken} = useContext(authContext)

  const checkSellerStatus = async (token) => {
    try {
      const { data } = await axios.get(
        "https://ahmed-sabry-ffbbe964.koyeb.app/sellers/status",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!data.status) {
        setTimeout(() => {
          navigate("/welcome");
        }, 1000);
      }

      if (data.status === "pending") {
        console.log("waiting for admin approve");
      }
      if (data.status === "rejected") {
        console.log("your application has been rejected");
      }
    } catch (error) {
      console.error("Error checking seller status:", error);
      setErrMsg("Failed to check seller status. Please try again later.");
    }
  };

  const loginUser = async (values) => {
    // Send the form data to the server
    console.log("submit data");
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ahmed-sabry-ffbbe964.koyeb.app/user/login",
        values
      );
      console.log("date after login",data);

      if (data.token) {
        localStorage.setItem('token',data.token)
        setToken(data.token)
        setSuccessMsg("Welcome to");
      }
      if(data.role==="user"){
        console.log("im a user");
        await checkSellerStatus(data.token);
      }

      if(data.role==="seller"){
        setTimeout(() => {
       navigate("/dashboard");
     }, 1000);
     }
      
    } catch (error) {
      console.log(error.response.data.message);
      setErrMsg(error.response.data.message);
    }
    setIsLoading(false)

  };

  const formikObj = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginUser,
    validate: (values) => {
      console.log("validate data", values);
      setErrMsg(null);
      const errors = {};
      
      // email validation
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.email.includes("@") && !values.email.includes(".")) {
        errors.email = "Invalid email address";
      }
      if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = "Invalid email address";
      }

      // password validation
      if (!values.password) {
        errors.password = "Password is required";
      }
      console.log(errors);

      return errors;
    },
  });
  // formikObj.

  return (
    <>
      <div className="flex  justify-center min-h-screen mt-4 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          
          {successMsg ? (
            <div className="text-green-500">{successMsg}</div>
          ) : (
            ""
          )}
          <img 
            src="https://m.media-amazon.com/images/G/01/rainier/nav/SellerCentral_Bliss._CB485924389_.png" 
            alt="Login Banner" 
            className="mb-4 w-1/2 h-auto mx-auto" 
          />

          <h2 className="text-2xl font-bold mb-2">Sign in</h2>
          {errMsg ? <div className="text-red-500">{errMsg}</div> : ""}
          
          <form onSubmit={formikObj.handleSubmit} className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium">Email:</label>
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.email}
              id="email"
              type="email"
              placeholder="your email"
              className="border border-gray-300 rounded-md p-2 w-full"
              name="email"
            />
            {formikObj.errors.email && formikObj.touched.email ? (
              <div className="text-red-500 py-1">
                {formikObj.errors.email}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="password" className="block text-sm font-medium">Password:</label>
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.password}
              id="password"
              type="password"
              placeholder="your password"
              className="border border-gray-300 rounded-md p-2 w-full"
              name="password"
            />
            {formikObj.errors.password && formikObj.touched.password ? (
              <div className="text-red-500 py-1">
                {formikObj.errors.password}
              </div>
            ) : (
              ""
            )}

            <button
              type="submit"
              disabled={!formikObj.isValid || !formikObj.dirty}
              className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-xl w-full"
            >
              {isLoading ? <DNA
                visible={true}
                height="35"
                width="60"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
