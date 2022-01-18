const { expect, test } = require('@jest/globals');
const Notas = require('../domain/notas/Notas.js')

class MockNota {
    constructor(id) {
        this._id = '_' + id 
    }
    
    get id() {
        return this._id;
    }
}

const config = [
    new MockNota(0), new MockNota(1),
    new MockNota(2), new MockNota(3)
]


test('Testar conversão para array', () => {
    let notas = new Notas([].concat(config));
    expect(notas.paraArray()).toEqual(config);
})


test('Deletar elemento', () => {
    let notas = new Notas([].concat(config));
    notas.delete('_3');
    expect(notas.paraArray()).toEqual([config[0], config[1], config[2]]);
})


test('Adicionar elemento', () => {
    let notas = new Notas([].concat(config));
    let nota = new MockNota(4);
    notas.add(nota);
    expect(notas.paraArray()).toEqual([nota].concat(config))
})


test('Obter nota por ID', () => {
    let notas = new Notas([].concat(config));
    let nota = notas.obterNotaPorId('_2');
    expect(nota).toEqual(config[2]);
})
