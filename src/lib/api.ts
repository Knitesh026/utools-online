// API utility for handling backend requests

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getApiUrl = () => API_BASE_URL;

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, options);
};

export const apiPost = async (
  endpoint: string,
  body?: any,
  options: RequestInit = {}
): Promise<Response> => {
  return apiCall(endpoint, {
    method: 'POST',
    ...options,
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers: {
      ...(!(body instanceof FormData) && { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });
};

export const apiGet = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  return apiCall(endpoint, {
    method: 'GET',
    ...options,
  });
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getBlobFromResponse = async (response: Response): Promise<Blob> => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.blob();
};

export const getJsonFromResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || response.statusText);
  }
  return response.json();
};
