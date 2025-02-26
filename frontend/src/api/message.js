import axios from 'axios';

export const createThread = async (listingId, currentUser) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/createThread`,
      { listingId },
      {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          'Content-Type': 'application/json', // JSON content type
        },
      }
    );
    return response.data; // Return the response from the backend
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (threadId, message, currentUser) => {
  try {
    console.log(message);
    console.log(currentUser.accessToken);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/sendMessage`,
      { message, threadId },
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

export const fetchMessagesList = async (currentUser) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/allThreadMessages`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      }
    );
    return response.data.threads; // Return the response from the backend
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
};

export const getMessageByThreadId = async (threadId, currentUser) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/messageByThreadId/${threadId}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      }
    );
    return response.data.messages; // Return the response from the backend
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
};
