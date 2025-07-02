import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Box, 
  Container,
  Stack
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleBusca = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Por favor, digite um termo para a busca.");
      return;
    }

    setLoading(true);
    setError('');
    setLivros([]);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/books?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros(res.data.docs || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar livros.');
    } finally {
      setLoading(false);
    }
  };

  const handleSalvar = async (livro) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/books',
        {
          titulo: livro.title,
          autor: livro.author_name?.[0] || 'Desconhecido',
          capa_id: livro.cover_i,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Livro salvo com sucesso!');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao salvar livro');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Buscar Livros
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to="/saved-books" variant="contained">
            Ver Salvos
          </Button>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>

      <Box component="form" onSubmit={handleBusca} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          label="Buscar por título ou autor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Buscar'}
        </Button>
      </Box>
      
      <List>
        {livros.map((livro) => (
          <ListItem 
            key={livro.key}
            secondaryAction={
              <IconButton edge="end" aria-label="salvar" onClick={() => handleSalvar(livro)}>
                <SaveIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={livro.title}
              secondary={livro.author_name?.join(', ') || 'Autor desconhecido'}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default SearchPage;