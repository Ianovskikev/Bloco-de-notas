class NotaView {
    constructor(selecTitulo, editor = CKEDITOR.instances.editor) {

        this._titulo = document.querySelector(selecTitulo);
        this._texto = editor;
    }

    update(model) {
        this._titulo.value = model.titulo;
        this._texto.setData(model.texto);
    }
}

// export { NotaView }
