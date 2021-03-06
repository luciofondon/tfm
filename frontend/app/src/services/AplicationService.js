angular.module('tfm.uex').factory('AplicationService', ['$http', function($http){
    return {
		readAllAplications: function(){
			return readAllAplications();
		},

		readAplication: function(aplicationId){
			return readAplication(aplicationId);
		},

		createAplication: function(aplication){
			return createAplication(aplication);
		},

		deleteAplication: function(aplicationId){
			return deleteAplication(aplicationId);
		},

		updateAplication: function(aplication){
			return updateAplication(aplication);
		},

		generateAplication: function(aplicationId, template){
			return generateAplication(aplicationId, template);
		},

		generateAplicationFromXML: function(nameFile){
			return generateAplicationFromXML(nameFile);
		}

	};

	function readAllAplications(){
		return $http.get('/api/aplications');
	}

	function readAplication(aplicationId){
		return $http.get('/api/aplication/' + aplicationId);
	}

	function createAplication(aplication){
		return $http.post('/api/aplications', aplication);
	}

	function deleteAplication(aplicationId){
		return $http.delete('/api/aplication/' + aplicationId);
	}

	function updateAplication(aplication){
		return $http.put('/api/aplication/' + aplication._id, aplication);
	}

	function generateAplication(aplicationId, template){
		return $http.post('/api/aplication/template/' + aplicationId, template);
	}

	function generateAplicationFromXML(nameFile){
		return $http.post('/api/aplication/xml', nameFile);
	}

}]);
