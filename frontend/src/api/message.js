import axios from 'axios';

export const sendMessage = async (
  threadId,
  listingId,
  message,
  currentUser
) => {
  try {
    console.log(message);
    console.log(currentUser.accessToken);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/sendMessage`,
      { message, listingId: 'WZhkcU4303NYizr5Btra' },
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
