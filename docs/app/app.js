let controller = new NotaController();

document.querySelector('#note-creator').addEventListener('click', controller.exibirNovaNota.bind(controller));
document.querySelector('.save').addEventListener('click', controller.updateNota.bind(controller))
// document.querySelector('.notes-in-list').addEventListener('click', controller.lerNota.bind(controller));
