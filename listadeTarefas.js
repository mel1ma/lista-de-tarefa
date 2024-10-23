function abrirModal(){ 
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

async function buscarTarefas(){
    try {
        const response = await fetch("http://localhost:3000/tarefas");
        const listaDeTarefas = await response.json();
        inserirTarefas(listaDeTarefas);
    } catch (erro) {
        console.error("Erro ao buscar tarefas:", erro);
    }
}
buscarTarefas();

function inserirTarefas(listaDeTarefas) {
    lista.innerHTML = "";

    listaDeTarefas.forEach(tarefa => {
        const li = document.createElement("li");

        const titulo = document.createElement("h5");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;

        const divActions = document.createElement("div");
        divActions.classList.add("actionss");

        const botaoDeletar = document.createElement("box-icon");
        botaoDeletar.setAttribute("type", "solid");
        botaoDeletar.setAttribute("name", "trash");
        botaoDeletar.setAttribute("size", "sm");

        botaoDeletar.addEventListener("click", () => apagarTarefa(tarefa.id));

        divActions.appendChild(botaoDeletar);

        li.appendChild(titulo);
        li.appendChild(descricao);
        li.appendChild(divActions);

        lista.appendChild(li);
    });
}

async function addTarefa() {
    const tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    };

    try {
        const response = await fetch("http://localhost:3000/tarefas", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(tarefa)
        });

        const novaTarefa = await response.json();
        fecharModal();
        buscarTarefas();
    } catch (erro) {
        console.error("Erro ao adicionar tarefa:", erro);
    }
}

async function apagarTarefa(id) {
    try {
        await fetch(`http://localhost:3000/tarefas/${id}`, {
            method: "DELETE"
        });

        alert("Tarefa deletada");
        buscarTarefas();
    } catch (erro) {
        console.error("Erro ao deletar a tarefa:", erro);
    }
}

function pesquisarTarefas(){
    let lis = document.querySelectorAll("ul li");
    if(busca.value.length >0){
        lis.forEach(li => {
            if(li.children[0].innerText.includes(busca.value)){
                li.classList.remove('oculto');
            }else{
                li.classList.add('oculto');
            }
        })
    } else{
        lis.forEach(li => {
            li.classList.remove('oculto');
        })
    }
}