// var basePath  = function(path) { return __dirname.replace('application',(path||'')); }
var basePath  = function(path) { return __dirname+'/'+(path||''); }
var bowerPath = function(path) { return __dirname+'/bower_components/'+(path||''); }

var $project = 'framenstein';

var $config = {
    'site-sass': {
        'type': 'sass',
        'name': 'all',
        'path': [
            basePath('assets/css/vendor/*.css'),
            basePath('assets/css/custom/*.css'),
        ],
        'build': basePath('build/css/'),
        'dist' : basePath('dist/css/'),
    },
    'site-javascript': {
        'type': 'javascript',
        'name': 'all',
        'path': [
            basePath('assets/js/vendor/*.js'),
            basePath('assets/js/custom/*.js'),
        ],
        'build': basePath('build/js/'),
        'dist' : basePath('dist/js/'),
    },
    'site-images': {
        'type': 'image',
        'path': [
            // bowerPath('chosen/public/*'),
            basePath('assets/img/**/*'),
        ],
        'watch': basePath('assets/img/**/*'),
        'build': basePath('build/img/'),
        'dist' : basePath('dist/img/'),
    },
    'site-images-css': {
        'type': 'image',
        'path': [
            bowerPath('fancybox/source/*'),
        ],
        'build': basePath('build/css/'),
        'dist' : basePath('dist/css/'),
    },
    'site-fonts': {
        'type': 'font',
        'path': [
            basePath('assets/fonts/**/*'),
        ],
        'build': basePath('build/fonts/'),
        'dist' : basePath('dist/fonts/'),
    },
};

var $tasks = [
    {
        'config' : $config['site-sass'],
        'path': {
            'origin' : basePath('assets/sass/vendor/'),
            'destiny': basePath('assets/css/vendor/'),
        },
    },
    {
        'config' : $config['site-sass'],
        'path': {
            'origin' : basePath('assets/sass/custom/'),
            'destiny': basePath('assets/css/custom/'),
        },
    },
    {
        'config' : $config['site-javascript'],
        'path': {
            'origin' : basePath('assets/js-uncompiled/vendor/'),
            'destiny': basePath('assets/js/vendor/'),
        },
    },
    {
        'config' : $config['site-javascript'],
        'path': {
            'origin' : basePath('assets/js-uncompiled/custom/'),
            'destiny': basePath('assets/js/custom/'),
        },
    },
    {
        'config' : $config['site-images'],
        'task'   : 'site-images',
    },
    {
        'config' : $config['site-images-css'],
        'task'   : 'site-images-css',
    },
    {
        'config' : $config['site-fonts'],
    },
];



var browserSync = require('browser-sync');
var compass     = require('gulp-compass')
var concat      = require('gulp-concat');
var copy        = require('gulp-contrib-copy');
var deletefile  = require('gulp-delete-file');
var gulp        = require('gulp');
var include     = require('gulp-include');
var rev         = require('gulp-rev');
var runSequence = require('run-sequence');
var uglify      = require('gulp-uglify');

var $fileTypes = {
    'sass': {
        'origin' : 'scss',
        'destiny': 'css',
    },
    'javascript': {
        'origin' : 'js',
        'destiny': 'js',
    },
};

var $watch = [];
var $sequences = [];

