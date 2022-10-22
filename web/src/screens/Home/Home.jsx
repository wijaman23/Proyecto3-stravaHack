import React from "react";
import Amigos from "../../components/amigos/Amigos";
import Estadisticas from "../../components/estadisticas/Estadisticas";
import NavBarPage from "../../components/navbar-page/NavBarPage";
import TrainingList from "../../components/training/training-list/TrainingList";
import UserProfile from "../../components/user/user-profile/UserProfile";
import { motion } from "framer-motion";

function Home() {
  return (
    <div>
      <NavBarPage />
      <div className="d-flex container" style={{ marginTop: 70 }}>
        <div className="col-3 position-fixed" style={{ width: 350 }}>
          <motion.div
            initial={{ x: -200, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <UserProfile />
          </motion.div>
          <motion.div
            initial={{ x: -200, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Estadisticas />
          </motion.div>
        </div>

        <div className="col-5" style={{ width: 550, marginLeft: 400 }}>
          <motion.div
            initial={{ y: 2000, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <TrainingList />
          </motion.div>
        </div>

        <div
          className="col-3 position-fixed"
          style={{ width: 350, marginLeft: 1000 }}
        >
          <motion.div
            initial={{ x: 200, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Amigos />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
