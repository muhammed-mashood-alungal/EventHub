import { IPagination } from "../types";

export const paginate = <T>(
  total: number,
  page: number,
  limit: number,
  data: T[]
): IPagination<T> => {
  const totalPages = Math.ceil(total / limit);
  return {
    pagination: {
      total,
      page,
      limit,
      totalPages: totalPages || 1,
    },
    data,
  };
};
