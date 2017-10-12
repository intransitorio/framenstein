var appPath   = function(path) { return __dirname+(path?'/'+path:''); }
var basePath  = function(path) { return __dirname.replace('/application',(path?'/'+path:'')); }
var bowerPath = function(path) { return __dirname+'/bower_components'+(path?'/'+path:''); }

var $project = 'framenstein';

var $config = {
    'site-stylus': {
        'type': 'stylus',
        'name': 'all',
        'path': [
            // appPath('assets/css/vendor/*.css'),
            appPath('assets/css/custom/*.css'),
        ],
        'build': basePath('build/css'),
    },
    'site-javascript': {
        'type': 'javascript',
        'name': 'all',
        'path': [
            appPath('assets/js/vendor/*.js'),
            appPath('assets/js/custom/*.js'),
        ],
        'build': basePath('build/js'),
    },
    'site-javascript-head': {
        'type': 'javascript',
        'name': 'head',
        'path': [
            appPath('assets/js/head/*.js'),
        ],
        'build': basePath('build/js'),
    },
    'site-images': {
        'type': 'image',
        'path': [
            appPath('assets/img/**/*'),
        ],
        'watch': appPath('assets/img/**/*'),
        'build': basePath('build/img'),
    },
    'site-images-css': {
        'type': 'image',
        'path': [
            bowerPath('chosen/public/*'),
        ],
        'build': basePath('build/css'),
    },
    'site-fonts': {
        'type': 'font',
        'path': [
            appPath('assets/fonts/**/*'),
            bowerPath('bootstrap-stylus/fonts/**/*'),
        ],
        'build': basePath('build/fonts'),
    },
    'site-html': {
        'type': 'html',
        'path': [
            basePath(''),
        ],
    },
};

