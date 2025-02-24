import axios from 'axios';

export const submitListing = async (data, token) => {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('brand', data.brand);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('description', data.description);

    data.files.forEach((fileObj) => {
      formData.append('files', fileObj.file);
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/addListing`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to submit listing:', error);
    throw error;
  }
};

export const searchListings = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/search?query=${encodeURIComponent(
        query
      )}`
    );
    return response.data;
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

export const getSingleListing = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/listing/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch listing:', error);
    throw error;
  }
};

export const updateListing = async (id, data, token) => {
  console.log('Sending Token (Frontend API):', token);
  try {
    if (!id) throw new Error('Listing ID is missing');
    if (!token) throw new Error('Authentication token is missing');

    const formData = new FormData();
    formData.append('title', data.title || '');
    formData.append('brand', data.brand || '');
    formData.append('category', data.category || '');
    formData.append('price', data.price || '');
    formData.append('description', data.description || '');

    if (data.files && data.files.length > 0) {
      data.files.forEach((fileObj) => {
        if (fileObj.file) {
          formData.append('files', fileObj.file);
        }
      });
    }

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/updateListing/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to update listing:', error.response?.data || error);
    throw error;
  }
};
