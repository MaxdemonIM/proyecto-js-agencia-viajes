class Sistema {
  constructor() {
    this.administradores = new Array();
    this.clientes = new Array();
    this.destinos = new Array();
    this.reservas = new Array();
  
    //Esto maneja la sesion actual
    this.usuarioLogueado = null;
    this.esAdmin = false;
  }



    
  login(nombreDeUsuario, pass) {
    let i = 0;
    let usuario = null;
    let esAdmin = false;
      
    while (i < this.clientes.length && usuario === null) {
      if (this.clientes[i].nombreDeUsuario === nombreDeUsuario && this.clientes[i].password === pass) {
      usuario = this.clientes[i];
      }
      i++;
    };
      
      
    if(usuario === null){
      let j = 0;
      while (j < this.administradores.length && usuario === null) {
        if (this.administradores[j].nombreDeUsuario === nombreDeUsuario && this.administradores[j].password === pass) {
          usuario = this.administradores[j];
          esAdmin = true;
        }
        j++;
      };
    };
    this.usuarioLogueado = usuario;
    this.esAdmin = esAdmin;
    return usuario;
    };
    

  logout(){
    this.usuarioLogueado = null;
    this.esAdmin = false;
  };



    /**
     * Siempre que queramos guardar un cliente,
     * lo hacemos a traves de sistema.guardarCliente......
     * no usar directamente el new Cliente
     */
    /**
   *
   * @param {String} nombre
   * @param {String} apellido
   * @param {String} nombreDeUsuario
   * @param {String} pass
   * @param {String} nroTarjeta
   * @param {String} cvc
   * @returns
   */
  guardarCliente(nombre, apellido, nombreDeUsuario, pass, nroTarjeta, cvc) {
    let unCliente = new Cliente(nombre, apellido, nombreDeUsuario, pass, nroTarjeta, cvc);
    this.clientes.push(unCliente);
    return unCliente;
  };

  /**
   *
   * @param {String} nombre
   * @param {Number} precio
   * @param {String} descripcion
   * @param {String} url
   * @param {Number} cupos
   * @param {Booelan} oferta
   * @returns
   */

  guardarDestinos(nombre, precio, descripcion, url, cupos) {
    let unDestino = new Destino(nombre, precio, descripcion, url, cupos);
    this.destinos.push(unDestino);
    return unDestino;
  };


  guardarCambiosDestino(index, nombre, precio, descripcion, url, cupos, oferta) {
    this.destinos[index].nombre = nombre;
    this.destinos[index].precio = precio;
    this.destinos[index].descripcion = descripcion;
    this.destinos[index].url = url;
    this.destinos[index].cupos = cupos;
    this.destinos[index].oferta = oferta;
    return this.destinos[index]
  }
    
  /**
   *
   * @param {Number} cantidadDePersonas
   * @param {Boolean} esConMillas
   * @param {String} idDestino
   * @returns
   */
  ordenarReservaDestino(cantidadDePersonas, esConMillas, idDestino) {
    let unDestino = this.buscarDestinoPorId(idDestino);
    let unaReserva = new Reserva(cantidadDePersonas, esConMillas, unDestino, this.usuarioLogueado);
    this.reservas.push(unaReserva);
    return unaReserva;
  };

  /**
 * Reduce los cupos de la sala
 * @param {Destino} Destino
 * @param {Number} cantidadCuposAReducir
 */
  reducirCuposSala(destino, cantidadCuposAReducir) {
    destino.cupos -= cantidadCuposAReducir;
  };


  /**
   * Busca un cliente segun el id, retorna null si no lo encuentra
   * @param {Number} idCliente
   * @returns Cliente
   */
  buscarClientePorId(idCliente) {
    let clienteEncontrado = null;
    let i = 0;
    while (i < this.clientes.length && clienteEncontrado === null) {
      let item = this.clientes[i];
      if (item.id == idCliente) {
        clienteEncontrado = item;
      }
      i++;
    };
    return clienteEncontrado;
  };
    
  /**
   * Este metodo busca un destino segun el id, retorna null si no lo encuentra
   * @param {String} idDestino
   * @returns
   */
  buscarDestinoPorId(idDestino) {
    let destinoEncontrado = null;
    let i = 0;
    while (i < this.destinos.length && destinoEncontrado === null) {
      let item = this.destinos[i];
      if (item.id === idDestino) {
        destinoEncontrado = item;
      }
      i++;
    };
    return destinoEncontrado;
  };

  existeCliente(usuario){
    let i = 0;
    let existeCliente = false;

    while(i < this.clientes.length && existeCliente === false){
      let item = this.clientes[i];
      if(item.nombreDeUsuario.trim().toUpperCase() === usuario.trim().toUpperCase()){
        existeCliente = true;
      }
      i++
    };
    return existeCliente;
  };

  existeDestino(nombre){
    let i = 0;
    let existeDestino = false;

    while(i < this.destinos.length && existeDestino === false){
      let item = this.destinos[i];
      if(item.nombre.trim().toUpperCase() === nombre.trim().toUpperCase()){
        existeDestino = true;
      }
      i++
    };
    return existeDestino;
  };


  existeDestinoExluyendoNombre(nombreDestino, nombreDestinoActual){
    let i = 0;
      let existeDestino = false;

      while (i < this.destinos.length && !existeDestino) {
        let item = this.destinos[i];
        let nombreItem = item.nombre.trim().toUpperCase();
        if (
          nombreItem === nombreDestino.trim().toUpperCase() &&
          nombreItem !== nombreDestinoActual.trim().toUpperCase()
        ) {
          existeDestino = true;
        }
        i++;
      }

      return existeDestino;
  };


  cambiarPrecioDestinoEnOferta(){
    for(let i = 0; i < this.destinos.length; i++){
      if(this.destinos[i].oferta === true){
        //en oferta = 10% menos

        this.destinos[i].precio = Math.floor(this.destinos[i].precio * 0.9);
      };
    };
  }

  //desactiva destinos sin cupos
  cambiarEstadoDestinoSinCupos(){
    for(let i = 0; i < this.destinos.length; i++){
      if(this.destinos[i].cupos === 0){
        this.destinos[i].estado = "inactivo";
      };
    };
  };


  /**
   * Cambia el estado de las reservas segun el caso, posteriormente calculando los datos a cargar en los clientes y destinos y retorna
   * el resultado .
   * 
   * @param {String} idReserva 
   * @param {String} estadoObjetivo 
   * @returns 
   */
  cambiarEstadoReserva(idReserva, estadoObjetivo) {
    let reserva = this.obtenerReservaPorId(idReserva);

    // 100 pesos generan 1 milla

    if (estadoObjetivo === "Cancelada") {
      reserva.estado = "Cancelada";
      return "La reserva fue cancelada con éxito";
    } else if (estadoObjetivo === "Aprobada") {
      let precio = reserva.destino.precio * reserva.cantidadDePersonas;
      let esConMillas = reserva.esConMillas;
      let saldoDelCliente = reserva.cliente.saldo;
      let millasDelCliente = reserva.cliente.millas;

      let millasGeneradas = 0;

        //cupos insuficientes
      if (reserva.destino.cupos < reserva.cantidadDePersonas) {
        reserva.estado = "Cancelada";
        return "La reserva fue cancelada por falta de cupos";
      }

        //millas suficientes
      if (esConMillas && precio <= millasDelCliente){
        reserva.cliente.millas = millasDelCliente - precio
        this.reducirCuposSala(reserva.destino, reserva.cantidadDePersonas);
        this.comprobarReservasDeDestinos(reserva.destino);
        reserva.estado = "Aprobada";
        return "La reserva fue Aprobada";

        //millas insuficientes pero millas + saldo suficiente
      }else if (esConMillas && precio>millasDelCliente && millasDelCliente + saldoDelCliente >= precio){
        millasGeneradas = (precio - millasDelCliente) / 100
        saldoDelCliente -= precio - millasDelCliente;
        reserva.pagoConDinero = precio - millasDelCliente;
        reserva.cliente.millas = millasGeneradas;
        reserva.cliente.saldo = saldoDelCliente;
        this.reducirCuposSala(reserva.destino, reserva.cantidadDePersonas);
        this.comprobarReservasDeDestinos(reserva.destino);
        reserva.estado = "Aprobada";
        return "La reserva fue Aprobada";

        //sin millas saldo suficiente
      } else if (!esConMillas && saldoDelCliente>=precio){
        millasGeneradas = precio / 100
        reserva.cliente.millas += millasGeneradas;
        reserva.pagoConDinero = saldoDelCliente - precio;
        reserva.cliente.saldo = saldoDelCliente - precio;
        this.reducirCuposSala(reserva.destino, reserva.cantidadDePersonas);
        this.comprobarReservasDeDestinos(reserva.destino);
        reserva.estado = "Aprobada";
        return "La reserva fue Aprobada";

        //saldo suficiente
      } else {
        reserva.estado = "Cancelada";
        return "La reserva fue cancelada por falta de saldo";
      }
    };
  };

  //recorre array y retorna reservas en estado pendiente

  obtenerReservasPendientes() {
    let reservasPendientes = new Array();

    for (let i = 0; i < this.reservas.length; i++) {
      let item = this.reservas[i];

      if (item.estado === "pendiente") {
        reservasPendientes.push(item);
      };
    };
    return reservasPendientes;
  };

  /**
   * 
   * @param {Destino} destino 
   */

  comprobarReservasDeDestinos(destino) {
    let cuposDisponbiles = destino.cupos;

    for (let i = 0; i < this.obtenerReservasPendientes(); i++) {
      let item = this.reservas[i];

      if (cuposDisponbiles < item.cantidadDePersonas && item.destino.idDestino === destino.idDestino) {
        this.cambiarEstadoReserva(item.id, "Cancelada");
      };
    };
  };

  obtenerReservaPorId(idReserva) {
    let reserva = null;
    let i = 0;
    while (i < this.reservas.length && reserva === null) {
      let item = this.reservas[i];
      if (item.id == idReserva) {
        reserva = item;
      };
      i++;
    };
    return reserva;
  };

/**
 *  Recibe el id de un destino, recorre el array reservas y devuelve las ganancias generadas por dicho destino
 * @param {String} idDestino 
 * @returns ganancias generadas
 */

  obtenerGananciaDeDestino(idDestino) {
    let gananciaGenerada = 0;
    
    for (let i = 0; i < this.reservas.length; i++) {
      let reserva = this.reservas[i];
      if (reserva.estado == "Aprobada" && reserva.destino.id == idDestino) {
        gananciaGenerada = reserva.pagoConDinero;
      };
    };
    return gananciaGenerada;
  };

/**
 * Recibe idDe destino, recorre buscando reservas aprobadas y retorna cantidad de dicha reserva
 * @param {String} idDestino 
 * @returns Cantidad de clientes que reservaron el destino
 */
  obtenerClientesDeReservaAprobada(idDestino) {
    let clientes = 0;

    for (let i = 0; i < this.reservas.length; i++) {
      let reserva = this.reservas[i];
      if (reserva.estado === "Aprobada" && reserva.destino.id === idDestino) {
        clientes+= reserva.cantidadDePersonas;
      };
    };
    return clientes;
  };


  precargarDatosObligatorio() {
    this.precargarAdministradores();
    this.precargarClientes();
    this.precargarDestinos();
    this.precargarReservas();
  }

  precargarAdministradores() {
    this.administradores.push(new Administrador("admin1", "adminpass1"));
    this.administradores.push(new Administrador("admin2", "adminpass2"));
    this.administradores.push(new Administrador("admin3", "adminpass3"));
    this.administradores.push(new Administrador("admin4", "adminpass4"));
    this.administradores.push(new Administrador("admin5", "adminpass5"));
  }

  precargarClientes() {
    this.guardarCliente("Juan", "Pérez", "jperez", "passworD4561", "1111222233334444", "123");
    this.guardarCliente("Ana", "García", "agarcia", "passworD456", "5555666677778888", "456");
    this.guardarCliente("Luis", "Martín", "lmartin", "passworD789", "9999000011112222", "789");
    this.guardarCliente("Carla", "López", "clopez", "passworD101", "3333444455556666", "101");
    this.guardarCliente("Pedro", "Rodríguez", "prodriguez", "passworD102", "7777888899990000", "102");

    this.clientes[3].millas = 15000;
    this.clientes[3].saldo = 0;

    this.clientes[4].millas = 15000;

    //ponerle millas a los clientes para poder probar reservas
  };


  precargarDestinos() {
    this.guardarDestinos("París", 10000, "Disfruta de la Torre Eiffel y mucho más", "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
    20);
  this.guardarDestinos("Tokio", 8000, "Vive la cultura nipona", "https://upload.wikimedia.org/wikipedia/commons/c/ce/Temple_Complex_at_Asakusa_Kannon_%2811920461243%29.jpg",
    0 );
  this.guardarDestinos("Nueva York", 14999, "La ciudad que nunca duerme", "https://nyc.eu/wp-content/uploads/2015/07/New_York_City-scaled.jpg",
    10);
  this.guardarDestinos("Londres", 9500, "Recorre el Big Ben y el Museo Británico", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg/900px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg", 
    25);
  this.guardarDestinos("Roma", 70000, "Descubre el Coliseo y el Vaticano", "https://denomades.s3.us-west-2.amazonaws.com/blog/wp-content/uploads/2024/03/21064745/italia-roma.jpg", 
    30);
  this.guardarDestinos("Sídney", 8500, "Las mejores playas de Australia", "https://www.civitatis.com/blog/wp-content/uploads/2018/01/vista-opera-house-sidney.jpg", 
    10);
  this.guardarDestinos("Buenos Aires", 500, "Disfruta de la cultura argentina y su gastronomía", "https://cdn.britannica.com/63/188963-050-2C94FEC2/Night-view-obelisk-Buenos-Aires.jpg", 
    10);
  this.guardarDestinos("Barcelona", 7500, "Vive la Sagrada Familia y la Costa Brava", "https://media.timeout.com/images/106185654/750/562/image.webp", 
    18);
  this.guardarDestinos("Lima", 550, "Conoce la ciudad de los Reyes y sus maravillas", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WprSh2CTlHLC-q55YKU5VuXDTe9J57G4ag&s", 
    35);
  this.guardarDestinos("Machu Picchu", 6000, "Viaja a la Ciudad Perdida de los Incas", "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg", 
    50);

    this.destinos[0].oferta = true;
    this.destinos[3].oferta = true;
    this.destinos[6].oferta = true;
  };

  precargarReservas() {
  //primer valor son la cantidad de pasajeros
  //cambiar el booleano para que la reserva sea con millas para probar

  this.usuarioLogueado = this.clientes[0];
  this.ordenarReservaDestino(1, false, this.destinos[0].id);
  this.usuarioLogueado = null;

  this.usuarioLogueado = this.clientes[3];
  this.ordenarReservaDestino(1, true, this.destinos[2].id);
  this.usuarioLogueado = null;

  this.usuarioLogueado = this.clientes[0];
  this.ordenarReservaDestino(3, false, this.destinos[3].id);
  this.usuarioLogueado = null;    
  
  this.usuarioLogueado = this.clientes[1];
  this.ordenarReservaDestino(11, false, this.destinos[6].id);
  this.usuarioLogueado = null;
  
  this.usuarioLogueado = this.clientes[1];
  this.ordenarReservaDestino(9, true, this.destinos[6].id);
  this.usuarioLogueado = null;

  this.usuarioLogueado = this.clientes[2];
  this.ordenarReservaDestino(10, false, this.destinos[6].id);
  this.usuarioLogueado = null;

  this.usuarioLogueado = this.clientes[4];
  this.ordenarReservaDestino(5, true, this.destinos[9].id);
  this.usuarioLogueado = null;

  };
};




  
  