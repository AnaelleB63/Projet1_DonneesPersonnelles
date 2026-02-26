
# Projet 1 : Démonstration de Pixel Tracking & Profilage Publicitaire

**Équipe :** 
* Antoine RAFFIER
* Anaëlle BOREL

**[Lien vers la vidéo de démonstration (Google Drive)](https://drive.google.com/file/d/1YGf-ikqAckHr8zpwolcs36PKZ77pu_a7/view?usp=drive_link)**

---

## 1. La Menace Étudiée
Ce projet démontre le fonctionnement invisible du **Pixel Tracking** et de l'analyse comportementale qui en découle, aussi appelée **Profilage Publicitaire**.
Contrairement aux cookies qui nécessitent souvent un clic, nous montrons ici comment :
1.  **L'Identification technique** se fait passivement dès le chargement de la page (Fingerprinting).
2.  **L'Analyse comportementale** surveille les mouvements de souris pour déduire les intérêts de l'utilisateur.

## 2. Scénario de Test (Reproductible)
Pour vérifier le fonctionnement de l'application :

1.  **Lancement :** Ouvrez le fichier `index.html` dans un navigateur.
2.  **Observation de la collecte passive :** Ne cliquez sur rien. Observez la "Console de traçage" à droite. Au bout de 1,5 seconde, le tracker récupère vos données systèmes et simule une requête réseau `pixel.gif`.
3.  **Observation du consentement caduc :** Cliquez sur "Tout Refuser" sur la bannière de cookies. Remarquez que le tracker technique a **déjà** récolté vos données système en amont.
4.  **Déclenchement du profilage (Comportemental) :** Passez votre souris sur l'image de l'article "Météo : une vague de chaleur arrive". 
5.  **Vérification de l'implication :** Regardez la console de droite et la section "Sponsorisé". Le script a détecté l'intérêt "Météo/Climat" et a immédiatement reciblé la publicité pour vous vendre des climatiseurs.

## 3. Données Collectées & Limites
* **Données techniques :** Résolution d'écran, Cœurs CPU, Navigateur, Langue, IP, Système d'exploitation.
* **Données comportementales :** Centres d'intérêt basés sur le survol (Hovers).

* **Implications :** Ces données permettent la création d'un profil publicitaire (Shadow Profiling) et le reciblage publicitaire (Retargeting) dynamique, prouvant que naviguer sans cliquer génère quand même de la donnée exploitable.

* **Confidentialité :** Toutes les données restent **locales** (Client-side uniquement). L'adresse IP affichée est simulée pour l'exemple. Toute requête affichée est aussi simulée.

## 4. Conclusion
Cette démonstration prouve que la navigation "passive" n'existe pas. Le simple fait d'afficher une ressource permet au serveur de collecter une empreinte numérique unique et d'adapter le contenu commercial dynamiquement. Côté utilisateur, une solution pour limiter ça pourrait être l'utilisation d'extension de filtrage des requêtes comme **Privacy Badger** ou **uBlock Origin**.