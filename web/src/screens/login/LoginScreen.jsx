import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { loginApi } from "../../services/training-services";
import { AuthContext } from "../../contexts/AuthContext";
import NavBarPageLogin from "../../components/navbar-page/NavBarPageLogin";
import Footer from "../../components/footer/Footer";

function LoginScreen() {
  const navigation = useNavigate();
  const value = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    loginApi(data)
      .then((data) => {
        value.setUser(data);
        navigation("/home");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };

  return (
    <>
      <NavBarPageLogin />
      <div className="mb-5 d-flex justify-content-center mt-5">
        <div className="d-flex align-content-center">
          <div className="bg-light p-4 border border-secondary rounded">
            <h2 className="p-2">
              Inicia sesión en StravaHack
            </h2>
            <p className="ms-2" style={{ fontSize: 13 }}>
              ¿Todavía no eres miembro?
              <Link to="/register"> Crea tu cuenta</Link>
            </p>
            <Form
              className="rounded p-4 p-sm-3"
              onSubmit={handleSubmit(handleLogin)}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introduzca e-mail"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
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
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </Form.Group>
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
                Al continuar, estás aceptando las Condiciones de uso y la
                Política de Privacidad <br></br>de StravaHack, incluyendo el uso de Cookies.
              </p>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginScreen;
