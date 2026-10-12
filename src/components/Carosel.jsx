import projects from './projects';

class Carosel {
    constructor() {
        this.projIds = this.getIds();
        this.id = this.projIds[0];
        this.length = this.projIds.length - 1;
    }

    getIds() {
        let idArr = [];
        for (let i = 0; i < projects.length; i++) {
            for (let key in projects[i]) {
                if (key === 'id') {
                    idArr.push(projects[i]['id']);
                }
            }
        }
        return idArr;
    }

    scrollTo(id) {
        this.id = id;
        const el = document.getElementById(String(id));
        const box = document.querySelector(".projectBox");
        if (!el || !box) {
            return;
        }
        const left = el.getBoundingClientRect().left - box.getBoundingClientRect().left + box.scrollLeft;
        box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }

    right() {
        if (this.id === 101) {
            this.scrollTo(this.projIds[1]);
            return;
        }
        if (this.id === this.projIds[this.length]) {
            this.scrollTo(this.projIds[0]);
            return;
        }

        for (let i = 0; i <= this.length; i++) {
            if (this.id === this.projIds[i]) {
                this.scrollTo(this.projIds[i + 1]);
                return;
            }
        }
    }

    left() {
        if (this.id === 101) {
            this.scrollTo(this.projIds[this.length]);
            return;
        }
        if (this.id === this.projIds[this.length]) {
            this.scrollTo(this.projIds[this.length - 1]);
            return;
        }

        for (let i = 0; i <= this.length; i++) {
            if (this.id === this.projIds[i]) {
                this.scrollTo(this.projIds[i - 1]);
                return;
            }
        }
    }
}

export default Carosel;
