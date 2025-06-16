import React from "react";
import Agenda from "../components/Agenda";
import RechercheJPO from "../components/RechercheJPO";

const Home = () => (
  <div className="px-4 py-8 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Bienvenue sur JPO Connect</h1>
    <div className="mb-6">
      <RechercheJPO />
    </div>
    <Agenda />
  </div>
);

export default Home;
