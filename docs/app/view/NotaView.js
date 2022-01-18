class NotaView {
    constructor(selecTitulo, selecTexto) {

        this._titulo = document.querySelector(selecTitulo);
        this._texto = document.querySelector(selecTexto);
    }

    update(model) {
        this._titulo.value = model.titulo;
        this._texto.value = model.texto;
    }
}

// export { NotaView }
