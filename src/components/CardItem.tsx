import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

export default function CardItem({
  title,
  subtitle,
  content,
}: {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
}) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        {subtitle && <small>{subtitle}</small>}
      </IonCardHeader>
      <IonCardContent>{content}</IonCardContent>
    </IonCard>
  );
}
