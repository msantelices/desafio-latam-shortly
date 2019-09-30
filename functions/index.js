// Primero, se importan e inicializan los modulos necesarios. En este caso, cloud functions y firestore. 

// IMPORTANTE: Instalar el modulo cors en la carpeta functions utilizando npm install cors --save

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
	origin: true
});
admin.initializeApp( functions.config().firebase );
const db = admin.firestore();


// Se define el nombre de la colección a utilizar
const collection = 'users'


/* 
	Ruta 1: Obtener los datos de un documento realizando una peticion de tipo GET que requiere un parametro llamado id que corresponde al nombre del documento
	Ejemplo de una petición: https://ruta-de-tu-aplicacion.cloudfunctions.net/getData?id=doc1
*/
exports.getData = functions.https.onRequest( (req, res) => {

	// Este bloque permite solucionar problemas de CORS
	cors(req, res, ()=> {

		// Verificar que la url contenga el parametro necesario (ID), el cual es almacenado en la variable docID, de lo contrario, devuelve un error
		let docID = req.query.id;
		if( docID === undefined ) {
			res.send( 'Error - Invalid Params' );
		}
		
		// Algunas librerias envian un método OPTIONS previa a cada petición
		if( req.method === 'OPTIONS' ) {
	    	res.status(200).send('');
		} else if ( req.method === 'GET' ) { 		
			// ^ Aquí se define el método que aceptará esta ruta. En este caso, un GET

			/* 
				Se busca el documento solicitado (representado por DocID) dentro de la colección definida previamente. Si el documento no es encontrado, la petición 
				termina ennviado un mensaje de "Documento no encontrado". Si le documento exite, lo envia en formato JSON
			*/
			let docRef = db.collection(collection).doc(docID);
			docRef
				.get()
				.then( (doc) => {
					if( !doc.exists ) {
						res.send( 'No document' );
					} else {
						res.json( doc.data() );
					}
				})
				.catch( (err) => {
					res.send('Error getting document', err );
				})

		} else {
			// ^ Si el metodo no esta permitido, termina la petición enviado un error
			res.status(405).send( 'Method not allowed!' );
		}

	})
	

});

exports.saveData = functions.https.onRequest( (req, res)=> {

	// Este bloque permite solucionar problemas de CORS
	cors(req, res, ()=> {

		// Verificar que la peticion contenga una id para identificar el documento. Esta ID es almacenada en la variable docID, de lo contrario, devuelve un error	
		// También se extrae el campo data que representa el contenido del documento a crear/actualizar
		let docID = req.body.id;
		let data = req.body.data;
		if( docID === undefined ) {
			res.send( 'Error - Invalid Params' );
		}

		// Algunas librerias envian un método OPTIONS previa a cada petición
		if( req.method === 'OPTIONS' ) {
	    	res.status(200).send('');
		} else if ( req.method === 'POST' ) {
			// ^ Aquí se define el método que aceptará esta ruta. En este caso, un POST


			/* 
				Se crea una referencia al documento que será creado/actualizando basado en la colección previamente definida y la ID de documento para
				posteriormete guardar la información contenida en la variable data
			*/
			let docRef = db.collection(collection).doc(docID);
			docRef
				.set(data)
				.then( ()=> {
					res.send( 'Document successfully written!' );
				})
				.catch( (err)=> {
					res.send( "Error writing document: ", err );
				})
		} else {
			// ^ Si el metodo no esta permitido, termina la petición enviado un error
			res.status(405).send( 'Method not allowed!' );
		}

	})
	

});
