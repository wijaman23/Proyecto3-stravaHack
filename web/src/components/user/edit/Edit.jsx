import React, { useEffect, useContext } from "react";
import NavBarPage from "../../../components/navbar-page/NavBarPage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../../contexts/AuthContext";

import * as trainingService from "../../../services/training-services"
import Footer from "../../../components/footer/Footer";

function Edit() {
  const navigation = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = `${user.name}`;
    defaultValues.lastname = `${user.lastname}`;
    defaultValues.city = `${user.city}`;
    defaultValues.img = `${user.img}`;
    reset({ ...defaultValues });
  }, []);

  const handleEditUserSubmit = (user) => {
    console.log(user.id);
    trainingService
      .editUser(user.id, user)
      .then((user) => navigation(`/user/${user.id}/training`))
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
      <NavBarPage />
      <div className="d-flex flex-column align-items-center container" style={{ marginTop: 70 }}>
        <div className="mt-5 mb-5">
          <h2>Editar perfil</h2>
        </div>
        <div>
          <Form
            className="rounded p-4 p-sm-3"
            onSubmit={handleSubmit(handleEditUserSubmit)}
          >
            <div className="">
              <div className="d-flex">
                <Form.Group className="mb-3 me-1" controlId="formBasicPassword">
                  <Form.Label>
                    {" "}
                    <strong>Nombre</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <strong>Apellidos</strong>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    className={`form-control ${
                      errors.lastname ? "is-invalid" : ""
                    }`}
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">
                      {errors.lastname.message}
                    </div>
                  )}
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  <strong>Ciudad</strong>
                </Form.Label>

                <Form.Control
                  type="text"
                  className={`form-control ${
                    errors.lastname ? "is-invalid" : ""
                  }`}
                  {...register("city")}
                  style={{ width: 250 }}
                  placeholder="Ciudad"
                />
                {errors.lastname && (
                  <div className="invalid-feedback">
                    {errors.lastname.message}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  <strong>Imagen</strong>
                </Form.Label>
                <div className="d-flex justify-content-center">
                  <img
                    src={user.img}
                    alt="user"
                    className="img-fluid rounded-circle my-2"
                    style={{ maxWidth: 300 }}
                  />
                </div>
                <div>
                  
                </div>
                <Form.Label>
                  <strong>URL</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`form-control ${
                    errors.lastname ? "is-invalid" : ""
                  }`}
                  {...register("img")}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">
                    {errors.lastname.message}
                  </div>
                )}
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
            <Button
              className="mb-3"
              variant="primary"
              type="submit"
              disabled={!isValid}
            >
              Actualizar
            </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Edit;






