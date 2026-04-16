import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename) 

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

class vehiculo {
    constructor (placa, marca, modelo) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }
}

class almacen {
    constructor () {
        this.vehiculos = [];
    }

    agregarVehiculo(nuevo_vehiculo) {
        let temp = this.vehiculos.find(vehiculo => vehiculo.placa === nuevo_vehiculo.placa);
        if (temp)
            return -1;
        this.vehiculos.push(nuevo_vehiculo);
    }

    buscarVehiculo(id) {
        return this.vehiculos.find(vehiculo => vehiculo.placa === id);
    }

    borrarVehiculo(id) {
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (this.vehiculos[i].placa == id) {
                this.vehiculos.splice(i, 1);
            }
        }
    }
}

const nuevo_almacen = new almacen();

nuevo_almacen.agregarVehiculo(new vehiculo("FVQ2345A", "Nissan", "Versa"));

app.get('/vehiculos', (req, res) => {
    res.json(nuevo_almacen.vehiculos);
})

app.get('/vehiculos/:id', (req, res) => {
    let id = req.params.id;
    res.json(nuevo_almacen.buscarVehiculo(id));
})

app.post('/vehiculos/nuevo', (req, res) => {
    let nuevo = req.body;
    nuevo_almacen.agregarVehiculo(new vehiculo(nuevo.placa, nuevo.marca, nuevo.modelo));
})

app.delete('/vehiculos/:id', (req, res) => {
    let id = req.params.id;
    res.json(nuevo_almacen.borrarVehiculo(id));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})

// http://localhost:3000