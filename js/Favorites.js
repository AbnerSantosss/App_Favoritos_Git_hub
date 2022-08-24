export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root) // Nessa classse eu estou pegando meu app, no caso onde vou renderizar as tabelas

    this.load()
  }

  load() {
    //Aqui são os dados para carregamento, no caso dados que eu recebo e tenho que carregar
    this.entries = [
      {
        login: 'maykbrito',
        name: 'mayk brito',
        public_repos: '76',
        followers: '75'
      },
      {
        login: 'abnersantos',
        name: 'mayk brito',
        public_repos: '75',
        followers: '250'
      }
    ]
  }
}

//Classe que vai criar a visualização e ecentos do HTML//
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root) //o supper faz herdar tudo q tem no construtor da classe mãe!

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    //FUNÇÃO UPDATE É A PRINCIAPL, NELA VAMOS TER OUTRAS FUNÇÕES//
    this.removeAlltr() //Função sendo chamada pra remover os trs(as linhas)

    this.entries.forEach(user => {
      //passando of renche para percorrer o objeto e em cada posição dele eu queuro que exercute a posição a baixo.
      const row = this.createRow() //Aqui estou criando uma linha para cada posição!

      //Aqui em baixo eu estou alterando os dados da estrutura que ´pe receboida pela função create row

      //Aqui estou alterando os dados, pegando a estrutura da row e alterando dos dados que vem da função load(), no caso o entries é o objeto que tem os dados dentro dessa função
      row.querySelector(
        '.user img'
      ).src = `https://github.com/${user.login}.png`

      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user img').alt = `imagem de ${user.name}`
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      //Aqui estou acessando o botão remove, ouvindo o click dele e executando uma função, nessa função estou usando o confirm para me retornar verdadeiro ou falso, e armazenando isso em uma constante, e essa constando voou colocar em um if para dentro do if usar a lógica de deletar!
      row.querySelector('.remove').onclick = () => {
        const isok = confirm('Tem certeza que deseja deletar essa inha?')
      }

      this.tbody.append(row) //append é uma funcionalidade nativa, que recebe um elemento html criado com a DOM, para renderizar esse elemento
    })
  }

  createRow() {
    const tr = document.createElement('tr') // Aqui estou criando um elemento html pela dom!
    tr.innerHTML = `

          <td class="user">
            <img
              src="https://avatars.githubusercontent.com/u/107922389?s=400&u=d3c34939c53eca72f562272447710d988834e90b&v=4"
              alt="imagem de perfil abner">
            <a href="https://github.com/AbnerSantosss" target="_blank">
              <p>Abner Santos</p>
              <span>AbnerSantonsss</span>
            </a>
          </td>
          <td class="repositories">777</td>
          <td class="followers">9589</td>
          <td><button class="remove">Remover</button></td>
       
  `

    return tr // Vamos retornar o tr pq vamos usar para poder acessar os dados html que tem dentro dela
  }

  removeAlltr() {
    //Essa função vai remover todos os TRS quanfo for executada!

    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    }) //aqui estou pegando todas as linhas que tem no tbody no caso as tr, passando o forEach, para cada posição eu tô executando oq tem dentro do forEach!
  }
}
