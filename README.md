
# Projet 1 : Démonstration de Pixel Tracking & Profilage

## 1. La Menace Étudiée
Ce projet démontre le fonctionnement invisible du **Pixel Tracking** et du **Profilage Publicitaire**.
Contrairement aux cookies qui nécessitent souvent un clic, nous montrons ici comment :
1.  **L'Identification technique** se fait passivement dès le chargement de la page (Fingerprinting).
2.  **L'Analyse comportementale** surveille les mouvements de souris pour déduire les intérêts de l'utilisateur.

## 2. Scénario de Test (Reproductible)
Pour vérifier le fonctionnement de l'application :

1.  **Lancer l'application** (`index.html`).
2.  **Observer la console à droite (Logs)** :
    * *Attendu :* Sans aucune action, le système capture l'User-Agent, la langue et simule une capture d'IP qui aurait normalement lieu.
3.  **Survoler les articles** (ex: Passez la souris sur l'image "Vague de chaleur").
    * *Attendu :* Un log "PROFILAGE" apparaît détectant l'intérêt "Météo/Climat".
4.  **Observer la publicité à droite** :
    * *Attendu :* La publicité change instantanément pour proposer un climatiseur (Reciblage en temps réel).
5.  **Tester la bannière Cookie** :
    * Cliquer sur "Refuser". Le log montre que les données ont *déjà* été volées au chargement, prouvant l'inefficacité du consentement a posteriori pour les pixels techniques.

## 3. Données Collectées & Limites
* **Données techniques :** Résolution écran, Cœurs CPU, Navigateur, Langue, IP.
* **Données comportementales :** Centres d'intérêt basés sur le survol (Hovers).
* **Confidentialité :** Toutes les données restent **locales** (Client-side uniquement). L'adresse IP affichée est simulée pour l'exemple.

## 4. Conclusion
Cette démonstration prouve que la navigation "passive" n'existe pas. Le simple fait d'afficher une ressource permet au serveur de collecter une empreinte numérique unique et d'adapter le contenu commercial dynamiquement.