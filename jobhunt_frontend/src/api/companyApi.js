import API from './axiosInstance';

export const registerCompany = async (companyData) => {
  const response = await API.post('/company/registercompany', companyData);
  return response.data;
};

export const getCompany = async () => {
  const response = await API.get('/company/getcompany');
  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await API.get(`/company/get/${id}`);
  return response.data;
};

export const updateCompany = async (id, companyData) => {
  const response = await API.put(`/company/update/${id}`, companyData);
  return response.data;
};