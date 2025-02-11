import React from 'react';
import { BlogsResponse } from '../../api/BlogsApiModels';
import {
  Container,
  Card,
  CardHeader,
  Typography,
  Box,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Fab,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Article as ArticleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteData } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface HomeBodyProps {
  blogsResponse?: InfiniteData<BlogsResponse>;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const truncateContent = (content?: string, maxLength: number = 150) => {
  if (!content) return '';
  return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
};

export const HomeBody = ({
  blogsResponse,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
}: HomeBodyProps) => {
  const blogs = blogsResponse?.pages.flatMap((page) => page.data) ?? [];
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleAddBlog = () => {
    userName ? navigate('/add-blog') : navigate('/login');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">Error loading blogs</Typography>
      </Box>
    );
  }

  return (
    <Box position="relative" minHeight="100vh">
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Box textAlign="center" p={2}>
            <Typography variant="body2" color="text.secondary">
              You&apos;ve seen all the blogs!
            </Typography>
          </Box>
        }
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={2}>
            {blogs.map((blog) => (
              <Grid item xs={12} key={blog.id}>
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'stretch',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.01)',
                    },
                  }}
                  elevation={4}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '250px' },
                      flexShrink: 0,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      p: 2,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 100 }} />
                  </Box>

                  <Box
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography variant="h5" color="primary">
                          {blog.title}
                        </Typography>
                      }
                      subheader={
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {blog.userName}
                          </Typography>
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(blog.createdAt)}
                          </Typography>
                        </Box>
                      }
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" color="text.secondary">
                        {truncateContent(blog.content)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<ArticleIcon />}
                        onClick={() => {
                          userName ? navigate(`/${blog.id}`) : navigate(`/login`);
                        }}
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>

      <Fab
        color="primary"
        aria-label="add blog"
        onClick={handleAddBlog}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
