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
      <div className="col-3 me-3" >
        <UserProfile />
        <Estadisticas />
      </div>
      <div className="col-5">
        <TrainingList />
      </div>
      <div className="col-3 ms-3">
        <Amigos />
      </div>
    </div>
    </div>

  );
}

export default Home;
