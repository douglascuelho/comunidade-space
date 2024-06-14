document.addEventListener('DOMContentLoaded', () => {
    const listaAtividades = document.getElementById('lista-atividades');
    const novaAtividadeInput = document.getElementById('nova-atividade');
    const adicionarAtividadeBotao = document.getElementById('adicionar-atividade');

    adicionarAtividadeBotao.addEventListener('click', () => {
        const textoAtividade = novaAtividadeInput.value.trim();
        if (textoAtividade) {
            adicionarAtividade(textoAtividade);
            novaAtividadeInput.value = '';
        }
    });

    function adicionarAtividade(texto) {
        const itemAtividade = document.createElement('li');
        itemAtividade.className = 'atividade';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const textoAtividadeElemento = document.createElement('span');
        textoAtividadeElemento.textContent = texto;
        textoAtividadeElemento.addEventListener('dblclick', () => {
            textoAtividadeElemento.contentEditable = true;
            textoAtividadeElemento.focus();
        });

        textoAtividadeElemento.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                textoAtividadeElemento.blur();
            }
        });

        textoAtividadeElemento.addEventListener('blur', () => {
            textoAtividadeElemento.contentEditable = false;
        });

        const editarBotao = document.createElement('button');
        editarBotao.className = 'editar';
        editarBotao.textContent = ''; 

        const iconeEdit = document.createElement('img');
        iconeEdit.src = 'edit-button.png'; 
        iconeEdit.alt = 'Editar';
        editarBotao.appendChild(iconeEdit);

        editarBotao.addEventListener('click', () => {
            const novoTexto = prompt('Edite a atividade:', textoAtividadeElemento.textContent);
            if (novoTexto) {
                textoAtividadeElemento.textContent = novoTexto;
            }
        });

        const removerBotao = document.createElement('button');
        removerBotao.className = 'remover';
        removerBotao.textContent = ''; 

        const iconeRemover = document.createElement('img');
        iconeRemover.src = 'remove-button.png'; 
        iconeRemover.alt = 'Remover';
        removerBotao.appendChild(iconeRemover);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                textoAtividadeElemento.style.textDecoration = 'line-through';
            } else {
                textoAtividadeElemento.style.textDecoration = 'none';
            }
        });

        removerBotao.addEventListener('click', () => {
            listaAtividades.removeChild(itemAtividade);
        });

        itemAtividade.appendChild(checkbox);
        itemAtividade.appendChild(textoAtividadeElemento);
        itemAtividade.appendChild(editarBotao);
        itemAtividade.appendChild(removerBotao);

        listaAtividades.appendChild(itemAtividade);
    }
});
