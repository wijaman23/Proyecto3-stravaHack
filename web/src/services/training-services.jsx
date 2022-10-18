import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function loginApi(data) {
  return http.post("/login", data);
}

export function logout() {
  return http.delete("/logout");
}

export function getTraining() {
  return http.get("/training");
}

export function setLike(id) {
  return http.post(`/training/${id}/kudos`)
}

export function detailUsers(id) {
  return http.get(`/users/${id}`)
}

export function userTraining(id) {
  return http.get(`/user/${id}/training`)
}

export function createUser(user) {
  return http.post("/register", user);
}

export function getUsers() {
  return http.get("/users");
}

export function createTraining(training) {
  return http.post("/training", training);
}

export function editUser(id, user) {
  return http.patch(`/users/${id}`, user);
}

export function detailTraining(id) {
  return http.get(`/training/${id}`)
}

export function createComment(id, comment) {
  return http.post(`/training/${id}/comments/`, comment);
}

export function deleteComment(idTraining, idComment) {
  return http.delete(`/training/${idTraining}/comments/${idComment}`)
}






