import React, { useEffect, useState } from "react";

import defautAvatar from "../../../assets/default-avatar.png";
import { IoReturnUpBack, IoCloudUploadOutline } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { Avatar, Button, Label, TextInput } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import {
  getUsername,
  updateUsername,
  updatePwd,
  uploadSignature,
  getSignature,
  uploadAvatar,
  getUploadAvatar,
} from "../../../api";
import { useQueryClient } from "@tanstack/react-query";
import SignatureCanvas from "react-signature-canvas";

const SettingsPage = () => {
  const queryClient = useQueryClient();

  const { mutate: pwdUpdate, data: pwdData, error: pwdError } = updatePwd();
  const { mutate: signatureUpload, data: uploadSignatureData } =
    uploadSignature();
  const {
    mutate: postUploadAvatar,
    data: avatarData,
    isPending: avatarUploadPending,
  } = uploadAvatar();

  const { data: signatureImgData, refetch } = getSignature();
  const { data: username, isFetched } = getUsername();
  const { data: profileAvatar, isFetched: avatarFetched } = getUploadAvatar();

  const { id } = useParams();
  const {
    mutate: usernameUpdate,
    data: usernameData,
    error: usernameError,
  } = updateUsername();

  const [signature, setSignature] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    old_pwd: "",
    new_pwd: "",
  });

  // preview avatar upload
  const previewAvatar = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file || null);
    }
  };

  // preview handler
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageUpload(file);
      previewAvatar(file);
    }
  };

  // upload profile picture
  const uploadProfile = (image) => {
    const formdata = new FormData();
    formdata.append("file", image);

    postUploadAvatar(formdata);
  };

  //
  useEffect(() => {
    setCredentials((prev) => ({ ...prev, username: username?.username || "" }));
    previewAvatar(profileAvatar);
  }, [isFetched, avatarFetched]);

  return (
    <div className="flex md:flex-row md:items-start flex-col items-center justify-center gap-5">
      <div className="bg-white w-full max-w-[500px] p-5 shadow-sm">
        <div className="flex items-center gap-1 mb-2">
          <IoReturnUpBack size="20px" />
          <Link to={`/user/${id}`}>
            <span className="hover:text-blue-900 hover:underline">Go back</span>
          </Link>
        </div>

        <div className="mt-5">
          <h1 className="text-xl font-medium">Profile Info</h1>
          <hr className="my-3" />

          {/* Avatar */}
          <div>
            <div className="relative flex justify-center">
              <Avatar img={imagePreview || defautAvatar} rounded size="lg" />
              <div className="absolute w-20 h-20 group flex items-center justify-center hover:bg-gray-200 opacity-70 rounded-full transition duration-500">
                <label htmlFor="pic-upload">
                  <IoCloudUploadOutline
                    className="hidden group-hover:block cursor-pointer"
                    size="35px"
                  />
                  <input
                    type="file"
                    className="hidden"
                    id="pic-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {imageUpload && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => uploadProfile(imageUpload)}
                  className="inline-flex items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 text-base font-semibold rounded-md"
                  disabled={avatarUploadPending}
                >
                  <MdFileUpload />
                  Upload
                </button>
              </div>
            )}
          </div>

          {/* username */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username1" value="Username" />
            </div>
            <TextInput
              id="username1"
              type="text"
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
            minWidth={2}
            maxWidth={3}
            velocityFilterWeight={0.5}
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
