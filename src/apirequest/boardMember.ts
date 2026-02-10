import axios from "axios";
import { origin } from "./config";



export const createBoardMemberData = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/boardofdirectors`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("advisory-council creation failed:", error);
    throw error;
  }
};

export const createAdvisoryCouncil = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/advisory-council`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("advisory-council creation failed:", error);
    throw error;
  }
};


export const createExecutiveCommittee = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/executive-committee`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("advisory-council creation failed:", error);
    throw error;
  }
};


export const createPastPresidents = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/past-presidents`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("advisory-council creation failed:", error);
    throw error;
  }
};


export const createChapterLeads = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/chapter-leads`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("advisory-council creation failed:", error);
    throw error;
  }
};


export const fetchAdvisoryCouncilPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/advisory-council/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching paginated Banner:", err.message);
    throw err;
  }
};

export const fetchAdvisoryCouncilData = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/advisory-council`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Advisory Council:", error);
    throw error;
  }
};

export const fetchExecutiveCommitteeData = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/executive-committee`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Advisory Council:", error);
    throw error;
  }
};


export const fetchExecutiveCommitteePagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/executive-committee/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching paginated Banner:", err.message);
    throw err;
  }
};

export const fetchPastPresidentsPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/past-presidents/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching paginated Banner:", err.message);
    throw err;
  }
};

export const fetchBoardofDirectorsPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/boardofdirectors/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching paginated Banner:", err.message);
    throw err;
  }
};


export const fetchChapterLeadsPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/chapter-leads/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching paginated Banner:", err.message);
    throw err;
  }
};

export const fetchChapterLeads = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/chapter-leads`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (err: any) {
    console.error("Error fetching Chapter Leads:", err.message);
    throw err;
  }
};


export const fetchChapterDirectorsPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/chapter-directors/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching paginated Banner:", err.message);
    throw err;
  }
};

export const fetchChapterDirectors = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/chapter-directors`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (err: any) {
    console.error("Error fetching Chapter Leads:", err.message);
    throw err;
  }
};
