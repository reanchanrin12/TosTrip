export const fetchAllUsers = async () => {
  const token = localStorage.getItem('accessToken');

  const response = await fetch('https://tostrip.eunglyzhia.social/api/v1/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('You are not authorized to view this data');
  }

return await response.json();

};
