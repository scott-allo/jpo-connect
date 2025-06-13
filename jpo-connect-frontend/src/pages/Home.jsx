import React from "react";
import Agenda from "../components/Agenda";
import RechercheJPO from "../components/RechercheJPO";

const Home = () => (
  <div>
    <h1>Bienvenue sur JPO Connect</h1>
    <RechercheJPO />
    <Agenda />
  </div>
);

export default Home;