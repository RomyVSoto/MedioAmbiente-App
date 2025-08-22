import React from "react";
export default function Empty({ text = "Sin datos" }) {
  return <p className="ion-text-center ion-padding">{text}</p>;
}
