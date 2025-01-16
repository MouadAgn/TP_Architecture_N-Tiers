import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MesPublications.css';

const MesPublications = () => {
    const [publications, setPublications] = useState([]);
    const [editingPublication, setEditingPublication] = useState(null);
    const [error, setError] = useState(null);
    // Nouveau state pour le formulaire d'ajout
    const [newPublication, setNewPublication] = useState({
        title: '',
        description: '',
        price: ''
    });

    const token = localStorage.getItem('token');
    
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    // Charger les publications de l'utilisateur connecté
    const loadUserPublications = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/publications/user', axiosConfig);
            setPublications(response.data);
            setError(null);
        } catch (error) {
            console.error('Erreur:', error.response || error);
            setError('Erreur lors du chargement de vos publications');
        }
    };

    useEffect(() => {
        loadUserPublications();
    }, []);

    // Ajouter une nouvelle publication
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8000/api/publications',
                newPublication,
                axiosConfig
            );
            setNewPublication({ title: '', description: '', price: '' }); // Réinitialiser le formulaire
            loadUserPublications(); // Recharger la liste
            setError(null);
        } catch (error) {
            console.error('Erreur:', error.response || error);
            setError('Erreur lors de la création de la publication');
        }
    };

    // Modifier une publication
    const handleUpdate = async (id) => {
        try {
            const { title, description, price } = editingPublication;
            await axios.put(
                `http://localhost:8000/api/publications/${id}`,
                { title, description, price },
                axiosConfig
            );
            setEditingPublication(null);
            loadUserPublications();
            setError(null);
        } catch (error) {
            console.error('Erreur:', error.response || error);
            setError('Erreur lors de la modification de la publication');
        }
    };

    // Supprimer une publication
    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
            try {
                await axios.delete(
                    `http://localhost:8000/api/publications/${id}`,
                    axiosConfig
                );
                loadUserPublications();
                setError(null);
            } catch (error) {
                console.error('Erreur:', error.response || error);
                setError('Erreur lors de la suppression de la publication');
            }
        }
    };

    return (
        <div className="mes-publications-container">
            <div className="header-section">
                <h1>Mes Publications <span className="publication-count">({publications.length})</span></h1>
            </div>
            
            {/* Formulaire d'ajout */}
            <div className="publication-form">
                <h2>Ajouter une nouvelle publication</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={newPublication.title}
                        onChange={(e) => setNewPublication({
                            ...newPublication,
                            title: e.target.value
                        })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newPublication.description}
                        onChange={(e) => setNewPublication({
                            ...newPublication,
                            description: e.target.value
                        })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Prix"
                        value={newPublication.price}
                        onChange={(e) => setNewPublication({
                            ...newPublication,
                            price: e.target.value
                        })}
                        required
                    />
                    <button type="submit" className="submit-button">Publier</button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="publications-grid">
                {publications.length === 0 ? (
                    <p className="no-publications">Vous n'avez pas encore de publications</p>
                ) : (
                    publications.map((pub) => (
                        <div key={pub.id} className="publication-card">
                            {editingPublication && editingPublication.id === pub.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={editingPublication.title}
                                        onChange={(e) => setEditingPublication({
                                            ...editingPublication,
                                            title: e.target.value
                                        })}
                                        placeholder="Titre"
                                    />
                                    <textarea
                                        value={editingPublication.description}
                                        onChange={(e) => setEditingPublication({
                                            ...editingPublication,
                                            description: e.target.value
                                        })}
                                        placeholder="Description"
                                    />
                                    <input
                                        type="number"
                                        value={editingPublication.price}
                                        onChange={(e) => setEditingPublication({
                                            ...editingPublication,
                                            price: e.target.value
                                        })}
                                        placeholder="Prix"
                                    />
                                    <div className="edit-buttons">
                                        <button 
                                            className="save-button"
                                            onClick={() => handleUpdate(pub.id)}
                                        >
                                            Sauvegarder
                                        </button>
                                        <button 
                                            className="cancel-button"
                                            onClick={() => setEditingPublication(null)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="publication-title">{pub.title}</h3>
                                    <p className="publication-description">{pub.description}</p>
                                    <p className="publication-price">{pub.price}€</p>
                                    <div className="publication-actions">
                                        <button 
                                            className="edit-button"
                                            onClick={() => setEditingPublication(pub)}
                                        >
                                            Modifier
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(pub.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MesPublications;