import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors());
app.use(express.json());

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
        this.vehiculos.forEach(vehiculo => {
            if (vehiculo.placa === nuevo_vehiculo.placa) {
                return -1;
            }
        });
        this.vehiculos.push(nuevo_vehiculo);
    }

    buscarVehiculo(id) {
        this.vehiculos.forEach(vehiculo => {
            if (vehiculo.placa === id) {
                return vehiculo;
            }
        });
    }

    borrarVehiculo(id) {
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (this.vehiculos[i].placa == id) {
                let temp = this.vehiculos[i];
                this.vehiculos.splice(i, 1);
                return temp;
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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})