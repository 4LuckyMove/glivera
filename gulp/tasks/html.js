import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import nunjucks from "gulp-nunjucks";
import removeEmptyLines from "gulp-remove-empty-lines";
import htmlPrettify from "gulp-html-prettify";
import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        // HTML includes
        // .pipe(fileInclude())
        // Nunjucks
        // .pipe(nunjucks.compile())
        // .pipe(removeEmptyLines())
        // Jade/Pug
        .pipe(pug({
            pretty: app.isBuild ? true : false,
            verbose: app.isBuild ? false : true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(htmlPrettify({
            indent_char: ' ',
            indent_size: 4
        }))
        .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
        .pipe(app.plugins.if(app.isBuild, versionNumber({
            'value': '%DT%',
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js',
                ]
            },
            'output': {
                'file': 'gulp/version.json'
            }
        })))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}