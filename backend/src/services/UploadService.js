
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio para subir ficheros al servidor
 */

var systemService = require('../services/SystemService'),
	fs = require('fs'),
	path = require('path'),
    Promise = require('promise');

module.exports = {
	/**
	 * @param  {} file Fichero que se va a subir al servidor
     * @description Subida de un fichero XML
	 */
	uploadXML: function(file){
		return uploadXML(file);
    },

	/**
	 * @param  {} file Fichero que se va a subir al servidor
     * @description Subida de una imagen
	 */
	uploadImage: function(file){
		return uploadImage(file);
	}

}
function uploadImage(file){
	console.log("Subiendo imagen")
	let promise = new Promise(function(resolve, reject){
        //Ruta temporal donde se ha almacenado el fichero
        let tmpPath = file.path;

        // Ruta donde colocaremos las imagenes
        let timeStamp = new Date().getTime();
        let targetPath = path.join(__dirname,'../../../frontend/images/' + timeStamp + "." + file.type.split("/")[1]);

        // Comprobamos que el fichero es de tipo imagen
        if (file.type.indexOf('image')==-1){
            reject({error: 'El fichero que deseas subir no es una imagen'});
        } else {
            upload(tmpPath, targetPath, timeStamp + "." + file.type.split("/")[1]).then(function(data){
				console.log("devolviendo")
				console.log(data)
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        }
    });
    return promise;
}

function uploadXML(file){
	console.log("subiendo")

	let promise = new Promise(function(resolve, reject){
        //Ruta temporal donde se ha almacenado el fichero
        var tmpPath = file.path;
		console.log("subiendo")
        // Ruta donde colocaremos las imagenes
        let timeStamp = new Date().getTime();
        let targetPath = path.join(__dirname,'../../tmp/' + timeStamp + ".xml");

        // Comprobamos que el fichero es de tipo imagen
        if (file.type.indexOf('xml')==-1){
            reject('El fichero que deseas subir no tiene formato xml');
        } else {
            upload(tmpPath, targetPath, timeStamp + ".xml").then(function(data){
				console.log("subido")
                resolve(data);
            }).catch(function(err){
				console.log("err")
                reject(err);
            });
        }
    });
    return promise;
}

function upload(tmpPath, targetPath, nameFile){
	let promise = new Promise(function(resolve, reject){
        // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmpPath, targetPath, function(err) {
            if (err)
                reject({error: "Se ha producido un error al subir la imagen"});

            // Eliminamos el fichero temporal
            fs.unlink(tmpPath, function() {
                if (err)
                    reject({error: "Se ha producido un error al subir la imagen"});
                resolve({name: nameFile});
            });
        });
    });
    return promise;
}



