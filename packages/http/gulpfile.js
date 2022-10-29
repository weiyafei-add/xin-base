const gulp = require('gulp');
const { buildTs }= require('../gulp-compile/index');

exports.default = () => buildTs({stream: gulp.src('./src/*.ts'), outDir: 'lib', modules: 'commonjs' });

