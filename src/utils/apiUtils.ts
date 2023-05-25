const API_BASE_URL = "https://reactforall.onrender.com/api/";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data:
    | { username: string; password: string }
    | {}
    | BoardForm
    | Stage
    | TaskObject
    | { title: string; description: string; status: number }
    | { status: number }
    | Register = {}
) => {
  let url;
  let payload: string;

  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof typeof data]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" && method !== "DELETE" ? payload : null,
  });

  if (method === "DELETE") {
    return "success";
  }

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET", {});
};

export const listBoards = () => {
  return request("boards/", "GET");
};

export const deleteBoard = (id: number) => {
  return request(`boards/${id}/`, "DELETE");
};

export const postBoard = (payload: BoardForm) => {
  return request(`boards/`, "POST", payload);
};

export const patchBoard = (payload: BoardForm, id: number) => {
  return request(`boards/${id}`, "PATCH", payload);
};

export const getStages = () => {
  return request(`status/`);
};

export const postStages = (payload: Stage) => {
  return request(`status/`, "POST", payload);
};

export const deleteStage = (id: number) => {
  return request(`status/${id}/`, "DELETE");
};

export const patchStage = (payload: BoardForm, id: number) => {
  return request(`status/${id}`, "PATCH", payload);
};

export const getAllTasks = (boards_pk: number) => {
  return request(`boards/${boards_pk}/tasks/`, "GET");
};

export const postTask = (boards_pk: number, payload: TaskObject) => {
  return request(`boards/${boards_pk}/tasks/`, "POST", payload);
};

export const getBoardTitleAndDescription = (id: number) => {
  return request(`boards/${id}/`, "GET");
};

export const deleteTask = (boards_pk: number, id: number) => {
  return request(`boards/${boards_pk}/tasks/${id}/`, "DELETE");
};

export const patchTask = (
  boards_pk: number,
  id: number,
  payload:
    | { title: string; description: string; status: number }
    | { status: number }
) => {
  return request(`boards/${boards_pk}/tasks/${id}`, "PATCH", payload);
};

export const getUserDetails = () => {
  return request(`users/me/`, "GET");
};

export const registerUser = (payload: Register) => {
  return request(`auth/registration/`, "POST", payload);
};
