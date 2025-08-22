import React from 'react';

export default function AboutUs() {
  return (
    <div className="ion-padding">
      <h2>Sobre Nosotros</h2>
      <p>Misión: Proteger y gestionar los recursos naturales de la República Dominicana.</p>
      <p>Visión: Un país sostenible y resiliente ante el cambio climático.</p>
      <div style={{ position:'relative', paddingTop:'56.25%' }}>
        <iframe
          title="Video Institucional"
          src="https://www.youtube.com/embed/HLXC-MoIlEg"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:0 }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
