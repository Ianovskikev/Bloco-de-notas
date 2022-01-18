const { test, expect } = require('@jest/globals');
const Controller = require('../controller/NotaController.mjs');
const Notas= require('../domain/notas/Notas.js');

class MockNota {
    constructor(id) {
        this._id = '_' + id 
    }
    
    get id() {
        return this._id;
    }
}

class MockDocument {
    static selecionar(text) {
        return {value: text}
    }
}

class MockNotaView {
    update(id) {}
}

const notasConfig = [
    new MockNota(0), new MockNota(1),
    new MockNota(2), new MockNota(3)
]

const controllerConfig = {
    notaView: new MockNotaView(),
    selector: MockDocument,
    notas: new Notas([].concat(notasConfig)),
    notasView: new MockNotaView(),
}

test('Salvar nota', () => {
    const controllerConfig = {
        notaView: new MockNotaView(),
        selector: MockDocument,
        notas: new Notas([].concat(notasConfig)),
        notasView: new MockNotaView(),
    }

    let controller = new Controller(Object.assign({}, controllerConfig));
    const id = '_4';
    controller.salvarNota();
    let notas = controller._notas.paraArray();
    expect(notas[0].id).toEqual(id);
    expect(notas.filter(nota => nota.id == id)).toEqual([notas[0]])
})

test('Ler nota', () => {
    const controllerConfig = {
        notaView: new MockNotaView(),
        selector: MockDocument,
        notas: new Notas([].concat(notasConfig)),
        notasView: new MockNotaView(),
    }

    let controller = new Controller(Object.assign({}, controllerConfig));
    controller.lerNota('_3');
    expect(controller._notas.paraArray()).toEqual([notasConfig[3], notasConfig[0], notasConfig[1], notasConfig[2]]);
})

test('Update Nota', () => {
    const controllerConfig = {
        notaView: new MockNotaView(),
        selector: MockDocument,
        notas: new Notas([].concat(notasConfig)),
        notasView: new MockNotaView(),
    }

    let controller = new Controller(controllerConfig);
    const id = '_3';
    controller.lerNota(id);
    controller.updateNota(id);
    let notas = controller._notas.paraArray();
    expect(notas[0].id).toEqual(id);
    expect(notas.filter(nota => nota.id == id).length).toBe(1);
})
