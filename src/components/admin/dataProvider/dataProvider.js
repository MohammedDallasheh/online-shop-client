import { stringify } from "query-string";
import axiosInstance from "./axiosInstance";

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };

    const url = `${resource}?${stringify(query)}`;
    return axiosInstance.get(url).then(({ headers, data }) => {
      return {
        data: data.docs || [],
        total: parseInt(headers?.["content-range"]?.split("/")?.pop(), 10),
      };
    });
  },
  getOne: (resource, params) => {
    return axiosInstance
      .get(`${resource}/${params.id}`)
      .then(({ data }) => ({ data }));
  },

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
      range: JSON.stringify([0, params.ids?.length]),
    };
    const url = `${resource}?${stringify(query)}`;
    return axiosInstance.get(url).then(({ data }) => ({ data: data.docs }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${resource}?${stringify(query)}`;
    return axiosInstance.get(url).then(({ headers, data }) => ({
      data: data.docs,
      total: parseInt(headers["content-range"].split("/").pop(), 10),
    }));
  },

  update: (resource, params) =>
    axiosInstance
      .put(`${resource}/${params.id}`, JSON.stringify(params.data))
      .then(({ data }) => ({ data })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return axiosInstance
      .put(`${resource}?${stringify(query)}`, JSON.stringify(params.data))
      .then(({ data }) => ({ data }));
  },

  create: (resource, params) =>
    axiosInstance
      .post(`${resource}`, JSON.stringify(params.data))
      .then(({ data }) => ({
        data: { ...params.data, id: data.id },
      })),

  delete: (resource, params) =>
    axiosInstance
      .delete(`${resource}/${params.id}`)
      .then(({ data }) => ({ data })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return axiosInstance
      .delete(`${resource}?${stringify(query)}`, JSON.stringify(params.data))
      .then(({ data }) => ({ data }));
  },
  fetchData: (resource, params) => {
    return axiosInstance
      .get(`${resource}/${params}`)
      .then(({ data }) => ({ data }));
  },
};
