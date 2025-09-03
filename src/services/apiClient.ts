
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function apiClient<T>(
    path: string, 
    options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      // In a real app, the token would be retrieved from auth state management
      // "Authorization": `Bearer ${getAuthToken()}`,
      ...(options.headers || {}),
    },
    // In a real app with credentials, you might need this
    // credentials: "include", 
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new ApiError(errorData.message || response.statusText, response.status);
  }

  // Handle cases with no content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
