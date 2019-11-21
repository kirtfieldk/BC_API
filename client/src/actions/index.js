import axios from 'axios';
// BOOTCAMPS
export const fetchBootcamps = () => async dispatch => {
  const response = await axios.get('/api/v1/bootcamps');
  dispatch({ type: 'FETCH_CAMPS', payload: response.data });
};
export const fetchBootcamp = id => async dispatch => {
  const response = await axios.get(`/api/v1/bootcamps/${id}`);
  dispatch({ type: 'FETCH_CAMP', payload: response.data });
};
export const postBootcamp = value => async dispatch => {
  const response = axios.post('/api/v1/bootcamps', value);
  dispatch({ type: 'POST_CAMP', payload: response.data });
};
export const getCourses = id => async dispatch => {
  const response = await axios.get(`/api/v1/courses/${id}/courses`);
  dispatch({ type: 'BOOTCAMP_COURSES', payload: response.data });
};
export const deleteBootcamp = id => async dispatch => {
  const response = await axios.delete(`/api/v1/bootcamps/${id}`);
  dispatch({ type: 'DELETE_CAMP', payload: response.data });
};
export const updateBootcamp = (id, value) => async dispatch => {
  const response = await axios.delete(`/api/v1/bootcamps/${id}`, value);
  dispatch({ type: 'UPDATE_CAMP', payload: response.data });
};
export const getCampByDist = (zip, distance) => async dispatch => {
  const response = await axios.get(`/api/v1/radius/${zip}/${distance}`);
  dispatch({ type: 'CLOSEST_CAMPS', payload: response.data });
};
// REVIEWS
export const getCampReviews = id => async dispatch => {
  const response = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
  dispatch({ type: 'CAMP_REVIEWS', payload: response.data });
};
export const getReview = id => async dispatch => {
  const response = await axios.get(`/api/v1/reviews/${id}`);
  dispatch({ type: 'REVIEW', payload: response.data });
};
export const postCampReviews = (id, value) => async dispatch => {
  const response = await axios.get(`/api/v1/bootcamps/${id}/reviews`, value);
  dispatch({ type: 'POST_CAMP_REVIEWS', payload: response.data });
};
export const updateReview = (id, value) => async dispatch => {
  const response = await axios.get(`/api/v1/reviews/${id}`, value);
  dispatch({ type: 'UPDATE_REVIEW', payload: response.data });
};
export const deleteReview = id => async dispatch => {
  const response = await axios.get(`/api/v1/reviews/${id}`);
  dispatch({ type: 'DELETE_REVIEW', payload: response.data });
};
// LOGIN
export const login = value => async dispatch => {
  const response = axios.post('/api/v1/auth/login', value);
  dispatch({ type: 'LOGIN', payload: response.data });
};
export const register = value => async dispatch => {
  const response = await axios.post('/api/v1/auth/register', value);
  dispatch({ type: 'REGISTER', payload: response.data });
};
export const GetUser = () => async dispatch => {
  const response = axios.get('/api/v1/auth/user');
  dispatch({ type: 'USER', payload: response.data });
};
export const updateUser = (id, value) => async dispatch => {
  const response = await axios.put(`/api/v1/auth/user/${id}`, value);
  dispatch({ type: 'UPDATE_USER', payload: response.data });
};
// ADMIN FUNCS
export const adminGetUser = id => async dispatch => {
  const response = axios.get(`/api/v1/auth/user/${id}`);
  dispatch({ type: 'ADMIN_GET_USER', payload: response.data });
};
export const adminCreateUser = value => async dispatch => {
  const response = await axios.post('/api/v1/auth/user', value);
  dispatch({ type: 'ADMIN_REGISTER', payload: response.data });
};
export const adminDelete = id => async dispatch => {
  const response = axios.delete(`/api/v1/auth/user/${id}`);
  dispatch({ type: 'USER', payload: response.data });
};
export const adminUpdateUser = (id, value) => async dispatch => {
  const response = await axios.put(`/api/v1/auth/user/${id}`, value);
  dispatch({ type: 'ADMIN_UPDATE_USER', payload: response.data });
};
