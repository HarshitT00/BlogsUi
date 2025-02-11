export interface Blogs{
    id: number;
    title: string;
    content: string;
    userName: string;  
    createdAt: string;
    updatedAt: string;
}

export interface BlogsResponse{
    data: Blogs[];
    pageNumber: number;
    pageSize: number;
    hasMoreItems: boolean;
}

export enum SortOrder{
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum SortBy{
    CREATED_AT = 'CREATED_AT',
}

export interface BlogRequest{
    pageSize?: number;
    pageNumber?: number;
    sortDirection?: SortOrder;
    sortBy?: SortBy;
}

export interface EditBlog{
    title: string;
    content: string;
    userName: string;  
}

export interface BlogFormData {
    title: string;
    content: string;
  }