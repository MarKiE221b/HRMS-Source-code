import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "/ched-logo.png";
import bg from "/memer.png";

import { Navigate } from "react-router-dom";
import { loginApi } from "../../api";
import { Button, Spinner } from "flowbite-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    pwd: "",
  });

  const {
    mutate: submitData,
    isSuccess,
    isError,
    error,
    data,
    isPending,
  } = loginApi();
  if (isSuccess) return <Navigate to={`user/${data.data.user.emp_id}`} />;

  return (
    <div
      className="h-screen bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay with 50% opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* content */}
      <div className="relative flex flex-col items-center justify-center p-9 z-10">
        <div className="mt-3">
          <div className="flex flex-col items-center md:flex-row md:items-center text-2xl font-semibold text-white">
            <img
              className="h-[200px] w-[200px] md:mr-6"
              alt="ched-logo"
              src={logo}
            />
            <div>
              <span className="block text-center font-bold md:text-left">
                Commission on Higher Education Region 10
              </span>
              <span className="block mt-7 text-5xl font-bold text-center md:text-left">
                Human Resource Management System
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-black bg-opacity-10 flex items-center justify-center z-10">
        <div className="bg-white p-8 rounded shadow-lg w-80 my-2">
          <div className="items-center flex mb-4 gap-2">
            <BsFillPersonFill size="25" />
            <h1 className="text-3xl font-semibold">User Login</h1>
          </div>
          {/* <form onSubmit={handleSubmit}> */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitData(formData);
            }}
          >
            <div className="mb-4">
              <label className="block text- font-medium leading-6 text-balance">
                Username
              </label>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, user_id: e.target.value }))
                }
                required
                type="Username"
                id="Username"
                name="Username"
                className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-medium font-medium leading-6 text-balance">
                Password
              </label>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pwd: e.target.value }))
                }
                required
                type="Password"
                id="Password"
                name="Password"
                className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            {isError && (
              <p className="text-center text-red-600 font-bold uppercase mb-2 ">
                {error?.response?.data?.message}
              </p>
            )}

            <Button
              type="submit"
              color="blue"
              isProcessing={isPending}
              processingSpinner={
                <Spinner size="md" aria-label="Login spinner" />
              }
              label="2"
              fullSized
              disabled={isPending}
            >
              LOGIN
            </Button>
          </form>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
