const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

// Compile SCSS to CSS
gulp.task("styles", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(rename("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// Copy HTML to dist
gulp.task("html", function () {
  return gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("src/images/**/*", { encoding: false })
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.stream());
});

// Watch files for changes
gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("styles"));
  gulp.watch("src/js/**/*.js", gulp.series("scripts"));
  gulp.watch("src/**/*.html", gulp.series("html"));
  gulp.watch("src/images/**/*", gulp.series("images"));
});

// Default task
gulp.task(
  "default",
  gulp.series("styles", "scripts", "html", "images", "watch")
);
