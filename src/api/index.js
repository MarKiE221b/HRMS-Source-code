import { useMutation, useQuery } from "@tanstack/react-query";
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

export const creditInfoApi = () => {
  return useQuery({
    queryKey: ["getCreditInfoKey"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/getCreditInfo");
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
    enabled: unit === "Chief Administrative Officer",
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
