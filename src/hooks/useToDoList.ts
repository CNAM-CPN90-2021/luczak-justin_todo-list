import { useStorage } from '@capacitor-community/react-hooks/storage';
import { verify } from 'crypto';
import { useState } from 'react';

let counter = 0

export function useToDoList() {


    let [listItems, updateList] = useState([]);

    function addItem(text) {
        const newItem = {
            id: counter++,
            text: text,
            checked: false
        }

        const newTable = listItems.concat([newItem])

        updateList(newTable)
    }

    function toggleItem(id) {
        const updatedList = listItems.map(item => {
            if (item.id === id) {
                item.checked = !item.checked
            }
            return item
        })

        updateList(updatedList)
    }


    return {
        listItems, addItem, toggleItem
    }

}