import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { AuthContext } from './AuthContext';

const VERIFY_QUERY = gql`
  query VerifyToken {
    verifyToken {
      status
    }
  }
`;

const LOGIN_QUERY = gql`
  query Login($input: Login!) {
    login(input: $input) {
      token
      status
      emailError
      passwordError
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState({});
  const token = localStorage.getItem("token");
  const { updateAuthStatus } = useContext(AuthContext);
  
  const { data: verifyData, loading: verifyLoading, error: verifyError } = useQuery(VERIFY_QUERY);

  useEffect(() => {
    if (token) {
      if (verifyData && verifyData.verifyToken.status) {
        navigate("/profile");
      }
    }
  }, [token, verifyData, navigate]);

  const [loginUser, { data: loginData, loading: loginLoading, error: loginError }] = useLazyQuery(LOGIN_QUERY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const newErrorMsgs = {};
  
    // Email Validation
    if (!email) {
      newErrorMsgs.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrorMsgs.email = "Invalid email address";
    }
  
    // Password Validation
    if (!password) {
      newErrorMsgs.password = "Password is required";
    }
  
    if (Object.keys(newErrorMsgs).length > 0) {
      setErrorMsgs(newErrorMsgs);
      return;
    }
  
    setErrorMsgs({});
  
    try {
      const response = await loginUser({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
  
      if (response.data.login.status) {
        localStorage.setItem("token", response.data.login.token);
        console.log("Login Successful");
        updateAuthStatus(true);
        console.log("Navigating to profile...");
        navigate("/profile");
      } else {
        setErrorMsgs({
          email: response.data.login.emailError,
          password: response.data.login.passwordError,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required=""
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <span className="text-red-500 text-sm">
                  {errorMsgs.email}
                </span>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required=""
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <span className="text-red-500 text-sm">
                  {errorMsgs.password}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
