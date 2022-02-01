let bancoDeDados;
let bancoDeDadosInicializado = false;
const nomeDoBancoDeDados = "dbpostreact";
const nomeDaLista = "listareact";

async function initBD() {
  if (!bancoDeDadosInicializado) {
    bancoDeDadosInicializado = true;      
    await criaBancoDeDados();
  }
}

function criaBancoDeDados() {
  return new Promise((resolve,reject) => {
    let requisicao = window.indexedDB.open(nomeDoBancoDeDados, 2);

    requisicao.onsuccess = (evento) => {
      bancoDeDados = requisicao.result;
      //console.log("banco de dados criado", evento, bancoDeDados);
      resolve();
    };

    requisicao.onupgradeneeded = (evento) => {
      bancoDeDados = evento.target.result;
      if (bancoDeDados.objectStoreNames.contains(nomeDaLista)) {
        return;
      }

      const objetoSalvo = bancoDeDados.createObjectStore(nomeDaLista, {
        keyPath: "id",
        autoIncrement: true,
      });

      objetoSalvo.createIndex("lembretereact", "lembretereact", {
        unique: false,
      });

      //console.log("houve um upgrade", evento)
    };

    requisicao.onerror = (evento) => {
      console.log("hove um erro", evento);
      reject();
    };

  });
}

export function salvarDadosIndexED(data) {
  let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");

  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

  let newItem = {
    title: data.title,
    message: data.message,
    date: data.date,
    checkList: data.checkList,
    editDate: "",
  };

  listaParaAdicionar.add(newItem);
  
}

export const deleteDataIndexED = (id) => {
  let localParaAdicionar = bancoDeDados.transaction(
    [nomeDaLista],
    "readwrite"
  );
  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

  listaParaAdicionar.delete(id);
};

export const updateDataIndexED = (updatedData) => {
  let localParaAdicionar = bancoDeDados.transaction(
    [nomeDaLista],
    "readwrite"
  );
  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);
  listaParaAdicionar.put(updatedData);
};

export async function fetchDataIndexED() {
  await initBD();
  const dataPromise = new Promise((resolve) => {
    
    var dados = [];

    let objetoGuardado = bancoDeDados
      .transaction(nomeDaLista)
      .objectStore(nomeDaLista);

    objetoGuardado.openCursor().onsuccess = (evento) => {
      const cursor = evento.target.result;

      if (cursor) {
        const title = cursor.value.title;
        const text = cursor.value.message;
        const checkList = cursor.value.checkList;
        const date = cursor.value.date;
        const id = cursor.value.id;
        const editDate = cursor.value.editDate;

        dados.push({
          id: id,
          title: title,
          message: text,
          checkList: checkList,
          date: date,
          editDate: editDate,
        });

        cursor.continue();
      } else {
        
        resolve(dados);
      }
    };
  });
  const returnedData = await dataPromise;
  return returnedData;
}
