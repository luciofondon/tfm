angular.module('tfm.uex').controller('ConfiguratorManagementController',
    ['$scope', '$stateParams', 'ProjectService', 'projectData', 'TemplateService', 'QuestionService', 'AnswerService', 'TopicService',
        function($scope, $stateParams, ProjectService, projectData, TemplateService, QuestionService, AnswerService, TopicService){

    $scope.topic = {};
    $scope.topicId = "";
    $scope.questionId;

    $scope.question = {};
    $scope.answer = {};
    $scope.topics = [];
    $scope.questions = [];
    $scope.project = {};
	$scope.errores  = [];
	$scope.template = {};
	$scope.templates = [];
	$scope.tab = 0; //Tab que se mostrara en la vista
	$scope.project = projectData.data;

    $scope.init = function(){
        ProjectService.getTopics($stateParams.projectId).then(function(response) {
			$scope.topics = response.data;
        });
    }

    $scope.marcarTopic = function(topicId){
		console.log("marcarTopic "+ topicId)
        $scope.topicId = topicId;
	};


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
		TemplateService.saveTemplate($stateParams.projectId).then(function(response) {
			$scope.topics = response.data;
			$scope.template =  {};
			$scope.alerts = [];
			$scope.alerts.push("Plantialla guardada correctamente.")
			$('#modal-template').modal('hide');
        });
	};

    $scope.createTopic = function(){
        if(validateTopic()){
            ProjectService.addTopic($stateParams.projectId, $scope.topic).then(function(response) {
                $scope.topic =  {};
                $scope.alerts = [];
                $scope.alerts.push("Topic creado correctamente.")
                $scope.init();
                $('#modal-topic').modal('hide');
            });
        }
    }

    function validateTopic(){
        $scope.errores = [];
        if($scope.topic.name == undefined || $scope.topic.name == "")
             $scope.errores.push("El campo nombre del topic es obligatorio");

        if( $scope.errores.length > 0)
            return false;
        return true;
	}

    $scope.createQuestion = function(){
        if(validateQuestion()){
            ProjectService.addQuestion($scope.topicId, $scope.question).then(function(response) {
                $scope.question =  {};
                $scope.alerts = [];
                $scope.alerts.push("Pregunta creada correctamente.")
                $scope.init();
                $('#modal-question').modal('hide');
            });
        }
    }

	$scope.editQuestion = function(questionId){
		console.log(questionId)
		QuestionService.editQuestion($stateParams.projectId, $scope.questionId).then(function(response){

		});
	}

	$scope.deleteQuestion = function(questionId){
		console.log(questionId)
		QuestionService.deleteQuestion($stateParams.projectId, $scope.questionId).then(function(response){

		});
	}

	$scope.editAnswer = function(answerId){
		console.log(answerId)
		AnswerService.editAnswer($stateParams.projectId, $scope.answerId).then(function(response){

		});
	}

	$scope.deleteAnswer = function(answerId){
		console.log(answerId)
		AnswerService.deleteAnswer($stateParams.projectId, $scope.answerId).then(function(response){

		});
	}

    function validateQuestion (){
        $scope.errores = [];
        if($scope.question.description == undefined || $scope.question.description == "")
             $scope.errores.push("El campo nombre de la pregunta es obligatorio");
        if( $scope.errores.length > 0)
            return false
        return true;
    }

    $scope.createAnswer = function(){
       // $http.get('/api/question/' + $scope.questionId).success(function(question) {
        //    question.answers.push($scope.answer);
        ProjectService.addAnswer($scope.questionId, $scope.answer).then(function(question) {
            $scope.init();
            $('#modal-answer').modal('hide');
        });
    };

}]);
