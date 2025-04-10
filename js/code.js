let sistema = new Sistema();

sistema.precargarDatosObligatorio();

sistema.cambiarEstadoDestinoSinCupos();

sistema.cambiarPrecioDestinoEnOferta()

mostrarInicio();

renderizarTablaDestinos();


//CONSTANTES

const MINIMO_DE_CARACTERES_PARA_CONTRASEÑA = 5;

const CANTIDAD_DE_CIFRAS_DE_TARJETA = 16;

const CANTIDAD_DE_CIFRAS_DE_CVC = 3;


//BOTONES


//Login
document.querySelector("#btnLogin").addEventListener("click", login);


//Desloguearse
document.querySelector("#btnLogout").addEventListener("click", logout);


//Register
document.querySelector("#btnRegistrarse").addEventListener("click", registrarCliente);

//Volver del registro al login
document.querySelector("#btnVolverAlInicio").addEventListener("click", volverDelRegistroAlLogIn);

//Solicitar Reserva
document.querySelector("#btnSolicitarReservaCliente").addEventListener("click", solicitarReserva);

//Agregar destino
document.querySelector(`#btnAgregarDestinos`).addEventListener("click", agregarDestino);

//Boton guardar modal
document.querySelector("#btnGuardarCambios").addEventListener("click", guardarCambiosDestino);
//boton cambios modal editrar
document.querySelector("#btnCerrarModal").addEventListener("click", cerrarModal);




//Funciones

function mostrarInicio() {
  ocultarTodosLosElementos();
  //ocultamos el menu de navegacion
  document.querySelector("#navPrincipal").style.display = "none";
  //Muetro solo la div que interesa
  document.querySelector("#divLogin").style.display = "block";

};

function ocultarTodosLosElementos() {
    let todasLasPaginas = document.querySelectorAll(".contenedor");

    for (let i = 0; i < todasLasPaginas.length; i++) {
      //Recorremos los elementos y los ocultamos
      todasLasPaginas[i].style.display = "none";
    };
};

function login(){
  let nombreDeUsuario = document.querySelector("#usuarioLogin").value;
  let pass = document.querySelector("#passwordLogin").value;

  if (sistema.login(nombreDeUsuario, pass) !== null) {
      loguearse();
    } else {
      document.querySelector("#pErroresLogin").innerHTML = "No se pudo loguear";
    };
};


function logout() {
  sistema.logout();
  mostrarInicio();
};

function loguearse() {
    ocultarTodosLosElementos();
    //ocultamos el menu de navegacion
    document.querySelector("#navPrincipal").style.display = "block";

    if (!sistema.esAdmin) {
      ocultarElementosAdmin();
      mostrarElementosUser();
      //Muestro solo la div que interesa
      document.querySelector("#paginaPrincipalUsuario").style.display = "block";

    } else {
      ocultarElementosUser();
      mostrarElementosAdmin();
      document.querySelector("#paginaPrincipalAdmin").style.display = "block";

    };

    document.querySelector("#usuarioLogin").value = "";
    document.querySelector("#passwordLogin").value = "";
};

function volverDelRegistroAlLogIn(){
  mostrarInicio()
}

function ocultarElementosAdmin() {
    //querySelectorAll devuelve un array con todos los elementos que coinciden en criterio
    let todasLasPaginas = document.querySelectorAll(".soloAdmin");

    for (let i = 0; i < todasLasPaginas.length; i++) {
      //Recorremos los elementos y los ocultamos
      todasLasPaginas[i].style.display = "none";
    };
};

function mostrarElementosAdmin() {
    //querySelectorAll devuelve un array con todos los elementos que coinciden en criterio
    let todasLasPaginas = document.querySelectorAll(".soloAdmin");

    for (let i = 0; i < todasLasPaginas.length; i++) {
        //Recorremos los elementos y los ocultamos
        todasLasPaginas[i].style.display = "block";
    };
};