function makeTask( $i ) {

    var $sequence = [];

    if( ['sass','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('clean'+$i);
        gulp.task('clean'+$i, function() {
            return gulp
                .src([$tasks[$i]['config']['build']+'/**/*.'+$fileTypes[$tasks[$i]['config']['type']]['destiny']])
                .pipe(deletefile({
                    reg: (new RegExp('^('+$tasks[$i]['config']['name']+'-)([0-9a-z]*)(\.'+$fileTypes[$tasks[$i]['config']['type']]['destiny']+')$')),
                    deleteMatch: true
                }));
        });
    } else if( ['image'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('clean'+$i);
        gulp.task('clean'+$i, function() {
            return gulp
                .src([$tasks[$i]['config']['build']+'**/*', $tasks[$i]['config']['dist']+'**/*'])
                .pipe(deletefile({
                    reg: (new RegExp( '^(.*)(\.)(jpg|jpeg|png|gif)$' )),
                    deleteMatch: true,
                }));
        });
    } else if( ['font'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('clean'+$i);
        gulp.task('clean'+$i, function() {
            return gulp
                .src([$tasks[$i]['config']['build']+'**/*', $tasks[$i]['config']['dist']+'**/*'])
                .pipe(deletefile({
                    reg: (new RegExp( '^(.*)(\.)(eot|svg|ttf|woff)$' )),
                    deleteMatch: true,
                }));
        });
    }

    if( ['sass'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('proccess'+$i);
        gulp.task('proccess'+$i, function() {
            return gulp
                .src($tasks[$i]['path']['origin']+'*.scss')
                .pipe(compass({
                    style        : 'compressed',
                    environment  : 'production',
                    sass         : $tasks[$i]['path']['origin'],
                    css          : $tasks[$i]['path']['destiny'],
                    import_path  : [
                        basePath(''),
                        basePath('bower_components/'),
                        basePath('assets/'),
                    ],
                }))
                .pipe(gulp.dest($tasks[$i]['path']['destiny']));
        });
    } else if( ['javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('proccess'+$i);
        gulp.task('proccess'+$i, function() {
            return gulp
                .src($tasks[$i]['path']['origin']+'*.js')
                .pipe(include({
                    extensions: "js",
                    includePaths: [
                        // basePath(''),
                        // basePath('bower_components/'),
                        // basePath('assets/'),
                    ]
                }))
                // .pipe(uglify())
                .pipe(gulp.dest($tasks[$i]['path']['destiny']));
        });
    }

    if( ['sass','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('build'+$i);
        gulp.task('build'+$i, function() {
            return gulp
                .src($tasks[$i]['config']['path'])
                .pipe(concat($tasks[$i]['config']['name']+'.'+$fileTypes[$tasks[$i]['config']['type']]['destiny']))
                .pipe(gulp.dest($tasks[$i]['config']['build']))
                .pipe(gulp.dest($tasks[$i]['config']['dist']))
                .pipe(browserSync.reload({stream:true}));
        });
    } else if( ['image'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('build'+$i);
        gulp.task('build'+$i, function() {
            var $pathOld = $tasks[$i]['config']['path'];
            var $pathNew = [];
            for( var $j in $pathOld ) {
                $pathNew.push($pathOld[$j]+'.jpg');
                $pathNew.push($pathOld[$j]+'.jpeg');
                $pathNew.push($pathOld[$j]+'.png');
                $pathNew.push($pathOld[$j]+'.gif');
            }
            return gulp
                .src($pathNew)
                .pipe(copy())
                .pipe(gulp.dest($tasks[$i]['config']['build']))
                .pipe(gulp.dest($tasks[$i]['config']['dist']));
        });
    } else if( ['font'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('build'+$i);
        gulp.task('build'+$i, function() {
            var $pathOld = $tasks[$i]['config']['path'];
            var $pathNew = [];
            for( var $j in $pathOld ) {
                $pathNew.push($pathOld[$j]+'.eot');
                $pathNew.push($pathOld[$j]+'.svg');
                $pathNew.push($pathOld[$j]+'.ttf');
                $pathNew.push($pathOld[$j]+'.woff');
            }
            return gulp
                .src($pathNew)
                .pipe(copy())
                .pipe(gulp.dest($tasks[$i]['config']['build']))
                .pipe(gulp.dest($tasks[$i]['config']['dist']));
        });
    }

    if( ['sass','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('publish'+$i);
        gulp.task('publish'+$i, function() {
            return gulp
                .src($tasks[$i]['config']['build']+$tasks[$i]['config']['name']+'.'+$fileTypes[$tasks[$i]['config']['type']]['destiny'], {base: basePath('dist/')})
                .pipe(rev())
                .pipe(gulp.dest(basePath('build/')))
                .pipe(rev.manifest(basePath('dist/')+'rev-manifest.json', { merge: true }))
                .pipe(gulp.dest(''));
        });
    }

    if( ['sass','javascript','font','image'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        gulp.task('runsequence'+$i, function(fn) {
            return runSequence.apply(this, $sequence.concat(fn))
        });
    }

    if( typeof($tasks[$i]['task'])!='undefined' ) {
        gulp.task($tasks[$i]['task'], function(fn) {
            return runSequence.apply(this, $sequence.concat(fn))
        });
    }

    if( ['sass','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $watch.push('watch'+$i);
        gulp.task('watch'+$i, function() {
            gulp.watch($tasks[$i]['path']['origin']+'**/*.'+$fileTypes[$tasks[$i]['config']['type']]['origin'], ['runsequence'+$i]);
        });
    } else if( ['font'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $watch.push('watch'+$i);

        var $watchInside = [];

        for( var $j in $tasks[$i]['config']['path'] ) {
            var $path = $tasks[$i]['config']['path'][$j];

            $watchInside.push('watch'+$i+'.'+$j+'.eot');
            gulp.task('watch'+$i+'.'+$j+'.eot', function() {
                return gulp.watch($path+'.eot'  , ['runsequence'+$i]);
            });
            $watchInside.push('watch'+$i+'.'+$j+'.svg');
            gulp.task('watch'+$i+'.'+$j+'.svg', function() {
                return gulp.watch($path+'.svg'  , ['runsequence'+$i]);
            });
            $watchInside.push('watch'+$i+'.'+$j+'.ttf');
            gulp.task('watch'+$i+'.'+$j+'.ttf', function() {
                return gulp.watch($path+'.ttf'  , ['runsequence'+$i]);
            });
            $watchInside.push('watch'+$i+'.'+$j+'.woff');
            gulp.task('watch'+$i+'.'+$j+'.woff', function() {
                return gulp.watch($path+'.woff'  , ['runsequence'+$i]);
            });
        }

        gulp.task('watch'+$i, function(fn) {
            return runSequence.apply(this, $watchInside.concat(fn))
        });
    } else if( ['image'].indexOf($tasks[$i]['config']['type'])!=(-1) && typeof($tasks[$i]['config']['watch'])!='undefined' ) {
        $watch.push('watch'+$i);

        var $watchInside = [];

        var $path = $tasks[$i]['config']['watch'];

        var $j = 0;

        $watchInside.push('watch'+$i+'.'+$j+'.jpg');
        gulp.task('watch'+$i+'.'+$j+'.jpg', function() {
            return gulp.watch($path+'.jpg', ['runsequence'+$i]);
        });
        $watchInside.push('watch'+$i+'.'+$j+'.jpeg');
        gulp.task('watch'+$i+'.'+$j+'.jpeg', function() {
            return gulp.watch($path+'.jpeg', ['runsequence'+$i]);
        });
        $watchInside.push('watch'+$i+'.'+$j+'.png');
        gulp.task('watch'+$i+'.'+$j+'.png', function() {
            return gulp.watch($path+'.png', ['runsequence'+$i]);
        });
        $watchInside.push('watch'+$i+'.'+$j+'.gif');
        gulp.task('watch'+$i+'.'+$j+'.gif', function() {
            return gulp.watch($path+'.gif', ['runsequence'+$i]);
        });

        gulp.task('watch'+$i, function(fn) {
            return runSequence.apply(this, $watchInside.concat(fn))
        });
    }
}

for( var $i in $tasks ) {
    makeTask($i);
}

gulp.task('serve', $watch, function() {
    browserSync.init({
        open : false,
        proxy: basePath().search('local.woodoo')!=(-1) ? 'http://local.woodoo.com.br/'+$project+'/' : 'http://localhost:8989/'+$project+'/'+$project+'/',
    });
});

gulp.task('default', $watch);