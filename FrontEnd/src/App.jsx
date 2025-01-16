import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import MesPublications from './Pages/MesPublications/MesPublications';
import './App.css';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifier l'authentification au chargement et quand le localStorage change
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        // Vérifier au chargement
        checkAuth();

        // Écouter les changements de localStorage
        window.addEventListener('storage', checkAuth);
        
        // Custom event pour la connexion
        window.addEventListener('login', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('login', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <ul>
                        {isAuthenticated ? (
                            <>
                                <li><Link to="/">Accueil</Link></li>
                                <li><Link to="/mes-publications">Mes Publications</Link></li>
                                <li>
                                    <button 
                                        onClick={handleLogout} 
                                        className="logout-btn"
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Connexion</Link></li>
                                <li><Link to="/register">Inscription</Link></li>
                            </>
                        )}
                    </ul>
                </nav>

                <div className="main-content">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/mes-publications" 
                            element={
                                <PrivateRoute>
                                    <MesPublications />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/login" 
                            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;