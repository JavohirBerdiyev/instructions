import http from "../../../../http";


const postPassword = async (data) => {
  try {
    const response = await http.post(`/operator/profile/change-password`,  data );
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};

const postChangeEmail = async (data) => {
  try {
    const response = await http.post(`/operator/profile/change-email`,  data );
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};
const postVerificationCode = async (data) => {
  try {
    const response = await http.post(`/operator/profile/confirm-change-email`,  data );
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};

const ProfileService = {
  postPassword,
  postChangeEmail,
  postVerificationCode
};

export default ProfileService;
