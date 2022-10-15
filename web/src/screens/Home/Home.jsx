import React from "react";
import Amigos from "../../components/amigos/Amigos";
import Estadisticas from "../../components/estadisticas/Estadisticas";
import NavBarPage from "../../components/navbar-page/NavBarPage";
import TrainingList from "../../components/training/training-list/TrainingList";
import UserProfile from "../../components/user/user-profile/UserProfile";

function Home() {
  return (
    <div>
        <NavBarPage />
      <div className="d-flex container" style={{ marginTop: 70 }}>
        <div className="col-3 position-fixed" style={{ width: 350 }}>
          <UserProfile />
          <Estadisticas />
        </div>
        <div className="col-5" style={{ width: 550, marginLeft: 400}}>
          <TrainingList />
        </div>
        <div className="col-3 position-fixed" style={{ width: 350, marginLeft: 1000 }}>
          <Amigos />
        </div>
      </div>
    </div>
  );
}

export default Home;
