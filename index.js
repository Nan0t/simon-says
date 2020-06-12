let patronColores=[];
let eleccionUser=[];
let numeroRonda=0
const botoninicio= document.getElementById("botonIniciar");
botoninicio.onclick= iniciarJuego;

function iniciarJuego(){
  reiniciarJuego();
  setTimeout(manejarRonda,1000);
};
function manejarRonda(){
  disableInput();
  agregarColor();
  mostrarPatronElegido();
  setTimeout(()=>{enableInput();}
    ,(patronColores.length+1) *1000);
};

function resaltar(color) {
    color.style.opacity = 1;
    setTimeout(function() {
      color.style.opacity = 0.5;
    }, 500);
  };

function disableInput() {
    let botones =document.querySelectorAll(".color");
    botones.forEach(boton=> boton.onclick= function(){});
  };

function enableInput() {
    let botones =document.querySelectorAll(".color");
    botones.forEach(boton=> boton.onclick= manejarInputUsuario);
  };

function manejarInputUsuario(evento){
  let colorTocado= evento.target;
  resaltar(colorTocado);
  eleccionUser.push(colorTocado);

  let eleccionMaquina = patronColores[eleccionUser.length-1];
  if(eleccionMaquina.id!==colorTocado.id){
    perder();
    return;
  }
  if(patronColores.length===eleccionUser.length){
    setTimeout(pasarRonda,1000);
  }
};     

function agregarColor(){
  const colores =document.querySelectorAll(".color");
  const colorAleatorio= elegirDeFormaAleatoria(colores); 
  patronColores.push(colorAleatorio);
  console.log(patronColores[0]);
  resaltar(patronColores[0]);
};

function mostrarPatronElegido(){
  patronColores.forEach((color, index) => {
    setTimeout(() => { resaltar(color);}
    , index * 1000);
  });
};
patronColores.forEach((color, index) => {
  setTimeout(() => {
    resaltar(color);
  }, index * 1000);
});

function empty(array){
  while(array.length>0){
    array.pop();
  };
};
function elegirDeFormaAleatoria(array){
  const index= Math.floor(Math.random()*array.length)
  return array[index];
};

function reiniciarJuego(){
patronColores=[];
eleccionUser=[];
numeroRonda=0
}

function pasarRonda(){
numeroRonda++;
eleccionUser=[];
manejarRonda();
};

function perder(){
  disableInput();
  actualizarEstadoPartida('perdio');
  let reinicio= document.getElementById("botonReintentar");
  reinicio.onclick=function(){actualizarEstadoPartida('reinicia')};
  reiniciarJuego();
};

function actualizarEstadoPartida(estado){
if(estado==='perdio'){
  document.getElementById("cajaError").classList.remove("ocultar");
  document.getElementById("botonIniciar").classList.add("ocultar");
}
if(estado==='reinicia'){
  document.getElementById("cajaError").classList.add("ocultar");
  document.getElementById("botonIniciar").classList.remove("ocultar");
}
};