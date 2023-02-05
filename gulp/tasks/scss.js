import dartSass from "sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import rename from "gulp-rename"; // Перейменування файлу

import cleanCss from "gulp-clean-css"; // Стиснення CSS файла
import webpCss from "gulp-webpcss"; // Виведення зображення
import autoprefixer from "gulp-autoprefixer"; // Добавлення вендорних префіксів
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группування медіа запитів

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(app.isBuild, webpCss({
            webpClass: ".webp",
            noWebpClass: ".no-webp"
        })))
        .pipe(app.plugins.if(app.isBuild, autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        })))
        // Закоментувати якщо не потрібен стисненний дубль файла CSS
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(app.isBuild, cleanCss()))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}