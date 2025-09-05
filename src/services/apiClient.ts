
export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// A singleton-like object to hold the base URL.
// This makes it easy to change or access from anywhere in the app.
export const apiClient = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${apiClient.defaults.baseURL}${path}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // Include credentials (e.g., cookies) in all API requests
    credentials: 'include',
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    let errorMessage = `An API error occurred: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Ignore if response is not JSON
    }
    throw new ApiError(errorMessage, response.status);
  }

  // Handle cases with no content (e.g., 204 No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  // Handle cases where response might not be JSON but still OK
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
      return response.json();
  }

  return undefined as T;
};

// Default configuration that can be updated.
apiClient.defaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
};