function ocultarElementosUser() {
    //querySelectorAll devuelve un array con todos los elementos que coinciden en criterio
    let todasLasPaginas = document.querySelectorAll(".soloUser");

    for (let i = 0; i < todasLasPaginas.length; i++) {
        //Recorremos los elementos y los ocultamos
        todasLasPaginas[i].style.display = "none";
    };
};

function mostrarElementosUser() {
    //querySelectorAll devuelve un array con todos los elementos que coinciden en criterio
    let todasLasPaginas = document.querySelectorAll(".soloUser");

    for (let i = 0; i < todasLasPaginas.length; i++) {
      //Recorremos los elementos y los ocultamos
      todasLasPaginas[i].style.display = "block";
    };
};

habilitarNavegacion();


/**
 * Recorre todos los elementos con clase .btnNavegacion
 * y les agrega un .addEventListener
 */

function habilitarNavegacion() {
  let botonesNavegacion = document.querySelectorAll(".btnNavegacion");

  for (let i = 0; i < botonesNavegacion.length; i++) {
    let item = botonesNavegacion[i];
    //cada vez que clickeo un elemento con clase btnNavegacion, llamo a "mostrarPagina"
    item.addEventListener("click", mostrarPagina);
  }
};

function mostrarPagina() {
  /**
  * this.getAttribute, recibe el atributo del cual quiero saber el valor
  * en este caso muestra las paginas
  */
  let idPagina = this.getAttribute("data-pag-objetivo");
  ocultarTodosLosElementos();
  document.querySelector(idPagina).style.display = "block";

  if(idPagina === "#divExplorarDestinos"){
    renderizarTablaDestinos();
  } else if (idPagina === "#divExplorarDestinosEnOferta"){
    renderizarTablaDestinosEnOferta(); 
  } else if (idPagina === "#divHistorialDeReservas"){
    renderizarTablaMisReservas()
  } else if (idPagina === "#divAdministrarDestinos"){
    renderizarAdministrarDestinos();
  } else if (idPagina === "#divListadoDeReservas"){
    renderizarReservasPendientes()
  }else if(idPagina === "#divInfoGanancias"){
    renderizarInformeDeGanancias()
  };

};

function agregarDestino(){
  let nombre = document.querySelector("#txtNombreDestino").value;
  let precio = Number (document.querySelector("#txtPrecioPorPersona").value);
  let descripcion = document.querySelector("#txtDescripcion").value;
  let url = document.querySelector("#urlAgregarImagen").value;
  let cupos = Number (document.querySelector("#numAgregarCupos").value);
  let p = document.querySelector("#pErroresAgregarDestino");
  p.innerHTML = "";

  let errores = validarContenidoDestino (nombre, precio, descripcion, url, cupos);
  
  if(sistema.existeDestino(nombre)){
    errores += `<br>El destino ${nombre} ya existe`;
  };

  if(errores === ""){
    sistema.guardarDestinos(nombre, precio, descripcion, url, cupos)
    
    p.innerHTML= `Se ha guardado el destino ${nombre} con éxito`;
  }else {
    p.innerHTML = errores;
  };

  
};

/**
 * 
 * @param {String} nombre 
 * @param {Number} precio 
 * @param {String} descripcion 
 * @param {String} url 
 * @param {Number} cupos 
 * @returns 
 */

function validarContenidoDestino (nombre, precio, descripcion, url, cupos){

  let errores = "";


  if(nombre.trim() === "" || descripcion.trim() === "" || url.trim() === ""){
    errores += "Faltan campos obligatorios";
  };

  if(precio<= 0 || isNaN(precio)){
    errores += "<br>El precio tiene que ser mayor a 0";
  };

  if(cupos<=0 || isNaN(cupos)){
    errores += "<br>El número de cupos debe ser mayor a 0";
  };
  

  return errores;
};



