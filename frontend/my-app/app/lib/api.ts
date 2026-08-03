import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
// Auth

export const login = (data: any) =>
  api.post("/api/auth/login", data)
     .then((res) => res.data);


export const signup = (data: any) =>
  api.post("/api/auth/register", data)
     .then((res) => res.data);


export const getMe = () =>
  api.get("/api/auth/me")
     .then((res) => res.data);


// Books

export const getBooks = () =>
  api.get("/api/books")
     .then((res) => res.data);


export const getBook = (id: string | number) =>
  api.get(`/api/books/${id}`)
     .then((res) => res.data);


export const createBook = (data: any) =>
  api.post("/api/books", data)
     .then((res) => res.data);


export const updateBook = (
  id: string | number,
  data: any
) =>
  api.put(`/api/books/${id}`, data)
     .then((res) => res.data);


export const deleteBook = (
  id: string | number
) =>
  api.delete(`/api/books/${id}`)
     .then((res) => res.data);