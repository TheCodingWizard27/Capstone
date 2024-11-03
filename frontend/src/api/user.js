import axios from 'axios';

export const storeUser = async (accessToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/addUser`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
