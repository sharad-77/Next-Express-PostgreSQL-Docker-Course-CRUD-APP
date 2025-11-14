import api from "@/lib/api";

export const createUser = async(Data:object) =>  {
  const res = await api.post("/user/New-User",Data);
  return res.data;
}

export const loginUser = async(Data:object) =>  {
  const res = await api.post("/user/Login",Data);
  return res.data;
}

export const createCourse = async(Data:object) =>  {
  const res = await api.post("/course/New-Course",Data);
  return res.data;
}

export const allCourse = async(Data:object) =>  {
  const res = await api.post('/course/All-Course',Data);
  return res.data;
}

export const detailCourse = async(Data:object,id:number) =>  {
  const res = await api.post(`/course/Course-Detail/${id}`,Data);
  return res.data;
}
