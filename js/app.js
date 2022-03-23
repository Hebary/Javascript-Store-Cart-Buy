//Variables
const btnCarrito = document.querySelector('.areaCarrito');
const carritoDiv = document.querySelector('.carrito');
const listaCarrito = document.querySelector('.carrito tbody');
const listaCursos = document.querySelector('#listaCursos');
const btnVaciar = document.querySelector('.carrito__btn--vaciar');
const btnAgregar = document.querySelector('.card__btn--agregar');
const total = document.querySelector('.total');
let articulosCarrito = [];



appCarritoInit();


function appCarritoInit() {
    //eventos para mostrar y ocultar el carrito
    btnCarrito.addEventListener('mouseover',()=>{
        if (!carritoDiv.classList.contains('active')) {
            carritoDiv.classList.add('active');
        }
    });
    carritoDiv.onmouseleave = ()=>{
        if(carritoDiv.classList.contains('active')) {
                    
            setTimeout(()=>{
                        carrito.classList.remove('active');
                },500);
            }
        }
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    //muestra en HTML contenido de LocalStorage si lo hay
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito =JSON.parse( localStorage.getItem('carrito') || [] ); //arreglo vacío en caso de estar vacío LS
        carritoHTML();
    })

    //Vaciar el carrito
    btnVaciar.addEventListener('click',()=>{
        articulosCarrito=[];//resetear arreglo
        calcularPrecio();
        limpiarHTML();
    })

} 
    

//agrega un curso al carrito si doy click sobre el btn que contiene la clase card__btn--agregar
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('card__btn--agregar')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerCursoSeleccionado(cursoSeleccionado);
        imprimirAlerta('Agregado Correctamente','agregar');
    }
}

function leerCursoSeleccionado(curso) {
    const datosCurso = {
        nombre: curso.querySelector('.card__info>h4').textContent,
        precio: curso.querySelector('.card__precio').textContent,
        imagen: curso.querySelector('.card > img').src,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
        precioNumber:11,
    }

    const existe = articulosCarrito.some(curso => curso.id === datosCurso.id);
    
    if(existe){
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id===datosCurso.id){
                curso.cantidad++;
                return curso; //objeto actualizado
            }
            else {
                return curso; // si no se actualizara, retorna el mismo objeto
            }
        });
        
        articulosCarrito = [...cursos];
    }
    
    else {
    
        articulosCarrito = [...articulosCarrito, datosCurso];
       
       
    }
    calcularPrecio();

    carritoHTML();
}

function calcularPrecio(){
    let suma = 0;
        articulosCarrito.forEach(v_actual=>{
            suma += v_actual.precioNumber;
        })
    
        if(suma!=='undefined'){
            total.innerHTML=`<strong>Total: $${suma}</strong>`;
        }    else{
            total.innerHTML=`<strong>Total: $${'0'}</strong>`;
    }

}

function carritoHTML() {
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {

        const {
            imagen,
            nombre,
            precio,
            cantidad,
            id
        } = curso;


        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class='margin'>
                <img src='${imagen}' width=90'>   
            </td>
            <td class='margin'>${nombre}</td>   
            <td class='margin ctd2'><strong>${precio}<strong></td>   
            <td class='margin ctd'>${cantidad}</td>  
            <td class='margin'>
            <a href='#' class='borrar' data-id='${id}'> X </a>
            </td>
            `;
        //Agrega el HTML en el tbody
        listaCarrito.appendChild(fila);
        calcularPrecio();
    })
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}


//Elimina los cursos repetidos del tbody y luego carritoHTML regenera el HTML

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}


function eliminarCurso(e){

    if(e.target.classList.contains("borrar")){
        
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo por el data id con filter
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        // console.log(articulosCarrito); //se borran correctamente del carrito
        imprimirAlerta('Eliminado Correctamente');
        calcularPrecio();
        carritoHTML(); //itera de nuevo sobre el carrito y re-muestra el HTML
    }

}


function imprimirAlerta(msj,tipo){
    
    if(tipo==='agregar' ){
        Toastify({
        text: msj,
        duration: 1800,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to right, rgba(0,255,0,.6), rgba(0,255,0,.8))",
        },
      }).showToast();
        
    }
        else{
            Toastify({
                text: msj,
                duration: 1800,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, rgba(255,0,0,.8), rgba(255,0,0,1))",
                },
              }).showToast();
    }
}