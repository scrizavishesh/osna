import axios from "axios";

export const API_URL = "https://dc.damio.in/api";

var bearerToken = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjU4NzcwNTllOTkwMWRjMzU3MTgyZDNhMjhlYjI5ZWI2MTE4Yzg4NmNjZGIzNGEwYjQxZDMwNTc3NjE3MjliY2UwYzJiM2ViMWNhOTM2ZTEiLCJpYXQiOjE3Mjc2NzkzNzcuMTU5NjQzODg4NDczNTEwNzQyMTg3NSwibmJmIjoxNzI3Njc5Mzc3LjE1OTY0NjAzNDI0MDcyMjY1NjI1LCJleHAiOjE3NTkyMTUzNzcuMTU2MDkxOTI4NDgyMDU1NjY0MDYyNSwic3ViIjoiMSIsInNjb3BlcyI6W119.Q9Kow9TQTVGyJR1JufPmLbSn78czeTvrJO6Gjf2ef6bw2ZV5YaqPK9YYAphZn_BF_W25XKNeR6plrP3gkTHb0-XAMHV6nAiBKEGwQ8GMevCr_xsKb29LaXadBPgK8IZK_mCb0NlW9cZYY3o5NxQxQvdjczig8UQM_c53vVCx5OCjP7U4kYOGBrhpEhUIcqR13DSRQ9zOBaxzn9PTlS0eRDdynCsWvOUVf8V2z6p3BoUAph6vqsya1SU1-bM37cQD9KbihS-1egvK1dHx9vBTpDCtUobCd6eI1k6uoJsn3dtpZhKczMjVV_tlFlIRdHFcafMMBIayLsR5Fg-7ZIR1kLgwzp81m-Pdib0LVaAXvE0B35DbqX3D2Faaiy3SCV3GflWphLCwSTkl61tRU3YxhxdqxT-bucxRgTFsXb29aoHKxNJLUL5ZgW52BL0nsodW7ZEBDEQk87IL8rFyxHZSUSKX9aLFOLBXRrnQEV_zGYYlBS476_G3D00x5oq-mniAAMGLnt7XhIctvt_dVHZ_8tKG7YZtRw9VBjFEkj1fuZIfxhtnXsb4dlPyGuwBqh1vUeSBtQKCIsXDAdo8JaHKKBAB7C_4J2aslE0dPBDCQ5XZkdTrS9dHBdXjSmPSx6nROMkKOmRku6ZJKLaEWMtrKYLNrbTFKIaCqhdVyxGzYQM`


export const Loginuse = async (requestData) => {
  axios.defaults.headers.common["Authorization"] = "";

  var response = await axios.post(`${API_URL}/create-lead`, requestData);
  if (response) {
    return response;
  } else {
    return [];
  }
}



export const GetCategorySubcategory = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/get-product-by-category`,);
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



export const GetProduct = async () => {
    axios.defaults.headers.common["Authorization"] = '';
    var response = await axios.get(`${API_URL}/products`,);
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



  export const getCategoryDetails  = async (data) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/get-category-details?category_name=${data}`,);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export const getCategoryNames  = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/get-category-name`,);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export const createQuestions  = async (data) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.post(`${API_URL}/create-question`, data);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export const getAnswers  = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/get-question-answer`,);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export const getHomePageContent  = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/home-page-content`,);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export const getAboutPageContent  = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/about-us-page-content`,);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export const getCoreMembers  = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/get-teams`,);
    if (response) {
      return response;
    } else {
      return [];
    }
  }



  export const CareerAPI  = async (data) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.post(`${API_URL}/career`, data);
    if (response) {
      return response;
    } else {
      return [];
    }
  }



