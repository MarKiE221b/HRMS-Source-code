import React, { useEffect, useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import Loading from "../loading/Loading";
import {
  Alert,
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { getEmployeesList, leaveTypeApi, uploadLeaveForm } from "../../api";
import { HiInformationCircle } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";

const UploadLeaveModal = ({ showModal, setShowModal }) => {
  const { data: employeesList, isFetching: isListFetching } =
    getEmployeesList();
  const { data: leaveTypes, isFetching: isTypesFetching } = leaveTypeApi();

  const {
    mutate: uploadValues,
    isPending: isPendingLeaveUpload,
    data: messageData,
    isSuccess: isSuccessUpload,
  } = uploadLeaveForm();

  const [dates, setDates] = useState([]);
  const [formTextValues, setFormTextValues] = useState({
    inclusiveDates: [],
    noRender: "",
    particulars: "",
    employee: "",
    leaveType: "",
    payCheck: false,
  });
  const [file, setFile] = useState();
  const [isFileInvalid, setIsFileInvalid] = useState(false);
  const [isSuccessUploadAlert, setIsSuccessUploadAlert] = useState(false);

  const handleFileChange = (e) => {
    const pdfFile = e.target.files[0];
    if (pdfFile) {
      const name = pdfFile.name.toLowerCase();
      if (!name.endsWith(".pdf")) {
        setIsFileInvalid(true);
        setFile();
      } else {
        setFile(pdfFile);
      }
    }
  };

  const handleSubmitValues = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("form", JSON.stringify(formTextValues));
    formData.append("file", file);

    uploadValues(formData);
  };

  useEffect(() => {
    setFormTextValues((prev) => ({
      ...prev,
      inclusiveDates: dates?.map((date) => date.format("MMMM DD YYYY")),
    }));
  }, [dates]);

  useEffect(() => {
    setFormTextValues((prev) => ({
      ...prev,
      noRender: formTextValues.inclusiveDates.length,
    }));
  }, [formTextValues.inclusiveDates]);

  useEffect(() => {
    if (isSuccessUpload) {
      setIsSuccessUploadAlert(true);
      setFormTextValues({
        inclusiveDates: [],
        noRender: "",
        particulars: "",
        employee: "",
        leaveType: "",
        payCheck: false,
      });

      setFile();
      setDates([]);
    }
  }, [isSuccessUpload]);

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Modal title
              </h5>
              {/* <!--Close button--> */}
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
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <form onSubmit={handleSubmitValues}>
              <TEModalBody>
                {isListFetching || isTypesFetching ? (
                  <Loading />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                      {/* period */}
                      <div className="flex flex-col gap-2 m-1">
                        <p className="text-sm font-medium text-gray-900">
                          Period
                        </p>
                        <div className="w-full">
                          <DatePicker
                            style={{ height: "40px", width: "350px" }}
                            value={dates}
                            onChange={(date) => {
                              setDates(date);
                            }}
                            format="MMMM DD YYYY"
                            sort
                            plugins={[<DatePanel />, weekends()]}
                            calendarPosition="right"
                            fixMainPosition={true}
                            fixRelativePosition={true}
                            required
                          />
                        </div>
                      </div>

                      {/* number of days */}
                      <div className="m-1">
                        <div className="mb-2 block">
                          <Label htmlFor="noDays" value="No of Days Used" />
                        </div>
                        <TextInput
                          id="noDays"
                          type="text"
                          sizing="md"
                          value={formTextValues.noRender}
                          onChange={(e) =>
                            setFormTextValues((prev) => ({
                              ...prev,
                              noRender: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      {/* particulars */}
                      <div className="m-1">
                        <div className="mb-2 block">
                          <Label htmlFor="particulars" value="Particulars" />
                        </div>
                        <TextInput
                          id="particulars"
                          type="text"
                          sizing="md"
                          value={formTextValues.particulars}
                          onChange={(e) =>
                            setFormTextValues((prev) => ({
                              ...prev,
                              particulars: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      {/* employee dropdown */}
                      <div className="m-1 md:col-span-2">
                        <div className="max-w-md">
                          <div className="mb-2 block">
                            <p className="text-sm font-medium text-gray-900">
                              Employee
                            </p>
                          </div>
                          <Select
                            value={formTextValues.employee}
                            onChange={(e) =>
                              setFormTextValues((prev) => ({
                                ...prev,
                                employee: e.target.value,
                              }))
                            }
                            required
                          >
                            <option value={null}>Select Employee</option>
                            {employeesList?.map((data, index) => (
                              <option key={index} value={data.emp_id}>
                                {data.full_name}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      {/* Leave Type Selection */}
                      <div className=" m-1 md:col-start-1">
                        <div className="max-w-md">
                          <div className="mb-2 block">
                            <p className="text-sm font-medium text-gray-900">
                              Leave Type
                            </p>
                          </div>
                          <Select
                            value={formTextValues.leaveType}
                            onChange={(e) =>
                              setFormTextValues((prev) => ({
                                ...prev,
                                leaveType: e.target.value,
                              }))
                            }
                            required
                          >
                            <option value={null}>Select Type</option>

                            {leaveTypes?.map((data, index) => (
                              <option key={index} value={data.type_id}>
                                {data.type}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      {/* Pay selection checkbox */}
                      <div className="m-1">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={formTextValues.payCheck}
                            onChange={() =>
                              setFormTextValues((prev) => ({
                                ...prev,
                                payCheck: !formTextValues.payCheck,
                              }))
                            }
                            id="payCheck"
                          />
                          <Label htmlFor="payCheck">With Pay?</Label>
                        </div>
                      </div>
                    </div>

                    <div className="m-1 md:col-span-2">
                      <div className="mb-2 block">
                        <Label htmlFor="file-upload" value="Upload file" />
                      </div>
                      <FileInput
                        accept="application/pdf"
                        onChange={handleFileChange}
                        id="file-upload"
                        required
                      />
                    </div>

                    {isFileInvalid && (
                      <div className="mt-3 md:col-span-2">
                        <Alert
                          color="failure"
                          icon={HiInformationCircle}
                          onDismiss={() => setIsFileInvalid(false)}
                        >
                          <span className="font-medium">Wrong file!</span>{" "}
                          Upload only .pdf file.{" "}
                        </Alert>
                      </div>
                    )}
                  </>
                )}
              </TEModalBody>

              <TEModalFooter>
                <div className="flex gap-1">
                  {isSuccessUploadAlert && (
                    <Alert
                      color="success"
                      onDismiss={() => setIsSuccessUploadAlert(false)}
                    >
                      <span className="font-medium">
                        Success! {messageData?.data?.message}
                      </span>
                    </Alert>
                  )}

                  <div>
                    <Button
                      color="failure"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      isProcessing={isPendingLeaveUpload}
                      processingSpinner={
                        <AiOutlineLoading className="h-6 w-6 animate-spin" />
                      }
                      disabled={
                        isFileInvalid ||
                        isListFetching ||
                        isTypesFetching ||
                        isPendingLeaveUpload
                      }
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </TEModalFooter>
            </form>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default UploadLeaveModal;
