# gulp-multidest

Equivalent of `gulp.dest(path)` with support of Array `path`.

## Install

```sh
npm i gulp-multidest -D
```

## Usage

```js
var gulp = require('gulp');
var gulp_dest = require('gulp-multi-dest');

var options = { mode: 0777 };

gulp.task('default', function() {
    return gulp.src('./src/*.js')
        // .pipe(process())
        .pipe(gulp_dest(['./dist/', './build/', './test/'], options))
    ;
});
```
