'use strict';

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
        'descriptions': descriptions[getRandom(0, 5)]
    };
    photos.push(photo);
    count++;
}

const template = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

photos.forEach((item) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').setAttribute('src', item.url);
    element.querySelector('.picture__stat--likes').textContent = item.likes;
    element.querySelector('.picture__stat--comments').textContent = item.comments;
    fragment.appendChild(element);
});

document.querySelector('.pictures').appendChild(fragment);
const bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');
const current = photos[0];
bigPicture.querySelector('.big-picture__img').setAttribute.src = current.url;
bigPicture.querySelector('.likes-count').textContent = current.likes;
bigPicture.querySelector('.comments-count').textContent = current.comments;
bigPicture.querySelector('.social__caption').textContent = current.descriptions;
bigPicture.querySelector('.social__comment img').setAttribute('src', `img/avatar-${getRandom(1, 6)}.svg`);
bigPicture.querySelector('.social__comment .social__text').textContent = comments[getRandom(0, 5)];

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

const fileUpload = document.querySelector('#upload-file');
const fileChange = document.querySelector('.img-upload__overlay');
const fileChangeClose = document.querySelector('.img-upload__cancel');

fileUpload.addEventListener('change', setUploadEvents);

function addHidden(evt) {
    if (evt.target === fileChangeClose) {
        if (evt.type === 'click' || evt.keyCode === 13 || evt.keyCode === 27) {
            evt.preventDefault();
            fileChange.classList.add('hidden');
            fileUpload.value = '';
        }
    } else {
        if (evt.keyCode === 27) {
            fileChange.classList.add('hidden');
            fileUpload.value = '';
        }
    }
}

function setUploadEvents() {
    fileChange.classList.remove('hidden');
    fileChangeClose.addEventListener('click', addHidden);
    fileChangeClose.addEventListener('keydown', addHidden);
    document.addEventListener('keydown', addHidden);
}