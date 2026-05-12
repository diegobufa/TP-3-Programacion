import { Rol } from "./Rol.js";
import { Usuario } from "./Usuario.js";
import { Pedido } from "./Pedido.js";
import { Producto } from "./Producto.js";
import { DetallePedido } from "./DetallePedido.js";

// Rol - Usuario
Rol.hasMany(Usuario, {
  foreignKey: "fk_rol",
});

Usuario.belongsTo(Rol, {
  foreignKey: "fk_rol",
});

// Usuario - Pedido
Usuario.hasMany(Pedido, {
  foreignKey: "fk_usuario",
});

Pedido.belongsTo(Usuario, {
  foreignKey: "fk_usuario",
});

// Pedido - DetallePedido
Pedido.hasMany(DetallePedido, {
  foreignKey: "fk_pedido",
});

DetallePedido.belongsTo(Pedido, {
  foreignKey: "fk_pedido",
});

// Producto - DetallePedido
Producto.hasMany(DetallePedido, {
  foreignKey: "fk_producto",
});

DetallePedido.belongsTo(Producto, {
  foreignKey: "fk_producto",
});