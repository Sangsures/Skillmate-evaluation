import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Pages/Auth';
import Dashboard from './Pages/dashboard';
import Expenses from './Pages/Expenses'; 

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Add more protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;
