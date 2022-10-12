import React from "react";
import NavBarPage from "../../../components/navbar-page/NavBarPage";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as trainingService from "../../../services/training-services";
import Select from "react-select";
import typeSports from "../../../data/typeSports";

function CreateTrainingScreen() {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleCreateTrainingSubmit = (data) => {
    console.log(data);
    trainingService
      .createTraining(data)
      .then((training) => navigation("/home"))
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
      <NavBarPage icon="" />
      <div
        className="d-flex align-items-center flex-column"
        style={{ marginTop: 70 }}
      >
        <div className="p-5">
          <h2 style={{  }}>Crear entrenamiento</h2>
        </div>
        <form onSubmit={handleSubmit(handleCreateTrainingSubmit)}>
          <div>
            <div className="mb-5">
              <Controller
                name="typeSports"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <div>
                    <div>
                      <h5>Deporte</h5>
                    </div>
                    <div className="input-group mb-1"></div>
                    <Select
                      className="form-control p-0"
                      value={typeSports.find(
                        (typeSport) => typeSport.value === value
                      )}
                      onBlur={onBlur}
                      options={typeSports}
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: 0,
                        }),
                      }}
                    />
                    {errors.typeSports && (
                      <div className="invalid-feedback">
                        {errors.typeSports.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <label>Distancia</label>
            <div className="input-group mb-1">
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Training title..."
                {...register("title", {
                  required: "Titulo es requerido",
                  maxLength: {
                    value: 100,
                    message: "Title must be <= 100 chars",
                  },
                })}
              />
              <span className="input-group-text">Kilometros</span>
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>
          </div>
        </form>

        <div className="d-grid mt-2">
          <button className="btn btn-primary" type="submit" disabled={!isValid}>
            Crear entrenamiento
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateTrainingScreen;
