import  { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    // État local pour les données du formulaire
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: ''
    });
    
    // État pour gérer les messages d'erreur/succès
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/register', formData);
            setMessage(response.data.message);
            setError('');
            // Réinitialiser le formulaire
            setFormData({
                prenom: '',
                nom: '',
                email: '',
                password: ''
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Une erreur est survenue');
            setMessage('');
        }
    };

    return (
        <div className="register-container">
            <h2>Inscription</h2>
            
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom:</label>
                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;