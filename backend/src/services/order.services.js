import { sequelize } from "../db.js";
import { Pedido } from "../../models/Pedido.js";
import { DetallePedido } from "../../models/DetallePedido.js";
import { Producto } from "../../models/Producto.js";
import { Usuario } from "../../models/Usuario.js";

const ESTADOS_VALIDOS = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

const includePedido = [
  {
    model: DetallePedido,
    include: [Producto],
  },
];

const normalizarPedido = (pedido) => {
  const plain = pedido?.get ? pedido.get({ plain: true }) : pedido;
  const detallesOriginales = plain?.detalle_pedidos ?? plain?.detalles ?? [];

  return {
    ...plain,
    detalles: detallesOriginales.map((detalle) => ({
      ...detalle,
      producto: detalle.product ?? detalle.producto ?? null,
    })),
  };
};

export const findOrders = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: includePedido,
      order: [["fecha_pedido", "DESC"]],
    });

    res.json(pedidos.map(normalizarPedido));
  } catch (error) {
    console.log("Error al obtener pedidos:", error);
    res.status(500).json({ message: "No se pudieron obtener los pedidos" });
  }
};

export const findOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id, {
      include: includePedido,
    });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(normalizarPedido(pedido));
  } catch (error) {
    console.log("Error al obtener pedido:", error);
    res.status(500).json({ message: "No se pudo obtener el pedido" });
  }
};

export const findOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const pedidos = await Pedido.findAll({
      where: { fk_usuario: userId },
      include: includePedido,
      order: [["fecha_pedido", "DESC"]],
    });

    res.json(pedidos.map(normalizarPedido));
  } catch (error) {
    console.log("Error al obtener pedidos del usuario:", error);
    res.status(500).json({ message: "No se pudieron obtener los pedidos del usuario" });
  }
};

export const createOrder = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const {
      fk_usuario,
      direccion_envio,
      provincia_envio,
      localidad_envio,
      detalles,
    } = req.body;

    if (!fk_usuario || !direccion_envio || !provincia_envio || !localidad_envio) {
      await transaction.rollback();
      return res.status(400).json({ message: "Faltan datos obligatorios del pedido" });
    }

    if (!Array.isArray(detalles) || detalles.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: "El pedido debe tener al menos un producto" });
    }

    const usuario = await Usuario.findByPk(fk_usuario);

    if (!usuario) {
      await transaction.rollback();
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const numeroPedido = `PED-${Date.now()}`;

    const pedido = await Pedido.create(
      {
        numero_pedido: numeroPedido,
        estado: "pendiente",
        direccion_envio,
        provincia_envio,
        localidad_envio,
        fk_usuario,
      },
      { transaction }
    );

    const detallesCreados = [];

    for (const item of detalles) {
      const cantidad = Number(item.cantidad);
      const productoId = Number(item.fk_producto);

      if (!productoId || !Number.isFinite(cantidad) || cantidad <= 0) {
        await transaction.rollback();
        return res.status(400).json({ message: "Datos inválidos en el detalle del pedido" });
      }

      const producto = await Producto.findByPk(productoId, { transaction });

      if (!producto) {
        await transaction.rollback();
        return res.status(404).json({ message: `Producto ${productoId} no encontrado` });
      }

      if (!producto.disponibilidad) {
        await transaction.rollback();
        return res.status(400).json({
          message: `El producto ${producto.nombre} no está disponible para la venta`,
        });
      }

      const stockActual = Number(producto.stock);

      if (cantidad > stockActual) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}`,
        });
      }

      const nuevoStock = stockActual - cantidad;
      const precioUnitario = Number(producto.precio);
      const subtotal = precioUnitario * cantidad;

      detallesCreados.push({
        cantidad,
        precio_uni: precioUnitario,
        precio_subtotal: subtotal,
        fk_pedido: pedido.id,
        fk_producto: producto.id,
      });

      await producto.update(
        {
          stock: nuevoStock,
          disponibilidad: nuevoStock > 0 ? producto.disponibilidad : false,
        },
        { transaction }
      );
    }

    await DetallePedido.bulkCreate(detallesCreados, { transaction });
    await transaction.commit();
    transaction = null;

    const pedidoCompleto = await Pedido.findByPk(pedido.id, {
      include: includePedido,
    });

    res.status(201).json(normalizarPedido(pedidoCompleto));
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log("Error al crear pedido:", error);
    res.status(500).json({ message: "No se pudo crear el pedido" });
  }
};

export const updateOrderStatus = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { id } = req.params;
    const { estado } = req.body;

    if (!ESTADOS_VALIDOS.includes(estado)) {
      await transaction.rollback();
      return res.status(400).json({ message: "Estado de pedido inválido" });
    }

    const pedido = await Pedido.findByPk(id, { transaction });

    if (!pedido) {
      await transaction.rollback();
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const estadoAnterior = pedido.estado;

    if (estadoAnterior === estado) {
      await transaction.commit();
      transaction = null;

      const pedidoSinCambios = await Pedido.findByPk(id, {
        include: includePedido,
      });

      return res.json(normalizarPedido(pedidoSinCambios));
    }

    const detallesPedido = await DetallePedido.findAll({
      where: { fk_pedido: id },
      include: [Producto],
      transaction,
    });

    // Si el pedido se cancela, se devuelve el stock al ABM de productos.
    if (estado === "cancelado" && estadoAnterior !== "cancelado") {
      for (const detalle of detallesPedido) {
        const producto = detalle.product;

        if (!producto) continue;

        const stockRestaurado = Number(producto.stock ?? 0) + Number(detalle.cantidad ?? 0);

        await producto.update(
          {
            stock: stockRestaurado,
            disponibilidad: true,
          },
          { transaction }
        );
      }
    }

    // Si un pedido cancelado vuelve a activarse, se vuelve a reservar el stock.
    if (estadoAnterior === "cancelado" && estado !== "cancelado") {
      for (const detalle of detallesPedido) {
        const producto = detalle.product;
        const cantidad = Number(detalle.cantidad ?? 0);
        const stockActual = Number(producto?.stock ?? 0);

        if (!producto || !producto.disponibilidad || stockActual < cantidad) {
          await transaction.rollback();
          return res.status(400).json({
            message: `No hay stock suficiente para reactivar el pedido. Producto: ${producto?.nombre ?? detalle.fk_producto}`,
          });
        }

        const nuevoStock = stockActual - cantidad;

        await producto.update(
          {
            stock: nuevoStock,
            disponibilidad: nuevoStock > 0 ? producto.disponibilidad : false,
          },
          { transaction }
        );
      }
    }

    await pedido.update({ estado }, { transaction });

    await transaction.commit();
    transaction = null;

    const pedidoActualizado = await Pedido.findByPk(id, {
      include: includePedido,
    });

    res.json(normalizarPedido(pedidoActualizado));
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    console.log("Error al actualizar estado:", error);
    res.status(500).json({ message: "No se pudo actualizar el estado del pedido" });
  }
};