var $tasks = [
    {
        'config' : $config['site-stylus'],
        'path': {
            'origin' : appPath('assets/stylus/vendor'),
            'destiny': appPath('assets/css/vendor'),
        },
        'task': 'site-stylus-vendor',
    },
    {
        'config' : $config['site-stylus'],
        'path': {
            'origin' : appPath('assets/stylus/custom'),
            'destiny': appPath('assets/css/custom'),
        },
        'task': 'site-stylus-custom',
    },
    {
        'config' : $config['site-javascript'],
        'path': {
            'origin' : appPath('assets/js-editable/vendor'),
            'destiny': appPath('assets/js/vendor'),
        },
        'task': 'site-js-vendor',
    },
    {
        'config' : $config['site-javascript'],
        'path': {
            'origin' : appPath('assets/js-editable/custom'),
            'destiny': appPath('assets/js/custom'),
        },
        'task': 'site-js-custom',
    },
    {
        'config' : $config['site-javascript-head'],
        'path': {
            'origin' : appPath('assets/js-editable/head'),
            'destiny': appPath('assets/js/head'),
        },
        'task': 'site-js-head',
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
        'task'   : 'site-fonts',
    },
    {
        'config' : $config['site-html'],
        'path': {
            'origin' : basePath(''),
            'destiny': basePath(''),
        },
        'task'   : 'site-html',
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
    'stylus': {
        'origin' : 'styl',
        'destiny': 'css',
    },
    'javascript': {
        'origin' : 'js',
        'destiny': 'js',
    },
    'html': {
        'origin' : 'php',
        'destiny': 'php',
    },
};

var $watch = [];
var $sequences = [];

function makeTask( $i ) {

    var $sequence = [];

    if( ['stylus','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
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
                .src([$tasks[$i]['config']['build']+'**/*'])
                .pipe(deletefile({
                    reg: (new RegExp( '^(.*)(\.)(jpg|jpeg|png|gif|cur)$' )),
                    deleteMatch: true,
                }));
        });
    } else if( ['font'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('clean'+$i);
        gulp.task('clean'+$i, function() {
            return gulp
                .src([$tasks[$i]['config']['build']+'**/*'])
                .pipe(deletefile({
                    reg: (new RegExp( '^(.*)(\.)(eot|svg|ttf|woff|woff2)$' )),
                    deleteMatch: true,
                }));
        });
    }

    if( ['stylus'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('proccess'+$i);
        gulp.task('proccess'+$i, function() {
            return gulp
                .src($tasks[$i]['path']['origin']+'/*.styl')
                .pipe(compass({
                    style        : 'compressed',
                    environment  : 'production',
                    stylus         : $tasks[$i]['path']['origin'],
                    css          : $tasks[$i]['path']['destiny'],
                    import_path  : [
                        appPath(''),
                        appPath('bower_components'),
                        appPath('assets'),
                    ],
                }))
                .pipe(gulp.dest($tasks[$i]['path']['destiny']));
        });
    } else if( ['javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('proccess'+$i);
        gulp.task('proccess'+$i, function() {
            return gulp
                .src($tasks[$i]['path']['origin']+'/*.js')
                .pipe(include({
                    extensions: "js",
                    includePaths: [
                        appPath(''),
                        appPath('bower_components'),
                        appPath('assets'),
                    ]
                }))
                .pipe(uglify())
                .pipe(gulp.dest($tasks[$i]['path']['destiny']));
        });
    }

    if( ['stylus','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('build'+$i);
        gulp.task('build'+$i, function() {
            return gulp
                .src($tasks[$i]['config']['path'])
                .pipe(concat($tasks[$i]['config']['name']+'.'+$fileTypes[$tasks[$i]['config']['type']]['destiny']))
                .pipe(gulp.dest($tasks[$i]['config']['build']))
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
                $pathNew.push($pathOld[$j]+'.cur');
            }
            return gulp
                .src($pathNew)
                .pipe(copy())
                .pipe(gulp.dest($tasks[$i]['config']['build']))
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
                $pathNew.push($pathOld[$j]+'.woff2');
            }
            return gulp
                .src($pathNew)
                .pipe(copy())
                .pipe(gulp.dest($tasks[$i]['config']['build']))
        });
    } else if( ['html'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('build'+$i);
        gulp.task('build'+$i, function() {
            return gulp
                .src($tasks[$i]['config']['path'])
                .pipe(browserSync.reload({stream:true}));
        });
    }

    if( ['stylus','javascript'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $sequence.push('publish'+$i);
        gulp.task('publish'+$i, function() {
            return gulp
                .src($tasks[$i]['config']['build']+'/'+$tasks[$i]['config']['name']+'.'+$fileTypes[$tasks[$i]['config']['type']]['destiny'], {base: basePath('build')})
                .pipe(rev())
                .pipe(gulp.dest(basePath('build')))
                .pipe(rev.manifest(basePath('build')+'/rev-manifest.json', { merge: true }))
                .pipe(gulp.dest(''));
        });
    }

    if( ['stylus','javascript','font','image', 'html'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        gulp.task('runsequence'+$i, function(fn) {
            return runSequence.apply(this, $sequence.concat(fn))
        });
    }

    if( typeof($tasks[$i]['task'])!='undefined' ) {
        gulp.task($tasks[$i]['task'], function(fn) {
            return runSequence.apply(this, $sequence.concat(fn))
        });
    }

    if( ['stylus','javascript', 'html'].indexOf($tasks[$i]['config']['type'])!=(-1) ) {
        $watch.push('watch'+$i);
        gulp.task('watch'+$i, function() {
            gulp.watch($tasks[$i]['path']['origin']+'/**/*.'+$fileTypes[$tasks[$i]['config']['type']]['origin'], ['runsequence'+$i]);
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
            $watchInside.push('watch'+$i+'.'+$j+'.woff2');
            gulp.task('watch'+$i+'.'+$j+'.woff2', function() {
                return gulp.watch($path+'.woff2'  , ['runsequence'+$i]);
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
        $watchInside.push('watch'+$i+'.'+$j+'.cur');
        gulp.task('watch'+$i+'.'+$j+'.cur', function() {
            return gulp.watch($path+'.cur', ['runsequence'+$i]);
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
        open : true,
        proxy: basePath().search('local.woodoo')!=(-1) ? 'http://local.woodoo.com.br/'+$project+'/' : 'http://localhost/'+$project+'/'+$project+'/',
    });
});

gulp.task('default', $watch);
