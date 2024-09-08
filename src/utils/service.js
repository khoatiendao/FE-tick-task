export const baseUrlUser = 'http://localhost:8443/api/v1/user';
export const baseUrlDepartment = 'http://localhost:8443/api/v1/department';
export const baseUrlBoard = 'http://localhost:8443/api/v1/board';
export const baseUrlBoardList = 'http://localhost:8443/api/v1/boardList';
export const baseUrlTaskList = 'http://localhost:8443/api/v1/taskList';
export const baseUrlTaskAssignment ='http://localhost:8443/api/v1/taskAssignment';
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
  const user = localStorage.getItem('User');
  const parseUser = JSON.parse(user)
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token-bearer': `${parseUser.token}`
    }
  });
  

  const data = await response.json();

  if (!response.ok) {
    let message = 'An error occured';

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return {status: response.status ,data};
  
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

export const getCityApiRequest = async () => {
  try {
    const response = await fetch(
      'https://esgoo.net/api-tinhthanh/1/0.htm'
    );
    const cities = await response.json();
    if (cities && cities.data) {
      const citiesOptions = cities.data.map((city) => ({
        id: city.id,
        name: city.full_name,
      }));
      return citiesOptions;
    } else {
      console.error('Error fetching data city');
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
};

export const getDistrictApiRequest = async(cityId) => {
  try {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`)
    const districts = await response.json()
    if(districts && districts.data) {
      const districtsOptions = districts.data.map((district) => ({
        id: district.id,
        name: district.full_name
      }))
      return districtsOptions
    } else {
      console.error('Error fetching data district');
    }
  } catch (error) {
    console.error('Error fetching district:', error);
    return null;
  }
}

export const getWardApiRequest = async(districtId) => {
  try {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
    const wards = await response.json()
    if(wards && wards.data) {
      const wardsOptions = wards.data.map((ward) => ({
        id: ward.id,
        name: ward.name
      }))
      return wardsOptions
    } else {
      console.error('Error fetching data ward');
    }
  } catch (error) {
    console.error('Error fetching ward:', error);
    return null;
  }
}


