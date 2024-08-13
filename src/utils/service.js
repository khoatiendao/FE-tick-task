export const baseUrlUser = 'http://localhost:8443/api/v1/user';
export const baseUrlDepartment = 'http://localhost:8443/api/v1/department';
export const baseUrlBoard = 'http://localhost:8443/api/v1/board';
export const baseUrlBoardList = 'http://localhost:8443/api/v1/boardList';
export const baseUrlTaskList = 'http://localhost:8443/api/v1/taskList';
export const baseUrlTaskAssignment =
  'http://localhost:8443/api/v1/taskAssignment';
export const baseUrlPosition = 'http://localhost:8443/api/v1/position';
export const baseUrlMember = 'http://localhost:8443/api/v1/member';

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.json();
  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }

  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = 'An error occured';

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return data;
};

export const getCountryApiRequest = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const countryOptions = countries
      .map((country) => ({
        name: country.name.common,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return countryOptions;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
};
