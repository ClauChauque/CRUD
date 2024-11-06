const Producto = require('../models/Producto')

exports.crearProducto = async(req,res) => {
    // console.log(req.body); //Muestra en consola el producto que se guardará

    try {
        let producto = new Producto(req.body);
        await producto.save();
        res.send(producto);
    } catch (error) {
        console.log(error);
        res.send("Hubo un error...")
    }

}

exports.obtenerProductos = async(req,res) => {
    try {
        let productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.send("Hubo un error...");
    }
}

exports.eliminarProducto = async(req,res)=>{
    try {
        let producto = await Producto.findById(req.params.id);
        //Ya que el id viaja por la url de la peticion 'request', se utiliza el método 'params' para acceder a dicho parametro.
        
        // Se utiliza el if para asegurarnos de que se encontró el Producto
        if (!producto) {
            res.json("No existe el producto")
        }

        await Producto.findOneAndRemove({_id: req.params.id }); //siendo _id el campo que mongo nombro por defecto al id, y 'req.params.id' el valor de dicho id

        res.json("Producto eliminado")
        console.log(producto)
    } catch (error) {
        console.log(error);
        res.send("Hubo un error...")
    }
}

exports.actualizarProducto = async(req,res) => {
    try {
        const {name, description, price, stock} = req.body
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json('No existe el producto');
        }
            producto.name = name;
            producto.description = description;
            producto.price = price;
            producto.stock = stock
            producto = await Producto.findOneAndUpdate( {_id:req.params.id}, producto, {new:true} );
            res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error...");
    }
}

exports.obtenerProducto = async(req,res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json('No existe el producto');
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error...");
    }
}
