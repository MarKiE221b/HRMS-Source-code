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

export const leaveTypeApi = () => {
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
  });
};

export const applyLeaveApi = () => {
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
  });
};

export const leaveApplicationsApi = () => {
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
  });
};

export const updatePwd = () => {
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
  });
};

export const updateEmployeeLeaveCEPS = () => {
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
  });
};

export const updateEmployeeLeaveRD = () => {
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

export const getNotedCount = (unit) => {
  return useQuery({
    queryKey: ["getnotedcountkey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getCountNoted");
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
  });
};

export const getOfficerSignatures = () => {
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
  });
};
