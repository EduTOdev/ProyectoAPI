const inputPlaca = document.getElementById("placa");
const inputMarca = document.getElementById("marca");
const inputModelo = document.getElementById("modelo");

const btnAgregar = document.getElementById("btnAgregar");
const btnListar = document.getElementById("btnListar");
const btnBuscar = document.getElementById("btnBuscar");
const btnEliminar = document.getElementById("btnEliminar");

const lista = document.getElementById("lista");

btnAgregar.addEventListener("click", () => {
    fetch("http://localhost:3000/vehiculos/nuevo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            placa: inputPlaca.value,
            marca: inputMarca.value,
            modelo: inputModelo.value
        })
    })
});

btnListar.addEventListener("click", () => {
    fetch("http://localhost:3000/vehiculos")
    .then(res => res.json())
    .then(data => {
        let listado = "";
        data.forEach(vehiculo => {
            listado += `
                <li>
                    <div class="card" style="width: 18rem; margin: 1rem;">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Placa: ${vehiculo.placa}</li>
                            <li class="list-group-item">Marca: ${vehiculo.marca}</li>
                            <li class="list-group-item">Modelo: ${vehiculo.modelo}</li>
                        </ul>
                    </div>
                </li>
            `;
        });
        lista.innerHTML = listado;
    });
});

btnBuscar.addEventListener("click", () => {
    fetch(`http://localhost:3000/vehiculos/${inputPlaca.value}`)
    .then(res => res.json())
    .then(vehiculo => {
        let listado = `
            <li>
                <div class="card" style="width: 18rem; margin: 1rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Placa: ${vehiculo.placa}</li>
                        <li class="list-group-item">Marca: ${vehiculo.marca}</li>
                        <li class="list-group-item">Modelo: ${vehiculo.modelo}</li>
                    </ul>
                </div>
            </li>
        `;
        lista.innerHTML = listado;
    });
});

btnEliminar.addEventListener("click", () => {
    fetch(`http://localhost:3000/vehiculos/${inputPlaca.value}`, {
        method: "DELETE"
    })
});