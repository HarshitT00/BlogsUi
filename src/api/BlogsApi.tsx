import { BlogRequest, BlogsResponse } from "./BlogsApiModels";

const BackendApi : string = 'https://blogsapi-8knn.onrender.com/api/post';

export const fetchBlogs = async (req : BlogRequest) : Promise<BlogsResponse> => {
  try {
    
    const queryParams = new URLSearchParams(req as any).toString();
    const response = await fetch(`${BackendApi}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTczOTE4NDU3NSwiZXhwIjoxNzM5MjcwOTc1fQ.U8W5ljqlyRMUCOZi9E0zmt6anmYSOnHl3jq3hNqJU7A`
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};

export const fetchMyBlogs = async (userName: string, req : BlogRequest) : Promise<BlogsResponse> => {
  try {
    
    const queryParams = new URLSearchParams(req as any).toString();
    const response = await fetch(`${BackendApi}/userName/${userName}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTczOTE4NDU3NSwiZXhwIjoxNzM5MjcwOTc1fQ.U8W5ljqlyRMUCOZi9E0zmt6anmYSOnHl3jq3hNqJU7A`
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};

export const deleteBlog = async (blogId: number) : Promise<void> => {
  try {
    const response = await fetch(`${BackendApi}/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTczOTE4NDU3NSwiZXhwIjoxNzM5MjcwOTc1fQ.U8W5ljqlyRMUCOZi9E0zmt6anmYSOnHl3jq3hNqJU7A`
      },
    });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    throw error;
  }  
};

