
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para comunicarse con el compomente Mediatory para acceder a Jira/Redmine...
 */

module.exports = function(app) {
    var mediatoryController = require('../controllers/MediatoryController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

    app.route('/mediatory/check')
        .post(systemMiddleware.rolOperador, mediatoryController.checkComunication);

    app.route('/mediatory/apps')
        .get(systemMiddleware.rolOperador, mediatoryController.getApps);

    app.route('/mediatory/projects')
		.post(systemMiddleware.rolOperador, mediatoryController.getProjects);

	app.route('/mediatory/create/projects')
        .post(systemMiddleware.rolOperador, mediatoryController.createProject);

	app.route('/mediatory/create/issues')
        .post(systemMiddleware.rolOperador, mediatoryController.createIssues);

	app.route('/mediatory/read/issues')
		.post(systemMiddleware.rolOperador, mediatoryController.readAllIssues);

}
