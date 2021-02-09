import { useStorage } from '@capacitor-community/react-hooks/storage';
import { verify } from 'crypto';
import { useEffect, useState } from 'react';



export function useToDoList() {

    const { get, set, remove } = useStorage();

    let listStocked = [];

    console.log('listSotcked après appel de la fonction : ', listStocked)

    let [listItems, updateList] = useState(listStocked);

    //Pour initialiser la liste stockées en local
    function getStockedList() {
        get('listTodo').then((listJson) => {
            if (listJson != null) {
                listStocked = JSON.parse(listJson);

                updateList(listStocked)
            }
        })
    }

    useEffect(() => {
        getStockedList()
    }, [])



    function addItem(text) {

        let lengthList = listItems.length - 1



        const newItem = {
            id: lengthList++,
            text: text,
            checked: false
        }

        const newTable = listItems.concat([newItem])

        set('listTodo', JSON.stringify(newTable))
        updateList(newTable)
    }

    function toggleItem(id) {
        const updatedList = listItems.map(item => {
            if (item.id === id) {
                item.checked = !item.checked
            }
            return item
        })

        set('listTodo', JSON.stringify(updatedList))
        updateList(updatedList)
    }


    return {
        listItems, addItem, toggleItem
    }

}