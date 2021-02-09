import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonCheckbox, IonIcon } from '@ionic/react';
import React from 'react';
import './Home.css';
import { useToDoList } from '../hooks/useToDoList';
import { useState } from "react";
import { create } from 'ionicons/icons';
//import { setConstantValue } from 'typescript';

const Home: React.FC = () => {

  const { addItem, removeAllItems, tableLocal, initializeItems2d, changeState } = useToDoList();
  const [text, setText] = useState<any>();
  initializeItems2d();

  const [checkboxState, setcheckboxState] = useState<any>();

  const isLined = (event: boolean) => {
    //console.log(event);

    //probleme ou return le composent ? -> passer par un setState

    if (event === true) {
      console.log(true)
      //return <IonLabel className={'lined'}>{ valueTo }</IonLabel>
      return 'lined'
    } else if (event === false) {
      console.log(false)
      //return <IonLabel className={'unlined'}>{ valueTo }</IonLabel>

      return 'unlined'
    }

  }

  const initaleState = (value: boolean) => {

    if (checkboxState === undefined) {
      setcheckboxState(value)
      return checkboxState
    } else { return checkboxState }

  }

  const changeStateOn = (index: any, state: any) => {
    console.log('avant', checkboxState)
    setcheckboxState(!state)
    changeState(index, checkboxState)
    console.log('apres',checkboxState)
  }

  const displayItems = () => {

    if (tableLocal[0] === "vide") {
      return <IonItem><IonLabel>Félicitation votre liste est vide</IonLabel></IonItem>
    }



    else {

      return tableLocal.map((value, index) => (

        

        //Il faut l'appeler sur le parent et non pas sur l'enfant

        //LE PROBLEME EST QUE L'ETAT N'EST PAS PROPRE A L'ENFANT IL EST COMMUN AUX DEUX

        <IonItem key={index}>
          <IonCheckbox slot="start" color="primary" checked={value[1]} onIonChange={(e) => {
            //setcheckboxState([index, e.detail.checked])
            changeState(index, e.detail.checked)
          }} />
          <IonLabel className={isLined(value[1])}>{value[0]}</IonLabel>

          <IonIcon icon={create} color="primary" slot="end" />
        </IonItem>
      ))
    }
  }

  //utiliser un setState ou le state checkboxState


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


        <IonList>
          {
            displayItems()
          }
        </IonList>


        <IonItem>
          <IonButton color="primary" href='' type="submit" onClick={() => removeAllItems()}>Vider totalement la liste</IonButton>
        </IonItem>



        <IonItem>
          <IonInput placeholder="Qu'avez-vous en tête ?" clearInput autofocus required onIonChange={e => { setText(e.detail.value); }}></IonInput>
          <IonButton color="primary" href='' type="submit" onClick={() => { addItem(text) }}>Créer</IonButton>
        </IonItem>



      </IonContent>


    </IonPage>
  );
};



export default Home;
