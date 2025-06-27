import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useBookContext } from "../contexts/BookContext";

export default function SearchForm() {
  const { state, dispatch } = useBookContext();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!state.query.trim()) {
      dispatch({ type: "SEARCH_ERROR", payload: "Campo vazio!" });
      return;
    }

    dispatch({ type: "SEARCH_START" });

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(state.query)}`
      );
      const data = await res.json();
      dispatch({ type: "SEARCH_SUCCESS", payload: data.docs.slice(0, 10) });
    } catch {
      dispatch({ type: "SEARCH_ERROR", payload: "Erro ao buscar livros." });
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField
          fullWidth
          label="Buscar por título ou autor"
          value={state.query}
          onChange={(e) => dispatch({ type: "SET_QUERY", payload: e.target.value })}
          error={!!state.error}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={state.loading}
          startIcon={state.loading && <CircularProgress size={20} />}
        >
          Buscar
        </Button>
      </form>

      {state.error && (
        <Typography color="error" variant="body2" style={{ marginBottom: 16 }}>
          {state.error}
        </Typography>
      )}
    </>
  );
}
