import { LoginRequest, SignUpRequest } from './AuthApiModels';

const BackendApi: string = 'https://blogsapi-8knn.onrender.com/api/auth';

export const loginUser = async (req: LoginRequest) => {
  const response = await fetch(`${BackendApi}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const signUpUser = async (req: SignUpRequest) => {
  const response = await fetch(`${BackendApi}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }
};
