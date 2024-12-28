//apiFeature.js

export const apiSendRequest = async ({
  url,
  method = "GET",
  data = null,
  accessToken,
  refreshToken,
} = {}) => {
  const response = await fetch(`${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}` || null,
      "refresh-token": refreshToken || null,
    },
    body: data ? JSON.stringify(data) : null,
  });

  const res = await response.json();
  console.log(res);

  if (!response.ok) {
    console.log(response);
  }

  return res;
};
