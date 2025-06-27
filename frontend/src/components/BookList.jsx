import { Typography, CircularProgress, Card, CardContent, CardMedia, Grid, Box } from "@mui/material";
  import { useBookContext } from "../contexts/BookContext";
  
  export default function BookList() {
    const { state } = useBookContext();
  
    if (state.loading)
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
  
    if (state.error)
      return (
        <Typography color="error" variant="body2" align="center" mt={2}>
          {state.error}
        </Typography>
      );
  
    if (!state.results.length)
      return (
        <Typography variant="body1" align="center" mt={2}>
          Busque por livro ou autor de sua preferência!
        </Typography>
      );
  
      return (
        <Grid container spacing={2}>
          {state.results.map((book, idx) => {
            const coverUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    
            return (
              <Grid key={idx} sx={{ width: { xs: "100%", sm: "50%", md: "30%" } }}>
                <Card>
                  {coverUrl && (
                    <CardMedia
                      component="img"
                      height="150"
                      image={coverUrl}
                      alt={`Capa do livro ${book.title}`}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Autor: {book.author_name?.join(", ") || "Não informado"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ano: {book.first_publish_year || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      );
    }