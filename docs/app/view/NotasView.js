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
        return `
        <ul class="notes-list" >${
            model.map((nota, index) => `
            <li id="${nota.id}" class="notes-in-list">
            <p onclick="controller.lerNota.bind(controller)('${nota.id}')"><b>${index+1}-</b>${nota.titulo? nota.titulo: nota.texto.slice(0, 10)}</p>
           <div class="del-btn-container" onclick="controller.deletarNota.bind(controller)('${nota.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ni-del-btn-1">
              <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ni-del-btn-2">
              <path d="M3 8v16h18v-16h-18zm5 12c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm4-15.375l-.409 1.958-19.591-4.099.409-1.958 5.528 1.099c.881.185 1.82-.742 2.004-1.625l5.204 1.086c-.184.882.307 2.107 1.189 2.291l5.666 1.248z"/>
            </svg>
           </div>
          </li>
            `).join('')
        }
        </ul>
        `
    }
}