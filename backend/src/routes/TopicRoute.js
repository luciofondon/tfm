/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var topicController = require('../controllers/TopicController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

    app.route('/project/topics/:projectId')
        .get(systemMiddleware.rolOperador, topicController.readAllByProject)
		.post(systemMiddleware.rolOperador, topicController.createByProject);

	/*app.route('project/topic/:topicId')
		.get(systemMiddleware.rolAdmin, topicController.readAllByProject)
        .delete(systemMiddleware.rolAdmin, topicController.readAllByProject);*/
}
