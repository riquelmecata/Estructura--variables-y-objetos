// definiendo array de productos
const productos = [];
// defino mi array de productos agregados
const productos_agregados = []; 

class Producto {
    constructor (id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// buscar el objeto
function buscarProducto(id) {
    return (productos.find(item => item.id === id) || null); 
}

function agregarProducto(producto) {
    productos_agregados.push(producto);
}

function eliminarProducto(id) {
    let pos = productos_agregados.findIndex(item => item.id === id);
}

// recorrer productos

function recorrerProductos() {
    let contenido_productos = "";
    for (let producto of productos) {
        contenido_productos += producto.id + ".- " + producto.nombre + " (x"+producto.cantidad+") $" + producto.precio + "\n";
    }

    return contenido_productos;
}

function recorrerProductosAgregados() {
    let contenido_productos = "";
    for (let producto of productos_agregados) {
        contenido_productos += producto.id + ".- " + producto.nombre + " (x"+producto.cantidad+") $" + producto.precio + "\n";
    }

    return contenido_productos;
}

// carga de productos 
let cargarProducto = true;

while (cargarProducto) {
    // defino los valores del producto
    let id_producto = productos.length + 1;
    let nombre_producto = prompt("Ingrese nombre del producto");
    let valor_producto = parseFloat(prompt("Ingrese valor del producto"));
    let cantidad_producto = parseFloat(prompt("Ingrese cantidad de productos"));
    let precio_producto = cantidad_producto * valor_producto;
    // creo mi Producto
    let producto = new Producto(id_producto, nombre_producto, precio_producto, cantidad_producto);
    console.log(producto);
    // agrego mi Producto al array productos
    productos.push(producto);
    console.log(productos);
    // preguntar si desea continuar agregando productos
    cargarProducto = confirm("¿Desea agregar más productos?");
}

// carga de productos agregados
cargarProducto = true;

while (cargarProducto) {
    let contenido_productos = recorrerProductos();

    //indica el id del producto
    let id_producto = parseInt(prompt("Seleccione el producto que desea comprar:\n" + contenido_productos));
    //buscar el producto
    let producto = buscarProducto(id_producto);
    //verificar si el producto seleccionado es valido
    if (producto != null) {
        //agregar el producto seleccionado para sumarlo
        agregarProducto(producto);
    } else {
        alert("Número no válido, intente nuevamente");
    }
    console.log(producto);
    //pregunta si desea continuar sumando productos
    cargarProducto = confirm("¿Desea comprar más productos?");
}

// eliminar produtos
cargarProducto = true;

while (cargarProducto) {
    let contenido_productos = recorrerProductosAgregados();
    //indica el id del producto
    let id_producto = parseInt(prompt("Vas a comprar estos productos, inserta un número si deseas eliminarlo: (0 - Ninguno)\n" + contenido_productos));
    if(id_producto >= 0) { // si el numero ingresado es mayor a 0 (1, 2, 3) se elimina ese producto
       eliminarProducto(id_producto);
    } else { // si el número ingresado no es mayor a 0
        alert("Número no válido, intente nuevamente");
    }
    if(id_producto === 0) {
        break;
    }
    
    //pregunta si desea eliminar otro producto
    cargarProducto = confirm("¿Desea eliminar otro producto?");
}

// imprimo el total de productos a sumar
let suma_total = 0;
let contenido_productos = "";

for (let prod of productos_agregados) {
    // nueva instancia de clase producto
    let producto = new Producto (prod.id, prod.nombre, prod.precio, prod.cantidad);
    contenido_productos += producto.id + ".- " + producto.nombre + " (x"+producto.cantidad+") $" + producto.precio + "\n";
    suma_total += producto.precio;
}


let cuotas = prompt("Vas a comprar los siguientes productos:\n\n" + contenido_productos + "\nPor un valor de $" + suma_total + "\n\nIngrese numero de cuotas (3 cuotas precio contado)");

const interes = 1.18; 

// si las cuotas son mayores a 3 se le agrega un interés
if(cuotas > 3) {
    suma_total = suma_total * interes;
    console.log(suma_total);
}

// si las cuotas son menores o igual a 3 es precio contado
if(cuotas <= 3) {
    suma_total = suma_total;
    console.log(suma_total);
}

// valor cuota
function sumarInteres(suma_total) {
    return suma_total / cuotas;
}

let valorCuota = sumarInteres(suma_total);
alert("Pagarás $"+valorCuota.toFixed(0)+ " mensuales por "+cuotas+ " meses");