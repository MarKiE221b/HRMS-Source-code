import React, { useEffect, useState } from "react";

import logo from "../../../assets/ched-logo.png";
import { IoReturnUpBack } from "react-icons/io5";
import { Avatar, Button, Label, TextInput } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { getUsername, updateUsername, updatePwd } from "../../../api";
import { useQueryClient } from "@tanstack/react-query";

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: username, isSuccess } = getUsername();
  const {
    mutate: usernameUpdate,
    data: usernameData,
    error: usernameError,
  } = updateUsername();

  const { mutate: pwdUpdate, data: pwdData, error: pwdError } = updatePwd();

  const [credentials, setCredentials] = useState({
    username: "",
    old_pwd: "",
    new_pwd: "",
  });

  useEffect(() => {
    setCredentials((prev) => ({ ...prev, username: username?.username || "" }));
  }, [isSuccess]);

  return (
    <div className="flex items-start justify-center">
      <div className="bg-white w-full max-w-[500px] p-5 shadow-sm">
        <div className="flex items-center gap-1 mb-2">
          <IoReturnUpBack size="20px" />
          <Link to={`/user/${id}`}>
            <span className="hover:text-blue-900 hover:underline">Go back</span>
          </Link>
        </div>
        <div>
          <Avatar img={logo} alt="profile_avatar" rounded size="lg" />
        </div>

        <div className="mt-5">
          <h1 className="text-xl font-medium">Profile Info</h1>
          <hr className="my-3" />
          {/* username */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username1" value="Username" />
            </div>
            <TextInput
              id="username1"
              type="email"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              onBlur={(e) => {
                usernameUpdate(credentials);
                queryClient.invalidateQueries({ queryKey: ["getusernamekey"] });
              }}
              required
            />
          </div>
          <p className="text-red-700">{usernameError?.response.data.message}</p>
          <p className="text-green-700">{usernameData?.data.message}</p>
        </div>
        {/* passwords */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            pwdUpdate(credentials);
          }}
        >
          <div className="mt-5">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="old_pass" value="Old password" />
              </div>
              <TextInput
                id="old_pass"
                type="password"
                value={credentials.old_pwd}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    old_pwd: e.target.value,
                  }))
                }
                required
              />
              <p className="text-red-700"> {pwdError?.response.data.message}</p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="new_pass" value="New password" />
              </div>
              <TextInput
                id="new_pass"
                type="password"
                value={credentials.new_pwd}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    new_pwd: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="mt-5 flex justify-end items-center gap-5">
              <p className="text-green-700 text-left">
                {pwdData?.data.message}
              </p>

              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
