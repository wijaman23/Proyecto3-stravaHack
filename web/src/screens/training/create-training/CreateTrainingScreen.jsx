import React from "react";
import NavBarPage from "../../../components/navbar-page/NavBarPage";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as trainingService from "../../../services/training-services";
import Select from "react-select";
import typesports from "../../../data/typesports";
import maps from "../../../data/maps";
import Footer from "../../../components/footer/Footer";

function CreateTrainingScreen() {
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleCreateTrainingSubmit = (data) => {
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
      <div className="bg-white" style={{ marginTop: 70 }}>
        <hr />
      </div>
      <div className="d-flex align-items-center flex-column bg-white">
        <div className="p-3">
          <h2 style={{}}>Crear entrenamiento</h2>
        </div>
        <form onSubmit={handleSubmit(handleCreateTrainingSubmit)}>
          <div>
            <div className="mb-5" style={{ width: 700 }}>
              <Controller
                name="typesports"
                control={control}
                render={({ field }) => (
                  <div>
                    <div>
                      <h5>Deporte</h5>
                    </div>
                    <div className="input-group mb-1"></div>
                    <Select
                      className="form-control p-0"
                      value={typesports.find(
                        (typesport) => typesport.value === field.value
                      )}
                      onChange={(typesports) =>
                        field.onChange(typesports.value)
                      }
                      onBlur={field.onBlur}
                      options={typesports}
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: 0,
                        }),
                      }}
                    />
                    {errors.typesports && (
                      <div className="invalid-feedback">
                        {errors.typesports.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <hr className="mb-5" />
            <div className="d-flex">
              <div>
                <label className="mb-1">Distancia</label>
                <div className="input-group mb-1" style={{ width: 200 }}>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.distance ? "is-invalid" : ""
                    }`}
                    {...register("distance", {
                      required: "Distancia es requerido",
                      min: {
                        value: 0,
                        message: "Minima distancia mayor 0 metros",
                      },
                    })}
                  />
                  <span className="input-group-text" style={{ width: 100 }}>
                    {watch("typesports") === "natacion"
                      ? "Metros"
                      : "Kilometros"}
                  </span>
                  {errors.distance && (
                    <div className="invalid-feedback">
                      {errors.distance.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-5">
                <label className="mb-1">Duracion</label>
                <div className="input-group mb-5" style={{ width: 200 }}>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.duration ? "is-invalid" : ""
                    }`}
                    {...register("duration", {
                      required: "Duración es requerido",
                      min: {
                        value: 0,
                        message: "Minimo tiempo mayor 0 minutos",
                      },
                    })}
                  />
                  <span className="input-group-text" style={{ width: 100 }}>
                    Minutos
                  </span>
                  {errors.duration && (
                    <div className="invalid-feedback">
                      {errors.duration.message}
                    </div>
                  )}
                </div>
              </div>
              {watch("typesports") === "natacion" ? (
                ""
              ) : (
                <div>
                  <label className="mb-1">Altitud</label>
                  <div className="input-group mb-5" style={{ width: 200 }}>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.altitude ? "is-invalid" : ""
                      }`}
                      {...register("altitude", {})}
                    />
                    <span className="input-group-text" style={{ width: 100 }}>
                      Metros
                    </span>
                    {errors.altitude && (
                      <div className="invalid-feedback">
                        {errors.altitude.message}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="mb-1">Titulo</label>
              <div className="input-group mb-5" style={{ width: 500 }}>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", {
                    required: "Titulo es requerido",
                  })}
                />

                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>
            </div>
            <div className="mb-5" style={{ width: 200 }}>
              <Controller
                name="maps"
                control={control}
                render={({ field }) => (
                  <div>
                    <div>
                      <label className="mb-1">Ciudad</label>
                    </div>
                    <div className="input-group mb-1"></div>
                    <Select
                      className="form-control p-0"
                      value={maps.find(
                        (maps) => maps.value === field.value
                      )}
                      onChange={(maps) =>
                        field.onChange(maps.value)
                      }
                      onBlur={field.onBlur}
                      options={maps}
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: 0,
                        }),
                      }}
                    />
                    {errors.maps && (
                      <div className="invalid-feedback">
                        {errors.maps.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label className="mb-1">Descripción</label>
              <div className="input-group mb-1">
                <input
                  style={{ fontSize: 13 }}
                  type="text"
                  placeholder="¿Cómo te fue? Comparte más detalles sobre tu actividad"
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  {...register("description", {
                    required: "Descripcion es requerido",
                  })}
                />

                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-grid mt-2 d-flex">
            <button
              className="btn btn-primary mt-2 mb-5 me-3"
              style={{ width: 80 }}
              type="submit"
              disabled={!isValid}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateTrainingScreen;