function registrarCliente(){

  let nombre = document.querySelector("#nombreReg").value.trim();
  let apellido = document.querySelector("#apellidoReg").value.trim();
  let usuario = document.querySelector("#usuarioReg").value.trim();
  let password = document.querySelector("#passwordReg").value.trim();
  let tarjeta = document.querySelector("#tarjetaReg").value.trim();
  let cvc = document.querySelector("#cvcReg").value;

  let pErrores = document.querySelector(`#pErroresReg`);
  pErrores.innerHTML = ``;

  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;
  
  //VALIDAR CAMPOS OBLIGATORIOS

  if(nombre === "" || apellido === "" || usuario === "" || password === "" || tarjeta === "" || cvc === 0){
    pErrores.innerHTML+= "Todos los campos son obligatorios.";
  };
  
  //VERIFICAR QUE EL NOMBRE DE USUARIO NO EXISTA PREVIAMENTE EN EL SISTEMA

  if(sistema.existeCliente(usuario)){
    pErrores.innerHTML+= "<br>El Nombre de usuario ya existe";
  };

  //CONTRASEÑA

  if(password.length < MINIMO_DE_CARACTERES_PARA_CONTRASEÑA){
    pErrores.innerHTML+= "<br>La contraseña debe ser de <b>AL MENOS</b> 5 caracteres";
  };

   
  for(let i = 0; i < password.length; i++){
    let caracter = password.charAt(i);
    if(!isNaN(caracter)){
      tieneNumero = true;
    }else if (caracter.toLowerCase() === caracter){
      tieneMinuscula = true;
    }else if (caracter.toUpperCase() === caracter){
      tieneMayuscula = true;
    };
  };

  if(!tieneNumero){
    pErrores.innerHTML+= "<br>La contraseña debe incluir al menos 1 numero";
  };

  if(!tieneMinuscula){
    pErrores.innerHTML+= "<br>La contraseña debe incluir al menos 1 letra minúscula";
  };
  if(!tieneMayuscula){
    pErrores.innerHTML+= "<br>La contraseña debe incluir al menos 1 mayúscula";
  };

 if(isNaN(tarjeta)){
   pErrores.innerHTML+= "<br>Debe ingresar SOLO números`";
  };
  if(tarjeta.length !== CANTIDAD_DE_CIFRAS_DE_TARJETA){
    pErrores.innerHTML+= "<br>Número de tarjeta inválido, cantidad de cifras esperadas = 16";
  };

  if(cvc.length !== CANTIDAD_DE_CIFRAS_DE_CVC){
    pErrores.innerHTML+= "<br>CVC invalido, debe tener 3 dígitos";
  };
  
  if(isNaN(cvc)){
    pErrores.innerHTML+= "<br>CVC invalido, debe ser un número";
  };

  if(pErrores.innerHTML === ""){
    sistema.guardarCliente(nombre, apellido, usuario, password, tarjeta, cvc)
    pErrores.innerHTML = "Usted se ha registrado correctamente";
  };
};



function renderizarTablaDestinos() {
  let tbody = document.querySelector("#tBodyDestinosClientes");
  let cuerpoTabla = "";
  
  for (let i = 0; i < sistema.destinos.length; i++) {
    let destino = sistema.destinos[i];
    if(destino.estado === "activo"){
      cuerpoTabla += `  
      <tr>
        <td>${destino.nombre}</td>
        <td>${destino.descripcion}</td>
        <td>${destino.precio}</td>
        <td>${destino.cupos}</td>
        <td>${destino.oferta ? "Sí" : "No"}</td>
        <td><img src="${destino.url}" /></td>
        <td><button class="btnMostrarDivReserva" data-index="${sistema.destinos[i].id}">Reservar</button></td>
      </tr>`;
    };
  };
  tbody.innerHTML = cuerpoTabla;
  let btnMostrarReservas = document.querySelectorAll(".btnMostrarDivReserva"); 
  for(let j = 0; j < btnMostrarReservas.length; j++){
    //abrir div reserva
    btnMostrarReservas[j].addEventListener("click", mostrarDivReservas);
  };
};

