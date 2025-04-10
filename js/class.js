let ultimoIdDestino = 0;
let ultimoCliente = 0;
let ultimaReserva = 0;



// Usuario (Cliente), Destino y Reserva

class Administrador{
/**
 * 
 * @param {String} nombreDeUsuario 
 * @param {String} password 
 */
    constructor(nombreDeUsuario, password){
        this.nombreDeUsuario = nombreDeUsuario;
        this.password = password;
    }
}



class Cliente{
    /**
     * 
     * @param {String} nombre 
     * @param {String} apellido 
     * @param {String} nombreDeUsuario 
     * @param {String} password
     * @param {String} nroTarjeta 
     * @param {String} cvc
     * 
     */
    constructor(nombre, apellido, nombreDeUsuario, password, nroTarjeta, cvc){
        this.id = ultimoCliente++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreDeUsuario = nombreDeUsuario;
        this.password = password;
        this.nroTarjeta = nroTarjeta;
        this.cvc = cvc;
        this.saldo = 15000;
        this.millas = 0;
    }
}



class Destino{
    /**
     * 
     * @param {String} nombre 
     * @param {Number} precio 
     * @param {String} descripcion 
     * @param {String} url 
     * @param {Number} cupos 
     * @param {String} estado
     * @param {Boolean} oferta
     */
    constructor(nombre, precio, descripcion, url, cupos){
        this.id = `DEST_ID_${ultimoIdDestino++}`;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.url = url;
        this.cupos = cupos;
        this.estado = "activo";
        this.oferta = false;
    };
};


class Reserva{
    /**
     * 
     * @param {Number} cantidadDePersonas 
     * @param {Boolean} esConMillas 
     * @param {Destino} destino 
     * @param {Cliente} cliente 
     */

    
    constructor(cantidadDePersonas, esConMillas, destino, cliente){
        this.cantidadDePersonas = cantidadDePersonas;
        this.esConMillas = esConMillas;
        this.destino = destino;
        this.cliente = cliente;
        this.estado = "pendiente";
        this.pagoConDinero = 0;
        this.id = ultimaReserva++;

    };
};