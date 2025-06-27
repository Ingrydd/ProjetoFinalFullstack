import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SavedBooksPage from './pages/SavedBooksPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route 
            path="/busca" 
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/saved-books" 
            element={
              <ProtectedRoute>
                <SavedBooksPage />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;