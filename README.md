# La vie d'une goutte d'eau

## Contexte  
--- 

## Présentation du projet
Les données sont structurées autour des différentes étapes du cycle de vie d'une goutte d'eau. Elles sont présentées sous forme de graphiques et statistiques (pourcentages, cartes, diagrammes) pour faciliter la compréhension.  

### Structure des données :  
- Numéro de l'étape 
- Titre  
- Description
- Statistiques (sous forme de pourcentages, graphiques ou cartes)

## Étapes du cycle de l'eau  

### 1️⃣ Sources de l’eau  
[SVGW - Distribution de l'eau](https://www.svgw.ch/fr/eau/outils-de-communication/distribution-deau/)  
L'eau provient de trois sources principales :  
- Rivières  
- Lacs
- Nappes phréatiques

### 2️⃣ Traitement de l’eau  
[SVGW - L'eau potable](https://www.svgw.ch/fr/eau/outils-de-communication/distribution-deau/leau-potable/)  
- Passage à travers différentes couches du sol pour filtration naturelle  
- Traitement dans des stations de purification avant d’être distribuée  

### 3️⃣ Transport jusqu’au ménage  
[SVGW - Distribution](https://www.svgw.ch/fr/eau/outils-de-communication/distribution-deau/distribution/)  
- Acheminement par des réseaux de conduites sur plusieurs kilomètres  
- Raccordement aux infrastructures domestiques et industrielles  

### 4️⃣ Utilisation domestique  
[SVGW - Utilisation](https://www.svgw.ch/fr/eau/outils-de-communication/distribution-deau/utilisation/)  
L’eau est utilisée pour :  
- **Consommation** (boisson, cuisine)  
- **Hygiène** (douche, bain)  
- **Nettoyage** (vaisselle, lessive)  

### 5️⃣ Consommation d’eau par jour  
[Energie-Environnement - Consommation d'eau](https://www.energie-environnement.ch/economiser-l-eau/situer-sa-consommation-d-eau)  
- La goutte d'eau continue son chemin et tombe dans un verre  
- Statistiques sur la consommation moyenne d’eau par humain et par jour  

### 6️⃣ Évacuation et traitement des eaux usées  
[SVGW - Épuration des eaux usées](https://www.svgw.ch/fr/eau/outils-de-communication/distribution-deau/%C3%A9vacuation/epuration-des-eaux-us%C3%A9es/)  
- L'eau usée s’écoule dans les égouts  
- Passage en station d’épuration (STEP)  
- Traitement pour éliminer les polluants avant rejet  

### 7️⃣ Retour à la nature  
- Après traitement, l’eau est rejetée dans les lacs et rivières  
- Processus d’évaporation, formation de nuages et précipitations  
- Le cycle recommence 🌍  

## Description 
Les données que nous utiliserons seront organisées dans un fichier JSON structuré en plusieurs étapes, correspondant aux différentes phases de notre visualisation de données. 

Ce fichier JSON inclut un tableau cycle_eau, qui regroupe chaque étape sous forme d'objet. Chaque objet possède des attributs spécifiques permettant de structurer les informations nécessaires. 

Certaines visualisations afficheront uniquement du texte explicatif, tandis que d'autres intégreront des statistiques accompagnées de descriptions détaillées. 

### Exemple de code JSON
**Pour l'étape 1**
```{
  "etape": 1,
  "nom": "Sources de l’eau",
  "description": "La goutte d'eau atterrit dans l'une des trois sources naturelles.",
  "donnees": [
    {
      "nom": "Rivière",
      "description": "Cours d'eau naturel transportant l'eau de source vers les océans, lacs et nappes souterraines."
    },
    {
      "nom": "Lac",
      "description": "Vaste étendue d'eau douce ou salée stockant et régulant l'eau."
    },
    {
      "nom": "Nappe phréatique",
      "description": "Réserve souterraine d'eau alimentée par infiltration des précipitations."
    }
  ]
}
```
**Pour l'étape 4**
```{
  "etape": 4,
  "nom": "Sort d’un robinet et arrive au milieu du graphique des conso",
  "description": "L'eau est utilisée pour différentes consommations domestiques et industrielles.",
  "donnees": [
    {
      "nom": "Consommation moyenne par personne",
      "valeur": 150,
      "unite": "litres/jour",
      "description": "Un individu consomme en moyenne 150 litres d'eau par jour pour l'hygiène, l'alimentation et les tâches ménagères."
    }
  ]
}
```
### Attributs et types de données
**Pour l'étape 1**
| **Attribut**       | **Type de données** 
|--------------------|--------------------|
| `"etape"`         | Nombre entier       | 
| `"nom"`           | Chaîne de caractères | 
| `"description"`   | Chaîne de caractères | 
| `"donnees"`       | Tableau d’objets     | 
| → `"nom"`         | Chaîne de caractères |
| → `"description"` | Chaîne de caractères | 

**Pour l'étape 2**
| **Attribut**       | **Type de données** |
|--------------------|--------------------|
| `"etape"`         | Nombre entier       | 
| `"nom"`           | Chaîne de caractères | 
| `"description"`   | Chaîne de caractères | 
| `"donnees"`       | Tableau d’objets     |
| → `"nom"`         | Chaîne de caractères | 
| → `"valeur"`      | Nombre entier        | 
| → `"unite"`       | Chaîne de caractères | 
| → `"description"` | Chaîne de caractères | 


## But  
Ce projet vise à **expliquer et illustrer** le cycle de l’eau en Suisse en mettant en avant :  
✅ L’origine de l’eau potable  
✅ Le processus de purification et de distribution  
✅ La consommation et son impact  
✅ Le traitement des eaux usées  
✅ Le retour de l’eau à son état naturel  

Grâce à des infographies et visualisations interactives, l’objectif est de sensibiliser le public sur la gestion durable de l’eau.  

## Références  
Les principales sources utilisées sont :  
- [SVGW - Association Suisse du Gaz et de l’Eau](https://www.svgw.ch/)  
- [Energie-Environnement - Consommation d’eau](https://www.energie-environnement.ch/economiser-l-eau/situer-sa-consommation-d-eau)
- [État de Vaud](https://www.vd.ch/fileadmin/user_upload/themes/environnement/eau/fichiers_pdf/DIREV_PRE/Bilans_2023_de_l_%C3%A9puration_vaudoise.pdf

Ce projet s’inspire des recherches en gestion de l’eau en Suisse et des initiatives environnementales visant à mieux comprendre et préserver cette ressource essentielle.)  