function renderizarTablaDestinosEnOferta(){
  let tbody = document.querySelector("#tBodyDestinosEnOfertaCliente");
  let cuerpoTabla = "";
  
  for (let i = 0; i < sistema.destinos.length; i++) {
    let destino = sistema.destinos[i];
    if(destino.oferta){
      cuerpoTabla += ` 
      <tr>
        <td>${destino.nombre}</td>
        <td>${destino.descripcion}</td>
        <td>${destino.precio}</td>
        <td><img src="${destino.url}" /></td>
        <td><button class="btnMostrarDivReserva" data-index="${sistema.destinos[i].id}">Reservar</button></td>
      </tr>`;
    };
  };
  tbody.innerHTML = cuerpoTabla;
  let btnMostrarReservas = document.querySelectorAll(".btnMostrarDivReserva"); 
  for(let j = 0; j < btnMostrarReservas.length; j++){
    //abrir div reserva
    btnMostrarReservas[j].addEventListener("click", mostrarDivReservas);
  };
};

let destinoClickeado;

//abrir div de reservas con el destino a reservar que coincida con el indice que le corresponde
function mostrarDivReservas(){
  let pReserva = document.querySelector("#pReserva");
  pReserva.innerHTML = "";
  ocultarTodosLosElementos();
  console.log(this)
  document.querySelector("#divReservarDestino").style.display = "block";
  let data = this.getAttribute("data-index");

  let destino = sistema.buscarDestinoPorId(data);
  destinoClickeado = destino;

  //titulo dinámico
  document.querySelector("#hReservar").innerHTML = `Reservar viaje a ${destino.nombre}`;
  //img dinámica
  document.querySelector("#imgReservarDestino").src = `${destino.url}`;

  document.querySelector("#pMillasActuales").innerHTML=`Usted tiene ${sistema.usuarioLogueado.millas} millas`;
  

}



//solicitar reserva cliente
function solicitarReserva(){
  let medioDePago = document.querySelector("#slcMedioDePago").value;
  let cantidadDePasajeros = document.querySelector("#numCantidadPasajeros").value.trim();
  let pReserva = document.querySelector("#pReserva");
  pReserva.innerHTML = "";

  let esConMillas = false;
  if(medioDePago === "m"){
    esConMillas = true;
  }
  

  if(cantidadDePasajeros <= 0){
    pReserva.innerHTML += "<br>Elija un valor de pasajeros mayor a 0.";
  };


  for (let i = 0; i < sistema.reservas.length; i++) {
    let reserva = sistema.reservas[i];
    if (reserva.cliente === sistema.usuarioLogueado && reserva.destino === destinoClickeado) {
      pReserva.innerHTML ="<br>Ya tiene una reserva para este destino, elija otro.";
    };
  };

  if(pReserva.innerHTML === ""){
    sistema.ordenarReservaDestino(Number(cantidadDePasajeros), esConMillas, destinoClickeado.id);
    pReserva.innerHTML ="Tu reserva ha sido solicitada, nuestro equipo de administradores la procesaran cuanto antes";
    document.querySelector("#numCantidadPasajeros").value = "";

  };
  
};


function renderizarTablaMisReservas() {
  let tbody = document.querySelector("#tbodyRenderizarMisReservas");

  let cuerpoTabla = ``;
  
  for (let i = 0; i < sistema.reservas.length; i++) {
    let reserva = sistema.reservas[i];
    if(reserva.cliente === sistema.usuarioLogueado) {
      cuerpoTabla += ` 
        <tr>
          <td>${reserva.destino.nombre}</td>
          <td>${reserva.cantidadDePersonas}</td>
          <td>${reserva.cantidadDePersonas * reserva.destino.precio}</td>
          <td>${reserva.estado}</td>
          <td><img src="${reserva.destino.url}"></td>
          <td><button class="btnCancelarReservaCliente" data-id="${i}">cancelar</button></td>
        </tr>`;
    };
  };
  tbody.innerHTML = cuerpoTabla;
  

  let botonesMisReservas = document.querySelectorAll(".btnCancelarReservaCliente");

  for (let j = 0; j < botonesMisReservas.length; j++) {
    let btncancelar = botonesMisReservas[j];
    btncancelar.addEventListener("click", cancelarReservaCliente);
  }
 
};



