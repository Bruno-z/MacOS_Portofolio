const navLinks = [
    {
        id: 1,
        name: "Projets",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "CV",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: true,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "2017",
        title:
            "Développement d’une application de paris sportifs – Projet client réalisé à la Wild Code School",
        image: "/images/bet.png",
        link: "https://www.wildcodeschool.com/blog/application-de-paris-sportifs",
    },
    {
        id: 2,
        date: "2019",
        title:
            "Développement et publication de l’application e-commerce Sheepy Sport – Android et iOS (Swift) – Stage chez VeryWell",
        image: "/images/sheepy.png",
        link: "https://www.youtube.com/watch?v=QGmRVHc43Ww&feature=youtu.be&ab_channel=BRUNOZILIO",
    },
    {
        id: 3,
        date: "2019",
        title:
            "Développement du site e-commerce Esthelux – Stage chez VeryWell",
        image: "/images/esthelux.avif",
        link: "https://www.esthelux.fr/",
    },
    {
        id: 4,
        date: "2022",
        title:
            "Application mobile React Native – Pokedex interactif – Stage chez IN-TACT",
        image: "/images/pokedex.png",
        link: "https://www.loom.com/share/3110ff6691054c1ca754c0b3fb918b3c",
    },
    {
        id: 5,
        date: "2022",
        title:
            "Développement d’une API REST avec AdonisJS – Projet de fin de stage chez IN-TACT",
        image: "/images/cra.png",
        link: "https://www.loom.com/share/367fbf4bdddd415286d59688d71a62af",
    },
    {
        id: 6,
        date: "2022",
        title:
            "Clone Disney+ – Projet personnel pour approfondir React",
        image: "/images/disney.webp",
        link: "https://disney-ziliobruno.web.app/home",
    },
];



const techStack = [
    {
        category: "Frontend",
        items: [
            "React",
            "Next.js",
            "Angular",
            "TypeScript",
            "JavaScript",
            "HTML",
            "CSS",
            "Bootstrap",
            "Tailwind CSS",
            "Sass"
        ],
    },
    {
        category: "Mobile",
        items: [
            "React Native",
            "Expo",
            "Android",
            "Swift"
        ],
    },
    {
        category: "Backend & APIs",
        items: [
            "Node.js",
            "Express",
            "NestJS",
            "Hono",
            "Spring Boot",
            "PHP",
            "Java",
            "C#",
            "Perl"
        ],
    },
    {
        category: "Databases & BaaS",
        items: [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "Firebase"
        ],
    },
    {
        category: "Testing & Performance",
        items: [
            "JUnit",
            "Mockito",
            "Karma",
            "Gatling"
        ],
    },
    {
        category: "CMS & E-commerce",
        items: [
            "WordPress",
            "Magento"
        ],
    },
    {
        category: "DevOps & Tools",
        items: [
            "Git",
            "GitHub",
            "GitLab",
            "Docker"
        ],
    },
];


const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/Bruno-z/MacOS_Portofolio",
    },
    {
        id: 2,
        text: "Email",
        icon: "/icons/email.gif",
        bg: "#4bcb63",
        link: "mailto:bruno.zilio@email.com",
    },

    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/in/bruno-zilio-00b565143/",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Mes Hobbies",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Ma Musique",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Mes Jeux vidéos",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "Dessiner",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/doom.jpg",
        folderId: 3, // Jeux
    },
    {
        id: 2,
        img: "/images/diablo.jpg",
        folderId: 3, // Jeux
    },
    {
        id: 3,
        img: "/images/myth.jpg",
        folderId: 3, // Jeux
    },
    {
        id: 4,
        img: "/images/league.jpg",
        folderId: 3, // Jeux
    },
    {
        id: 5,
        img: "/images/world.png",
        folderId: 3, // Jeux
    },
    {
        id: 6,
        img: "/images/exile.jpg",
        folderId: 3, // Jeux
    },
    {
        id: 16,
        img: "/images/expedition.avif",
        folderId: 3, // Jeux
    },
    {
        id: 7,
        img: "/images/brejcha.avif",
        folderId: 2, //musique
    },
    {
        id: 8,
        img: "/images/queen.jpg",
        folderId: 2, //musique
    },
    {
        id: 9,
        img: "/images/zimmer.jpg",
        folderId: 2, //musique
    },
    {
        id: 10,
        img: "/images/linkin.jpg",
        folderId: 2, //musique
    },
    {
        id: 11,
        img: "/images/rammstein.jpg",
        folderId: 2, //musique
    },
    {
        id: 12,
        img: "/images/dessin1.jpeg",
        folderId: 4, //dessin
    },
    {
        id: 13,
        img: "/images/dessin2.jpeg",
        folderId: 4, //dessin
    },
    {
        id: 14,
        img: "/images/dessin3.jpeg",
        folderId: 4, //dessin
    },



];


