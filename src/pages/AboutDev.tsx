import React from 'react';

export default function AboutDev() {
  return (
    <div className="ion-padding">
      <h2>Equipo de Desarrollo</h2>
      <div style={{display:'grid', gap:16}}>
        <div>
          <img src="/assets/dev/unnamed.jpg" alt="Romy" width={96} style={{borderRadius:'50%'}}/>
          <p><strong>Romy Valdez</strong> – Matrícula: 2023-0618</p>
          <p>Tel: <a href="tel:+1-809-000-0000">+1 829 791 1049</a></p>
          <p>Telegram: <a href="https://t.me/rvaldezz" target="_blank" rel="noreferrer">@rvaldezz</a></p>
        </div>
      </div>
    </div>
  );
}
