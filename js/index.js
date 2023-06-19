let productos3D = [];
let productosRemera = [];
let carrito = [];
let max = 1000;
let min = 0;
const btAddToCard = document.getElementsByClassName('btAddToCard')
const urlP1 = "https://648f942175a96b664445391d.mockapi.io/products"
const urlP2 = "https://648f942175a96b664445391d.mockapi.io/products2"



/* Creamos la clase constructor de los productos  */
class Producto {
    constructor (id, name, price, foto){
        this.id = id
        this.name = name
        this.price = price
        this.foto = foto
        
    }
}

/* Funcion asincronica que con FETCH trae los productos de la api y los pasa a un array de los productos especificos*/
async function cargaDeProductos(producto){
    const resp1 = await fetch(urlP1,{
        method: "GET",
        body: JSON.stringify(producto),
        headers:{
            "Content-Type": "application/json",
        }
    })
    const data1 = await resp1.json()
    data1.forEach((producto)=>{
        productos3D.push(new Producto(producto.id, producto.name, producto.price, producto.foto))
    })
    
    const resp2 = await fetch(urlP2,{
        method: "GET",
        body: JSON.stringify(producto),
        headers:{
            "Content-Type": "application/json",
        }
    })
    const data2 = await resp2.json()
    data2.forEach((producto)=>{
        productosRemera.push(new Producto(producto.id, producto.name, producto.price, producto.foto))
    })
    agregarProductosAlHtml2()
    agregarProductosAlHtml1()
    cargaBt()
}
cargaDeProductos()




/* Creamos la funcion para agregar nuestro array de prodcutos con DOM */
function agregarProductosAlHtml1(){
    productos3D.forEach((producto)=>{
        let template = `          
        <div class="col-lg-4 ff">
        <div class="card transparent bb" style="width: 18rem;">
        <img src="${producto.foto}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title ct">${producto.name}</h5>
        <p class="card-text ct">$${producto.price}</p>
        <div class="botonParaComprar"><button class="btn btn-primary bt ct btAddToCard" value="${producto.id}">Agregar al Carrito</button></div>
        </div>
        </div>
        </div>
    `
    document.getElementById("3D").innerHTML += template
    })    
}

/* Creamos la funcion para agregar nuestro array de prodcutos con DOM */
function agregarProductosAlHtml2(){
    productosRemera.forEach((producto)=>{
        let template = `          
        <div class="col-lg-4 ff">
        <div class="card transparent bb" style="width: 18rem;">
        <img src="${producto.foto}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title ct">${producto.name}</h5>
        <p class="card-text ct">$${producto.price}</p>
        <div class="botonParaComprar"><button class="btn btn-primary bt ct btAddToCard" value="${producto.id}">Agregar al Carrito</button></div>
        </div>
        </div>
        </div>
    `
    document.getElementById("Remeras").innerHTML += template
    })
}


/* funcion que recibe un value para setearlo como id y poder cargar productos al carrito */
function cargaBt(){
    for(const btn of btAddToCard){
        btn.addEventListener ('click', () => {
            
            if (btn.value > 0 && btn.value < 4){
                let buscado3D = btn.value

                let encontrado3D = productos3D.find((producto)=>{
                    return producto.id == buscado3D
                })

                carrito.push(encontrado3D)
            }else if (btn.value > 3 && btn.value < 7){
                let buscadoRem = btn.value
            
                let encontradoRem = productosRemera.find((producto)=>{
                    return producto.id == buscadoRem
                   
                })
                carrito.push(encontradoRem)
            }

            localStorage.setItem('carrito', JSON.stringify(carrito))
            Toastify({

                text: "Producto agregado correctamente",
                
                duration: 1000
                
            }).showToast();
        }) 
    }
}