export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Projets",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        {
            id: 100,
            name: "Mon travail professionnel",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5",
            windowPosition: "top-[5vh] left-5",
            children: [

                // 🛰 WOIS
                {
                    id: 5,
                    name: "SII/AIRBUS--WOIS",
                    icon: "/images/folder.png",
                    kind: "folder",
                    position: "top-10 left-5",
                    children: [
                        {
                            id: 1,
                            name: "Contexte du projet WOIS.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-40 left-40", // décalé à droite
                            description: `# 
                            
                            

**WOIS** pilote tout le processus, de la **commande à la livraison de l’image**,  
et sert d’**interface entre différents systèmes**.  
Il peut être déployé dans deux contextes : **MOC** et **DRS**.

---

## 🛰 Stations de réception

Pour récupérer les images satellites, différentes stations sont utilisées :

- **🏢 MOC (Main Operating Center) – Toulouse**  
  - Responsable des **opérations de programmation multi-missions**

- **🌐 GRS (Ground Receiving Stations) – trois types**  
  - Selon le cas, **toutes ou certaines opérations** sont réalisées au MOC

---

## 🛒 Parcours de commande

Via **IRS**, les clients peuvent commander deux types de produits :

- **📦 Produits d’archive**  
  - Images déjà acquises et **archivées dans les catalogues d’Airbus**

- **🚀 Produits de Tasking**  
  - Images futures à acquérir par le satellite  
  - Le client fournit :  
    - **Zone d’intérêt**  
    - **Période souhaitée**  
  - Le satellite capture ensuite l’**image demandée**`,
                        },
                        {
                            id: 2,
                            name: "Mission du projet WOIS.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-5 left-5",
                            description: `
**Missions réalisées**


- Développement d’un système de gestion des commandes et de livraison d’images satellites.

- Gestion d’environ 40 tickets de développement de complexités variées sur trois mois

- Création de champs dans différentes tables, développement des services REST correspondants, ajout des nouveaux champs à Elasticsearch et rédaction des tests unitaires (JUnit 5) et SOAPUI

- Uniformisation de plusieurs tables via des scripts Liquibase et correction des tests associés pour garantir la cohérence des données et fonctionnalités

- Ajout de nouvelles options de production : développement de contrôleurs et services pour gérer de nouveaux champs en table, avec tests unitaires et SOAPUI

- Refactorisation de méthodes et services pour améliorer l’architecture et l’uniformité du code

- Conception et implémentation de nouvelles façades MQService et consommateurs associés pour optimiser la communication inter-services

- Participation active aux campagnes de tests de non-régression, incluant l’exécution des tests SOAPUI, analyse des logs et résolution des tickets associés


**Technologies utilisées** :
 
 - Java Spring Boot, Maven, REST API, PGAdmin, Hibernate, Liquibase, Elasticsearch, GitLab, SOAPUI, JUnit 5, Sonar, Mockito, Squash  
`,
                        },
                        {
                            id: 3,
                            name: "Technologies du projet WOIS",
                            kind: "file",
                            fileType: "img",
                            position: "top-40 left-5",
                            icon: "/images/wois.png",
                            imageUrl: "/images/wois.png",
                        }
                    ],
                },

                // 🏢 WASAC
                {
                    id: 6,
                    name: "SII/ORANGE--WASAC",
                    icon: "/images/folder.png",
                    kind: "folder",
                    position: "top-50 left-5",
                    children: [
                        {
                            id: 1,
                            name: "Contexte du projet WASAC.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-40 left-5", // décalé à droite
                            description: `**Contexte WASAC – Cohésion d’équipe et apprentissages**

L'ambiance au sein de l’équipe était incroyable : il y avait beaucoup d’entraide, de rigolade et un véritable esprit de cohésion. Travailler avec cette équipe était un plaisir au quotidien, et j’ai beaucoup appris, notamment sur des langages que je ne pensais pas utiliser, comme Perl. Ce langage était nécessaire pour un projet ancien d’une vingtaine d’années, et j’ai apprécié relever ce défi.  

J’ai également beaucoup apprécié la partie support : nous avions une RGB et devions répondre aux tickets en moins d’une heure. Dans une journée, cela pouvait représenter une quinzaine à vingt tickets, parfois plus ou moins. Cette expérience m’a permis de progresser rapidement, en allant chercher les solutions dans le code et en développant ma connaissance du projet et mon efficacité dans le support.  

Malheureusement, le projet s’est arrêté pour moi à cause d’une réduction budgétaire : les derniers arrivés ont dû partir, et j’ai été redirigé vers le projet WOIS. Malgré cette déception, cette expérience a été très enrichissante et je reste toujours en contact avec mes anciens collègues.`,
                        },
                        {
                            id: 2,
                            name: "Mission du projet WASAC.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-5 left-5",
                            description: `
 
Système de gestion des configurations  d'équipement
pour des clients entreprise et grand comptes.  

**WASAC – Développeur / Support**

**Développement et suivi des User Stories**  
- Mener à bien des User Stories en respectant la qualité du code, les délais, les tests fonctionnels et le suivi via JIRA et GITLAB.  
- Réaliser la conception et la spécification des fonctionnalités.  
- Comprendre et résoudre les bugs issus des développements avant mise en production.  

**Support et maintenance**  
- Gérer le support et résoudre les tickets pour corriger les problèmes en production, en communiquant avec les utilisateurs et l’équipe.  
- Effectuer une analyse quotidienne des relevés ELASTIC et CENTREON pour anticiper les problèmes ou détecter des incohérences.  

**Mise en production (MEP)**  
- Participer aux processus de MEP deux fois par mois : tests des US livrées et tests fonctionnels généraux pour assurer la stabilité critique de WASAC.  
- Vérifier les Merge Requests, TAGs, et recréer la branche develop si nécessaire.  

**Processus et cohésion d’équipe**  
- Chiffrer les demandes et respecter les processus JIRA, SHAREPOINT, etc.  
- Participer activement à la vie du projet et proposer des améliorations pour renforcer l’efficacité et la cohésion de l’équipe. 
`,
                        },
                        {
                            id: 3,
                            name: "Noel chez WASAC",
                            kind: "file",
                            fileType: "img",
                            position: "top-50 left-40",
                            icon: "/images/wasac_1.jpeg",
                            imageUrl: "/images/wasac_1.jpeg",
                        }
                    ],
                },

                // ✈ Ocean / RangeDB
                {
                    id: 7,
                    name: "SII/AIRBUS--OCEAN",
                    icon: "/images/folder.png",
                    kind: "folder",
                    position: "top-10 left-40",
                    children: [
                        {
                            id: 1,
                            name: "Contexte du projet Ocean.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-10 left-40", // décalé à droite
                            description: `**Contexte projet junior – Collaboration Angular / Airbus**

Avant mon arrivée, deux autres développeurs de chez SII sur la partie Angular avaient quitté le projet, ce qui rendait la charge déjà importante pour l’équipe. J’étais alors junior et sans expérience professionnelle, ce qui compliquait davantage la gestion de la charge à la demande, surtout que nous n’étions plus que deux.  

Nous travaillions en collaboration avec une équipe d’Airbus qui gérait la partie Java. Nous avions des **dailies en anglais** pour coordonner avec leurs équipes basées en Europe (Angleterre et Allemagne).  

Cette expérience m’a permis d’apprendre beaucoup sur **Angular** et le travail en équipe internationale, ce que j’ai trouvé très enrichissant.  

Le projet s’est arrêté au bout de trois mois : mon collaborateur souhaitant partir, il n’était plus possible de gérer seul la charge, et le projet a été confié à une autre équipe. Malgré sa courte durée, cette mission a été très formatrice et m’a apporté une première expérience concrète dans le développement et la collaboration internationale.`,
                        },
                        {
                            id: 2,
                            name: "Mission du projet Ocean.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-5 left-5",
                            description: `
**Projet OCEAN – Développement Angular & Support**

**Contexte**  
L’objectif principal du projet était de préparer le remplacement futur de RangeDB. J’ai eu l’opportunité de travailler sur différents tickets, principalement en **Angular + RxJS**, pour créer de nouvelles fonctionnalités ou corriger des bugs signalés.  

**Développements et fonctionnalités**  

- **Moniteur de progression des traitements de données**  
  - Création d’une barre de progression affichant l’avancement des traitements dans la vue des résultats.  
  - Récupération des notifications via WebSocket pour mettre à jour la progression en temps réel.  

- **Rétablissement d’un ensemble de données à une révision spécifique**  
  - Ajout d’une option *“revenir à cette révision”* sur la vue de versionnement.  
  - Utilisation de \`DataProcessingService\` pour déclencher le traitement et de \`NotificationsService\` pour suivre l’état.  
  - Affichage d’un spinner pendant le traitement pour éviter les modifications concurrentes.  

**Tests et qualité**  
- Mise en place de tests unitaires avec **Karma & Harness**, visant une couverture proche de 80% avant fusion.  
- Scénarios de tests de charge avec **Gatling** pour simuler de nombreux utilisateurs simultanés.  
- Contrôle qualité via **SonarQube**, intégration continue avec **Jenkins**, et gestion du code avec **GitLab**.  

**Correction de bugs principaux**  
- IHM : suppression de fiches de contenu dans les rapports d’événement corrigée.  
- Formulaire de création de dataset : ajout de métadonnée ne réinitialisant plus la version.  
- UI Engine : création de couleurs d’objet dans une Box corrigée.  
- Paramètres composites : insertion correcte lorsque plusieurs valeurs sont sélectionnées.  
- CustomizationDiff : gestion des objets non résolus lors de la suppression ajustée.  
- Reversion de dataset : correction après migration pour restaurer le fonctionnement attendu.  
- Endpoints back-end : correction des erreurs 400 *bad request*.  

**Documentation et suivi**  
- Création de documentation pour chaque fonctionnalité dans **Confluence**.  
- Vérification de la cohérence de l’application après chaque mise à jour.  

**Technologies utilisées**  
Angular, RxJS, Karma, Jest, Jenkins, SonarQube, Java 11 (IntelliJ), Gatling, WebStorm, GitLab.
`,
                        },
                    ],
                },

                // 🏥 ARSEAA - VBA
                {
                    id: 8,
                    name: "ARSEAA--VBA",
                    icon: "/images/folder.png",
                    kind: "folder",
                    position: "top-50 left-45",
                    children: [
                        {
                            id: 1,
                            name: "Contexte du projet VBA.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-40 left-10", // décalé à droite
                            description: `**Contexte**  
Je suis arrivé sur le pôle le premier jour du confinement, en tant que remplaçant pour la gestion des stocks de cuisines. Rapidement, j’ai constaté que mes connaissances en développement pouvaient être utiles pour automatiser certaines tâches manuelles répétitives.  

**Premières actions**  
J’ai commencé par améliorer des fichiers Excel utilisés quotidiennement, comme les commandes de pain, et à automatiser des processus qui étaient effectués à la main chaque semaine.  

**Élargissement des responsabilités**  
Au fil du temps, mes responsabilités se sont élargies : j’ai participé à l’inventaire et à la gestion des masques FFP2. La direction, consciente de mes compétences en développement, m’a ensuite confié la gestion du magasin, en collaboration avec une personne en institution spécialisée.  

**Développement de l’outil VBA**  
C’est à ce moment-là que je me suis aperçu que certaines tâches, comme les bons de sortie et de livraison, prenaient beaucoup de temps car tout était fait manuellement. J’ai alors proposé d’améliorer les fichiers Excel existants en développant un outil VBA.  

**Résultats et impact**  
Pendant six mois, sur mon temps libre, j’ai travaillé sur cet outil qui est toujours utilisé aujourd’hui. Il permet de gagner de nombreuses heures par jour et facilite la gestion des stocks, la comptabilité et d’autres processus du magasin, tout en automatisant des tâches auparavant longues et répétitives. Je suis particulièrement fier de l’impact concret de ce projet.`,
                        },
                        {
                            id: 2,
                            name: "Mission du projet VBA.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-5 left-5",
                            description: `
**Missions réalisées**  
Développement d’un logiciel interne Excel VBA pour la gestion des stocks.  

- Gestion automatisée des stocks et inventaires  
- Création automatisée de bons de livraison  
- Calcul automatique de moyennes pondérées et des stocks  
- Génération de PDF de sortie  
- Gestion des accès utilisateurs par rôle  
- Logiciel toujours utilisé aujourd’hui  
`,
                        },
                        {
                            id: 3,
                            name: "Vidéo de mon logiciel VBA",
                            kind: "file",
                            fileType: "video",
                            position: "top-50 left-40",
                            videoUrl: "https://www.youtube.com/watch?v=TtEY1KPl8RY",
                            icon: "/images/thumbnailVBA.png",
                            description: `
Vidéo de démonstration du logiciel VBA développé pour le Pôle Pousinies Bordeneuve.
`,
                        },
                        {
                            id: 4,
                            name: "Témoignage de la directrice",
                            kind: "file",
                            fileType: "img",
                            position: "top-5 right-0",
                            icon: "/images/avis.png",
                            imageUrl: "/images/avis.png",
                        }
                    ],
                }
            ],
        },

        // 🚀 PROJETS PERSONNELS
        {
            id: 200,
            name: "Mes projets personnels",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-40",
            windowPosition: "top-[20vh] left-10",
            children: [
                {
                    id: 22,
                    name: "Site hommage à Arcane",
                    icon: "/images/folder.png",
                    kind: "folder",
                    position: "top-5 left-40",
                    children: [
                        {
                            id: 1,
                            name: "Contexte du projet Arcane.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-0 left-60", // décalé à droite
                            description: `**Projet Arcane – Site vitrine React**

L’idée du projet est née après avoir vu un site primé aux **WWW Awards**. J’ai voulu recréer des animations similaires tout en choisissant un sujet différent pour ne pas copier : la série **Arcane**, qui venait de sortir à l’époque, m’a particulièrement inspiré.  

Ce projet m’a permis de me lancer dans **React** et d’explorer d’autres technologies modernes, dans le but d’apprendre et de rester à jour techniquement.  

Bien que le projet ne soit pas encore terminé, il fait partie de mon portfolio et représente une expérience concrète d’auto-apprentissage et de création d’un site interactif à partir d’une idée personnelle.`,
                        },
                        {
                            id: 2,
                            name: "Mission du projet Arcane.txt",
                            icon: "/images/txt.png",
                            kind: "file",
                            fileType: "txt",
                            position: "top-5 left-5",
                            description: `
**Missions réalisées**  
Projet d’apprentissage : site vitrine inspiré de la série Arcane.  

- Création de composants React  
- Animations interactives  
- Travail sur le design et l’expérience utilisateur  
- Déploiement sur Netlify / Loom pour démonstration  
`,
                        },
                        {
                            id: 3,
                            name: "Vidéo du site Arcane (non fini à ce jour)",
                            kind: "file",
                            fileType: "video",
                            position: "top-50 left-40",
                            videoUrl: "https://www.youtube.com/watch?v=RkE44BWjVZA",
                            icon: "/images/arcaneThumb.png",
                            description: `
Vidéo de démonstration du site Arcane afin de rendre hommage à la série.
`,
                        },
                    ],
                },
            ],
        },
    ],
};;



const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "À propos",
    icon: "/icons/bruno.png",
    kind: "folder",
    children: [
        {
            id: 4,
            name: "A mon propos.txt",
            icon: "/icons/bruno.png",
            kind: "file",
            fileType: "txt",
            position: "top-30 left-20",
            subtitle: "Le développeur derrière le code",
            image: "/icons/bruno.png",
            description: `
Bonjour 👋  

Je m’appelle **Bruno Zilio**, développeur web passionné par la création de solutions fiables et performantes.

---

**Expérience**

Projets pour **Orange** et **Airbus** dans des environnements exigeants.

---

**Valeurs**

- Qualité du code  
- Travail en équipe  
- Communication  
- Cohésion  

---

Curieux et en constante évolution, je développe régulièrement des projets personnels.

Devenir récemment papa m’apporte la plus grande des motivations et une vision  sur le long terme 🚀

`,
        },
    ],
};



const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "CV",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Mon CV",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Poubelle",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [


        {
            id: 3,
            name: "Ancien Portfolio",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            position: "top-60 left-20",
            href: "https://zilio-bruno-portfolio.netlify.app/",
        },
    ],
};


export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    video: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    aboutmac: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };