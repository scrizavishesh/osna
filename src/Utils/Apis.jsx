import axios from "axios";

export const API_URL = "https://dc.damio.in/api";

var bearerToken = localStorage.getItem("osna_token")


export const Loginuse = async (requestData) => {
  axios.defaults.headers.common["Authorization"] = "";

  var response = await axios.post(`${API_URL}/create-lead`, requestData);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const GetPreCategory = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-category-name`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const GetPostCategory = async (id) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-product-by-category?category_id=${id}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const GetBanner = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-banners`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const GetProduct = async (page, pop) => {
  axios.defaults.headers.common["Authorization"] = '';
  var response = await axios.get(`${API_URL}/products?page=${page}&product_number=10&popular=${pop}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const GetCategoryProduct = async (id) => {
  axios.defaults.headers.common["Authorization"] = '';
  var response = await axios.get(`${API_URL}/get-product-by-category-id?category_id=${id}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const GetLogo = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-clients-logo`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const GetEvents = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-events`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const handleContact = async (formdata) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/contact-us`, formdata);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const Search = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/search-product?search_term=${data}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const getSingleProduct = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/products/${data}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const getSingleAccessories = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-accessory-by-id?accessory_id=${data}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const getContacts = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-contact-information`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const getBranches = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-branches`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const getProductAccessories = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-product-accessories?product_id=${data}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const getCategoryDetails = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-category-details?category_id=${data}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const getCategoryNames = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-category-name`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const createQuestions = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/create-question`, data);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const getAnswers = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-question-answer`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const getHomePageContent = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/home-page-content`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const getAboutPageContent = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/about-us-page-content`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const getCoreMembers = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-teams`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const chatBot = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.get(`${API_URL}/get-chat-url`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const CareerAPI = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/career`, data);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const userRegistration = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/user-registration`, data);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const userGenerateOTP = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/generate-otp`, data);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const userSubmitOTP = async (data) => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/verify-otp`, data);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export const userLog_out = async () => {
  axios.defaults.headers.common["Authorization"] = bearerToken;
  var response = await axios.post(`${API_URL}/logout`)
  if (response) {
    return response;
  } else {
    return [];
  }
}



