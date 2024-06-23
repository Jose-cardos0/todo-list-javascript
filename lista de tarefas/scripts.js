const formElement = document.querySelector("#form");
const inputElement = document.querySelector("#form input");
const buttonElement = document.querySelector("#form button");
const listaElement = document.querySelector("#ul");
const repElement = document.querySelector("h1");

const tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

//evento de submissão
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  validarInput();
  incluirTarefasNaTela();
  salvarLocalStorage();
});

//validar preenchimento inputs

const validarInput = () => {
  let valor = inputElement.value;
  if (valor === "") {
    repElement.innerText = "Valores em branco não são aceitos...";
    setTimeout(() => {
      repElement.innerText = "Por favor, digite outro valor!";
      setInterval(() => {
        if (repElement.innerText === "Por favor, digite outro valor!") {
          repElement.innerText = "";
        }
      }, 4000);
    }, 3000);
    return false;
  } else {
    let adicionarTarefa = inputElement.value;
    tarefas.push(adicionarTarefa);
    inputElement.value = "";
    inputElement.focus();
  }

  console.log(tarefas);
};

//atribuir valores em tela

const incluirTarefasNaTela = () => {
  listaElement.innerHTML = "";

  for (const tarefa of tarefas) {
    let liElement = document.createElement("li");
    let liConteudo = document.createTextNode(tarefa + " ");
    liElement.appendChild(liConteudo);
    listaElement.appendChild(liElement);

    let ancoraElement = document.createElement("a");
    ancoraElement.setAttribute("href", "#");
    let valorAncora = document.createTextNode("x");
    ancoraElement.appendChild(valorAncora);
    liElement.appendChild(ancoraElement);

    let posicao = tarefas.indexOf(tarefa);
    ancoraElement.setAttribute("onclick", `removerTarefa(${posicao})`);
  }
};

incluirTarefasNaTela();

const removerTarefa = (posicao) => {
  tarefas.splice(posicao, 1);
  incluirTarefasNaTela();
  salvarLocalStorage();
};

const salvarLocalStorage = () => {
  localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
};
