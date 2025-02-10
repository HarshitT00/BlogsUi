import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../../template/SearchBar';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SortOrder } from '../../api/BlogsApiModels';

interface HomeHeaderProps {
    sortOrder: SortOrder
    setSortOrder: (sortOrder: SortOrder) => void; 
}

export const HomeHeader = ({sortOrder, setSortOrder} : HomeHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchText, setSearchText] = useState("");
    const useName = localStorage.getItem('userName');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        console.log(event.target.value);
    };

    const handleAllBlogsClick = () => {
        navigate('/blogs');
    };

    const handleMyBlogsClick = () => {
        navigate('/blogs/my-blogs');
    };

    return (
        <StyledHomeHeaderContainer>
            <div>
                <StyledButton 
                    color={location.pathname === '/blogs' ? 'primary' : 'inherit'}
                    onClick={handleAllBlogsClick}
                >
                    All Blogs
                </StyledButton>
                {
                useName &&
                    <StyledButton 
                        color={location.pathname === '/blogs/my-blogs' ? 'primary' : 'inherit'}
                        onClick={handleMyBlogsClick}
                    >
                        My Blogs
                    </StyledButton>
                }
            </div>
            <SearchBar 
                value={searchText}
                placeholder='Search for blogs...'
                onChange={handleSearch}
            />
        </StyledHomeHeaderContainer>
    );
}

const StyledHomeHeaderContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2vh 10vw',
}));

const StyledButton = styled(Button)({
    fontSize: '1rem',
    fontWeight: 'bold',
});