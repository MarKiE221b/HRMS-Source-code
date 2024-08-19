import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
} from "tw-elements-react";

import logo from "../../assets/ched-logo.png";
import checkmark from "../../assets/checkmark.png";
import sign from "../../assets/signature.png";

const Checkbox = ({ label, checked }) => (
  <div className="flex flex-row items-center">
    <div className="w-[3mm] h-[3mm] border border-solid border-black mr-2 relative">
      {checked && <img className="absolute w-[2mm] h-[2mm]" src={checkmark} />}
    </div>
    <div className="text-[2.82mm]">{label}</div>
  </div>
);

const DocumentComponent = forwardRef((data, ref) => {
  return (
    <div ref={ref} className="flex justify-center items-center">
      <div className="w-a4-width h-a4-height border">
        {/* top right text */}
        <div className="box-border mx-[10mm] my-[5mm]">
          <div className="italic font-bold text-[2.82mm]">
            <p>Civil Service Form No. 6</p>
            <p>Revised 2020</p>
          </div>

          {/* header */}
          <div className="flex justify-between items-center pl-[110px] pr-[40px] mt-5">
            <img className="h-[65px] w-[65px]" src={logo} alt="ched-logo" />
            <div className="text-[2.82mm] text-center font-semibold">
              <p>Republic of the Philippines</p>
              <p className="italic">COMMISSION ON HIGHER EDUCATION</p>
              <p>Hayes St., Cagayan de Oro City</p>
            </div>
            <div className="text-[11px] p-2 border border-dashed border-gray-400">
              <p>Stamp of Date of Receipt</p>
            </div>
          </div>

          {/* Header Title */}
          <div className="text-center py-3">
            <h1 className="text-[24px] font-bold">APPLICATION LEAVE</h1>
          </div>

          {/* Body Border */}
          <div className="border border-solid border-black">
            {/* form 1 */}
            <div className="py-[1mm] border-b border-black border-solid">
              {/* form 1 column */}
              <div className="text-[2.82mm] flex justify-start px-[1mm]">
                <p className="mr-[30mm]">1. OFFICE/DEPARTMENT</p>
                <p className="mr-[17mm]">2. NAME :</p>
                <p className="mr-[16mm]">(Last)</p>
                <p className="mr-[16mm]">(First)</p>
                <p>(Middle)</p>
              </div>

              {/* form 1 data */}
              <div className="text-[2.82mm] flex justify-center my-[1mm]">
                <div className="text-center w-[40%]">
                  <p>{data?.data?.unit ? data?.data?.unit : ""}</p>
                </div>
                <div className="text-center flex justify-evenly w-[60%]">
                  <p>{data?.data?.lastname ? data?.data?.lastname : ""}</p>
                  <p>{data?.data?.firstname ? data?.data?.firstname : ""}</p>
                  <p>{data?.data?.middlename ? data?.data?.middlename : ""}</p>
                </div>
              </div>
            </div>

            {/* form 2 */}
            <div className="py-[3mm] px-[1mm] text-[2.82mm] flex justify-start gap-[18mm] border-b border-solid border-black">
              <p>
                3. DATE OF FILING{" "}
                <span className="underline">
                  {data?.data?.dateFiling
                    ? data?.data?.dateFiling.split("T")[0]
                    : ""}
                </span>
              </p>
              <p>
                4. POSITION{" "}
                <span className="underline">
                  {data?.data?.unit ? data?.data?.unit : ""}
                </span>
              </p>
              <p>
                5. SALARY <span className="underline">?</span>
              </p>
            </div>

            {/* form 3 title */}
            <div className="my-[1px] border-t border-b border-solid border-black">
              <h1 className="text-center font-bold text-[16px]">
                6. DETAILS OF APPLICATION
              </h1>
            </div>

            {/* form 3 body */}
            <div className="border-t border-b border-solid border-black flex flex-row">
              {/* left body */}
              <div className="py-[2mm] px-[1mm] border-r border-solid border-black w-[55%]">
                {/* l-body-title */}
                <div className="text-[2.82mm]">
                  <p>6.A TYPE OF LEAVE TO BE AVAILED OF</p>
                </div>
                {/* l-body-innerbody */}
                <div>
                  <div className="pl-[2.5mm] flex flex-col gap-5">
                    <div>
                      <Checkbox
                        checked={data?.data?.type_id === "VC001" ? true : false}
                        label={
                          <p>
                            Vacation Leave{" "}
                            <span className="text-[2.12mm]">
                              (Sec. 51, Rule XVI, Omnibus Rules Implementing
                              E.O. No. 292)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "ML002" ? true : false}
                        label={
                          <p>
                            Mandatory/Forced Leave{" "}
                            <span className="text-[2.12mm]">
                              (Sec. 25, Rule XVI, Omnibus Rules Implementing
                              E.O. No. 292)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "SL003" ? true : false}
                        label={
                          <p>
                            Sick Leave{" "}
                            <span className="text-[2.12mm]">
                              (Sec. 43, Rule XVI, Omnibus Rules Implementing
                              E.O. No. 292)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "ML004" ? true : false}
                        label={
                          <p>
                            Maternity Leave{" "}
                            <span className="text-[2.12mm]">
                              (R.A. No. 11210 / IRR issued by CSC, DOLE and SSS)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "PL005" ? true : false}
                        label={
                          <p>
                            Paternity Leave{" "}
                            <span className="text-[2.12mm]">
                              (R.A. No. 8187 / CSC MC No. 71, s. 1998, as
                              amended)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={
                          data?.data?.type_id === "SPL006" ? true : false
                        }
                        label={
                          <p>
                            Special Privilege Leave{" "}
                            <span className="text-[2.12mm]">
                              (Sec. 21, Rule XVI, Omnibus Rules Implementing
                              E.O. No. 292)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={
                          data?.data?.type_id === "SPL007" ? true : false
                        }
                        label={
                          <p>
                            Solo Parent Leave{" "}
                            <span className="text-[2.12mm]">
                              (RA No. 8972 / CSC MC No. 8, s. 2004)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "SL008" ? true : false}
                        label={
                          <p>
                            Study Leave{" "}
                            <span className="text-[2.12mm]">
                              (Sec. 68, Rule XVI, Omnibus Rules Implementing
                              E.O. No. 292)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={
                          data?.data?.type_id === "VAWCL009" ? true : false
                        }
                        label={
                          <p>
                            10-Day VAWC Leave{" "}
                            <span className="text-[2.12mm]">
                              (RA No. 9262 / CSC MC No. 15, s. 2005)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "RP010" ? true : false}
                        label={
                          <p>
                            Rehabilitation Privilege{" "}
                            <span className="text-[2.12mm]">
                              (Sec. 55, Rule XVI, Omnibus Rules Implementing
                              E.O. No. 292)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={
                          data?.data?.type_id === "SLBW011" ? true : false
                        }
                        label={
                          <p>
                            Special Leave Benefits for Women{" "}
                            <span className="text-[2.12mm]">
                              (RA No. 9710 / CSC MC No. 25, s. 2010)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={
                          data?.data?.type_id === "SEL012" ? true : false
                        }
                        label={
                          <p>
                            Special Emergency (Calamity) Leave{" "}
                            <span className="text-[2.12mm]">
                              (CSC MC No. 2, s. 2012, as amended)
                            </span>
                          </p>
                        }
                      />
                      <Checkbox
                        checked={data?.data?.type_id === "AL013" ? true : false}
                        label={
                          <p>
                            Adoption Leave{" "}
                            <span className="text-[2.12mm]">
                              (R.A. No. 8552)
                            </span>
                          </p>
                        }
                      />
                    </div>
                    {/* Others form */}
                    <div className="text-[2.82mm] py-[5px] italic">
                      <p>Others :</p>
                      <div className="not-italic border-b border-solid border-black w-[65mm]">
                        {data?.data?.type_id === "CTO001" ? "CTO" : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right body */}
              <div className="py-[2mm] px-[1mm] w-[45%]">
                {/* r-body-title */}
                <div className="text-[2.82mm]">
                  <p>6.B DETAILS OF LEAVE</p>
                </div>

                {/* r-body-content*/}
                <div className="text-[2.82mm]">
                  {/* special leave details */}
                  <div className="pl-[3mm]">
                    {/* Vacation Leave */}
                    <div className="pt-[1mm]">
                      <p className="italic">
                        In case of Vacation/Special Privilege Leave:
                      </p>
                      {/* wthn ph */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.detailsOption ===
                            "Within the Philippines"
                              ? true
                              : false
                          }
                          label={<p>Within the Philippines</p>}
                        />
                        {/* more details */}
                        <div className="ml-1 border-b border-solid border-black flex-grow">
                          <p>
                            {data?.data?.detailsOption ===
                            "Within the Philippines"
                              ? data?.data?.details
                              : ""}
                          </p>
                        </div>
                      </div>
                      {/* abroad */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.detailsOption === "Abroad"
                              ? true
                              : false
                          }
                          label={<p>Abroad (Specify)</p>}
                        />
                        {/* more details */}
                        <div className="ml-1 border-b border-solid border-black flex-grow">
                          <p>
                            {data?.data?.detailsOption === "Abroad"
                              ? data?.data?.details
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sick leave */}
                    <div className="pt-[1mm]">
                      <p className="italic">In case of Sick Leave:</p>
                      {/* wthn ph */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.detailsOption === "In Hospital"
                              ? true
                              : false
                          }
                          label={<p>In Hospital (Specify Illness)</p>}
                        />
                        {/* more details */}
                        <div className="ml-1 border-b border-solid border-black flex-grow">
                          <p>
                            {data?.data?.detailsOption === "In Hospital"
                              ? data?.data?.details
                              : ""}
                          </p>
                        </div>
                      </div>
                      {/* abroad */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.detailsOption === "Out Patient"
                              ? true
                              : false
                          }
                          label={<p>Out Patient (Specify Illness)</p>}
                        />
                        {/* more details */}
                        <div className="ml-1 border-b border-solid border-black flex-grow">
                          <p>
                            {data?.data?.detailsOption === "Out Patient"
                              ? data?.data?.details
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* LBW */}
                    <div className="pt-[1mm]">
                      <p className="italic">
                        In case of Special Leave Benefits for Women:{" "}
                      </p>
                      <div className="flex mt-[1mm]">
                        <p>(Specify Illness)</p>
                        <div className="ml-1 border-b border-solid border-black flex-grow">
                          <p>
                            {data?.data?.type_id === "SLBW011"
                              ? data?.data?.details
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Study Leave */}
                    <div className="pt-[1mm]">
                      <p className="italic">In case of Study Leave:</p>
                      {/* wthn ph */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.detailsOption ===
                            "Completion of Master's Degree"
                              ? true
                              : false
                          }
                          label={<p>Completion of Master's Degree</p>}
                        />
                      </div>
                      {/* abroad */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.detailsOption ===
                            "BAR/Board Examination Review"
                              ? true
                              : false
                          }
                          label={<p>BAR/Board Examination Review</p>}
                        />
                      </div>
                    </div>

                    {/* Other purpose */}
                    <div className="pt-[1mm]">
                      <p className="italic">Other purpose:</p>
                      {/* wthn ph */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={false}
                          label={<p>Monetization of Leave Credits</p>}
                        />
                      </div>
                      {/* abroad */}
                      <div className="flex mt-[1mm]">
                        <Checkbox
                          checked={
                            data?.data?.type_id === "TL015" ? true : false
                          }
                          label={<p>Terminal Leave </p>}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* form 4 */}
            <div className="border-b border-solid border-black flex flex-row text-[2.82mm]">
              {/* form 4 l-content */}
              <div className="py-[2mm] pl-[1mm] border-r border-black w-[55%]">
                {/* No. working 4 */}
                <div className="pr-[35mm]">
                  <p>6.C NUMBER OF WORKING DAYS APPLIED FOR</p>
                  <div className="ml-[5mm] border-b border-solid border-black flex-grow">
                    <p>{data?.data?.no_days ? data?.data?.no_days : ""}</p>
                  </div>
                </div>
                {/* Inclusive Dates */}
                <div className="ml-[5mm] pr-[35mm]">
                  <p>INCLUSIVE DATES</p>
                  <div className="border-b border-solid border-black flex-grow">
                    <p>
                      {data?.data?.inclusive_dates
                        ? data?.data?.inclusive_dates
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* form 4 r-content */}
              <div className="py-[2mm] px-[1mm] w-[45%]">
                {/* recommendation */}
                <div className="text-[2.82mm]">
                  <p>6.D COMMUTATION</p>

                  <div className="px-[3mm]">
                    <div className="flex mt-[1mm] ">
                      <Checkbox checked={false} label={<p>Not Requested</p>} />
                    </div>
                    <div className="flex mt-[1mm] ">
                      <Checkbox checked={false} label={<p>Requested</p>} />
                    </div>
                  </div>

                  {/* signature */}
                  <div className="relative flex flex-col justify-center mt-[5mm] px-10">
                    <div className="absolute right-[35mm] bottom-[4mm] flex items-center justify-center">
                      <img
                        className="h-[60px] w-[60px]"
                        src={sign}
                        alt="Signature"
                      />
                    </div>
                    <div className="text-center border-t border-solid border-black">
                      <p>(Signature of Applicant)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details of Action Title */}
            <div className="my-[1px] border-t border-b border-solid border-black">
              <h1 className="text-center font-bold text-[16px]">
                7. DETAILS OF ACTION ON APPLICATION
              </h1>
            </div>

            {/*Form 5*/}

            <div className="border-y border-black flex flex-row">
              {/* form 5 l-content */}
              <div className="py-[2mm] px-[1mm] border-r border-black w-[55%]">
                <div className="text-[2.82mm]">
                  <p>7.A CERTIFICATION OF LEAVE CREDITS</p>

                  {/* As of Date */}
                  <div className="flex justify-center px-[25mm]">
                    <div>
                      <p>As of</p>
                    </div>
                    <div className="flex-grow border-b border-solid border-black">
                      <p>
                        {data?.data?.dateFiling
                          ? data?.data?.dateFiling.split("T")[0]
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="mt-2 px-7">
                    <table className="w-full text-center font-normal border border-black table-fixed">
                      <thead>
                        <tr>
                          <td className="border-r border-black"></td>
                          <td className="border-r border-black">
                            Vacation Leave
                          </td>
                          <td>Sick Leave</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-y border-black">
                          <td className="border-r border-black">
                            Total Earned
                          </td>
                          <td className="border-r border-black">
                            {data?.data?.vacation_balance
                              ? data?.data?.vacation_balance
                              : ""}
                          </td>
                          <td>
                            {data?.data?.sick_balance
                              ? data?.data?.sick_balance
                              : ""}
                          </td>
                        </tr>
                        <tr className="border-y border-black">
                          <td className="border-r border-black">
                            Less this application
                          </td>
                          <td className="border-r border-black">
                            {data?.data?.minus_vacation
                              ? data?.data?.minus_vacation
                              : "0"}
                          </td>
                          <td>
                            {data?.data?.minus_sick
                              ? data?.data?.minus_sick
                              : "0"}
                          </td>
                        </tr>
                        <tr className="border-y border-black">
                          <td className="border-r border-black">Balance</td>
                          <td className="border-r border-black">
                            {data?.data?.vacation_balance
                              ? data?.data?.vacation_balance -
                                data?.data?.minus_vacation
                              : ""}
                          </td>
                          <td>
                            {data?.data?.sick_balance
                              ? data?.data?.sick_balance -
                                data?.data?.minus_sick
                              : ""}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Authorized OIC */}
                  <div className="mt-3 px-7 text-center">
                    <div className="text-[2.47mm]">
                      <p className="font-bold">
                        {data?.data?.division === "Admin"
                          ? "DESIDERIO R. APAG, III, D.Eng'g"
                          : "MIRIAM B. FUENTES, Ph.D."}
                      </p>
                      <p>
                        {data?.data?.division === "Admin"
                          ? "OIC - Office of the Chief Administrative Officer"
                          : "Chief Education Program Specialist"}
                      </p>
                    </div>
                    <div className="border-t border-black">
                      <p>(Authorized Officer)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* form 5 r-content */}
              <div className="py-[2mm] px-[1mm] w-[45%]">
                <div className="text-[2.82mm]">
                  <p>7.B RECOMMENDATION</p>

                  <div className="px-[3mm]">
                    <div className="flex mt-[1mm] ">
                      <Checkbox
                        checked={
                          data?.data?.notedStatus === "Approved" ? true : false
                        }
                        label={<p>For approval</p>}
                      />
                    </div>
                    <div>
                      <div className="flex mt-[1mm] ">
                        <Checkbox
                          checked={
                            data?.data?.notedStatus === "Declined"
                              ? true
                              : false
                          }
                          label={<p>For disapproval due to</p>}
                        />
                      </div>
                      <div className="text-[2.47mm] h-[16mm] overflow-hidden">
                        <p className="underline text-justify overflow-ellipsis">
                          {data?.data?.notedStatus === "Declined"
                            ? data?.data?.notedDetails
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 px-7 text-center">
                    <div className="text-[2.47mm]">
                      <p className="font-bold">
                        {data?.data?.division === "Admin"
                          ? "DESIDERIO R. APAG, III, D.Eng'g"
                          : "MIRIAM B. FUENTES, Ph.D."}
                      </p>
                      <p>
                        {data?.data?.division === "Admin"
                          ? "OIC - Office of the Chief Administrative Officer"
                          : "Chief Education Program Specialist"}
                      </p>
                    </div>
                    <div className="border-t border-black">
                      <p>(Authorized Officer)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form 6 */}

            <div className="border-t mt-[1px] border-black flex flex-row">
              {/* Form 6 l-content */}
              <div className="py-[2mm] px-[1mm] w-[55%]">
                <div className="text-[2.82mm]">
                  <p>7.C APPROVED FOR:</p>

                  <div className="pl-[5mm]">
                    <p>
                      <span>
                        {data?.data?.leavePayType === 0
                          ? `___${
                              data?.data?.minus_vacation ||
                              data?.data?.minus_sick ||
                              data?.data?.minus_CTO
                            }___`
                          : "_______"}
                      </span>{" "}
                      days with pay
                    </p>
                    <p>
                      <span>
                        {data?.data?.leavePayType === 1
                          ? `___${
                              data?.data?.minus_vacation ||
                              data?.data?.minus_sick ||
                              data?.data?.minus_CTO
                            }___`
                          : "_______"}
                      </span>{" "}
                      days without pay
                    </p>
                    <p>_______ others (Specify)</p>
                  </div>
                </div>
              </div>
              {/* Form 6 r-content */}
              <div className="py-[2mm] px-[1mm] w-[45%]">
                <div className="text-[2.82mm]">
                  <p>7. DISAPPROVED DUE TO:</p>

                  <div className="pl-[5mm] text-[2.47mm] h-[16mm] overflow-hidden">
                    <p className="underline text-justify ">
                      {data?.data?.approvedStatus === "Declined"
                        ? data?.data?.approvedDetails
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form 7 */}
            <div className="w-full text-[2.82mm]">
              <div className="px-[70mm] text-center">
                <div className="text-[2.47mm]">
                  <p className="font-bold uppercase">
                    FREDDIE T. BERNAL, Ph.D., CESO III
                  </p>
                  <p>Director IV</p>
                </div>
                <div className="border-t border-black font-bold">
                  <p>(Authorized Official)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const LeaveFormModal = ({ showModal, setShowModal, data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Application Leave Form",
  });

  return (
    <div>
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog centered size="fullscreen">
          <TEModalContent>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <>
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

                <div>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Print Document
                  </button>
                  <div>
                    <DocumentComponent ref={componentRef} data={data} />
                  </div>
                </div>
              </>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default LeaveFormModal;
