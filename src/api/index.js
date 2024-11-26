import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const logoutApi = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        return await makeRequest.get("/auth/logout");
      } catch (error) {
        throw error;
      }
    },
  });
};

export const loginApi = () => {
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/auth/login", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
  });
};

export const userInfoApi = () => {
  return useQuery({
    queryKey: ["getUserInfoKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getuserinfo");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const leaveTypeApi = (enable) => {
  return useQuery({
    queryKey: ["getLeaveTypeKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getLeaveType");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: enable !== "RD",
  });
};

export const verifyApi = () => {
  return useQuery({
    queryKey: ["getVerificationKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/verifyuser");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });
};

export const applyLeaveApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/application", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "leaveApplicationsKey",
        "getallapplicationskey",
        "getEmployeeApplications",
        "getPendingNotifCountKey",
      ]);
    },
  });
};

export const leaveApplicationsApi = (enable) => {
  return useQuery({
    queryKey: ["leaveApplicationsKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getApplications");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: enable !== "RD",
  });
};

export const getUsername = () => {
  return useQuery({
    queryKey: ["getusernamekey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getusername");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const updateUsername = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/updateusername", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getusernamekey", "getemployeeslistkey"],
      });
    },
  });
};

export const updatePwd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/updatepwd", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getemployeeslistkey"],
      });
    },
  });
};

export const getEmployeesCount = () => {
  return useQuery({
    queryKey: ["getemployeescountkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getEmployeesCount");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getAllApplications = () => {
  return useQuery({
    queryKey: ["getallapplicationskey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getAllApplications");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getEmployeesList = () => {
  return useQuery({
    queryKey: ["getemployeeslistkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getEmployeesList");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getEmployeesApplication = (unit) => {
  return useQuery({
    queryKey: ["getemployeesapplicationkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getEmployeeApplications");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled:
      unit === "Chief Administrative Officer" ||
      unit === "Chief Education Program Specialist",
  });
};

export const getEmployeeDetails = () => {
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/getEmployeeDetails", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
  });
};

export const updateEmployeeLeaveOIC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/updateLeaveOIC", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "leaveApplicationsKey",
          "getallapplicationskey",
          "getEmployeeApplications",
          "getPendingNotifCountKey",
        ],
      });
    },
  });
};

export const updateEmployeeLeaveCEPS = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/updateLeaveCEPS", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "leaveApplicationsKey",
          "getallapplicationskey",
          "getEmployeeApplications",
          "getPendingNotifCountKey",
        ],
      });
    },
  });
};

export const updateEmployeeLeaveRD = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/updateLeaveRD", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "leaveApplicationsKey",
          "getallapplicationskey",
          "getEmployeeApplications",
          "getPendingNotifCountKey",
        ],
      });
    },
  });
};

export const getLedger = () => {
  return useQuery({
    queryKey: ["getledgerkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getLedger");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getCTOLedger = () => {
  return useQuery({
    queryKey: ["getCTOledgerkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getctoledger");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const uploadCTO = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/uploadCTO", input, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCTOledgerkey", "getledgerkey"],
      });
    },
  });
};

export const getPdf = () => {
  return useMutation({
    mutationFn: async (input) => {
      try {
        const response = await makeRequest.post("/pdffile", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          responseType: "blob",
        });
        return URL.createObjectURL(response.data); // Convert the blob to an object URL
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getPendingNofitCount = (unit) => {
  return useQuery({
    queryKey: ["getPendingNotifCountKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getPendingNotifCount");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled:
      unit === "Chief Administrative Officer" ||
      unit === "Chief Education Program Specialist",
  });
};

export const getApprovedCount = () => {
  return useQuery({
    queryKey: ["getapprovedcountkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getCountApproved");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const leaveApplicationForm = () => {
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/leaveApplicationForm", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
  });
};

export const uploadSignature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/uploadSignature", input, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getsignatureempkey"],
      });
    },
  });
};

export const getSignature = () => {
  return useQuery({
    queryKey: ["getsignatureempkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/imgSignature", {
          responseType: "blob",
        });
        return URL.createObjectURL(response.data);
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });
};

export const postSignatureApplicant = (input) => {
  return useQuery({
    queryKey: ["postSignatureApplicantKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.post(
          "/postImgSignatureApplicant",
          { id: input },
          {
            responseType: "blob",
          }
        );
        return URL.createObjectURL(response.data);
      } catch (error) {
        throw error;
      }
    },
    enabled: !!input,
  });
};

export const getOfficerSignatures = (_id) => {
  return useQuery({
    queryKey: ["getofficersignatureskey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/officersSignatures");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!_id,
    retry: false,
  });
};

export const uploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/uploadAvatar", input, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getuploadavatarkey"],
      });
    },
  });
};

export const getUploadAvatar = (_id) => {
  return useQuery({
    queryKey: ["getuploadavatarkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getUploadAvatar", {
          responseType: "blob",
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });
};

export const editEmployeeDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.put("/editEmployeeDetails", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getemployeeslistkey"] });
    },
  });
};

export const uploadLeaveForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      try {
        return await makeRequest.post("/uploadLeaveForms", input, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUploadLeaveFormsKey", "getledgerkey"],
      });
    },
  });
};

export const getUploadLeaveForms = (_id) => {
  return useQuery({
    queryKey: ["getUploadLeaveFormsKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getUploadLeaveForms");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getLeaveFormPdf = () => {
  return useMutation({
    mutationFn: async (input) => {
      try {
        const response = await makeRequest.post("/leaveFormPdfFile", input, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          responseType: "blob",
        });
        return URL.createObjectURL(response.data); // Convert the blob to an object URL
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getLedgerPerEmployee = (input) => {
  return useQuery({
    queryKey: ["getLedgerPerEmployeeKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.put(
          "/getLedgerPerEmployee",
          { emp_id: input },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    enabled: input ? true : false,
  });
};
