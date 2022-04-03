//Variables
const listaCarrito = document.querySelector('#listaCarrito tbody');
const listaCursos = document.querySelector('#listaCursos');
const btnAgregar = document.querySelector('.card__btn--agregar');
const btnVaciar = document.querySelector('.carrito__btn--vaciar');
const total = document.querySelector('.total');
let articulosCarrito = [];


//EVENTOS 
eventos();
function eventos() {
    
    document.addEventListener('DOMContentLoaded',obtenerCursos);

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


//FUNCIONES

//obtiene los cursos 
function obtenerCursos(){
    const url = "./js/cursos.json"; 
    fetch(url)
        .then(res => res.json())
        .then(res => {
            res.forEach(curso => {

                const {titulo,img,valor,precio,id} = curso;
                //para cada curso una card 
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute("data-aos","zoom-in-up"); //animacion
                card.innerHTML=`
                <img src="${img}" alt="img-Curso-#1-No-disponible">
                <div class="card__info">
                    <h4 class="card__title">${titulo}</h4>
                    <img src="${valor}" alt="valoración" id="estrellas">
                    <p><span class="precio">$200</span><strong class="card__precio">${precio}</strong></p>
                    <a href="#" class="card__btn--agregar" data-id="${id}">Agregar Al Carrito</a>
                </div>
                `
                
                listaCursos.appendChild(card)
            })
s        });
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
    let suma = articulosCarrito.reduce((total,v_actual)=>v_actual.precioNumber + total,0)
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
            <td>
                <img src='${imagen}' width='100'>   
            </td>
            <td><strong>${nombre}</strong></td>   
            <td><strong>${precio}<strong></td>   
            <td><strong>${cantidad}</strong></td>  
            <td>
                <a href='#' class="borrar" data-id='${id}'>X</a>
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


//impide los cursos repetidos en el carrito y luego carritoHTML  imprime el HTML

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}


function eliminarCurso(e){

    if( e.target.classList.contains("borrar") ){
        
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
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