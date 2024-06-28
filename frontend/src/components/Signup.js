
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import VerifyUser from './verifyUser';



const SIGNUP_MUTATION = gql`
mutation SignUp($input: Register!) {
    doRegister(input: $input) {
        status
        Error
        }
    }
`;


export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [errorMsgs, setError] = useState({});
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Vrify User if already logged in
    const { status } = VerifyUser();
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        setUserStatus(status);
        if (status) {
            navigate('/profile');
        }
    }, [status]);





    const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const cpassword = e.target.cpassword.value;
        console.log(email, password, cpassword);

        // Set the state
        setEmail(email);
        setPassword(password);
        setCPassword(cpassword);

        // Email and Password validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


        const newErrorMsgs = {};

        // Email Validation
        if (!email) {
            newErrorMsgs.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrorMsgs.email = "Invalid email address";
        } else {
            delete newErrorMsgs.email;
        }

        // Password Validation
        if (!password) {
            newErrorMsgs.password = "Password is required";
        } else if (password.length < 8) {
            console.log(password.length);
            newErrorMsgs.password = "Password must be at least 8 characters";
        } else {
            delete newErrorMsgs.password;
        }

        // Confirm Password Validation
        if (!cpassword) {
            newErrorMsgs.cpassword = "Confirm Password is required";
        } else if (password !== cpassword) {
            newErrorMsgs.cpassword = "Password does not match";
        } else {
            delete newErrorMsgs.cpassword;
        }


        console.log(newErrorMsgs);

        setError(newErrorMsgs);



        if (Object.keys(newErrorMsgs).length > 0) {
            return;
        } else {
            try {
                const response = await signUp({
                    variables:
                    {
                        input: {
                            email: email,
                            password: password
                        }
                    }
                });

                console.log(response.data.doRegister.status);
                let status = response.data.doRegister.status;
                if (status) {
                    console.log("Sign up successful");
                    navigate('/login');
                } else {
                    console.log("Sign up failed");
                    setError({ email: response.data.doRegister.Error });
                }

            } catch (err) {
                console.error(err);
                console.log("Sign up failed");
            }
        }


    }

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    {/* <a href="javascript:void(0)">
                        <img
                            src="https://readymadeui.com/readymadeui.svg"
                            alt="logo"
                            className="w-40 mb-8 mx-auto block"
                        />
                    </a> */}
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">
                            Sign up
                        </h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Email
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="email"
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter emial address"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-red-500 text-sm">{errorMsgs.email}</span>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-red-500 text-sm">{errorMsgs.password}</span>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="cpassword"
                                        type="password"
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Confirm password"
                                        onChange={(e) => setCPassword(e.target.value)}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-red-500 text-sm">{errorMsgs.cpassword}</span>
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
                            {/* <p className="text-gray-800 text-sm !mt-8 text-center">
                                Don't have an account?{" "}
                                <a
                                    href="javascript:void(0);"
                                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                >
                                    Register here
                                </a>
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