function cancelarReservaCliente(){
  let index = this.getAttribute("data-id");
  alert(`reserva ${sistema.reservas[index].destino.nombre} cancelada!`);
  sistema.reservas.splice(index, +1);
  renderizarTablaMisReservas();
};


//Administrar Destinos Admin



function renderizarAdministrarDestinos() {
  let tbody = document.querySelector("#tbodyAdministrarDestinos");
  let oferta = ""
  let cuerpoTabla = ``;


  
  for (let i = 0; i < sistema.destinos.length; i++) {
    let destino = sistema.destinos[i];
    if(destino.oferta === true){
      oferta = "Si."
    }else {
      oferta = "No."
    }
      cuerpoTabla += ` 
        <tr>
          <td>${destino.nombre}</td>
          <td>${destino.precio}</td>
          <td>${destino.descripcion}</td>
          <td><img src="${destino.url}"></td>
          <td>${destino.cupos}</td>
          <td>${destino.estado}</td>
          <td>${oferta}</td>
        
          <td><button class="btnEditar" data-index="${i}">Editar</button></td>
        </tr>`;
  };

  tbody.innerHTML = cuerpoTabla;

  let botonEditarDestinos = document.querySelectorAll(".btnEditar");

  for (let j = 0; j < botonEditarDestinos.length; j++) {
    let btnEditar = botonEditarDestinos[j];
    btnEditar.addEventListener("click",  editarDestinos);
  };  
};


function editarDestinos() {
  document.querySelector("#erroresEditarDestino").innerHTML = "";
  
  let index = this.getAttribute("data-index");  
  const destino = sistema.destinos[index];
  
  document.querySelector("#editarNombre").value = destino.nombre;
  document.querySelector("#editarPrecio").value= destino.precio;
  document.querySelector("#editarDescripcionDestino").value= destino.descripcion;
  document.querySelector("#editarURLImagen").value= destino.url;
  document.querySelector("#editarCupos").value= destino.cupos;
  document.querySelector("#editarEnOferta").checked= destino.oferta;

  
  let p = document.querySelector("#erroresEditarDestino");
  p.innerHTML = "";

  // Mostrar el modal
  document.querySelector("#modalEditarDestinos").style.display = "block";

  //titulo dinamico con nombre del destino a a editar
  document.querySelector("#hModal").innerHTML = `Editar destino ${destino.nombre }`
  
  document.querySelector("#btnGuardarCambios").setAttribute("data-index", index);

  document.querySelector("#btnCerrarModal").setAttribute("data-index", index);

}


function guardarCambiosDestino() {
  
  let index = this.getAttribute("data-index");

  let destinoActual = sistema.destinos[index];

  // Cargar datos editados

  let nombre = document.querySelector("#editarNombre").value;
  let precio = Number (document.querySelector("#editarPrecio").value);
  let descripcion = document.querySelector("#editarDescripcionDestino").value;
  let url = document.querySelector("#editarURLImagen").value;
  let cupos = Number (document.querySelector("#editarCupos").value);
  let oferta = document.querySelector("#editarEnOferta").checked;
  let p = document.querySelector("#erroresEditarDestino");
  p.innerHTML = "";

  let errores = validarContenidoDestino (nombre, precio, descripcion, url, cupos);

  let existeDestinoDistintoConMismoNombre =  sistema.existeDestinoExluyendoNombre(nombre, destinoActual.nombre);

  if (existeDestinoDistintoConMismoNombre) {
    errores += "<br>* Ya existe un destino con ese nombre";
  }

  if (errores === "") {
    sistema.guardarCambiosDestino(index, nombre, precio, descripcion, url, cupos, oferta);

    cerrarModal();   
    renderizarAdministrarDestinos();
  } else {
    p.innerHTML = errores;
  };
};


function cerrarModal(){
  document.querySelector("#modalEditarDestinos").style.display = "none";
}

