# aos-demo1.0
Demo AOS 1.0 By Med Raed BESBES
Cette demo contient :
1- le projet source. (dossier AOSDemoRaed1.0)
2- un fichier pdf contenant la description de l'application et les pré-requits de configuration et d'execution. (Sous dossier Uilities Demo)
3- un fichier readMe (txt).
4- une exportation (json) de la collection postman pour l'execution de l'application. (Sous dossier Uilities Demo)

PS : Il est possible d'executer l'appliation :
1- avec docker.
2- sans docker :
a- avec la commande "npm i" sous le dossier "AOSDemoRaed1.0"
b- et pour lancer le serveur : npm run dev
Dans les deux cas il faut s'assurer que le serveur a commencé à ecouter, puis éxecuter l'api 
GET localhost:3000/v1/imports une fois au debut. (comme indiqué dans le fichier PDF).

Message que le serveur écoute est : { message: 'server running on port : 3000', level: 'info' }

NB: Si la connexion vers la base a renvoyé un timeout c'est que le container app a été demarré avant le container mongo, 
il suffit alors de redemarrer le container app. 