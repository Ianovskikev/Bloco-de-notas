class NotasView {
    constructor(seletor, counterSeletor) {

        this._element = document.querySelector(seletor);
        this._counter = document.querySelector(counterSeletor);
    }

    update(model) {
        this._element.innerHTML = this.template(model);
        this._counter.innerHTML = this.contadorTemplate(model);
    }

    contadorTemplate(model) {
        return `
        <p class="notes-counter">Minhas notas
          <b id="notes-counter">${model.length}</b></p>
        `;
    }

    template(model) {
      return `${
        model.map(nota => `
        <div class="sideBar__item container">
          <div class="item__name" onclick="controller.lerNota.bind(controller)('${nota.id}')">
          ${nota.titulo? nota.titulo: nota.texto.slice(0, 10)}
          </div>
          <button id="item__exit" class="reset" onclick="controller.deletarNota.bind(controller)('${nota.id}')"><i class="ph-x"></i></button>
          <button id="item__settings" class="reset">
            <i class="ph-gear"></i>
          </button>
        </div>`).join('')
      }
      `
    }
}