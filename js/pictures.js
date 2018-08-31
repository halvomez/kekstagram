'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

const photos = [];
const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё',
    'Хорошо бы убирать палец из кадра',
    'Не очень',
    'Горизонт завален',
    'Ужасный кадр'
];

const descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Огонь!',
    'Красота какая!'
];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let count = 1;
while (count <= 25) {
    const photo = {
        'url': `photos/${count}.jpg`,
        'likes': getRandom(15, 200),
        'comments': comments[getRandom(0, 5)],
        'descriptions': descriptions[getRandom(0, 5)],
        'mark': count
    };
    photos.push(photo);
    count++;
}

const template = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

photos.forEach((item) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').setAttribute('src', item.url);
    element.querySelector('.picture__img').classList.add(`${item.mark}`);
    element.querySelector('.picture__stat--likes').textContent = item.likes;
    element.querySelector('.picture__stat--comments').textContent = item.comments;
    fragment.appendChild(element);
});

document.querySelector('.pictures').appendChild(fragment);

const fileUpload = document.querySelector('#upload-file');
const fileUploadScale = document.querySelector('.img-upload__scale');
const fileChange = document.querySelector('.img-upload__overlay');
const fileChangeClose = document.querySelector('.img-upload__cancel');

fileUploadScale.classList.add('hidden');

fileUpload.addEventListener('change', setUploadEvents);

function hideFileChange() {
    fileChange.classList.add('hidden');
    fileUpload.value = '';
    document.removeEventListener('keydown', onPressEsc);
}

function onPressEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        hideFileChange();
    }
}

function onPressEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        hideFileChange();
    }
}

function setUploadEvents() {
    fileChange.classList.remove('hidden');
    fileChangeClose.addEventListener('click', hideFileChange);
    fileChangeClose.addEventListener('keydown', onPressEnter);
    document.addEventListener('keydown', onPressEsc);
}

const imagePreview = document.querySelector('.img-upload__preview');
const effectsPreview = document.querySelectorAll('.effects__preview');
effectsPreview.forEach((item) => {
    item.addEventListener('click', switchFilter);
});

function switchFilter(evt) {
    imagePreview.classList = 'img-upload__preview';
    imagePreview.classList.add(evt.target.classList[1]);
    if (imagePreview.classList[1] !== 'effects__preview--none') {
        fileUploadScale.classList.remove('hidden');
    } else {
        fileUploadScale.classList.add('hidden');
    }
}

const bigPicture = document.querySelector('.big-picture');
const photosPreview = document.querySelectorAll('.picture__img');
photosPreview.forEach((img) => {
    img.addEventListener('click', (evt) => {
        bigPicture.classList.remove('hidden');
        const current = photos[evt.target.classList[1] - 1];
        bigPicture.querySelector('.big-picture__img img').setAttribute('src', current.url);
        bigPicture.querySelector('.likes-count').textContent = current.likes;
        bigPicture.querySelector('.social__caption').textContent = current.descriptions;
        bigPicture.querySelector('.social__comment img').setAttribute('src', `img/avatar-${getRandom(1, 6)}.svg`);
        bigPicture.querySelector('.social__comment .social__text').textContent = comments[getRandom(0, 5)];
        bigPicture.querySelector('.social__loadmore').classList.add('hidden');
    });
});
