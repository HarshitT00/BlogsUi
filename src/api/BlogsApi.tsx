import { BlogRequest, BlogsResponse } from "./BlogsApiModels";

const BackendApi : string = 'https://blogsapi-8knn.onrender.com/api/post';

const token = localStorage.getItem('token');

export const fetchBlogs = async (req : BlogRequest) : Promise<BlogsResponse> => {
  try {
    
    const queryParams = new URLSearchParams(req as any).toString();
    const response = await fetch(`${BackendApi}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
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

export const fetchMyBlogs = async (userName: string | null, req?: BlogRequest) : Promise<BlogsResponse> => {
  try {
    
    const queryParams = new URLSearchParams(req as any).toString();
    const response = await fetch(`${BackendApi}/userName/${userName}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
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
    await fetch(`${BackendApi}/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    throw error;
  }  
};

