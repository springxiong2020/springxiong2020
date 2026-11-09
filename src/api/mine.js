import request from "@/utils/request.js";

export const getMineBlogsList = async (page, pageSize, { signal } = {}) => {
  return request.get("/mine/blogs", { params: { page, pageSize }, signal });
};

export const getMineBooksList = async (page, pageSize, { signal } = {}) => {
  return request.get("/mine/books", { params: { page, pageSize }, signal });
};

export const getMineProjectsList = async (page, pageSize, { signal } = {}) => {
  return request.get("/mine/projects", {
    params: { page, pageSize, isVisible: 1 },
    signal,
  });
};

export const getMineSentencesList = async (page, pageSize, { signal } = {}) => {
  return request.get("/mine/sentences", { params: { page, pageSize }, signal });
};

export const getMineArchivesList = async (page, pageSize, { signal } = {}) => {
  return request.get("/mine/archives", { params: { page, pageSize }, signal });
};

export const searchMineResources = async (keyword, { signal } = {}) => {
  return request.get("/mine/resources", { params: { keyword }, signal });
};
