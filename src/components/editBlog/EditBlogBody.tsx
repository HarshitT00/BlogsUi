import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BlogFormData, Blogs } from '../../api/BlogsApiModels';

interface EditBlogBodyProps {
  isEdit?: boolean;
  data?: Blogs;
  onSubmit: (formData: BlogFormData) => void;
  isPending?: boolean;
}

export const EditBlogBody = ({
  isEdit = false,
  data,
  onSubmit,
  isPending,
}: EditBlogBodyProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<BlogFormData>({
    title: data?.title || '',
    content: data?.content || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEdit ? 'Edit Blog' : 'Create New Blog'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            name="title"
            label="Blog Title"
            variant="outlined"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 3 }}
            error={!!error && !formData.title.trim()}
            helperText={
              error && !formData.title.trim() ? 'Title is required' : ''
            }
          />

          <TextField
            name="content"
            label="Blog Content"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={12}
            value={formData.content}
            onChange={handleChange}
            sx={{ mb: 3 }}
            error={!!error && !formData.content.trim()}
            helperText={
              error && !formData.content.trim() ? 'Content is required' : ''
            }
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isEdit ? 'Update' : 'Publish'} Blog
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setError('')}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};
