import { BaseLayout } from '../../template/BaseLayout';
import { HomeHeader } from './HomeHeader';
import { HomeBody } from './HomeBody';
import { useBlogsInfiniteQuery, useMyBlogsInfiniteQuery } from '../../query/BlogsQuery';
import { SortBy, SortOrder } from '../../api/BlogsApiModels';
import { useState } from 'react';

export const Home = () => {
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
    const { data: allBlogsData, isLoading, fetchNextPage, isError, hasNextPage } = useBlogsInfiniteQuery(
        { pageSize: 3, sortDirection: sortOrder, sortBy: SortBy.CREATED_AT }
    );
    return (
        <BaseLayout 
        header={<HomeHeader setSortOrder={setSortOrder} sortOrder={sortOrder}/>} 
        body={<HomeBody blogsResponse={allBlogsData} isLoading={isLoading} isError={isError} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>}
        />
    );
}