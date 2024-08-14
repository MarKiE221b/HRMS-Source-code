import React from "react";
import { IoIosPeople } from "react-icons/io";
import { TERipple } from "tw-elements-react";
import { getAllApplications, getEmployeesCount } from "../../../api";
import Loading from "../../../components/loading/Loading.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: empCount, isFetching: loadCount } = getEmployeesCount();
  const { data: allApplications, isFetching: loadApp } = getAllApplications();

  return (
    <div className="flex flex-col md:flex-row md:px-14 md:mt-9 gap-14 ">
      {/* sample card */}
      <div className="flex-grow rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-full">
        <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          Leave Requests
        </div>
        {loadApp ? (
          <Loading />
        ) : (
          <div className="p-6">
            {/* table */}
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="bg-white font-medium">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Leave
                          </th>
                          <th scope="col" className="px-6 py-4">
                            No. Days
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Inclusive Dates
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allApplications.map((app, key) => (
                          <tr
                            key={key}
                            className="bg-neutral-100 hover:bg-neutral-200 duration-300 ease-in-out"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {app.full_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {app.type}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {app.no_days}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {app.inclusive_dates}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* sample card 2 */}

      <div className="flex-shrink-0 md:max-h-48 rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        {loadCount ? (
          <Loading />
        ) : (
          <div className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center gap-6">
              {/* Icon */}
              <div className="flex flex-shrink-0 bg-primary-600 rounded-md shadow-md">
                <div className="p-3">
                  <IoIosPeople size="40px" color="white" />
                </div>
              </div>
              {/* Number */}
              <div className="flex-grow">
                <p className="mb-1 text-black text-opacity-40">Employees</p>
                <h1 className="text-5xl font-semibold">
                  {empCount.map((count) => {
                    return count.no_employees;
                  })}
                </h1>
              </div>
            </div>
            {/* footer */}
            <div className="border-t-2 border-neutral-100 px-6 py-3 mt-6">
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                  onClick={() => navigate("/admin/employees")}
                >
                  VIEW MORE
                </button>
              </TERipple>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
