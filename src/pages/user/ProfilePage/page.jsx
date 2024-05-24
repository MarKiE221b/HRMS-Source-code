import React, { useMemo, useState } from "react";

// icons & picutures
import logo from "../../../assets/ched-logo.png";
import gifSwimming from "/swimming-pool.gif";
import gifSick from "/sick.gif";
import gifOT from "/down-time.gif";
import { FaWpforms } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Avatar } from "flowbite-react";

// components
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

// api middlewares
import {
  applyLeaveApi,
  creditInfoApi,
  leaveApplicationsApi,
  leaveTypeApi,
  userInfoApi,
} from "../../../api";

const ProfilePage = () => {
  const { data: userData } = userInfoApi();
  const { data: creditInfo } = creditInfoApi();
  const { data: leaveApplications } = leaveApplicationsApi();

  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (props) => <div>{props.getValue()}</div>,
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
    <div className="h-full">
      {/* Modal */}
      <LeaveModal showModal={showModal} setShowModal={setShowModal} />

      {/* Main */}
      <div className="flex flex-col md:flex-row h-full gap-8">
        <div className="flex flex-col gap-8 md:w-[450px]">
          {/* Profile Panel */}
          <div className="bg-white shadow-sm p-8">
            <div className="flex items-center gap-4">
              <Avatar img={logo} alt="profile_avatar" rounded size="lg" />
              <div>
                <span className="block font-bold">
                  {`${userData?.lastname}, ${userData?.firstname} ${
                    userData?.middlename ? userData?.middlename + " " : ""
                  }${userData?.ext_name || ""}`}
                </span>
                <span className="block text-sm text-gray-400">{userData?.unit}</span>
              </div>
            </div>
            {/* Credits Earned Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
              <div className="flex flex-col items-center border p-4">
                <div className="h-[30px] w-[30px]">
                  <img src={gifSwimming} alt="swimming_gif" />
                </div>
                <span className="block text-base font-bold">
                  {userData?.vacation_balance}
                </span>
                <span className="block text-gray-400">Credits</span>
              </div>

              <div className="flex flex-col items-center border p-4">
                <img
                  src={gifSick}
                  alt="sick_gif"
                  className="h-[30px] w-[30px]"
                />
                <span className="block text-base font-bold">
                  {userData?.sick_balance}
                </span>
                <span className="block text-gray-400">Credits</span>
              </div>

              <div className="flex flex-col items-center border p-4">
                <img src={gifOT} alt="ot_gif" className="h-[30px] w-[30px]" />
                <span className="block text-base font-bold">0</span>
                <span className="block text-gray-400">Credits</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm p-8 h-full overflow-auto">
            <h1 className="text-xl font-semibold">Earned Credits</h1>
            <div className="mt-5">
              {creditInfo?.map((credits, key) => (
                <div
                  key={key}
                  className="p-4 border shadow-sm bg-slate-50 mb-2"
                >
                  <span className="block text-base font-semibold">
                    {`${credits.particulars} ${
                      credits.vacation_earned ? "Vacation" : "Sick"
                    } `}
                  </span>
                  <span className="block text-gray-400">
                    Credits Earned:{" "}
                    {credits.vacation_earned || credits.sick_earned}
                  </span>
                  <span className="block text-gray-400">
                    Month Credited : {credits.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 bg-white w-full shadow-sm ">
          <div className="my-5  w-full">
            <button
              className="border flex items-center gap-2 bg-slate-50 p-2 hover:bg-slate-200 w-full sm:w-auto"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <FaWpforms size="20px" />
              <span className="text-sm md:text-base">Apply Leave</span>
            </button>
          </div>

          <div className="text-sm overflow-auto">
            <table className="max-h-[500px] w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-100 border ">
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
      </div>
    </div>
  );
};

const LeaveModal = ({ showModal, setShowModal }) => {
  const { data: leaveTypeData } = leaveTypeApi();
  const { mutate: applyLeave, isSuccess } = applyLeaveApi();

  const [formData, setFormData] = useState({
    type_id: "",
    details: "",
    no_days: null,
    inclusive_dates: "",
  });

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog centered size="sm">
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
            {/* <!--Modal body--> */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                applyLeave(formData);

                if (isSuccess) {
                  setShowModal(false);
                }
              }}
            >
              <TEModalBody>
                <div className="flex flex-col">
                  <div className="mb-3">
                    <div className="mb-3">
                      <h1>6.A TYPE OF LEAVE TO BE AVAILED OF</h1>
                    </div>
                    <div className="max-w-md">
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
                      >
                        {leaveTypeData?.map((types, key) => (
                          <option key={key} value={types.type_id}>
                            {types.type}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-3">
                      <h1>6.B DETAILS OF LEAVE</h1>
                    </div>
                    <div className="max-w-md">
                      <Textarea
                        id="details"
                        placeholder="Details of leave..."
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            details: e.target.value,
                          }));
                        }}
                        required
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-2">
                      <h1>6.C NUMBER OF WORKING DAYS APPLIED FOR</h1>
                    </div>
                    <div>
                      <div className="">
                        <TextInput
                          id="days"
                          type="text"
                          sizing="sm"
                          className="w-64"
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              no_days: parseInt(e.target.value),
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-64">
                      <div className="mb-1 block">
                        <Label htmlFor="inclusiveD" value="INCLUSIVE DATES" />
                      </div>
                      <TextInput
                        id="inclusiveD"
                        type="text"
                        sizing="sm"
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            inclusive_dates: e.target.value,
                          }));
                        }}
                      />
                    </div>
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
                    className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Apply
                  </button>
                </TERipple>
              </TEModalFooter>
            </form>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default ProfilePage;
