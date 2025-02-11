import { BlogFormData, BlogRequest, Blogs, BlogsResponse, EditBlog } from './BlogsApiModels';

const BackendApi: string = 'https://blogsapi-8knn.onrender.com/api/post';

const getAuthToken = () => localStorage.getItem('token');

const createHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const fetchBlogs = async (req: BlogRequest): Promise<BlogsResponse> => {
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

export const fetchMyBlogs = async (
  userName: string | null,
  req?: BlogRequest
): Promise<BlogsResponse> => {
  try {
    const queryParams = new URLSearchParams(req as any).toString();
    const response = await fetch(`${BackendApi}/userName/${userName}?${queryParams}`, {
      method: 'GET',
      headers: createHeaders(),
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

export const deleteBlog = async (blogId: number): Promise<void> => {
  try {
    await fetch(`${BackendApi}/${blogId}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    throw error;
  }
};

export const getBlog = async (blogId: number): Promise<Blogs> => {
  try {
    const response = await fetch(`${BackendApi}/${blogId}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to get blog:', error);
    throw error;
  }
};

export const updateBlog = async (
  blogId: number,
  userName: string,
  req: BlogFormData
): Promise<Blogs> => {
  try {
    const updateBlogRequest: EditBlog = { ...req, userName: userName };
    const response = await fetch(`${BackendApi}/${blogId}`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: JSON.stringify(updateBlogRequest),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to get blog:', error);
    throw error;
  }
};

export const addBlog = async (userName: string, req: BlogFormData): Promise<Blogs> => {
  try {
    const updateBlogRequest: EditBlog = { ...req, userName: userName };
    const response = await fetch(`${BackendApi}/addPost`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(updateBlogRequest),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to get blog:', error);
    throw error;
  }
};
