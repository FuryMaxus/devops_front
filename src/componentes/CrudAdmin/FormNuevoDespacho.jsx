import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormNuevoDespacho = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const jsonData = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion,
      intento: 0,
      idCompra: data.idCompra,
      direccionCompra: data.direccionCompra,
      valorCompra: data.valorCompra,
      despachado: false,
    };

    try {
      await axios.post("/api/v1/despachos", jsonData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      Swal.fire({
        title: "Orden de despacho creada 🚚!",
        text: "El despacho ha sido registrado con éxito en la base de datos",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      reset();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar la orden de despacho",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Nueva orden de despacho
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha de despacho</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("fechaDespacho", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Patente de camión</label>
          <input
            type="text"
            placeholder="Ingresa la patente del camión"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("patenteCamion", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Orden de compra asociada</label>
          <input
            type="number"
            placeholder="Ingresa el n° de orden de compra"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("idCompra", { required: true, valueAsNumber: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección de entrega</label>
          <input
            type="text"
            placeholder="Ingresa la dirección de entrega"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("direccionCompra", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Valor de compra</label>
          <input
            type="number"
            placeholder="Ingresa el valor de la compra"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("valorCompra", { required: true, valueAsNumber: true })}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14"
          type="submit"
        >
          Registrar orden de despacho
        </button>
      </form>
    </>
  );
};
