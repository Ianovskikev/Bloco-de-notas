class Nota {
    constructor(_id, _titulo = 'Nota sem Título', _texto = '', _ultimaModificacao = new Date()) {
        Object.assign(this, {_id, _titulo, _texto, _ultimaModificacao})
    }

    get id() {
        return this._id;
    }

    get ultimaModificacao() {
        return this._data;
    }

    get titulo() {
        return this._titulo;
    }

    get texto() {
        return this._texto;
    }
}

// module.exports = Nota
