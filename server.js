/*PROJECT TIME : Basket 
Création d’un panier minimaliste
Le panier sera matérialisé en javascript par un tableau d'objet.
Chaque objet représentera un vêtement acheté.
La panier devra être gérée totalement par un serveur web.*/

/*Step
- Création d’un serveur web
- Création d’une variable nommée « productList»  qui va contenir un tableau listant plusieurs noms d'articles.
La difficulté dans cet exercice est que l'on souhaite enregistrer en plus le prix et la taille de chaque article.
Chaque article enregistré dans le tableau pourra être définit sous forme d'objet javascript possédant les propriétés et valeur suivantes:
- Remplir ce tableau avec les articles suivants:     
        nom: pull, prix : 75€, taille: L
        nom: tshirt, prix : 23€, taille: S
        nom: bermuda, prix : 34€, taille: XS         
- Parcourir le panier avec une boucle pour pouvoir accéder à chaque article et afin de les envoyer au navigateur.*/

/* Warning
- Attention pour envoyer une information au navigateur le serveur doit utiliser la méthode res.write() en mettant dans les parenthèses la valeur à envoyer.
- Il est possible d’utiliser plusieurs fois à la suite la méthode res.write()
- Ce projet mixe l'utilisation de tableau et d'objet Javascript. Lorsque vous allez parcourir le tableau pour envoyer les informations de tous les articles, il vous faudra accéder aux différents éléments du tableau en utilisant leur position mais également accéder aux valeurs des objets grâce aux propriétés.
- Ne pas oublier d’initialiser la communication avec le navigateur grâce à  la méthode res.writeHead(200) et de terminer la communication en utilisant la méthode res.end();
- res.end() doit s’utiliser en dernier car après l’avoir exécuté vous ne pourrez plus utiliser res.write()*/

/*Allons plus loin
Ajouter un nouvel article au travers une communication navigateur / serveur
L’envoie d’information entre le client (navigateur) et le serveur se fera par l’URL
Ne pas oublier d’installer les modules « url » et « querystring »  côté serveur permettant d’exploiter les informations envoyées par le navigateur.
-------------------------------------------------------------------------------------------------------------------------------------------------------*/

var http = require("http");
var url  = require("url");
var querystring = require("querystring");

var productList = [
  {nom : "PULL &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; : &nbsp;", taille: " l", prix: 75, quantite: 10},  // les propriétés nom, taille et prix
  {nom : "TSHIRT &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;", taille: " s", prix: 23, quantite:  2},
  {nom : "BERMUDA &nbsp;: &nbsp;", taille: "xs", prix: 34, quantite:  1}  
];
        
var server = http.createServer(
  function(req, res) {  
    var urlQuery  = url.parse(req.url).query;
    var params = querystring.parse(urlQuery);           // méthode "querystring.parse()" chaine de requete pour récuperer le résultat dans une variable "params"
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    
    
    if(params.action == "add") {                        // On test si la valeur de la propriété "params.action" est égale à la valeur "add" params = ensemble des propriétés tailles, prix...
      productList.push(params);
    }
    
    if(params.action == "update") {                     // On test si la valeur de la propriété "params.action" est égale à la valeur "update"
     
          if(params.property == "prix") {               // On accede à un élément du tableau qui corespond à la position envoyée via l'URL via la proporiété "params.position"
            productList[params.position].prix = params.value;   
          }                                             // Puis on on remplace l'ancienne valeur de "prix" par la valeur de la proporiété "params.value"

          if(params.property == "nom") {                // On test si la valeur de la propriété "params.property" est égale à la valeur "nom"
            productList[params.position].nom = params.value; 
          }                                             // Même technique que pour mettre à jour le prix.

          if(params.property == "taille") {
            productList[params.position].taille = params.value;
          }
          if(params.property == "quantite") {
            productList[params.position].quantite++;
          }
    }
    

    for(var i=0; i<productList.length; i++) {
      // On accede à l'élément situé à la position i (valeur du compteur) et lit chacunes des 
      // propriétés de l'article (nom, taille, prix) pour les 
      // envoyer au navigateur grace à la méthode res.write();                                                           // en rouge : permet d'ajouter des quantités à l'aide d'un bouton +
      res.write(productList[i].nom+" / Taille : "+productList[i].taille+" / Prix unitaire : "+productList[i].prix+" €/ quantité disponible : "+productList[i].quantite+" / <span id='"+i+"'><a href=\"./?action=update&property=quantite&position="+i+"\">+</a></span> <br> ");
 
    }
    res.end();                                          
  }
);

server.listen(8083);