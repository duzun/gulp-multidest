/**
 * Gulp multidestination piping.
 *
 * @license  MIT
 * @author   Dumitru Uzun (DUzun.Me)
 * @version  1.0.2
 * @repo     https://github.com/duzun/gulp-multidest
 */

/* jshint node: true, -W041 */
var lazypipe    = require('lazypipe');
var gulp        = require('gulp');

const PLUGIN_NAME = 'gulp-multidest';

var forEach = [].forEach;
var filter  = [].filter;

module.exports = function multidest(paths, options) {
    // Ensure paths is an array
    if ( typeof paths == 'string' ) {
        paths = [paths];
    }

    // Clone `options` object, if provided
    var opt = Object.assign({}, options ||{});

    // Don't pipe twice to the same destination
    var uniq = {};
    paths = filter.call(paths, function (path) {
        if ( path == undefined ) return false;

        // normalize paths for comparison
        var _path = String(path).replace(/[\/\\]+/g, '/').replace(/^\.\/|\/$/g, '');
        if ( _path in uniq ) return false;
        uniq[_path] = path;
        return true;
    });

    // No paths, no dest
    if ( paths.length == 0 ) {
        throw new Error(PLUGIN_NAME + ': paths arguments is empty');
    }

    // If there is only one destination, just return gulp.dest(path, options)
    if ( paths.length == 1 ) {
        return gulp.dest(paths[0], opt);
    }

    var lazystream = lazypipe();
    forEach.call(paths, function (path) {
        lazystream = lazystream.pipe(gulp.dest, path, opt);
    });

    return lazystream();
};