function renderizarReservasPendientes(){
  let tbody = document.querySelector("#tbodyReservasPendientes");
  
  let cuerpoTabla = ``;
  
  for (let i = 0; i < sistema.reservas.length; i++) {
    let reserva = sistema.reservas[i];

    let botonesApagados = "";
    

    if (reserva.estado !== "pendiente") {
      botonesApagados = `disabled style="background-color: grey !important"`;
      
    }

    cuerpoTabla += ` 
    <tr>
      <td>${reserva.destino.nombre}</td>
      <td>${reserva.cantidadDePersonas}</td>
      <td>${reserva.destino.cupos}</td>
      <td>${reserva.cliente.nombreDeUsuario}</td>
      <td>${mostrarMetodoDePago (reserva.esConMillas)}</td>
      <td>${reserva.destino.precio * reserva.cantidadDePersonas}</td>
      <td>${reserva.cliente.saldo}</td>
      <td>${reserva.cliente.millas}</td>
      <td>${reserva.estado}</td>
      <td>
        <button class="btnCambiarEstado" data-estado-objetivo="Aprobada" data-reserva="${reserva.id}" ${botonesApagados} >Aprobar</button>
        <button class="btnCambiarEstadoCancelado" data-estado-objetivo="Cancelada" data-reserva="${reserva.id}" ${botonesApagados} >Cancelar</button>
      </td>
    </tr>`;
  };
  tbody.innerHTML = cuerpoTabla;
  let botonCambiarEstado = document.querySelectorAll(".btnCambiarEstado");
  let botonCambiarEstadoCancelado = document.querySelectorAll(".btnCambiarEstadoCancelado");

  for(let j = 0; j<sistema.reservas.length; j++){
    let btnCambiarEstado = botonCambiarEstado[j]
    btnCambiarEstado.addEventListener("click", cambiarEstadoReserva);
    let btnCambiarEstadoCancelado = botonCambiarEstadoCancelado[j]
    btnCambiarEstadoCancelado.addEventListener("click", cambiarEstadoReservaCancelado);
  };
};

function mostrarMetodoDePago (esConMillas){
  let metodoDePago = "";
  if(esConMillas){
    metodoDePago = "Millas";
  } else {
    metodoDePago = "Plata";
  };
  return metodoDePago;
};



function cambiarEstadoReserva() {
  let idReserva = this.getAttribute("data-reserva");
  
  let estadoObjetivo = this.getAttribute("data-estado-objetivo");

  let resultadoCambioDeEstado = sistema.cambiarEstadoReserva(idReserva, estadoObjetivo);


  alert(resultadoCambioDeEstado);
  renderizarReservasPendientes();
  renderizarInformeDeGanancias();
}

function cambiarEstadoReservaCancelado(){
  let idReserva = this.getAttribute("data-reserva");
  let estadoObjetivo = this.getAttribute("data-estado-objetivo");
  console.log(estadoObjetivo)

  let resultadoCambioDeEstado = sistema.cambiarEstadoReserva(idReserva, estadoObjetivo);


  alert(resultadoCambioDeEstado);
  renderizarReservasPendientes();
  renderizarInformeDeGanancias();
}

function renderizarInformeDeGanancias() {
  let htmlTabla = "";

  let clientesTotales = 0;
  let gananciasTotales = 0;

  for (let i = 0; i < sistema.destinos.length; i++) {
    let destino = sistema.destinos[i];

    let clientes = sistema.obtenerClientesDeReservaAprobada(destino.id);
    let gananciasDestino = sistema.obtenerGananciaDeDestino(destino.id);

    gananciasTotales += gananciasDestino;
    clientesTotales += clientes;

    htmlTabla += 
    `<tr>
      <td>${destino.nombre}</td>
      <td><img src="${destino.url}"></td>
      <td>${clientes}</td>
      <td>$ ${gananciasDestino}</td>
    </tr>`;
  };
  document.querySelector("#tbodyInformeDeGanancias").innerHTML = htmlTabla;
  
  document.querySelector("#informeGanancia").innerHTML = `En total se han ganando $${gananciasTotales} y hemos tenido ${clientesTotales} clientes`;
};