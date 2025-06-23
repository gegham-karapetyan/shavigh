import { API_URL, STATUS_CODES } from "@/constants";
import qs from "qs";
const getErrorObject = (statusCode: number): ErrorResponseObject => {
  switch (statusCode) {
    case 400:
      return {
        message: "Bad Request",
        code: STATUS_CODES.BAD_REQUEST,
      };
    case 401:
      return {
        message: "Unauthorized",
        code: STATUS_CODES.UNAUTHORIZED,
      };
    case 403:
      return {
        message: "Forbidden",
        code: STATUS_CODES.FORBIDDEN,
      };
    case 404:
      return {
        message: "Not Found",
        code: STATUS_CODES.NOT_FOUND,
      };
    default:
      return {
        message: "Internal Server Error",
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      };
  }
};

export interface FetcherOptions extends RequestInit {
  params?: Record<string, unknown>;
}
export interface ErrorResponseObject {
  message: string;
  code: number;
}

export type FetcherResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponseObject;
    };

export const fetcher = async <T>(url: string, options: FetcherOptions = {}) => {
  const { params, ...fetchOptions } = options;
  const queryString = qs.stringify(params, {
    addQueryPrefix: true,
    arrayFormat: "comma",
    skipNulls: true,
  });

  const response = await fetch(`${API_URL}${url}${queryString}`, fetchOptions);
  if (!response.ok) {
    return {
      data: null,
      error: getErrorObject(response.status),
    } as FetcherResponse<T>;
  }

  const data =
    response.headers.get("Content-Type") === "application/json"
      ? ((await response.json()) as T)
      : (undefined as T);
  return {
    data,
    error: null,
  } as FetcherResponse<T>;
};
