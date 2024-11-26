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
import LedgerTable from "./LedgerTable";

function ViewCreditsModal({ tableRowData, showModal, setShowModal }) {
  const empDataObject = tableRowData?.reduce((acc, data) => {
    return data;
  }, {});

  console.log(empDataObject);

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="fullscreen" centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                View Credits
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

            <TEModalBody>
              <div>
                <p className="mb-2">Employee: <span>{empDataObject?.full_name}</span></p>
                <div className="flex flex-row gap-3 mb-2">
                  <div className="text-right max-w-[400px]">
                    <p>Vacation Leave :</p>
                    <p>Sick Leave :</p>
                    <p>CTO :</p>
                    <p>Personal Leave :</p>
                    <p>Mandatory Force Leave :</p>
                  </div>

                  <div className="max-w-[400px]">
                    <p>{empDataObject?.vacation_balance}</p>
                    <p>{empDataObject?.sick_balance}</p>
                    <p>{empDataObject?.CTO_balance}</p>
                    <p>{empDataObject?.personal_balance}</p>
                    <p>{empDataObject?.forced_balance}</p>
                  </div>
                </div>

                <div>
                  <LedgerTable emp_id={empDataObject?.emp_id} />
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
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default ViewCreditsModal;
