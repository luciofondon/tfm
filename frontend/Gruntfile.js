module.exports = function(grunt){

    grunt.initConfig({
		//*******************************************************************CONFIGURACIONES CSS
		// Validar fichero CSS
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist   : [
                'public/dist/css/AdminLTE.css'
            ]
        },
		// Pasar de less a css
		//'public/dist/css/app.css': 'app/styles/less/app.less',
		//'public/dist/css/bootstrap-nav-wizard.css': 'app/styles/less/bootstrap-nav-wizard.less',

        less: {
            dev: {
                files: {
				  'app/styles/css/app.css': 'app/styles/less/app.less',
				  'app/styles/css/bootstrap-nav-wizard.css': 'app/styles/less/bootstrap-nav-wizard.less',
                }
			},
			pro: {
                files: {
				  'app/styles/css/app.css': 'app/styles/less/app.less',
				  'app/styles/css/bootstrap-nav-wizard.css': 'app/styles/less/bootstrap-nav-wizard.less',
                }
            },
        },
		// Mimificar css
		cssmin: {
			target: {
				files: {
			  		'public/dist/css/app.min.css': ['app/styles/css/app.css'],
					'public/dist/css/bootstrap-nav-wizard.min.css': ['app/styles/css/bootstrap-nav-wizard.css']
				}
		  	}
		},
		//Concatenar ficheros css
        concat_css: {
            pro: {
                'public/dist/css/assets.css': [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/font-awesome/css/font-awesome.min.css',
                    'bower_components/Ionicons/css/ionicons.min.css',
                    'bower_components/admin-lte/dist/css/AdminLTE.min.css',
                    'bower_components/admin-lte/dist/css/skins/skin-blue.css',
                    'bower_components/bootstrap-table/dist/bootstrap-table.min.css',
					'bower_components/angular-loading-bar/build/loading-bar.min.css',
					'bower_components/angular-confirm/dist/angular-confirm.min.css'
				]
            },
        },
		//*******************************************************************CONFIGURACIONES JS
		uglify: { // Mimificar JavaScript
            options   : {
                mangle          : true,
                preserveComments: 'some'
            },
            pro: {
                files: {
                  'public/dist/js/app.min.js':	['app/src/app.js', 'app/src/**/*.js'],
                }
            }
        },
		//Concatenar fichero JS
        concat: {
            options: {
                separator: '\n\n',
                banner   : '/*! Trabajo Fin de Master - Universidad Extremadura assets.js\n'
                + '* ================\n'
                + '* Dependencias externas de TFMUex . Este fichero\n'
                + '* incluye las librerías descargadas a traves del\n'
                + '* gestor de dependencias de frontend BOWER.\n'
                + '*\n'
                + '\n\n'
            },
            pro   : {
                src : [
                    'bower_components/jquery/dist/jquery.min.js',
					'bower_components/angular/angular.min.js',
					'bower_components/angular-ui-router/release/angular-ui-router.min.js',
					'bower_components/angular-confirm/dist/angular-confirm.min.js',
					'bower_components/angular-recaptcha/release/angular-recaptcha.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
					'bower_components/admin-lte/dist/js/adminlte.min.js',
					'bower_components/satellizer/dist/satellizer.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js',
					'bower_components/ng-file-upload/ng-file-upload.min.js',
					'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
                    'bower_components/bootstrap-table/dist/bootstrap-table.min.js',
                    'bower_components/bootstrap-table/dist/locale/bootstrap-table-es-ES.min.js',
                    'bower_components/bootstrap-table/dist/extensions/angular/bootstrap-table-angular.min.js',
                    'bower_components/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js',
                    'bower_components/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js',
                    'bower_components/tableexport.jquery.plugin/tableExport.min.js',
                    'bower_components/bootstrap-table/dist/extensions/select2-filter/bootstrap-table-select2-filter.min.js',
                    'bower_components/bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control.min.js',
                    'bower_components/bootstrap-table/dist/extensions/filter/bootstrap-table-filter.min.js'
				],
                dest: 'public/dist/js/assets.min.js'
            }
        },
		// Validar codigo JS
        jshint: {
            all: ['Gruntfile.js', 'app/src/**/*.js', 'app/src/app.js']
        },
		//*******************************************************************CONFIGURACIONES IMG
		// Mimificar imagenes y ajustar
        imagemin: {
			dev: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['*.{png,jpg}'],
                    dest: 'public/dist/images'
                }]
            },
            pro: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['*.{png,jpg}'],
                    dest: 'public/dist/images'
                }]
            }
        },
        //*******************************************************************SISTEMA
		//Copiar ficheros/carpeta para dejarlo en el path de recursos al que puede acceder el usuario
		copy: {
			dev: {
				files: [
					{expand: true, src:['app/src/app.js', 'app/src/**/*.js'], dest: 'public/dist/js/', filter: 'isFile'},
		      		{expand: true, src: 'favicon.ico', dest: 'public/dist/', filter: 'isFile'},
		      		{expand: true, flatten: true, src:['app/views/**/*.html'], dest: 'public/dist/views/', filter: 'isFile'},
					{expand: true, src: 'indexDEV.html', dest: 'public/dist/', filter: 'isFile', rename: function(dest, src){return dest + 'index.html';}},
				]
			},
			pro: {
				files: [
					{expand: true, src:['app/src/app.js', 'app/src/**/*.js'], dest: 'public/dist/', filter: 'isFile'},
		      		{expand: true, src: 'favicon.ico', dest: 'public/dist/', filter: 'isFile'},
					{expand: true, flatten: true, src:['app/views/**/*.html'], dest: 'public/dist/views/', filter: 'isFile'},
		      		{expand: true, src: 'indexPRO.html', dest: 'public/dist/', filter: 'isFile', rename: function(dest, src){return dest + 'index.html';}},
				]
			},
		},
		// Renombrar ficheros
		rename: {
			dev: {
				files: [
					{src: 'public/dist/indexDEV.html', dest: 'public/dist/index.html'},
				]
		  	},
			pro: {
				files: [
					{src: 'public/dist/indexPRO.html', dest: 'public/dist/index.html'},
				]
		  	},
		},
		// Ejecutar las tareas anteriores cuando se modifiquen algun fichero
        watch: {
            css: {
               files: ['app/styles/less/*.less'],
               tasks: ['less:all'],
               options: {
                 spawn: false,
               }
            }
		},
		// Generar documentacion interna en HTML con JSDoc
		jsdoc : {
			dist : {
				src: ['app/src/**/*.js', 'app/src/app.js', '../README.md'],
				options: {
					destination: 'DOCUMENTACION_INTERNA'
				}
			}
		}
    });



    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint')
    grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');

    //Tareas que se lanzaran cuando se introduzca por consola $grunt, $grunt dev, $grunt pro...
	grunt.registerTask("default", 	["less:pro", "copy:pro", "rename:pro", "concat:pro", "imagemin:pro"]); // "$grunt"
	grunt.registerTask("pro", 		["less:pro", "copy:pro", "rename:pro", "concat:pro", "imagemin:pro", "uglify:pro"]); // "$grunt pro"
    grunt.registerTask("dev", 		["less:dev", "copy:dev", "rename:dev", "imagemin:dev", "watch"]); // "$grunt dev"
    grunt.registerTask("lint", 		["jshint", "csslint"]); // "$grunt lint"
    grunt.registerTask("doc", 		["jsdoc"]); // "$grunt doc"
};
