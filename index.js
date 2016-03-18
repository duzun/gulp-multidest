/**
 * Gulp multidestination piping.
 *
 * @license  MIT
 * @author   Dumitru Uzun (DUzun.Me)
 * @version  1.0.1
 * @repo     https://github.com/duzun/gulp-multidest
 */

/* jshint node: true, -W041 */
var PLUGIN_NAME = 'gulp-multidest';
var lazypipe    = require('lazypipe');
var gulp        = require('gulp');

module.exports = function multidest(paths, options) {
    var lazystream = lazypipe();

    // Ensure paths is an array
    if ( typeof paths == 'string' ) {
        paths = [paths];
    }

    // Clone `options` object, if provided
    var opt = Object.assign({}, options ||{});


    // Don't pipe twice to the same destination
    var uniq = {};

    paths.forEach(function (path, idx) {
        if ( path == undefined ) return;

        // normalize paths for comparison
        var _path = String(path).replace(/[\/\\]+/g, '/').replace(/^\.\/|\/$/g, '');
        if ( _path in uniq ) return;
        uniq[_path] = path;

        lazystream = lazystream.pipe(gulp.dest, path, opt);
    });

    return lazystream();
};
