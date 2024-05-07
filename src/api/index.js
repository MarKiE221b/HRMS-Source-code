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
