const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const babel = require('gulp-babel');


const getBabelConfig = (modules) => {
    return {
        presets: [
            ["@babel/preset-env", {
                modules,
                targets: {
                    browsers: [
                        'last 2 versions',
                        'ie >= 11',
                    ],
                }
            },
            "@babel/preset-react",
            ]
        ],
    }
}


const buildTs = ({stream, outDir, modules}) => {
    const tsResult = stream.pipe(ts({
        "allowSyntheticDefaultImports": true,
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "node",
        "jsx": "preserve",
        "skipLibCheck": true,
        "noImplicitAny": false,
        "declaration": true
    }))
    const res = merge2([
        tsResult.js.pipe(babel(getBabelConfig(modules))).pipe(gulp.dest(outDir)),
        tsResult.dts.pipe(gulp.dest(outDir))
    ])

   return res.pipe(gulp.dest(outDir))
}

exports.default = () => buildTs({stream: gulp.src('./src/*.ts'), outDir: 'lib', modules: 'commonjs' });

