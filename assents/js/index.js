
        //API GET
    fetch('http://localhost:8080/api/alunos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      adicionarLinha(data);
    })
    .catch(error => {
      console.log(error);
    });
    

  //Adicionar Linha na Tabela
  function adicionarLinha(dadosAPI){
      const tabela = document.getElementById('tabelaCorpo');
      dadosAPI.forEach(element => {   
        const linha = document.createElement('tr');
        //Adicionando HTML
        linha.innerHTML = `
          <tr>
          <td class="px-4 py-2">${element.id}</td>
              <td class="px-4 py-2">${element.nome}</td>
              <td class="px-4 py-2">${element.email}</td>
              <td class="px-4 py-2">
              <botton class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editar(this)">editar</buttom>
              <button  class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this)">remover</button></td>
          </tr>
        `;
        
        tabela.appendChild(linha);
      });
    }

    //botao editar 
    function editar(botao) {
      const linha = botao.closest('tr');
      const id = linha.children[0].textContent;
      const nomeAtual= linha.children[1].textContent;
      const emailAtual = linha.children[2].textContent;

      Swal.fire(`
        title: 'Editar aluno',
        html: 
        <input id="swal-nome" class="swal2-input" placeholder="Nome" value="${nomeAtual}">
          <input id="swal-email" class="swail2-input" placeholder="Nome" value="${nomeAtual}">
          `,
        
      }

    //Cadastrar Novas pessoas do formulario
    function cadastrar(){
      event.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      if(nome && email){
        //Adicionando Linha com nosso Cadastro
        this.adicionarLinha([{"nome":nome.trim(), "email":email.trim()}]);
        
        //Limpando os campos
        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";

        //API POST  
        fetch('http://localhost:8080/api/alunos', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"nome":nome, "email":email})
        })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        });
    ''

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cadastro feito com sucesso'
          });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falta dados para cadastar'
        });
      }
    }

    //Remover Alguma Linha da tabela
    function remover(dadosbotao){
      Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
            const linharemover = botao.closest('tr');
            linharemover.remove();
          Swal.fire('Confirmado!', '', 'success');
        } else {
          Swal.fire('Cancelado', '', 'info');
        }
      });

    }