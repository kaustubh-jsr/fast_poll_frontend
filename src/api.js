import axios from "axios";
// export const BASE_URL = "https://polls-dev.herokuapp.com";
export const BASE_URL = "http://127.0.0.1:8000";

export const apiClient = axios.create({
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
});

export const createPoll = async (pollQuestion, options) => {
  try {
    console.log("inside createpoll");
    const formData = new FormData();
    formData.append("question", pollQuestion);
    formData.append("choices", JSON.stringify(options));
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/create_poll`,
      data: formData,
    });
    return resp;
  } catch (e) {
    console.error(e.response);
  }
};

export const getPoll = async (pollId) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_poll`,
      params: {
        pollId,
      },
    });
    return resp.data.pollId;
  } catch (e) {
    console.error(e.response);
  }
};
