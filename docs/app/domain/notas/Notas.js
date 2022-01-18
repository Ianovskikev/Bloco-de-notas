class Notas {
    constructor(config) {
        this._notas = config || [];
        this._nextId = 0;
    }

    nextId() {
        return this._nextId;
    }

    obterNotaPorId(id) {
        let index = this._notas.findIndex(nota => nota.id == id);
        return this._notas[index];
    }

    add(nota) {
        this._notas.unshift(nota);
        this._nextId++;
    }

    delete(id) {
        let index = this._notas.findIndex(nota => nota.id == id);
        if (index != -1) {
            let notasAntigo = this._notas
            this._notas = notasAntigo.slice(0, index).concat(notasAntigo.slice(index+1));
        }
    }

    paraArray() {
        return [].concat(this._notas);
    }
}

// module.exports = Notas
