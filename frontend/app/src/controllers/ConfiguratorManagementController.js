angular.module('tfm.uex').controller('ConfiguratorManagementController',
	['$scope', '$stateParams', 'ProjectService', 'projectData', 'TemplateService', 'QuestionService', 'AnswerService', 'TopicService', '$ngConfirm',
		function($scope, $stateParams, ProjectService, projectData, TemplateService, QuestionService, AnswerService, TopicService, $ngConfirm){
	var conf = this;

	$scope.tab = 0; //Tab que se mostrara en la vistas
	$scope.mode = 1; // Modo popup (1 = crear, 2 actualizar)
	$scope.topic = {};
	$scope.question = {};
	$scope.answer = {};
	$scope.template = {};
	$scope.project = projectData.data;
    $scope.topicId = ""; //Pestana de topic seleccionada
	$scope.questionId = ""; //Pregunta seleccionada para crear respuestas
    $scope.topics = [];
    $scope.questions = [];
	$scope.errores  = [];
	$scope.templates = [];
	$scope.error = null;

    $scope.init = function(){
        ProjectService.getTopics($stateParams.projectId).then(function(response) {
			$scope.topics = response.data;
			if($scope.topics.length > 0)
				$scope.topicId = $scope.topics[0]._id;
        });
    }

	$scope.marcarPregunta = function(questionId){
        $scope.questionId = questionId;
    };

    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
	};

	$scope.saveTemplate = function(){
		if(validateTemplate()){
			TemplateService.saveTemplate($stateParams.projectId).then(function(response) {
				$scope.topics = response.data;
				$scope.template =  {};
				$ngConfirm('Plantialla guardada correctamente.');
				$('#modal-template').modal('hide');
			});
		}
	};

	function validateTemplate(){
        $scope.error = null;
        if($scope.topic.name == undefined || $scope.topic.name == "")
             $scope.error = "El campo nombre del topic es obligatorio";
		return $scope.error != null ? false : true;
	}

	//*************************************************************************/
	//************************************TOPIC********************************/
	//*************************************************************************/

	// Seleccionar el topic cuando se cambia de pestana
	$scope.selectTopic = function(topicId){
        $scope.topicId = topicId;
	};

    $scope.createTopic = function(){
        if(validateTopic()){
            TopicService.createTopic($stateParams.projectId, $scope.topic).then(function(response) {
                $scope.topic =  {};
				$ngConfirm('Topic creado correctamente.');
                $scope.init();
                $('#modal-topic').modal('hide');
            });
        }
    }

    function validateTopic(){
        $scope.error = null;
        if($scope.topic.name == undefined || $scope.topic.name == "")
             $scope.error = "El campo nombre del topic es obligatorio";
		return $scope.error != null ? false : true;
	}

	//*************************************************************************/
	//************************************QUESTION*****************************/
	//*************************************************************************/

	// Seleccionar el topic cuando se cambia de pestana
	$scope.selectQuestion = function(questionId){
        $scope.questionId = questionId;
	};

    $scope.createQuestion = function(){
        if(validateQuestion()){
            QuestionService.createQuestion($scope.topicId, $scope.question).then(function(response) {
                $scope.question =  {};
				$ngConfirm('La pregunta se ha creadp correctamente');
                $scope.init();
                $('#modal-question').modal('hide');
            });
        }
	}

	$scope.readQuestion = function(questionId, mode){
		$scope.mode = mode != undefined ? mode : 1;
		QuestionService.readQuestion(questionId).then(function(response){
			$scope.question = response.data;
		});
	}

	$scope.updateQuestion = function(){
		QuestionService.updateQuestion($scope.question).then(function(response){
			$ngConfirm('La pregunta se ha actualizado correctamente');
			$('#modal-question').modal('hide');
			$scope.init();
		});
	}

	$scope.deleteQuestion = function(questionId){
		$ngConfirm({
			title: 'Pregunta',
			content: '¿Deseas eliminar la pregunta?',
			buttons: {
				aceptar: {
					text: 'Eliminar',
					btnClass: 'btn-blue',
					action: function(scope, button){
						QuestionService.deleteQuestion(questionId).then(function(response){
							$ngConfirm('La pregunta se ha eliminado correctamente');
							$scope.init();
						});
					}
				},
				cerrar: {
					text: 'Cancelar',
					btnClass: 'btn-orange',
				}
			}
		});
	}

	function validateQuestion (){
        $scope.error = null;
        if($scope.question.description == undefined || $scope.question.description == "")
			 $scope.error = "El campo nombre de la pregunta es obligatorio";
		return $scope.error != null ? false : true;
	}

	//*************************************************************************/
	//************************************ANSWER*******************************/
	//*************************************************************************/

	$scope.readAnswer = function(questionId, answerId, mode){
		$scope.mode = mode != undefined ? mode : 1;
		$scope.questionId = questionId;
		AnswerService.readAnswer(questionId, answerId).then(function(response){
			$scope.answer = response.data;
		});
	}

	$scope.updateAnswer = function(){
		if(validateAnswer()){
			AnswerService.updateAnswer($scope.questionId, $scope.answer).then(function(response){
				alert("Actualizado correctamente")
				$('#modal-answer').modal('hide');
				$scope.init();
			});
		}
	}

	$scope.deleteAnswer = function(questionId, answerId){
		$ngConfirm({
			title: 'Respuesta',
			content: '¿Deseas eliminar la respuesta?',
			buttons: {
				aceptar: {
					text: 'Eliminar',
					btnClass: 'btn-blue',
					action: function(scope, button){
						AnswerService.deleteAnswer(questionId, answerId).then(function(response){
							$scope.init();
							$ngConfirm('La respuesta se ha eliminado correctamente');
						});
					}
				},
				cerrar: {
					text: 'Cancelar',
					btnClass: 'btn-orange',
				}
			}
		});
	}

    $scope.createAnswer = function(){
		if(validateAnswer()){
			AnswerService.createAnswer($scope.questionId, $scope.answer).then(function(question) {
				$scope.init();
				$('#modal-answer').modal('hide');
			});
		}
	};

	function validateAnswer (){
        $scope.error = null;
        if($scope.answer.description == undefined || $scope.answer.description == "")
			 $scope.error = "El campo nombre de la pregunta es obligatorio";
		else if($scope.answer.requirement == undefined || $scope.answer.requirement == "")
             $scope.error = "El campo requistio de la pregunta es obligatorio";
		return $scope.error != null ? false : true;
	}

}]);
