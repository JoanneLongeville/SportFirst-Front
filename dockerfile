# Étape de construction
FROM node:alpine as builder

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe uniquement les dépendances nécessaires
RUN npm install --only=production

# Copie les autres fichiers du projet
COPY . .

# Construit l'application pour la production
RUN npm run build

# Étape d'exécution
FROM node:alpine

# Installe serve globalement pour servir l'application
RUN npm install -g serve

# Copie les fichiers de construction depuis l'étape précédente
COPY --from=builder /app/dist /app

# Expose le port 8080
EXPOSE 8080

# Commande pour démarrer le serveur
CMD ["serve", "-s", "/app", "-l", "8080"]
