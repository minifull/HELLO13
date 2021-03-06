"use strict";

let gulp = require('gulp');
let vulcanize = require('gulp-vulcanize');

// 连接线上数据库
// ref: https://www.firebase.com/account/#/
let Firebase = require('firebase'),
    FIREBASE_URL = 'https://hello13.firebaseio.com/',
    fref = new Firebase(FIREBASE_URL);

gulp.task('getdata', () => {
    // Attach an asynchronous callback to read the data at our posts reference
    fref.on('value', (snapshot) => {
        console.log(snapshot.val());
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.code);
    });
});

gulp.task('setdata', () => {

    let data = require('./src/static/json/firebase-data.json');

    fref.set(data, (err) => {
        if (err) {
            console.log('Data of firebase update failed');
        } else {
            console.log('Data of firebase update succeeded');
        }
    });
});

gulp.task('vulcanize', () => {

    return gulp.src('src/static/elements/friend-list/index.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: true,
            inlineCss: true,
        }))
        .pipe(gulp.dest('src/static/elements/friend-list'));
});