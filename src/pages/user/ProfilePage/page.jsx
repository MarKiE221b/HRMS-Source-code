import React, { useEffect, useMemo, useState } from "react";

// icons & picutures
import logo from "../../../assets/ched-logo.png";
import gifSwimming from "/swimming-pool.gif";
import gifSick from "/sick.gif";
import gifOT from "/down-time.gif";
import gifPerson from "/person-time.gif";
import gifExit from "/exit.gif";

import {
  FaWpforms,
  FaExclamationCircle,
  FaRegFileAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

// components
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Label,
  Select,
  Textarea,
  TextInput,
  Radio,
  Tooltip,
  Alert,
  Avatar,
  Spinner,
} from "flowbite-react";
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
import StatusTimeline from "../../../components/user/StatusTimeline";
import LeaveFormModal from "../../../components/user/LeaveFormModal";
import RDRequestPage from "../../../components/user/RDRequestPage";
import Loading from "../../../components/loading/Loading";

// api middlewares
import {
  applyLeaveApi,
  leaveApplicationForm,
  leaveApplicationsApi,
  leaveTypeApi,
  userInfoApi,
} from "../../../api";

// Libraries
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: userData, isPending: isPendingUserInfo } = userInfoApi();
  const { data: leaveApplications, isPending: isPendingApplications } =
    leaveApplicationsApi(userData?.division);
  const {
    mutate: postLeave,
    data,
    isPending: isPendingLeaveForm,
  } = leaveApplicationForm();

  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leaveFormModal, setLeaveFormModal] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "no_days",
        header: "No. Days",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "inclusive_dates",
        header: "Dates",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "details",
        header: "Details",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (props) => (
          <StatusTimeline status={props.table} row={props.row} />
        ),
      },
      {
        accessorKey: "app_id",
        header: "",
        cell: (props) => (
          <div>
            {isPendingLeaveForm ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : (
              <button
                className="hover:text-blue-900"
                type="button"
                onClick={() => {
                  postLeave({ id: props.getValue() });
                  setLeaveFormModal(true);
                }}
              >
                <Tooltip content="View Application Form">
                  <FaRegFileAlt size="25px" />
                </Tooltip>
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: leaveApplications || [],
    columns,
    state: {
      sorting: sorting,
      globalFilter: columnFilters,
    },
    getCoreRowModel: getCoreRowModel(), // Pass the hook reference directly, not a call to it
    getFilteredRowModel: getFilteredRowModel(), // Same here
    getSortedRowModel: getSortedRowModel(), // And here
    onGlobalFilterChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  return (
    <>
      {/* Modal */}
      <LeaveModal
        showModal={showModal}
        setShowModal={setShowModal}
        userInfo={userData}
        application={leaveApplications}
      />

      {/* Leave Form Modal */}
      <LeaveFormModal
        data={data?.data}
        showModal={leaveFormModal}
        setShowModal={setLeaveFormModal}
      />

      <div className="flex flex-col gap-5 md:flex-row w-full overflow-x-auto">
        <div className="flex flex-col gap-5 min-w-[300px] ">
          {/* Profile Panel */}

          <div className="bg-white shadow-sm p-8">
            {isPendingUserInfo ? (
              <Loading />
            ) : (
              <>
                <div className="flex justify-center gap-4 md:flex-col">
                  <div>
                    <p className="block font-bold">
                      {`${userData?.lastname}, ${userData?.firstname} ${
                        userData?.middlename ? userData?.middlename + " " : ""
                      }${userData?.ext_name || ""}`}
                    </p>
                    <p className="block text-sm text-gray-400">
                      {userData?.unit}
                    </p>
                  </div>
                </div>

                {/* Credits Earned Panel */}
                {userData?.division !== "RD" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                      <div className="flex flex-col items-center border p-4 overflow-hidden">
                        <Tooltip content="Vacation Credits">
                          <div className="h-[30px] w-[30px]">
                            <img src={gifSwimming} alt="swimming_gif" />
                          </div>
                        </Tooltip>
                        <div className="text-center">
                          <p className="block font-bold">
                            {userData?.vacation_balance !== null
                              ? userData?.vacation_balance
                              : 0}
                          </p>
                          <p className="block text-gray-400">Credits</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center border p-4 overflow-hidden">
                        <Tooltip content="Sick Credits">
                          <div className="h-[30px] w-[30px]">
                            <img src={gifSick} alt="sick_gif" />
                          </div>
                        </Tooltip>
                        <div className="text-center">
                          <p className="block font-bold">
                            {userData?.sick_balance !== null
                              ? userData?.sick_balance
                              : 0}
                          </p>
                          <p className="block text-gray-400">Credits</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center border p-4 overflow-hidden">
                        <Tooltip content="CTO Credits ">
                          <div className="h-[30px] w-[30px]">
                            <img src={gifOT} alt="ot_gif" />
                          </div>
                        </Tooltip>
                        <div className="text-center">
                          <p className="block font-bold">
                            {userData?.CTO_balance !== null
                              ? userData?.CTO_balance
                              : 0}
                          </p>
                          <p className="block text-gray-400">Credits</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center border p-4 overflow-hidden">
                        <Tooltip content="Personal Leave">
                          <div className="h-[30px] w-[30px]">
                            <img src={gifPerson} alt="ot_gif" />
                          </div>
                        </Tooltip>
                        <div className="text-center">
                          <p className="block font-bold">
                            {userData?.personal_balance !== null
                              ? userData?.personal_balance
                              : 0}
                          </p>
                          <p className="block text-gray-400">Credits</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center border p-4 overflow-hidden">
                        <Tooltip content="Forced Leave">
                          <div className="h-[30px] w-[30px]">
                            <img src={gifExit} alt="ot_gif" />
                          </div>
                        </Tooltip>
                        <div className="text-center">
                          <p className="block font-bold">
                            {userData?.forced_balance !== null
                              ? userData?.forced_balance
                              : 0}
                          </p>
                          <p className="block text-gray-400">Credits</p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex justify-end mt-3">
                      <button
                        type="button"
                        className="inline-block rounded px-2 pt-2.5 text-sm hover:underline font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                        onClick={() => navigate("ledger")}
                      >
                        VIEW LEDGER
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Table Application */}
        <div className="relative flex-grow bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-full p-5">
          {isPendingUserInfo || isPendingApplications ? (
            <Loading />
          ) : (
            <>
              {userData?.division === "RD" ? (
                <RDRequestPage />
              ) : (
                <div className="">
                  <div className="mb-3">
                    <button
                      className="border flex items-center gap-2 bg-slate-50 p-2 hover:bg-slate-200 w-full sm:w-auto"
                      type="button"
                      onClick={() =>
                        setShowModal((prev) => ({ ...prev, modal1: true }))
                      }
                    >
                      <FaWpforms size="20px" />
                      <span className="text-sm md:text-base">
                        Request Leave
                      </span>
                    </button>
                  </div>

                  {/* Your Table */}
                  <div className="text-sm max-h-screen overflow-y-auto">
                    <table className=" w-full">
                      <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr
                            key={headerGroup.id}
                            className="bg-gray-100 border "
                          >
                            {headerGroup.headers.map((header) => (
                              <td
                                className="cursor-pointer px-7 py-3"
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                <div className="flex gap-1 items-center">
                                  {header.column.columnDef.header}
                                  {
                                    {
                                      asc: <IoIosArrowUp />,
                                      desc: <IoIosArrowDown />,
                                    }[header.column.getIsSorted() ?? null]
                                  }
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows?.map((row) => (
                          <tr className="h-10 hover:bg-gray-100" key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <td className="px-7 border" key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const LeaveModal = ({ showModal, setShowModal, userInfo, application }) => {
  const queryClient = useQueryClient();
  const { data: leaveTypeData, isPending: isPendingTypeData } = leaveTypeApi(
    userInfo?.division
  );
  const {
    mutate: applyLeave,
    status,
    data,
    isPending: isPendingPostApp,
  } = applyLeaveApi();

  const applicationStatus = application?.some(
    (item) => item.approvedStatus === "Pending"
  );

  const [dates, setDates] = useState([]);

  const [formData, setFormData] = useState({
    type_id: "",
    detailsRadio: "",
    details: "",
    inclusive_dates: [],
    division: "",
  });

  useEffect(() => {
    if (data?.status === 200) {
      if (data?.data.message === "Successfully submitted!") {
        queryClient.invalidateQueries({
          queryKey: ["leaveApplicationsKey"]["getnotedcountkey"],
        });
        setFormData({
          type_id: "",
          details: "",
          detailsRadio: "",
          inclusive_dates: [],
        });
        setShowModal(false);
      }
    }
  }, [status === "success"]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      inclusive_dates: dates.map((date) => date.format("MMMM DD YYYY")),
    }));
  }, [dates]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      division: userInfo?.division,
    }));
  }, [userInfo]);

  const CustomMultipleInput = ({ onFocus, value }) => {
    return (
      <div className="w-full">
        <div className="mb-1 block">
          <Label htmlFor="inclusiveD" value="INCLUSIVE DATES" />
        </div>
        <div className="flex items-center gap-2">
          <TextInput
            id="inclusiveD"
            value={value}
            onFocus={onFocus}
            icon={FaCalendarCheck}
            readOnly
            disabled={
              (formData.type_id === "SL003" &&
                userInfo.sick_balance < formData.no_days) ||
              (formData.type_id === "VC001" &&
                userInfo.vacation_balance < formData.no_days) ||
              (formData.type_id === "CTO001" &&
                userInfo.CTO_balance < formData.no_days) ||
              applicationStatus === true
            }
          />
        </div>
      </div>
    );
  };

  const minDateFilled = () => {
    if (
      formData.type_id === "VC001" ||
      formData.type_id === "SL003" ||
      formData.type_id === "SPL007" ||
      formData.type_id === "SLBW011"
    ) {
      return new Date().setDate(parseInt(new Date().getDate() + 5));
    } else if (formData.type_id === "SPL006" || formData.type_id === "RP010") {
      return new Date().setDate(parseInt(new Date().getDate() + 7));
    } else {
      return new Date();
    }
  };

  const countSplitDate = () => {
    return formData.inclusive_dates.length;
  };

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog centered size="lg">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Leave Application
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
            {isPendingTypeData ? (
              <Loading />
            ) : (
              <>
                {/* <!--Modal body--> */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyLeave(formData);
                  }}
                >
                  <TEModalBody>
                    <div className="flex flex-col">
                      {/* Dropdown for leave type */}
                      <div className="mb-3">
                        <div className="mb-3">
                          <h1>6.A TYPE OF LEAVE TO BE AVAILED OF</h1>
                        </div>
                        <div className="w-full">
                          <Select
                            id="leave"
                            value={formData.type_id}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                type_id: e.target.value,
                              }));
                            }}
                            required
                            disabled={applicationStatus}
                          >
                            {leaveTypeData?.map((types, key) => (
                              <option key={key} value={types.type_id}>
                                {types.type}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      {/* Details of leave */}
                      <div className="mb-3">
                        <div>
                          <h1>6.B DETAILS OF LEAVE</h1>
                        </div>

                        {/* radio conditions */}
                        {(formData.type_id === "VC001" ||
                          formData.type_id === "SPL006" ||
                          formData.type_id === "SL003" ||
                          formData.type_id === "SL008") && (
                          <div className="py-2">
                            <fieldset className="flex max-w-md flex-col gap-4">
                              <div className="flex items-center gap-2">
                                <Radio
                                  id="radio1"
                                  name="detailsRadio"
                                  value={
                                    formData.type_id === "VC001" ||
                                    formData.type_id === "SPL006"
                                      ? "Within the Philippines"
                                      : "" || formData.type_id === "SL003"
                                      ? "In Hospital"
                                      : "" || formData.type_id === "SL008"
                                      ? "Completion of Master's Degree"
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      detailsRadio: e.target.value,
                                    }))
                                  }
                                  required
                                />
                                <Label htmlFor="radio1">
                                  {formData.type_id === "VC001" ||
                                  formData.type_id === "SPL006"
                                    ? "Within the Philippines"
                                    : ""}

                                  {formData.type_id === "SL003"
                                    ? "In Hospital"
                                    : ""}

                                  {formData.type_id === "SL008"
                                    ? "Completion of Master's Degree"
                                    : ""}
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Radio
                                  id="radio2"
                                  name="detailsRadio"
                                  value={
                                    formData.type_id === "VC001" ||
                                    formData.type_id === "SPL006"
                                      ? "Abroad"
                                      : "" || formData.type_id === "SL003"
                                      ? "Out Patient"
                                      : "" || formData.type_id === "SL008"
                                      ? "BAR/Board Examination Review"
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      detailsRadio: e.target.value,
                                    }))
                                  }
                                  required
                                />
                                <Label htmlFor="radio2">
                                  {formData.type_id === "VC001" ||
                                  formData.type_id === "SPL006"
                                    ? "Abroad"
                                    : ""}

                                  {formData.type_id === "SL003"
                                    ? "Out Patient"
                                    : ""}

                                  {formData.type_id === "SL008"
                                    ? "BAR/Board Examination Review"
                                    : ""}
                                </Label>
                              </div>
                            </fieldset>
                          </div>
                        )}

                        {/* text area */}
                        <div className="w-full">
                          <Textarea
                            id="details"
                            placeholder="Details of leave..."
                            value={formData.details}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                details: e.target.value,
                              }));
                            }}
                            required
                            disabled={applicationStatus}
                            rows={4}
                          />
                        </div>
                      </div>

                      {/* Day Inputs */}
                      <div className="mb-3">
                        {/* No of days */}

                        <div>
                          <div className="mb-2 max-w-sm">
                            <h1>6.C NUMBER OF WORKING DAYS APPLIED FOR</h1>
                            <div className="block max-w-20 border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm text-center rounded-lg">
                              <p>{countSplitDate()}</p>
                            </div>
                          </div>
                        </div>

                        {/* Inclusive dates */}
                        <div className="w-full">
                          <DatePicker
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
                            render={<CustomMultipleInput />}
                            minDate={minDateFilled()}
                          />
                        </div>

                        {applicationStatus && (
                          <div className="mt-3">
                            <Alert color="warning" icon={FaExclamationCircle}>
                              You have pending request. Please wait until your
                              previous request is approved
                            </Alert>
                          </div>
                        )}

                        {formData.type_id === "SL003" &&
                          userInfo.sick_balance < countSplitDate() && (
                            <div className="mt-3">
                              <Alert color="warning" icon={FaExclamationCircle}>
                                Insuficient balance for Sick Leave.
                              </Alert>
                            </div>
                          )}

                        {formData.type_id === "VC001" &&
                          userInfo.vacation_balance < countSplitDate() && (
                            <div className="mt-3">
                              <Alert color="warning" icon={FaExclamationCircle}>
                                Insuficient balance for Vacation Leave.
                              </Alert>
                            </div>
                          )}

                        {formData.type_id === "CTO001" &&
                          userInfo.CTO_balance < countSplitDate() && (
                            <div className="mt-3">
                              <Alert color="warning" icon={FaExclamationCircle}>
                                Insuficient balance for CTO Leave.
                              </Alert>
                            </div>
                          )}

                        {formData.type_id === "PL006" &&
                          userInfo.personal_balance < countSplitDate() && (
                            <div className="mt-3">
                              <Alert color="warning" icon={FaExclamationCircle}>
                                Insuficient balance for Personal Leave.
                              </Alert>
                            </div>
                          )}

                        {formData.type_id === "ML002" &&
                          userInfo.forced_balance < countSplitDate() && (
                            <div className="mt-3">
                              <Alert color="warning" icon={FaExclamationCircle}>
                                Insuficient balance for Forced/Mandatory Leave.
                              </Alert>
                            </div>
                          )}
                      </div>
                    </div>
                  </TEModalBody>

                  <TEModalFooter>
                    <TERipple rippleColor="light">
                      <button
                        type="button"
                        className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </TERipple>
                    <TERipple rippleColor="light">
                      <button
                        type="submit"
                        className="flex gap-3 ml-1 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        disabled={
                          (formData.type_id === "SL003" &&
                            userInfo.sick_balance < countSplitDate()) ||
                          (formData.type_id === "VC001" &&
                            userInfo.vacation_balance < countSplitDate()) ||
                          (formData.type_id === "CTO001" &&
                            userInfo.CTO_balance < countSplitDate()) ||
                          (formData.type_id === "PL006" &&
                            userInfo.personal_balance < countSplitDate()) ||
                          (formData.type_id === "ML002" &&
                            userInfo.forced_balance < countSplitDate()) ||
                          applicationStatus === true
                        }
                      >
                        {isPendingPostApp && (
                          <Spinner aria-label="Spinnerbtn-apply" size="sm" />
                        )}
                        Apply
                      </button>
                    </TERipple>
                  </TEModalFooter>
                </form>
              </>
            )}
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default ProfilePage;
