if (!window.indexedDB) {
    window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
}

const dadosFic = [
    {titulo: 'a', texto: '1', date: new Date().setMonth(7)},
    {titulo: 'b', texto: '2', date: new Date().setMonth(8)},
]

class Nota {
    constructor(_id, _titulo, _texto) {
        Object.assign(this, {_id, _titulo, _texto})
    }

    get id() {
        return this._id;
    }

    get titulo() {
        return this._titulo;
    }

    get texto() {
        return this._texto;
    }
}

let db,
    dbName = 'BlocoDeNotas',
    objName = 'notas',
    titulo,
    texto,
    notaAtual = new Nota(0, '', '');

let request = window.indexedDB.open(dbName, 1);

request.onerror = function(event) {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
};

request.onsuccess = function(event) {

    db = request.result;
    titulo = document.querySelector('#note-tile')
    texto = CKEDITOR.instances.editor;

    document.querySelector('#salvar').addEventListener('click', () => {
        if (notaAtual.id == 0)
            dbAdd({titulo: titulo.value, texto: texto.getData()});
        else
            dbUpdate(notaAtual.id, {titulo: titulo.value, texto: texto.getData()})
        
        updateListaDeNotas()
    })

    document.querySelector('#note-creator').addEventListener('click', () => {
        notaAtual = new Nota(0, '', '');

        exibirNota();
    })

    exibirNota()
    updateListaDeNotas()
};

request.onupgradeneeded = function(event) {
    let db = event.target.result;

    let objectStore = db.createObjectStore(objName, { keyPath: "id", autoIncrement: true });
    objectStore.createIndex('date', 'date', {unique: true})

    // apenas para testes
    objectStore.transaction.oncomplete = function(event) {
        let clientesObjectStore = db.transaction(objName, "readwrite").objectStore(objName);
        for (let i in dadosFic) {
          clientesObjectStore.add(dadosFic[i]);
        }
    }
};

function dbAdd(nota) {
    let transaction = db.transaction([objName], "readwrite");

    transaction.oncomplete = function(event) {
        console.log("Pronto!");
    };

    let objectStore = transaction.objectStore(objName);
    const dadosDaNota = {
        titulo: nota.titulo,
        texto: nota.texto,
        date: new Date(),
    }
    const request = objectStore.add(dadosDaNota);
    request.onsuccess = function(event) {
        console.log('salvo com sucesso');
    }
}

function deleteNota(id) {
    dbDel(id);
    notaAtual = new Nota(0, '', '')
    exibirNota();
    updateListaDeNotas();
}

function exibirNota() {
    titulo.value = notaAtual.titulo;
    texto.setData(notaAtual.texto);
}

function dbDel(id) {
    const request = db.transaction([objName], "readwrite")
                .objectStore(objName)
                .delete(id);
    request.onsuccess = function(event) {
        console.log('deletado com sucesso')
    };
}

function dbGet(id) {
    let transaction = db.transaction([objName]);
    let objectStore = transaction.objectStore(objName);
    let request = objectStore.get(id);

    request.onerror = function(event) {
        alert('Houve algum erro')
    };
    request.onsuccess = function(event) {
        notaAtual = request.result
        exibirNota();
        dbUpdate(id, {titulo: notaAtual.titulo, texto: notaAtual.texto});
        updateListaDeNotas()
    };
}

function dbUpdate(id, newData) {
    let transaction = db.transaction([objName], 'readwrite');
    let objectStore = transaction.objectStore(objName);
    let request = objectStore.get(id);

    request.onsuccess = function(event) {
        let data = request.result;

        data.titulo = newData.titulo;
        data.texto = newData.texto;
        data.date = new Date();

        let requestUpdate = objectStore.put(data);

        requestUpdate.onsuccess = function(event) {
            console.log('atualizado com sucesso')
        };
    }
}


class NotasView {
    constructor(containerSeletor, counterSeletor) {

        this._element = document.querySelector(containerSeletor);
        this._counter = document.querySelector(counterSeletor);
    }
    
    update(model) {
        model = this._ordenarPorData(model);

        this._element.innerHTML = this._template(model);
        this._counter.innerHTML = this._contadorTemplate(model);
    }

    _ordenarPorData(model) {
        return model.sort((a, b) => b.date - a.date);
    }

    _contadorTemplate(model) {
        return `
        <p class="notes-counter">Minhas notas
          <b id="notes-counter">${model.length}</b></p>
        `;
    }

    _template(model) {
      return `${
        model.map((nota ,index) => `
        <div ${index? 'class="sideBar__item container"': 'class="sideBar__item sideBar__item--active container"'}>
          <div class="item__name" onclick="dbGet(${nota.id})">
          ${nota.titulo? nota.titulo: nota.texto.slice(0, 10)}
          </div>
          <button id="item__exit" class="reset" onclick="deleteNota(${nota.id})"><i class="ph-x"></i></button>
          <button id="item__settings" class="reset">
            <i class="ph-gear"></i>
          </button>
        </div>`).join('')
      }
      `
    }
}

const notasView = new NotasView('#notas', '#counter')

function updateListaDeNotas() {
    let objectStore = db.transaction(objName).objectStore(objName);

    objectStore.getAll().onsuccess = function(event) {
        let result =  event.target.result;

        notasView.update(result)
    }
}
