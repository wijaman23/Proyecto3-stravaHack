import React from "react";
import Estadisticas from "../../components/estadisticas/Estadisticas";
import NavBarPage from "../../components/navbar-page/NavBarPage";
import TrainingList from "../../components/training/training-list/TrainingList";
import UserProfile from "../../components/user/user-profile/UserProfile";

function Home() {
  return (
    <div>
    <NavBarPage />
    <div className="d-flex container" style={{ marginTop: 70 }}>
      <div className="col-2 me-5" >
        <UserProfile />
        <Estadisticas />
      </div>
      <div className="col-5">
        <TrainingList />
      </div>
      <div className="col-3"></div>
    </div>
    </div>

  );
}

export default Home;
