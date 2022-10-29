const gulp = require("gulp");
const merge2 = require("merge2");
const babel = require("gulp-babel");
const ts = require("gulp-typescript");
const getBabelConfig = require("./getBabelConfig");

const buildTs = ({ stream, outDir, modules }) => {
  const tsResult = stream.pipe(
    ts({
      allowSyntheticDefaultImports: true,
      target: "ESNext",
      module: "ESNext",
      moduleResolution: "node",
      jsx: "preserve",
      skipLibCheck: true,
      noImplicitAny: false,
      declaration: true,
    })
  );
  const res = merge2([
    tsResult.js.pipe(babel(getBabelConfig(modules))).pipe(gulp.dest(outDir)),
    tsResult.dts.pipe(gulp.dest(outDir)),
  ]);

  return res.pipe(gulp.dest(outDir));
};

exports.buildTs = buildTs;

exports.buildJs = function ({ stream, outDir, modules }) {
  return stream.pipe(babel(getBabelConfig(modules))).pipe(gulp.dest(outDir));
};
