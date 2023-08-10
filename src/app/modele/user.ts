import { Controle } from "./Controle";

export interface User{
    id:number;
    login : string; 
    mdp: string
    pseudo?: string
    admin: Boolean
    controle ?: Controle[]
}
    