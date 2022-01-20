let controller = new NotaController();

document.querySelector('#note-creator').addEventListener('click', controller.exibirNovaNota.bind(controller));
document.querySelector('#salvar').addEventListener('click', controller.updateNota.bind(controller))
