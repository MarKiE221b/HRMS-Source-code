import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
} from "tw-elements-react";
import { DocumentComponent } from "../../printables/LeaveForm/page";

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
