import { useStorage } from '@capacitor-community/react-hooks/storage';
import { useEffect, useState } from 'react';



export function useToDoList() {

    const { get, set, remove } = useStorage();

    let listStocked = [];

    let [listItems, updateList] = useState(listStocked);

    // compteur tâches à faire
    let [counterTodo, setCounterTodo] = useState(0);

    function getCounterTodo() {
        get('counterTodo').then((number) => {
                setCounterTodo(parseInt(number))  
        })
    }

    useEffect(() => {
        getCounterTodo()
    }, [])

    function addCounterTodo() {
        let count = counterTodo 
        count = count + 1
        setCounterTodo(count)
        set('counterTodo', JSON.stringify(count))
    }

    function removeCounterTodo() {
        let count = counterTodo
        count = count - 1
        setCounterTodo(count)
        set('counterTodo', JSON.stringify(count))
    }

    //Pour initialiser la liste stockées en local
    function getStockedList() {
        get('listTodo').then((listJson) => {
            if (listJson != null) {
                listStocked = JSON.parse(listJson);

                updateList(listStocked)
            }
        })
    }

    // appeler la fonction une seule fois pour initialiser les items stockés en local
    useEffect(() => {
        getStockedList()
    }, [])

    // fonction pour ajouter des items à la liste
    function addItem(text) {

        // on prépare l'id pour le nouvel objet en prenant le dernier id du tableau actuel et on retire 1 pour débuter à la bonne valeur 
        let lengthList = listItems.length - 1

        const newItem = {
            id: lengthList++,
            text: text,
            checked: false
        }

        const newTable = listItems.concat([newItem])


        addCounterTodo()

        // on ajoute le nouveau tableau au sotckage en local
        set('listTodo', JSON.stringify(newTable))

        // on update la liste en mémoire
        updateList(newTable)
    }

    function toggleItem(id) {
        const updatedList = listItems.map(item => {
            if (item.id === id) {
                item.checked = !item.checked
            }
            return item
        })

        // on ajoute les nouvelles valeurs dans le tableau stocké en local
        set('listTodo', JSON.stringify(updatedList))

        // on update les nouvelles valeurs en mémoire
        updateList(updatedList)
    }

    // fonction pour retirer tous les items de la liste
    function removeAllItems() {

        // on enlève la liste stockée en local
        remove('listTodo');

        // on vide la liste stockée en mémoire
        updateList([]);

        set('counterTodo', JSON.stringify(0));

        setCounterTodo(0);
    }



    return {
        listItems, addItem, toggleItem, removeAllItems, counterTodo, setCounterTodo, removeCounterTodo, addCounterTodo
    }

}