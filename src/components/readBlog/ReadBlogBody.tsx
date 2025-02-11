import React from 'react';
import {
  Paper,
  Typography,
  Container,
  Box,
  Divider,
  Avatar,
  Theme,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Event as EventIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { Blogs } from '../../api/BlogsApiModels';

interface ReadBlogBodyProps {
  blog?: Blogs;
  isLoading: boolean;
  isError: boolean;
}

export const ReadBlogBody = ({
  blog,
  isLoading,
  isError,
}: ReadBlogBodyProps) => {
  const theme = useTheme();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        {/* Header Section */}
        <Box mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            {blog?.title}
          </Typography>

          <MetadataContainer>
            <MetadataItem>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Typography variant="subtitle1">{blog?.userName}</Typography>
            </MetadataItem>

            <MetadataItem>
              <EventIcon color="action" />
              <Typography variant="subtitle1">
                Published: {formatDate(blog?.createdAt)}
              </Typography>
            </MetadataItem>

            {blog?.updatedAt && blog.updatedAt !== blog?.createdAt && (
              <MetadataItem>
                <UpdateIcon color="action" />
                <Typography variant="subtitle1">
                  Updated: {formatDate(blog?.updatedAt)}
                </Typography>
              </MetadataItem>
            )}
          </MetadataContainer>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Content Section */}
        <ContentContainer>
          <Typography
            component="div"
            variant="body1"
            dangerouslySetInnerHTML={{ __html: blog?.content || '' }}
          />
        </ContentContainer>
      </Paper>
    </Container>
  );
};

// Styled components
const MetadataContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  color: theme.palette.text.secondary,
  flexWrap: 'wrap',
  marginBottom: theme.spacing(3),
}));

const MetadataItem = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const ContentContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
  },
  '& h2': {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  '& h3': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));
