<script setup lang="ts">
const bulletPoints = [
  'Utilizar Vue 3, Typescript, Tailwind CSS, Vite, Axios, Jest e Tailwind Datatable',
  'Utilizar a API Balldontlie para buscar dados de jogadores da NBA',
  'Listagem de jogadores da NBA dentro de uma datatable',
  'Campo de busca dinâmico para filtrar o nome do jogador',
  'Mudança da ordem de exibição dos jogadores (A-Z | Z-A)',
  'Utilizar PROMISE para simular editar dados de qualquer jogador',
  'Utilizar PROMISE para simular deletar um dos jogadores da datatable (deve existir uma caixa de confirmação)',
  'Interface amigável e responsiva'
]
</script>

<template>
  <div class="about">
    <h1 class="text-2xl">{{  }}</h1>
    <p class="py-4">
      Este projeto foi desenvolvido baseado nos requerimentos do teste, que envolve uma aplicação Vue 3 utilizando a API Balldontlie para listar jogadores da NBA, e manipular dados de jogadores com funcionalidades de edição e exclusão.
    </p>
    <p class="py-4">
      O escopo do projeto inclui:
    </p>
    <ol>
      <li v-for="point in bulletPoints" class="py-1">{{ point }}</li>
    </ol>
    <p class="py-4">
      Como ponto bonus, foi oferecido a opção de utilizar SQLite para armazenar tudo localmente, simulações de mensagem de erro da API e utilizar Docker no projeto
    </p>
    <p class="py-4">
      Eu decidi que seria ideal criar um back-end pro projeto, e fazer toda a comunicação via API, então o projeto é separado em duas partes, frontend e backend.<br/>
      O backend primeiro checa se o banco de dados SQLITE já existe, e se não existir nenhum dado, ele popula utilizando a api Balldontlie, assim apenas um request é feito para a API externa.<br/>
      Para o backend, eu utilizei o Express.js para criar uma simples API RESTful, e utilizei padrões HTTP para as requisições, como GET, PUT e DELETE. Todos os endpoint possui mensagens de erro com o código correto para o frontend lidar<br/>
    </p>
    <p class="py-4">
      No frontend, os dados são todos manipulados pelo Pinia. Quando o usuário acessa o projeto, é feito um request para o backend para popular a lista de jogadores, e para evitar qualquer problema de desync, o frontend apenas atualiza a lista de jogadores se o backend retornar um status 200, apenas então o dado do jogador é alterada ou removida<br/>
    </p>
    <p class="py-4">
      Para a datatable, visto que não foi especificado uma biblioteca ou a instrução de desenvolvedor do zero além de utilizar Tailwind CSS, eu decidi utilizar o PrimeVue para esse componente em especifico, o tempo não iria permitir eu criar uma datatable do zero mas foi feita a habilitação do modo unstyled, e foi adicionado manualmente toda a estilização Tailwind CSS por cima.
    </p>
    <p class="py-4">
      Decidi por evitar a todo custo utilizar emits, pois acredito que o uso de stores é mais adequado para esse tipo de projeto, por isso pode ser observado duas stores, uma para a lista de jogadores e outra apenas para guardar o id do jogador que está sendo selecionado no momento. Assim consigo manter todos os componentes sincronizados com o estado atual do jogador e sem precisar passar props entre eles, permitindo qualquer alteração na ordem dos componentes sem quebrar a lógica do projeto, é perfeito para pequenos projetos que não possuem uma forte padronização de arquitetura para ser desenvolvido<br/>
    </p>
    <p class="py-4">
      O foco do design das páginas foi em ser simples e direto, eu não possuo muita experiencia em desenvolver uma tela no Figma ou similar e acho que levaria muito tempo para isso, então eu optei por fazer algo que seja apenas funcional.
    </p>
    <p class="py-4">
      Relacionado a testes, com o tempo limitado, eu não consegui tempo o suficiente para desenvolver na metodologia TDD, e no final, não consegui tempo para realizar, mesmo que eu tenha preparado o Docker para lidar com os testes e tenha arquivos já prontos para a criação dos testes.
    </p>
    <p class="py-4">O menor dispositivo testado foi o iPhone SE, e o maior foi uma tela Ultrawide de 34 polegadas</p>
    <p class="py-4">
      Problemas conhecidos:<br/>
      O backend de fato deleta o jogador, mas ainda retorna uma mensagem de erro por algum motivo, mesmo que de fato o jogador tenha sido deletado, então por isso eu removi no front a checagem de erros, e só irei assumir que o backend está funcionando como deveria. De qualquer forma o requerimento de simular deletar o jogador ira funcionar.<br/>
      O backend ao iniciar o projeto, acaba populando o banco mesmo que já tenha dados, a solução é simples mas eu não dei prioridade, visto que a funcionalidade não seria afetada
    </p>
    <p class="py-4">
      O que eu poderia ter feito diferente:<br/>
      Teria tentado programar utilizando TDD desde o inicio e ter implementado todos os testes, mas com a implementação do docker e do backend, as prioridades não alinharam para ter os testes prontos, eu preferi demonstrar o que consigo fazer com Docker acima de testes unitários, mesmo que em um projeto real eu teria colocado prioridade nos testes.<br/>
      Utilizar alguma outra biblioteca, achei o modo unstyled do PrimeVue meio problematico, e eu não iria utilizar nenhum estilo padrão deles, utilizar Tailwind era a prioridade. Por isso o espaço entre colunas não é consistente quando muda de página. Tentei implementar o Tailwind utilizando a documentação oficial deles porém notei que é um metodo que não funciona bem
    </p>
  </div>
</template>
