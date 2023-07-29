export class User{
    id:number;
    nom:string='';
    prenom:string='';
    mpd:string='';
    mail:string='';
    login:string='';
    jeton: object={
        
    };
    constructor(nom:string, prenom:string, mdp:string, mail:string, login:string,id:number, jeton:{}){
        this.id= id;
        this.nom=nom;
        this.prenom= prenom;
        this.mpd = mdp;
        this.mail = mail;
        this.login = login;
        this.jeton=jeton;
    }
}
    