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
    if (type === 'HTTP REQUEST') logEntry.style.borderLeftColor = '#00ffff';

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

// --- SIMULATEUR DE REQUÊTE RÉSEAU ---
function simulateNetworkRequest(endpoint, params) {
    // On transforme l'objet de paramètres en chaîne URL (ex: ?id=123&tag=sport)
    const queryString = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
    
    // Fausse URL de serveur de tracking
    const fullUrl = `GET https://api.actutortue-ads.com/${endpoint}?${queryString}`;
    
    const networkDisplay = `<div class="network-log">${fullUrl}</div>`;
    
    logEvent('HTTP REQUEST', 'Envoi de données au serveur distant...', networkDisplay);
}

// --- CHARGEMENT DU PIXEL INVISIBLE ---
// Ce code s'exécute dès que la page est chargée, sans action de l'utilisateur.
window.addEventListener('load', () => {
    
    // Récupération des vraies données techniques ACCESSIBLES en JS
    const userAgent = navigator.userAgent;
    const screenRes = window.screen.width + "x" + window.screen.height;
    const language = navigator.language;
    const referrer = document.referrer || "Accès direct"; // D'où vient le visiteur ?
    const cores = navigator.hardwareConcurrency || "Inconnu"; // Nombre de coeurs du processeur

    // Simulation de l'IP 
    const fakeIP = "92.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);
    // Faux ID utilisateur (cookie simulé)
    const fakeUserID = "uid_" + Math.random().toString(36).substr(2, 9);

    setTimeout(() => {
        logEvent('CONNEXION', 'Initialisation du Tracker publicitaire (pixel.gif)');
    }, 500);

    setTimeout(() => {
        // affiche les données (Vraies + Simulées pour l'exemple)
        logEvent('CAPTURE TECHNIQUE', 'Données identifiantes exfiltrées :', 
            `<strong>IP (Simulée):</strong> ${fakeIP} <br>
             <strong>Source:</strong> ${referrer} <br>
             <strong>Système:</strong> ${userAgent}<br>
             <strong>Langue:</strong> ${language} | <strong>Écran:</strong> ${screenRes}px <br>
             <strong>CPU:</strong> ${cores} cœurs logiques`
        );
    }, 1500);

    setTimeout(() => {
        // On montre la REQUÊTE HTTP (Ce que le serveur reçoit vraiment)
        simulateNetworkRequest('pixel.gif', {
            ip: fakeIP,
            ua: userAgent,
            lang: navigator.language,
            res: screenRes,
            ref: document.referrer || 'direct'
        });
    }, 1000); // Délai réaliste
});

// --- LE PROFILAGE PAR CENTRE D'INTÉRÊT ---
// On détecte quand l'utilisateur passe sa souris sur une image d'article, 
// et on récupère le thème de l'article grâce à un attribut data-tag qu'on a ajouté dans le HTML.

const imagesArticles = document.querySelectorAll('.article-img');

imagesArticles.forEach(image => {
    image.addEventListener('mouseenter', () => {
        
        // On récupère le thème qu'on a mis dans le HTML (data-tag)
        const interet = image.getAttribute('data-tag');
        
        if (interet) {
            simulateNetworkRequest('collect_event', {
                event: 'hover',
                target: image.alt,
                tag: interet,
                timestamp: Date.now()
            });

            setTimeout(() => {
                logEvent('PROFILAGE', `Intérêt détecté pour : "${image.alt}"`, 
                    `>> Tag ajouté : <strong>${interet}</strong>`
                );
                updateAds(interet); // On lance la mise à jour de la pub
            }, 300); 
        }
    });
});

// --- FONCTION DE MISE À JOUR DE LA PUB ---
function updateAds(interet) {
    const pubImage = document.querySelector('.promo-box img');
    const pubBouton = document.querySelector('.promo-btn');
    const pubTitre = document.querySelector('.promo-box p'); 

    // Sécurité : si Adblock a quand même supprimé la pub, on ne fait rien pour ne pas planter

    if (!pubImage || !pubTitre || !pubBouton) return; 

    if (interet === 'Écologie/Science') {
        pubImage.src = 'img/grand_nord.jpg'; 
        pubTitre.innerText = 'Voyage Éco-Responsable';
        pubBouton.innerText = 'Découvrir';
        pubBouton.style.background = '#0077cc'; 
        logEvent('PUBLICITÉ CIBLÉE', 'Algorithme de vente : Tourisme Vert');
    }
    else if (interet === 'Économie/Crise') {
        pubImage.src = 'img/prix_electricite.jpg';
        pubTitre.innerText = 'Facture trop élevée ?';
        pubBouton.innerText = 'Panneaux Solaires';
        pubBouton.style.background = '#f1c40f'; 
        pubBouton.style.color = '#000'; 
        logEvent('PUBLICITÉ CIBLÉE', 'Algorithme de vente : Solaire');
    }
    else if (interet === 'Météo/Climat') {
        pubImage.src = 'img/vague_chaleur.jpg'; 
        pubTitre.innerText = 'Trop chaud chez vous ?';
        pubBouton.innerText = 'Climatiseurs en Promo';
        pubBouton.style.background = '#ff8800'; 
        pubBouton.style.color = '#fff';
        logEvent('PUBLICITÉ CIBLÉE', 'Algorithme de vente : Climatisation');
    }
}

// --- ÉTAPE FINALE : EXPORTATION DU FICHIER TXT ---
function genererFichierLogs() {
    const blob = new Blob([contenuLogsTxt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal_tracage_actutortue.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}