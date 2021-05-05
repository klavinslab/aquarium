import axiosInstance from './axiosInstance';

const tokensAPI = {};

tokensAPI.isPermission = (id) => axiosInstance
  .get(`/token/get_user?permission_id=${id}`)
  .then((response) => response.data)
  .catch((error) => error);

tokensAPI.isAuthenticated = async () => {
  let validToken = false;

  await axiosInstance
    .get('/token/get_user')
    .then((response) => {
      validToken = true;
    })
    .catch((error) => error);

  return validToken;
};

tokensAPI.signIn = async (login, password, setLoginError) => {
  let signInSuccessful = false;
  await axiosInstance
    .post('/token/create', null, {
      params: {
        login,
        password,
      },
    })
    .then((response) => {
      const [data] = [response.data];
      setLoginError();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      signInSuccessful = true;
      window.location.reload();
    })
    .catch((error) => {
      setLoginError(error);
    });
  return signInSuccessful;
};

tokensAPI.signOut = () => {
  axiosInstance
    .post('/token/delete')
    .then((response) => {
      localStorage.clear('token');
      window.location.reload();
      return response;
    })
    .catch((error) => {
      localStorage.clear('token');
      window.location.reload();
      return error;
    });
};

export default tokensAPI;
