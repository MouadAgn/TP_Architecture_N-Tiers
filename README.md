# Projet de Gestion des Publications

Ce projet est une application web permettant de gérer des publications avec un système d'authentification.

## 🚀 Installation

### Prérequis
- Node.js & Express
- MySQL
- Git
- React JS

### Configuration du projet

1. Cloner le projet

git clone https://github.com/MouadAgn/TP_Architecture_N-Tiers

2. MicroServices 

Api-Gateway = Service des APIs

BackEnd_Publication : Service des publications

BackEnd_User : Service des users

FrontEnd : Service de la partie visuelle

Config_Database : Service da la base de données 

3. GateWay API ( PORT : 8000 )

http://localhost:8000/api/users : URL to point for User 

http://localhost:8000/api/publications : URL to point for Publications 


4. User Routes ( PORT : 3000 )

http://localhost:3000/api/users/register : Inscription d'utilisateur (POST)

http://localhost:3000/api/users/login : Login d'utilisateur (POST)


5. Publication Routes ( PORT : 4000 )

http://localhost:4000/api/publications/ : Affichage de toutes les publicaitons (GET)

http://localhost:4000/api/publications/user : Affichage des publications de l'utilisateur connecté (GET)

http://localhost:4000/api/publications : Ajout de la publication (POST)

http://localhost:4000/api/publications/${id} : Modification de la publication (PUT)

http://localhost:4000/api/publications/${id} : Suppression de la publication (DELETE)


6. Installation des dépendances des services : Api-GateWay | BackEnd_User | BackEnd_Publication 

npm install 

7. Installation des dépendances du service FrontEnd

npm install 

npm install vite --save-dev

8. Installation des dépendances du service Config_Database

npm install mysql2 sequelize

9. Protected Routes  

Les routes sont protégées par un Middleware qui verifie l'authentification (JWT) 

10. Démarrage de l'application 

il faut lancer les 4 services : 

Services : BackEnd_Publication | BackEnd_User | Api-GateWay 

Lancement avec la commande : node app or nodemon app

Services : Frontend 

Lancement avec la commande : npm run dev 

11. Redis and cache (not finished)

La methode Cache sera utilisée dans la partie Publication dans les methodes Ajout, Suppression et la modification des publications, on va mettre en place un cache avec un durée de 10 minutes et qui va se réinstialliser aprés cette durée 

