import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [publications, setPublications] = useState([]);
    const [error, setError] = useState(null);

    // Charger toutes les publications
    const loadPublications = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/publications');
            setPublications(response.data);
            setError(null);
        } catch (error) {
            console.error('Erreur détaillée:', error.response || error);
            setError('Erreur lors du chargement des publications');
        }
    };

    useEffect(() => {
        loadPublications();
    }, []);

    return (
        <div className="home-container">
            <div className="header-section">
                <h1>Toutes les publications <span className="publication-count">({publications.length})</span></h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="publications-grid">
                {publications.length === 0 ? (
                    <p className="no-publications">Aucune publication disponible</p>
                ) : (
                    publications.map((pub) => (
                        <div key={pub.id} className="publication-card">
                            <h3 className="publication-title">{pub.title}</h3>
                            <p className="publication-description">{pub.description}</p>
                            <p className="publication-price">{pub.price}€</p>
                            <p className="publication-author">
                                Publié par: {pub.user.prenom} {pub.user.nom}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;