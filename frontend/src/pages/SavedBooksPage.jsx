import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  IconButton, 
  Box, 
  CircularProgress,
  Button,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SavedBooksPage() {
  const [livrosSalvos, setLivrosSalvos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivrosSalvos(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Não foi possível carregar os livros salvos.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (!window.confirm('Tem certeza de que deseja remover este livro?')) {
        return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setLivrosSalvos(prevLivros => prevLivros.filter(livro => livro._id !== bookId));
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao remover o livro.');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }

    if (livrosSalvos.length === 0) {
      return <Alert severity="info">Você ainda não salvou nenhum livro.</Alert>;
    }

    return (
      <List>
        {livrosSalvos.map((livro) => (
          <ListItem 
            key={livro._id}
            secondaryAction={
              <IconButton edge="end" aria-label="deletar" onClick={() => handleDelete(livro._id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar 
                variant="square"
                src={livro.capa_id ? `https://covers.openlibrary.org/b/id/${livro.capa_id}-M.jpg` : '/default-book.png'} 
              />
            </ListItemAvatar>
            <ListItemText
              primary={livro.titulo}
              secondary={livro.autor}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Meus Livros Salvos
        </Typography>
        <Button component={RouterLink} to="/busca" variant="outlined">
          Voltar para a Busca
        </Button>
      </Box>
      {renderContent()}
    </Container>
  );
}

export default SavedBooksPage;