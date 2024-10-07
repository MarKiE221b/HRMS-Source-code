import React, { useEffect, useState } from "react";
import { Label, Select, TextInput, Toast } from "flowbite-react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { editEmployeeDetails } from "../../api";
import { HiCheck } from "react-icons/hi";

function EModifyModal({ tableRowData, showModal, setShowModal }) {
  const {
    mutate: editEmployeeMutate,
    isPending: isSubmissionPending,
    isSuccess: isSubmissionSuccess,
    data: submissionData,
  } = editEmployeeDetails();

  const empDataObject = tableRowData?.reduce((acc, data) => {
    return data;
  }, {});

  const [formData, setFormData] = useState({
    acc_id: "",
    lastname: "",
    firstname: "",
    middlename: "",
    extName: "",
    unit: "",
    division: "Technical",
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    editEmployeeMutate(formData);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, acc_id: empDataObject?.emp_id }));
  }, [empDataObject]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      lastname: "",
      firstname: "",
      middlename: "",
      extName: "",
      unit: "",
      division: "Technical",
    }));
  }, [isSubmissionSuccess]);

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg" centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Modify Account
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

            <form onSubmit={handleSubmitForm}>
              <TEModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex gap-1">
                    <p className="text-nowrap">ID :</p>
                    <p className="font-bold">{empDataObject?.emp_id}</p>
                  </div>

                  <div className="flex gap-1">
                    <p className="text-nowrap">Unit :</p>
                    <p className="font-bold">{empDataObject?.unit}</p>
                  </div>

                  <div className="flex gap-1">
                    <p className="text-nowrap">Account Name :</p>
                    <p className="font-bold">{empDataObject?.full_name}</p>
                  </div>

                  <div className="flex gap-1">
                    <p className="text-nowrap">Division :</p>
                    <p className="font-bold">{empDataObject?.division}</p>
                  </div>
                </div>

                <hr className="my-3" />

                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="lastname" value="Last Name" />
                    </div>
                    <TextInput
                      value={formData.lastname}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastname: e.target.value,
                        }))
                      }
                      id="lastname"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="firstname" value="First Name" />
                    </div>
                    <TextInput
                      value={formData.firstname}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstname: e.target.value,
                        }))
                      }
                      id="firstname"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="middlename" value="Middle Name" />
                    </div>
                    <TextInput
                      value={formData.middlename}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          middlename: e.target.value,
                        }))
                      }
                      id="middlename"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="extname" value="Extension Name" />
                    </div>
                    <TextInput
                      value={formData.extName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          extName: e.target.value,
                        }))
                      }
                      id="extname"
                      type="text"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="unit" value="Unit" />
                    </div>
                    <TextInput
                      value={formData.unit}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          unit: e.target.value,
                        }))
                      }
                      id="unit"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="division" value="Division" />
                    </div>
                    <Select
                      value={formData.division}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          division: e.target.value,
                        }))
                      }
                      id="division"
                      required
                    >
                      <option defaultValue="Technical">Technical</option>
                      <option value="Admin">Admin</option>
                      <option value="HR">HR</option>
                      <option value="RD">RD</option>
                    </Select>
                  </div>
                </div>
              </TEModalBody>
              <TEModalFooter>
                {isSubmissionSuccess && (
                  <div className="mr-5">
                    <Toast>
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                      </div>
                      <div className="ml-3 text-sm font-normal">
                        {submissionData?.data?.message}
                      </div>
                      <Toast.Toggle />
                    </Toast>
                  </div>
                )}

                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                    disabled={isSubmissionPending}
                  >
                    Close
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Save changes
                  </button>
                </TERipple>
              </TEModalFooter>
            </form>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default EModifyModal;
