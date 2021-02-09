import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonCheckbox, IonIcon, IonSegment, IonSegmentButton } from '@ionic/react';
import React from 'react';
import './Home.css';
import { useToDoList } from '../hooks/useToDoList';
import { useState } from "react";
import { create } from 'ionicons/icons';
//import { setConstantValue } from 'typescript';

const Home: React.FC = () => {

  const { addItem, listItems, toggleItem, removeAllItems } = useToDoList();
  const [text, setText] = useState<any>();


  const displayItems = () => {

    if (listItems.length === 0) {
      return <IonItem><IonLabel>Félicitation votre liste est vide</IonLabel></IonItem>
    }


    else {

      return listItems.map((item) => (

        <IonItem key={item.id}>
          <IonCheckbox slot="start" color="primary" checked={item.checked} onIonChange={(e) => { toggleItem(item.id) }} />
          <IonLabel className={item.checked ? 'checked' : ''}>{item.text}</IonLabel>

          <IonIcon icon={create} color="primary" slot="end" />
        </IonItem>
      ))
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

        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="all">
            <IonLabel>Tout</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="unchecked">
            <IonLabel>À faire</IonLabel>
          </IonSegmentButton>
        </IonSegment>


        <IonList>
          {
            displayItems()
          }
        </IonList>


        <IonItem>
          <IonButton color="primary" type="submit" onClick={() => { removeAllItems() }}>Vider totalement la liste</IonButton>
        </IonItem>



        <IonItem>
          <IonInput placeholder="Qu'avez-vous en tête ?" clearInput autofocus required onIonChange={e => { setText(e.detail.value); }}></IonInput>
          <IonButton color="primary" type="submit" onClick={() => { addItem(text) }}>Créer</IonButton>
        </IonItem>



      </IonContent>


    </IonPage>
  );
};



export default Home;
