import { personUsernameApi } from '../Services/Fetch'

const RequireIdentify = async (username) => {
    const response = await fetch(personUsernameApi+ username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data !== null) {
      return data;
    } else {
      return null;
    }
};

export default RequireIdentify;
