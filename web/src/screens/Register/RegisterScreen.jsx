import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import NavBarPageLogin from "../../components/navbar-page/NavBarPageLogin";
import Footer from "../../components/footer/Footer";

import * as trainingService from "../../services/training-services";

function RegisterScreen() {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleCreateTrainingSubmit = (user) => {
    console.log(user);
    trainingService
      .createUser(user)
      .then((user) => navigation("/login"))
      .catch((error) => {
        if (error.response?.user?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.user.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };

  return (
    <>
      <NavBarPageLogin />
      <div className="d-flex justify-content-center my-5">
        <div className="d-flex align-content-center">
          <div className="bg-light p-3 border border-secondary rounded">
            <h2 className=" d-flex justify-content-center p-2 mb-4">
              Crea una cuenta StravaHack
            </h2>
            <p className="ms-4" style={{ fontSize: 13 }}>
              ¿Ya eres miembro?
              <Link to="/login"> Inicia sesion</Link>
            </p>
            <Form
              className="rounded p-4 p-sm-3"
              onSubmit={handleSubmit(handleCreateTrainingSubmit)}
            >
              <div className="d-flex">
              <Form.Group className="mb-3 me-5" controlId="formBasicPassword">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduzca nombre"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("name", {
                    required: "Nombre es requerido",
                  })}
                  style={{ width: 250 }}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduzca apellidos"
                  className={`form-control ${
                    errors.lastname ? "is-invalid" : ""
                  }`}
                  {...register("lastname", {
                    required: "Apellidos son requeridos",
                  })}
                  style={{ width: 250 }}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">
                    {errors.lastname.message}
                  </div>
                )}
              </Form.Group>
              </div>
              <div className="d-flex">
                <Form.Group className="mb-3 me-5" controlId="formBasicEmail">
                  <Form.Label>Correo electronico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduzca e-mail"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "Correo es requerido",
                    })}
                    style={{ width: 250 }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Introduzca contraseña"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Contraseña es requerida",
                    })}
                    style={{ width: 250 }}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </Form.Group>
              </div>
              <Button
                className="mb-3"
                variant="primary"
                type="submit"
                disabled={!isValid}
              >
                Iniciar sesión
              </Button>
              <hr></hr>
              <p style={{ fontSize: 10 }}>
                Al continuar, estás aceptando las Condiciones de Uso y
                la Política de Privacidad de StravaHack, incluyendo el uso de<br></br>
                Cookies.
              </p>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterScreen;
