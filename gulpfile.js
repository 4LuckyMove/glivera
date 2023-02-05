// Основні модулі
import gulp from "gulp";
// Імпорт шляхів
import { path } from "./gulp/config/path.js";
// Імпорт спільних плагинів
import { plugins } from "./gulp/config/plugins.js";

// Передаємо значення у глобальну змінну
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Імпорт завдань
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Спостерігач за зміннами у файлах
function watcher() {
    gulp.watch(path.watch.files, copy); // Для оновлення на сервері gulp.series(copy, ftp)
    gulp.watch(path.watch.html, html); // Для оновлення на сервері gulp.series(html, ftp)
    gulp.watch(path.watch.scss, scss); // Для оновлення на сервері gulp.series(scss, ftp)
    gulp.watch(path.watch.js, js); // Для оновлення на сервері gulp.series(js, ftp)
    gulp.watch(path.watch.images, images); // Для оновлення на сервері gulp.series(images, ftp)
}

export { svgSprive }

// Послідовне оброблення шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);


// Основні завдання
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Побудова сценаріїв виконання завдань
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Експорт сценаріїв
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Виконання сценарію за замовчуванням
gulp.task('default', dev);