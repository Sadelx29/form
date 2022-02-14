"use strict"

//variables

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const btnReset = document.querySelector('#resetBtn')
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');


const er  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// event listener

eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //campos de formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);


    //reinicia formulario
    btnReset.addEventListener('click', resetearFormulario);

    //enviar email

    formulario.addEventListener('submit', enviarEmail);


}


//funtions
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add ('cursor-not-allowed', 'opacity-50')
}

//validar formulario
function validarFormulario(e){

    if (e.target.value.length > 0 ) {

        //eliminar los errores
        const error = document.querySelector("p.error"); // selecc. etiqueta P que tenga clase error
    if (error !== null) {
      error.remove();
    }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        

        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type === 'email') {
      
      //const er  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (er.test( e.target.value)) {
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
      }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
          mostrarError('email no valido')
      }
    }

    if (er.test( email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
    btnEnviar.classList.remove ('cursor-not-allowed', 'opacity-50')
  
    }

}
    


function mostrarError(mensaje) {
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center','error');

     const errorres= document.querySelectorAll('.error')
     if(errorres.length ===0) {
     formulario.appendChild(mensajeError);
     }
}

//enviar el email
function enviarEmail(e){
    
    e.preventDefault();
    
    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex'

  


    //temporizador
    
    setTimeout ( () =>{
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje fue enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')


        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
           
            
        }, 5000);



    }, 3000);


   
    
}



//funtion resetear formulario
function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}