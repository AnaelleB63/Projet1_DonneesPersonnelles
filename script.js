let contenuLogsTxt = "--- JOURNAL DE TRAÇAGE ACTUTORTUE ---\n\n";

// --- FONCTION UTILITAIRE : ÉCRIRE DANS LA CONSOLE ---
function logEvent(type, message, details = "") {
    const logsContainer = document.getElementById('logs');
    const now = new Date();
    
    const timestamp = now.toLocaleTimeString();
    const isoString = now.toISOString();

    // Création de l'élément HTML du log
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry');
    
    // Style différent selon le type d'événement
    if (type === 'CAPTURE TECHNIQUE') logEntry.style.borderLeftColor = 'red';
    if (type === 'PROFILAGE') logEntry.style.borderLeftColor = 'yellow';
    if (type === 'PUBLICITÉ CIBLÉE') logEntry.style.borderLeftColor = 'grey';

    logEntry.innerHTML = `
        <span style="opacity:0.6">[${now}]</span> <strong>${type}</strong><br>
        ${message} <br>
        <em style="font-size:0.8em; color:#aaa">${details}</em>
    `;

    // On ajoute le log en haut de la liste
    logsContainer.prepend(logEntry);

    // --- PARTIE JOURNALISATION (Pour le fichier .txt) ---
    // On nettoie les tags HTML éventuels du message pour avoir un texte propre dans le .txt
    const cleanDetails = details.replace(/<[^>]*>?/gm, ''); 
    contenuLogsTxt += `[${isoString}] ${type.toUpperCase()}\n`;
    contenuLogsTxt += `Message: ${message}\n`;
    if (details) contenuLogsTxt += `Détails: ${cleanDetails}\n`;
    contenuLogsTxt += `-------------------------------------------\n`;
}

// --- PARTIE 1 : SIMULATION DU PIXEL DE CHARGEMENT ---
// Ce code s'exécute dès que la page est chargée, sans action de l'utilisateur.
window.addEventListener('load', () => {
    
    // 1. Récupération des vraies données techniques ACCESSIBLES en JS
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width + "x" + window.screen.height;
    const language = navigator.language;
    const referrer = document.referrer || "Accès direct"; // D'où vient le visiteur ?
    const cores = navigator.hardwareConcurrency || "Inconnu"; // Nombre de coeurs du processeur

    // 2. Simulation de l'IP (JS ne peut pas la lire en local sans API externe)
    const fakeIP = "92.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);

    setTimeout(() => {
        logEvent('CONNEXION', 'Initialisation du Tracker publicitaire (pixel.gif)');
    }, 500);

    setTimeout(() => {
        // On affiche les données (Vraies + Simulées pour l'exemple)
        logEvent('CAPTURE TECHNIQUE', 'Données identifiantes exfiltrées :', 
            `<strong>IP (Simulée):</strong> ${fakeIP} <br>
             <strong>Source:</strong> ${referrer} <br>
             <strong>Système:</strong> ${userAgent.substring(13, 50)}...<br>
             <strong>Langue:</strong> ${language} | <strong>Écran:</strong> ${screenWidth}px <br>
             <strong>CPU:</strong> ${cores} cœurs logiques`
        );
    }, 1500);
});

// --- PARTIE 2 : LE PROFILAGE PAR CENTRE D'INTÉRÊT ---
// On détecte quand l'utilisateur passe sa souris sur une image d'article, 
// et on récupère le thème de l'article grâce à un attribut data-tag qu'on a ajouté dans le HTML.

const imagesArticles = document.querySelectorAll('.article-img');

imagesArticles.forEach(image => {
    image.addEventListener('mouseenter', () => {
        
        // On récupère le thème qu'on a mis dans le HTML (data-tag)
        const interet = image.getAttribute('data-tag');
        
        if (interet) {
            logEvent('PROFILAGE', `L'utilisateur regarde l'image : "${image.alt}"`, 
                `>> Tag ajouté au profil publicitaire : <strong>${interet}</strong>`
            );

            // --- CONSÉQUENCE VISIBLE (Reciblage Publicitaire) ---
    
            // On cible l'image de la pub dans la colonne de droite
            const pubImage = document.querySelector('.promo-box img');
            const pubBouton = document.querySelector('.promo-btn');
            const pubTitre = document.querySelector('.promo-box p');

            // Si l'utilisateur regarde la chaleur, on lui vend de la clim
            if (interet === 'Météo/Climat') {
                pubImage.src = 'img/vague_chaleur.jpg'; // On pourrait mettre une image de clim si tu en as une
                pubTitre.innerText = 'Trop chaud ?';
                pubBouton.innerText = 'Acheter un Climatiseur';
                pubBouton.style.background = '#ff8800';
                
                logEvent('PUBLICITÉ CIBLÉE', 'Mise à jour de la bannière pub', 'L\'algorithme affiche une pub pour : Climatisation');
            }
            
            // Si l'utilisateur regarde l'économie, on lui vend de l'or ou des panneaux solaires
            else if (interet === 'Économie/Crise') {
                pubImage.src = 'img/prix_electricite.jpg';
                pubTitre.innerText = 'Réduisez vos factures !';
                pubBouton.innerText = 'Installer Panneaux Solaires';
                pubBouton.style.background = '#2e7838';
                
                logEvent('PUBLICITÉ CIBLÉE', 'Mise à jour de la bannière pub', 'L\'algorithme affiche une pub pour : Énergie Solaire');
            }

            // Si l'utilisateur regarde l'écologie, on lui vend de l'énergie verte
            else if (interet === 'Écologie/Science') {
                pubImage.src = 'img/grand_nord.jpg';
                pubTitre.innerText = 'Passez à l\'énergie verte !';
                pubBouton.innerText = 'Découvrir les offres vertes';
                pubBouton.style.background = '#5fcc30';

                logEvent('PUBLICITÉ CIBLÉE', 'Mise à jour de la bannière pub', 'L\'algorithme affiche une pub pour : Énergie Verte');
            }
        }
    });
});

// --- ÉTAPE FINALE : EXPORTATION DU FICHIER TXT ---
// Cette fonction est appelée par le bouton dans votre HTML
function genererFichierLogs() {
    const blob = new Blob([contenuLogsTxt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal_tracage_actutortue.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}