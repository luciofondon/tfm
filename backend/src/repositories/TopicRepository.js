
/**
 *	@author Lucio David Fondon Terron - 2018
 *  @description Funciones que se encargan de manejar el acceso a MongoDB sobre el objeto Topic
 */

var Promise = require('promise');

var Question = require('../models/QuestionModel'),
	Topic = require('../models/TopicModel');

var projectRepository = require('../repositories/ProjectRepository');

module.exports = {

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplicationId Identificador de la aplicacion a la que se desea leer los topic
	 * @description Lee todos los topic con sus preguntas, respuestas y preguntas/respuesta asociadas a una aplicacion
	 */
	readAllByAplication: function(authUser, aplicationId) {
		return readAllByAplication(authUser, aplicationId);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} topic Objeto topic que se va a crear
	 * @param  {} aplicationId Identificador de la aplicacion a la que se desea asociar el topic
	 * @description Crea un topic asociado a una aplicacion
	 */
	createTopicByAplication: function(authUser, topic, aplicationId) {
		return createTopicByAplication(authUser, topic, aplicationId);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} topic Objeto topic que se va a actualizar
	 * @description Actualiza los atributos de un topic
	 */
	updateTopic: function(authUser, topic) {
		return updateTopic(authUser, topic);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} topic Objeto topic que se va a eliminar
	 * @description Elimina un topic
	 */
	deleteTopic: function(authUser, topic) {
		return deleteTopic(authUser, topic);
	}
}

function readAllByAplication(authUser, aplicationId){
	let promise = new Promise(function(resolve, reject){
		Topic.find({aplication: aplicationId}).sort({name:1}).then(function(topics) {
			Question.find({ topic: { $ne: null } }).populate("answers.questions").exec(function(err, questions) {
				let topicsFormat = [];
				topics.forEach(function(topic){
					let topicFormat = JSON.parse(JSON.stringify(topic));
					topicFormat.questions = [];

					for(let i = 0; i < questions.length; i++){
						if(questions[i].topic.toString() == topic._id.toString()){
							topicFormat.questions.push(questions[i]);
						}
					}
					topicsFormat.push(topicFormat);
				});
				resolve(topicsFormat);
			});
		}).catch(function(err){
			reject({ error: 'Cannot list all the topics' });
		});
	});
	return promise;
}

function createTopicByAplication(authUser, topic, aplicationId){
	let promise = new Promise(function(resolve, reject){
		topic.aplication = aplicationId; 
		if(validateTopic(topic)){
			topic.save(function(err) {
				if (err) {
					reject({error: 'Cannot save the topic'});
				}
				resolve(topic);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function deleteTopic(authUser, topic){
	let promise = new Promise(function(resolve, reject){
		//Eliminar preguntas asociadas al topic
		Question.remove({topic: topic._id}, function(err){
			topic.remove(function(err){
				resolve({info: 'Delete topic ok'});
			});
		});
	});
	return promise;
}

function updateTopic(authUser, topic){
	let promise = new Promise(function(resolve, reject){
		if(validateTopic(topic)){
			topic.save(function(err) {
				if (err) {
					reject({error: 'Cannot update the topic'});

				}
				resolve(topic);
			});
		}else
		reject({ error: "Parametros de la API no validos"});
	});
	return promise;
}

function validateTopic(topic){
	if(topic.name == undefined || topic.name == "")
		return false;
	return true;
}
