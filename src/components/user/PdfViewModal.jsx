import React from "react";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader,
} from "tw-elements-react";

const PdfViewModal = ({ showModal, setShowModal, pdfFile, load }) => {
  return (
    <div>
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog centered size="fullscreen">
          <TEModalContent>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div>
                {!load ? (
                  <>
                    <div className="w-full flex justify-end mb-2">
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
                    <div className="">
                      {pdfFile && (
                        <iframe
                          src={pdfFile}
                          width="100%"
                          height="800px"
                        ></iframe>
                      )}
                    </div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default PdfViewModal;
