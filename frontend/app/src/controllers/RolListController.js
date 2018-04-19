angular.module('tfm.uex').controller('RolListController',
    ['$scope', 'RolService', 'BootstrapTableService',
        function($scope, RolService, BootstrapTableService){

	var vm = this;
    vm.bsTableRoles = {}
	vm.loadRolList = function(){
        RolService.getRoles().then(function(response) {
            var roles = response.data;
            roles.forEach(function(rol){
                var created = new Date(rol.created);
                rol.createdFormat = ( "0" + created.getHours()).slice(-2)+":"+ ( "0" + created.getMinutes()).slice(-2)+":"+ ( "0" + created.getSeconds()).slice(-2) + " " + ( "0" + created.getDate()).slice(-2)+"/"+ ( "0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            });

           var columns= [
                {field: "createdFormat", title: "Creacion", align: 'center', valign: 'middle', sortable: true},
                {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true},
                {field: "description", title: "Descripción", align: 'center', valign: 'middle'},
                {field: "level", title: "Nivel", align: 'center', valign: 'middle', sortable: true}
            ];

			vm.bsTableRoles = BootstrapTableService.createTableSimple(roles, "RolesTFM-Uex", columns);

        });
    }

}]);
