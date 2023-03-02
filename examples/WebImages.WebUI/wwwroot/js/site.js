class PhotoDeckCollection {
    constructor() {
        this.form$ = document.querySelector('#uploadForm');
        this.result$ = document.querySelector('#result');
        this.cards$ = document.querySelector('#images-collection');
    }

    registerFormSubmit() {
        this.form$.addEventListener('submit', (event) => this.onFormSubmit(event));
    }

    registerPhotosRemoveClick() {
        const photosCards$ = this.cards$.querySelectorAll('div[file-id]');
        for (let photocard$ of photosCards$) {
            const rmBtn$ = photocard$.querySelector('button');
            const fileId = photocard$.getAttribute('file-id');
            rmBtn$.addEventListener('click', () => this.onPhotoRemoveClick(photocard$, fileId));
        }
    }

    onPhotoRemoveClick(element, fileId) {

        fetch('/api/photo/' + fileId, {
            method: 'DELETE'
        })
        .then(() => {
            this.cards$.removeChild(element);
        })
        .catch(error => {
            this.result$.textContent = `Upload failed: ${error.message}`;
        });
    }

    onFormSubmit(event) {
        event.preventDefault();

        const fileInput = this.form$.querySelector('input[type="file"]');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('file', file);

        fetch('/api/photo', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(uploadResult => {
            const card$ = document.createElement('div');
            card$.setAttribute('file-id', uploadResult.fileId);
            card$.classList.add('card', 'position-relative', 'm-3');
            card$.innerHTML = `
            <button type="button" class="btn btn-danger position-absolute top-0 start-100 translate-middle rounded-circle">☓</button>
            <img class="card-img-top" width="300" height="250" src="${uploadResult.url}">
            `;
            this.cards$.appendChild(card$);

            this.registerPhotosRemoveClick();
        })
        .catch(error => {
            this.result$.textContent = `Upload failed: ${error.message}`;
        });
    }
}

const photoDeck = new PhotoDeckCollection();
photoDeck.registerFormSubmit();
photoDeck.registerPhotosRemoveClick();