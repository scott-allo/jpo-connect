import React from "react";
import EcoleMap from "../components/EcoleMap";

const ecoles = [
  { nom: "La Plateforme Marseille", lat: 43.2971, lng: 5.3699, adresse: "8 rue d'Hozier, Marseille" },
  { nom: "La Plateforme Cannes", lat: 43.5532, lng: 7.0174, adresse: "1 rue des Serbes, Cannes" },
  { nom: "La Plateforme Paris", lat: 48.8720, lng: 2.3146, adresse: "10 rue de Penthièvre, Paris" },
];

const Ecoles = () => (
  <div className="max-w-4xl mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6">Nos écoles</h1>
    {ecoles.map(ecole => (
      <div key={ecole.nom} className="mb-8 bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">{ecole.nom}</h2>
        <p className="mb-2">{ecole.adresse}</p>
        <EcoleMap nom={ecole.nom} lat={ecole.lat} lng={ecole.lng} />
      </div>
    ))}
  </div>
);

export default Ecoles;