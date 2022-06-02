
const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

//CABEZERAS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.post("/formulario", async(req, res) => {
    console.log(req.body.nombre,"-");
    console.log(req.body.telefono,"-");
    console.log(req.body.email,"-");
    
    const nuevoUsuario = db.collection('usuarios').doc(req.body.nombre + req.body.telefono);

    var usuarioNuevo = await nuevoUsuario.set({ 
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email
    });

    res.json({usuarioNuevo});
});

app.get("/formulario",async(req, res) =>{
    console.log(req.query.nombre,"-");
    console.log(req.query.telefono,"-");
    console.log(req.query.email,"-");
    
    const nuevoUsuario = db.collection('usuarios').doc(req.query.nombre + req.query.telefono);

    var usuarioNuevo = await nuevoUsuario.set({ 
        nombre: req.query.nombre,
        telefono: req.query.telefono,
        email: req.query.email
    });

    res.json({usuarioNuevo});
    

});


const diario = functions.https.onRequest(app);
module.exports = {
    diario
}
