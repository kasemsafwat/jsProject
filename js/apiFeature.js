//apiFeature.js


export const apiSendRequest = async ({
  url,
  method = "GET",
  data = null,
} = {}) => {
  const response = await fetch(`${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
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
