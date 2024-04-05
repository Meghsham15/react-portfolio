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

    right() {

        if (this.id === 101) {
            let pos = 1;
            // console.log(pos + ' ' + this.projIds[pos]);
            window.location.href = '#' + this.projIds[pos];
            this.id = this.projIds[pos];
            return;
        }
        if (this.id === this.projIds[this.length]) {
            let pos = 0;
            // console.log(pos + ' ' + this.projIds[pos]);
            window.location.href = '#' + this.projIds[pos];
            this.id = this.projIds[pos];
            return;
        }

        for (let i = 0; i <= this.length; i++) {
            if (this.id === this.projIds[i]) {
                let pos = i + 1;
                // console.log(pos + ' ' + this.projIds[pos]);
                window.location.href = '#' + this.projIds[pos];
                this.id = this.projIds[pos];
                return;
            }
        }

    }

    left() {
        if (this.id === 101) {
            let pos = this.length;
            // console.log(pos + ' ' + this.projIds[pos]);
            window.location.href = '#' + this.projIds[pos];
            this.id = this.projIds[pos];
            return;
        }
        if (this.id === this.projIds[this.length]) {
            let pos = this.length - 1;
            // console.log(pos + ' ' + this.projIds[pos]);
            window.location.href = '#' + this.projIds[pos];
            this.id = this.projIds[pos];
            return;
        }

        for (let i = 0; i <= this.length; i++) {
            if (this.id === this.projIds[i]) {
                let pos = i - 1;
                // console.log(pos + ' ' + this.projIds[pos]);
                window.location.href = '#' + this.projIds[pos];
                this.id = this.projIds[pos];
                return;
            }
        }


    }

};

export default Carosel;