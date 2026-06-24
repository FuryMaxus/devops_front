import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { TableCompras } from "./TableCompras";
import { TableDespachos } from "./TableDespachos";
import { Modal } from "./Modal";
import { FormNuevaVenta } from "./FormNuevaVenta";
import { FormNuevoDespacho } from "./FormNuevoDespacho";

export const PruebaCards = () => {
  const [tablaCompras, setTablaCompras] = useState(false);
  const [tablaOrdenes, setTablaOrdenes] = useState(false);
  const [openModalVenta, setOpenModalVenta] = useState(false);
  const [openModalDespacho, setOpenModalDespacho] = useState(false);

  return (
    <section>
      <div className="flex justify-center">
        <CardComponent
          title="Consultar Ordenes de compra 💰"
          description="Revisa las últimas oc realizadas para generar su despacho"
          buttonText="Consultar"
          onClick={() => {
            setTablaCompras(true);
            setTablaOrdenes(false);
          }}
        />
        <CardComponent
          title="Revisar Ordenes de despacho 🚚"
          description="Consulta los despachos realizados, modifica los registros de intentos o cierra la orden"
          buttonText="Consultar"
          onClick={() => {
            setTablaCompras(false);
            setTablaOrdenes(true);
          }}
        />
      </div>

      <div className="flex justify-center">
        <CardComponent
          title="Nueva Orden de compra ➕💰"
          description="Registra una nueva orden de compra en el sistema"
          buttonText="Agregar orden de compra"
          onClick={() => setOpenModalVenta(true)}
        />
        <CardComponent
          title="Nueva Orden de despacho ➕🚚"
          description="Registra una nueva orden de despacho en el sistema"
          buttonText="Agregar orden de despacho"
          onClick={() => setOpenModalDespacho(true)}
        />
      </div>

      <section>
        {tablaCompras && <TableCompras />}
        {tablaOrdenes && <TableDespachos />}
      </section>

      <Modal open={openModalVenta} onClose={() => setOpenModalVenta(false)}>
        {openModalVenta && (
          <FormNuevaVenta onClose={() => setOpenModalVenta(false)} />
        )}
      </Modal>

      <Modal
        open={openModalDespacho}
        onClose={() => setOpenModalDespacho(false)}
      >
        {openModalDespacho && (
          <FormNuevoDespacho onClose={() => setOpenModalDespacho(false)} />
        )}
      </Modal>
    </section>
  );
};
