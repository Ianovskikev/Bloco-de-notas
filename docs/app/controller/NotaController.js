// const Nota = require('../domain/nota/Nota.js')

const defaultConfig = {
    notaView: false,
    selector: false,
    notas: false,
    notasView: false,
}

class NotaController {
    constructor(config = defaultConfig) {

        let $ = config.selector.selecionar || document.querySelector.bind(document);

        this._titulo = $('#note-tile');
        this._texto = $('#editor');
        this._notas = config.notas || new Notas();
        this._notaView = config.notaView || new NotaView('#note-tile', '#editor');
        this._notaAtual = new Nota('_'+this._notas.nextId(), '', '')
        this._notaView.update(this._notaAtual);

        this._notasView = config.notasView || new NotasView('#notes-list', '#counter')

        this._notasView.update(this._notas.paraArray());
    }

    lerNota(id) {
        let nota = this._notas.obterNotaPorId(id);
        this._notas.delete(id)
        this._notas.add(nota)
        this._notaAtual = nota;
        this._notaView.update(nota)
        this._notasView.update(this._notas.paraArray())
    }

    deletarNota(id) {
        if (id == this._notaAtual.id) {
        this._notaAtual = new Nota('_'+this._notas.nextId(), '', '');
        this._notaView.update(this._notaAtual);
        }
        this._notas.delete(id);
        this._notasView.update(this._notas.paraArray());
    }

    exibirNovaNota() {
        this._notaAtual = this._notaAtual = new Nota('_'+this._notas.nextId(), '', '')
        this._notaView.update(this._notaAtual);
    }

    updateNota() {
        const id = this._notaAtual.id;
        let nota = new Nota(id, this._titulo.value, this._texto.value);
        this._notas.delete(id);
        this._notas.add(nota);
        this._notasView.update(this._notas.paraArray());
    }
}

// module.exports = NotaController
