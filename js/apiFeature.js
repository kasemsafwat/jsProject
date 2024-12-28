export const apiSendRequest = async ({
  url,
  method = "GET",
  data = null,
  accessToken,
  refreshToken,
} = {}) => {
  console.log(url, method, data, accessToken, refreshToken);

  try {
    const response = await fetch(`${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken ? `Bearer ${accessToken}` : null,
        "refresh-token": refreshToken || null,
      },
      body: data ? JSON.stringify(data) : null,
    });

    // Check if the response status is not OK
    if (!response.ok) {
      const error = await response.json();
      console.error(
        `Error: ${response.status} - ${error.message || "Unknown error"}`
      );
      return {
        success: false,
        status: response.status,
        message: error || "Something went wrong!",
      };
    }

    // Parse and return the JSON response
    const res = await response.json();
    console.log("Response:", res);
    return res;
  } catch (error) {
    // Handle network or other unexpected errors
    console.error("Network or unexpected error:", error);
    return {
      success: false,
      message: error || "Network error. Please try again later.",
    };
  }
};
