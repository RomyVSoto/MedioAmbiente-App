import React from "react";
import { IonSpinner } from "@ionic/react";
export default function Loader() {
  return (
    <div className="ion-text-center ion-padding">
      <IonSpinner name="crescent" />
    </div>
  );
}
