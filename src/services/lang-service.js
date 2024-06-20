import http from '../http';


const postLang = async (data) => {
  try {
    const response = await http.post("/content-languge/", data);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};



const LangService = {
  postLang
};

export default LangService;
