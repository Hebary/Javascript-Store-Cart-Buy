//Variables
const btnCarrito = document.querySelector('.carrito__img');
const carritoDiv = document.querySelector('.carrito')
const listaCarrito = document.querySelector('.carrito tbody');
const listaCursos = document.querySelector('#listaCursos')
let articulosCarrito = [];



appCarritoInit();
function appCarritoInit() {
    //evento para mostrar el carrito
    btnCarrito.onclick = () => {
        if (!carritoDiv.classList.contains('active')) {
            carritoDiv.classList.toggle('active');
        } else {
            carritoDiv.classList.toggle('active');
        }
    }

    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar un objeto
    // document.querySelector('.borrar').addEventListener('click', borrarDelCarrito);


}
//agrega un curso al carrito si doy click sobre el btn que contiene la clase card__btn--agregar
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('card__btn--agregar')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerCursoSeleccionado(cursoSeleccionado);
    }
}

function leerCursoSeleccionado(curso) {
    const datosCurso = {
        nombre: curso.querySelector('.card__info>h4').textContent,
        precio: curso.querySelector('.card__precio').textContent,
        imagen: curso.querySelector('.card > img').src,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
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
    carritoHTML();
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
    })
}

//Elimina los cursos repetidos del tbody y luego carritoHTML regenera el HTML

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}


function borrarDelCarrito(){

    console.log('borrando..')
}

