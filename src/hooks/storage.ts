import { useStorage } from '@capacitor-community/react-hooks/storage';
import { verify } from 'crypto';

let tableLocal: any[] = [];

export function useToDoList() {


    const { get, set, remove } = useStorage();

    //Pour initialiser la liste stockées en local et la stocker sur la liste temporaire
    const initializeItems2d = () => {
        get('todos2d').then((valueInitial2d) => {
            if (valueInitial2d != null) {
                tableLocal = JSON.parse(valueInitial2d)
            } else {
                tableLocal = ['vide']
            }
        })
    }

    //Pour ajouter des items et les sauvegarder en local : 
    const addItem = (itemValue: string) => {

        if (itemValue === undefined) {
            return
        }

        if (tableLocal[0] === 'vide') {
            tableLocal = []
        }

        // je fais le tableau en 2 dimensions afin de stocker l'état
        tableLocal.push([itemValue, false])
        remove('todos2d')
        set('todos2d', JSON.stringify(tableLocal))
    }

    //Pour changer l'état d'une entrée
    const changeState = (key: number, state: any) => {
        
        if (state === false) {
            console.log("au début", tableLocal[key])
            const line = tableLocal[key]
            line[1] = false
            tableLocal[key] = line
            console.log("après", tableLocal[key])
        }

        else {
            console.log("au début", tableLocal[key])
            const line = tableLocal[key]
            line[1] = true
            tableLocal[key] = line
            console.log("après", tableLocal[key])
        }
        remove('todos2d')
        set('todos2d', JSON.stringify(tableLocal))


    }

    //Pour retirer tous les items stockés dans la liste : 
    const removeAllItems = () => {

        remove('todos2d')
        tableLocal = ['vide']
    }

    return {
        addItem, removeAllItems, tableLocal, initializeItems2d, changeState
    }

}