import React, { useEffect, useState } from "react";

import logo from "../../../assets/ched-logo.png";
import { IoReturnUpBack } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { Avatar, Button, Label, TextInput } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import {
  getUsername,
  updateUsername,
  updatePwd,
  uploadSignature,
  getSignature,
} from "../../../api";
import { useQueryClient } from "@tanstack/react-query";
import SignatureCanvas from "react-signature-canvas";

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
  const { mutate: signatureUpload, data: uploadSignatureData } =
    uploadSignature();
  const { data: signatureImgData, refetch } = getSignature();

  const [credentials, setCredentials] = useState({
    username: "",
    old_pwd: "",
    new_pwd: "",
  });

  const [signature, setSignature] = useState();

  useEffect(() => {
    setCredentials((prev) => ({ ...prev, username: username?.username || "" }));
  }, [isSuccess]);

  return (
    <div className="flex md:flex-row md:items-start flex-col items-center justify-center gap-5">
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

      <div className="bg-white w-full max-w-[500px] p-5 shadow-sm">
        <div className="flex flex-col items-center p-2 gap-2">
          <p className="">MY CURRENT SIGNATURE</p>
          <img
            className="h-[100px] w-[100px]"
            src={signatureImgData}
            alt="signature"
          />
          <button type="button" onClick={() => refetch()}>
            <IoIosRefresh size="20px" />
          </button>
        </div>

        <div className="flex items-center justify-center h-[300px]">
          <SignatureCanvas
            ref={(ref) => setSignature(ref)}
            penColor="black"
            canvasProps={{
              className:
                "w-full h-full flex-grow border border-solid border-black",
            }}
          />
        </div>

        {/* Canvas buttons */}
        <div className="mt-5 flex justify-end items-center gap-5">
          {/* alert */}
          {uploadSignatureData?.data && (
            <p className="text-green-700 text-left">
              {uploadSignatureData?.data}
            </p>
          )}

          <Button
            type="button"
            color="failure"
            onClick={() => {
              signature.clear();
            }}
          >
            Clear
          </Button>
          <Button
            type="button"
            color="success"
            onClick={async () => {
              const base64URL = signature
                .getTrimmedCanvas()
                .toDataURL("image/png");

              const signatureBlob = await dataURLToBlob(base64URL);

              const formData = new FormData();
              formData.append("file", signatureBlob, "mySignature.png");

              signatureUpload(formData);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const dataURLToBlob = (dataURL) => {
  return new Promise((resolve, reject) => {
    try {
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
};
export default SettingsPage;
