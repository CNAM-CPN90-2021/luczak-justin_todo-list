import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonCheckbox, IonIcon, IonSegment, IonSegmentButton, IonBadge, IonActionSheet, IonAlert } from '@ionic/react';
import React from 'react';
import './Home.css';
import { useToDoList } from '../hooks/useToDoList';
import { useState } from "react";
import { create, trash, close } from 'ionicons/icons';


const Home: React.FC = () => {

  const { addItem, listItems, toggleItem, removeAllItems, counterTodo, removeCounterTodo, addCounterTodo, removeItem, modifieItem } = useToDoList();

  // texte à ajouter pour un nouvel item
  const [text, setText] = useState<any>();

  // état du tri de la liste
  let [segmentValue, setSegmentValue] = useState('all');

  let [showActionSheet, setShowActionSheet] = useState(false);

  let [showModifieAlert, setShowModifieAlert] = useState(false);

  let [itemToModifie, setItemToModifie] = useState<number>();

  const displayItems = (value) => {

    // afficher un message différent si la liste est vide
    if (listItems.length === 0) {
      return <IonItem><IonLabel>Félicitation votre liste est vide</IonLabel></IonItem>
    }


    else {

      // afficher tous les items
      if (value === 'all') {


        return listItems.map((item) => {
          if (item != undefined && item.checked === false) {
            return (

              <IonItem key={item.id}>
                <IonCheckbox slot="start" color="primary" checked={item.checked} onIonChange={(e) => {
                  toggleItem(item.id)
                  removeCounterTodo()
                }} />
                <IonLabel className={item.checked ? 'checked' : ''}>{item.text}</IonLabel>

                <IonButton onClick={() => {
                  setShowActionSheet(true)
                  setItemToModifie(item.id)
                }}><IonIcon icon={create} color="light" slot="end" /></IonButton>


                <IonActionSheet
                  isOpen={showActionSheet}
                  onDidDismiss={() => setShowActionSheet(false)}
                  cssClass='my-custom-class'
                  buttons={[{
                    text: 'Supprimer',
                    role: 'destructive',
                    icon: trash,
                    handler: () => {
                      removeItem(itemToModifie)
                    }
                  },
                  {
                    text: 'Modifier',
                    icon: create,
                    handler: () => {
                      setShowModifieAlert(true)
                    }
                  }, {
                    text: 'Annuler',
                    icon: close,
                    role: 'cancel',
                    handler: () => {
                      console.log('Annuler');
                    }
                  }]}
                >
                </IonActionSheet>



                <IonAlert
                  isOpen={showModifieAlert}
                  onDidDismiss={() => setShowModifieAlert(false)}
                  message={'Renommez votre tâche'}
                  header={'Prompt!'}
                  inputs={[
                    {

                      name: 'text',
                      type: 'text',
                      placeholder: 'Nouveau nom de la tâche',
                      id: 'textToChange',

                    }]}
                  buttons={[
                    {
                      text: 'Annuler',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel');
                      }
                    },
                    {
                      text: 'Valider',
                      handler: data => {
                        modifieItem(itemToModifie, data.text)
                      }
                    }
                  ]}
                />
              </IonItem>
            )
          }

          else if (item != undefined) {
            return (
              <IonItem key={item.id}>
                <IonCheckbox slot="start" color="primary" checked={item.checked} onIonChange={(e) => {
                  toggleItem(item.id)
                  addCounterTodo()
                }} />
                <IonLabel className={item.checked ? 'checked' : ''}>{item.text}</IonLabel>

                <IonButton onClick={() => {
                  setShowActionSheet(true)
                  setItemToModifie(item.id)
                }}><IonIcon icon={create} color="light" slot="end" /></IonButton>


                <IonActionSheet
                  isOpen={showActionSheet}
                  onDidDismiss={() => setShowActionSheet(false)}
                  cssClass='my-custom-class'
                  buttons={[{
                    text: 'Supprimer',
                    role: 'destructive',
                    icon: trash,
                    handler: () => {
                      removeItem(itemToModifie)
                    }
                  },
                  {
                    text: 'Modifier',
                    icon: create,
                    handler: () => {
                      setShowModifieAlert(true)
                    }
                  }, {
                    text: 'Annuler',
                    icon: close,
                    role: 'cancel',
                    handler: () => {
                      console.log('Annuler');
                    }
                  }]}
                >
                </IonActionSheet>

                <IonAlert
                  isOpen={showModifieAlert}
                  onDidDismiss={() => setShowModifieAlert(false)}
                  message={'Renommez votre tâche'}
                  header={'Prompt!'}
                  inputs={[
                    {

                      name: 'text',
                      type: 'text',
                      placeholder: 'Nouveau nom de la tâche',
                      id: 'textToChange',

                    }]}
                  buttons={[
                    {
                      text: 'Annuler',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel');
                      }
                    },
                    {
                      text: 'Valider',
                      handler: data => {
                        modifieItem(itemToModifie, data.text)
                      }
                    }
                  ]}
                />
              </IonItem>
            )
          }

        }
        )
      }

      // afficher les items non-checké
      else if (value === 'unchecked') {
        return (
          listItems.map((item) => {
            if (item != undefined && item.checked === false) {
              return (
                < IonItem key={item.id} >
                  <IonCheckbox slot="start" color="primary" checked={item.checked} onIonChange={(e) => {
                    toggleItem(item.id)
                    removeCounterTodo()
                  }} />
                  <IonLabel className={item.checked ? 'checked' : ''}>{item.text}</IonLabel>

                  <IonButton onClick={() => {
                    setShowActionSheet(true)
                    setItemToModifie(item.id)
                  }}><IonIcon icon={create} color="light" slot="end" /></IonButton>


                  <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    cssClass='my-custom-class'
                    buttons={[{
                      text: 'Supprimer',
                      role: 'destructive',
                      icon: trash,
                      handler: () => {
                        removeItem(itemToModifie)
                      }
                    },
                    {
                      text: 'Modifier',
                      icon: create,
                      handler: () => {
                        setShowModifieAlert(true)
                      }
                    }, {
                      text: 'Annuler',
                      icon: close,
                      role: 'cancel',
                      handler: () => {
                        console.log('Annuler');
                      }
                    }]}
                  >
                  </IonActionSheet>

                  <IonAlert
                    isOpen={showModifieAlert}
                    onDidDismiss={() => setShowModifieAlert(false)}
                    message={'Renommez votre tâche'}
                    header={'Prompt!'}
                    inputs={[
                      {

                        name: 'text',
                        type: 'text',
                        placeholder: 'Nouveau nom de la tâche',
                        id: 'textToChange',

                      }]}
                    buttons={[
                      {
                        text: 'Annuler',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                          console.log('Confirm Cancel');
                        }
                      },
                      {
                        text: 'Valider',
                        handler: data => {
                          modifieItem(itemToModifie, data.text)
                        }
                      }
                    ]}
                  />
                </IonItem >
              )
            }
          }))
      }
    }

  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To do list</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">To do list</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment onIonChange={e => setSegmentValue(e.detail.value)}>
          <IonSegmentButton value="all">
            <IonLabel>Tout</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="unchecked">
            <IonLabel>À faire <IonBadge color="primary">{counterTodo}</IonBadge></IonLabel>

          </IonSegmentButton>
        </IonSegment>


        <IonList>
          {
            displayItems(segmentValue)
          }
        </IonList>


        <IonItem>
          <IonButton color="primary" type="submit" onClick={() => { removeAllItems() }}>Vider totalement la liste</IonButton>
        </IonItem>



        <IonItem>
          <IonInput placeholder="Qu'avez-vous en tête ?" inputmode="text" clearInput autofocus required onIonChange={e => { setText(e.detail.value); }}></IonInput>
          <IonButton color="primary" type="submit" onClick={() => { addItem(text) }}>Créer</IonButton>
        </IonItem>



      </IonContent>


    </IonPage>
  );
};



export default Home;