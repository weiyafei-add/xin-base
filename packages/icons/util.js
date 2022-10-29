const path = require("path");
const { Transform } = require("stream");
const { optimize } = require("svgo");
const Vinyl = require("vinyl");
require('')
const getComponentName = (basename) => {
  return basename.replace(/\b([a-z])/g, ($0, $1) =>
    $1.toUpperCase().replace("-", "")
  );
};

exports.createStream = function createStream(option) {
  const { code } = option;
  delete option.code;
  const stream = require("stream").Readable({ objectMode: true });
  stream._read = function () {
    this.push(
      new Vinyl({
        ...option,
        contents: Buffer.from(code),
      })
    );
    this.push(null);
  };

  return stream;
};

function transformReactComponent(data) {
  return `import React from 'react';
          import classNames from 'classnames';
          export default React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
            return <i ref={ref} {...props} className={classNames('xin-icon',props.className)} >${data}</i>
          })`;
}

const resetFilePath = (filePath, dirname = path.dirname(filePath)) => {
  const basename = path.basename(filePath, ".svg");
  const filename = getComponentName(basename) + ".tsx";
  return path.join(dirname, filename);
};

exports.svgToTsx = function svgToTsx() {
  const stream = new Transform({ objectMode: true });
  stream._transform = function (file, excoding, next) {
    if (path.extname(file.path) !== ".svg" || !file.contents.toString("utf8")) {
      return next(null, file);
    }
    if (file.isStream()) {
      return next(null, file);
    }
    if (file.isBuffer()) {
      const res = optimize(file.contents.toString("utf8"), {
        path: file.path,
        plugins: [
          {
            name: "preset-default",
          },
          "removeXMLNS",
          {
            name: "removeAttrs",
            params: {
              attrs: ["class", "width", "height", "fill", "aria-hidden"],
            },
          },
          {
            name: "addAttributesToSVGElement",
            params: {
              attributes: [
                { width: "1em" },
                { height: "1em" },
                { fill: "currentColor" },
                { "aria-hidden": true },
              ],
            },
          },
        ],
      });
      file.contents = Buffer.from(transformReactComponent(res.data));
      file.path = resetFilePath(file.path);
      return next(null, file);
    }
    return next(null);
  };
  return stream;
};

exports.getComponentName = getComponentName;

const fs = require("fs");

const statistics = (data) => {
  const fristStep = data
    .match(/[a-zA-Z]/g)
    .sort()
    .join("")
    .match(/(\w)\1+/g);
  return fristStep.map((item) => {
    const res = { letter: item[0], length: item.length };
    return res;
  });
};

function middleware() {
  const stream = new Transform({ objectMode: true });

  stream._transform = function (chunk, encoding, done) {
    const lines = chunk.toString().split(/\n/);
    let index = 1;
    while (lines.length) {
      const result = { line: index, statistics: statistics(lines.shift()) };
      this.push(result);
      index++;
    }
    done();
  };

  return stream;
}

fs.createReadStream("./text.txt", { encoding: "utf8" })
  .pipe(middleware())
  .on("data", (data) => {
    console.log(data);
  })
  .on("finish", () => {
    console.log(456);
  });
