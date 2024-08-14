// dependencies
import React, { useState } from "react";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader,
} from "tw-elements-react";
import {
  Alert,
  Button,
  FileInput,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import Select from "react-select";

// api
import { getEmployeesList, uploadCTO } from "../../api";

// icons
import { HiInformationCircle } from "react-icons/hi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const CtoUploadModal = ({ showModal, setShowModal }) => {
  const { data: employees } = getEmployeesList();
  const transformedData = employees?.map((emp) => ({
    value: emp.emp_id,
    label: emp.full_name,
  }));

  const {
    mutate: uploadData,
    isSuccess,
    isError,
    error,
    data,
    isPending,
  } = uploadCTO();

  const [alert, setAlert] = useState(false);
  const [body, setBody] = useState({
    ROMO_No: "",
    hour: "",
    period: "",
    remarks: "",
    options: [],
  });
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    const pdfFile = e.target.files[0];
    if (pdfFile) {
      const name = pdfFile.name.toLowerCase();
      if (!name.endsWith(".pdf")) {
        setAlert(true);
        setFile();
      } else {
        setFile(pdfFile);
      }
    }
  };

  const uploadForm = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("array", JSON.stringify(body.options));
    formData.append(
      "inputs",
      JSON.stringify({
        ROMO_No: body.ROMO_No,
        period: body.period,
        hour: body.hour,
        remarks: body.remarks,
      })
    );

    uploadData(formData);
  };


  return (
    <div>
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog centered size="lg">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Close button--> */}
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <form onSubmit={uploadForm}>
                {/* ROMO id */}
                <div className="flex gap-3 mb-2">
                  <div className="flex items-center">
                    <p className="mr-2 text-sm">Reference</p>
                    <TextInput
                      type="text"
                      sizing="sm"
                      onChange={(e) =>
                        setBody((prev) => ({
                          ...prev,
                          ROMO_No: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  {/* Period */}
                  <div className="flex items-center">
                    <p className="mr-2 text-sm">Month of</p>
                    <TextInput
                      type="text"
                      sizing="sm"
                      onChange={(e) =>
                        setBody((prev) => ({
                          ...prev,
                          period: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                {/* File upload */}
                <div className="mb-2">
                  <div>
                    <Label
                      htmlFor="upload-file-input"
                      value="Upload ROMO/STO File"
                    />
                  </div>
                  <FileInput
                    id="upload-file-input"
                    sizing="sm"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                  {alert && (
                    <div className="mt-3">
                      <Alert
                        color="failure"
                        icon={HiInformationCircle}
                        onDismiss={() => setAlert(false)}
                      >
                        <span className="font-medium">Wrong file!</span> Upload
                        only .pdf file.{" "}
                      </Alert>
                    </div>
                  )}
                </div>

                {/* Input forms */}
                <div className="flex flex-row gap-3 mb-2">
                  {/* Employee Selection */}
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="emp_select_input" value="Employee" />
                    </div>
                    <Select
                      id="emp_select_input"
                      options={transformedData}
                      value={body.options}
                      onChange={(selectedOption) =>
                        setBody((prev) => ({
                          ...prev,
                          options: selectedOption,
                        }))
                      }
                      isMulti={true}
                      required
                    />
                  </div>

                  {/* Input Hr */}
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="render-input" value="Render Hours" />
                    </div>
                    <TextInput
                      id="render-input"
                      type="number"
                      step="0.1"
                      sizing="sm"
                      onChange={(e) =>
                        setBody((prev) => ({ ...prev, hour: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                {/* Remarks */}
                <div className="mb-2">
                  <div className="mb-2 block">
                    <Label htmlFor="remarks" value="Remarks" />
                  </div>
                  <Textarea
                    id="remarks"
                    placeholder="Leave a remark..."
                    onChange={(e) =>
                      setBody((prev) => ({
                        ...prev,
                        remarks: e.target.value,
                      }))
                    }
                    rows={4}
                  />
                </div>

                {/* Upload Button */}
                <div className="flex flex-row justify-end items-center mt-2 gap-5">
                  {isSuccess && (
                    <div className="mt-3">
                      <Alert
                        color="success"
                        icon={FaCheckCircle}
                        onDismiss={() => setAlert(false)}
                      >
                        Successfully Uploaded!
                      </Alert>
                    </div>
                  )}

                  <div>
                    <Button
                      type="submit"
                      color="success"
                      size="sm"
                      disabled={!file || isPending}
                    >
                      {" "}
                      <IoCloudUploadOutline size="20px" />
                      <span className="ml-2">Save</span>
                    </Button>
                  </div>
                </div>
              </form>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default CtoUploadModal;
