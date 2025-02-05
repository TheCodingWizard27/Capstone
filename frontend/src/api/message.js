import axios from 'axios';

export const sendMessage = async (data, currentUser) => {
  try {
    console.log(data);
    console.log(currentUser.accessToken);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/sendMessage`,
      { message: data },
      {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          'Content-Type': 'application/json', // JSON content type
        },
      }
    );

    return response.data; // Return the response from the backend
  } catch (error) {
    console.error('Failed to submit message:', error);
    throw error;
  }
};
