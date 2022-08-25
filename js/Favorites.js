import { Githubuser } from './GithubUser.js'

//Aqui é onde os dados serão estruturados, onde recebe a lógica//
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root) // Nessa classse eu estou pegando meu app, no caso onde vou renderizar as tabelas

    this.load()

    Githubuser.search('diego3g').then(user => console.log(user))
  }

  load() {
    //Aqui são os dados para carregamento, no caso dados que eu recebo e tenho que carregar
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  //Função assincrona que recebe oq foi digitado no input, e insere no classe que consulta a API
  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login === username)

      if (userExists) {
        throw new Error('usuario já existe')
      }

      const user = await Githubuser.search(username)

      if (user.login === undefined) {
        throw new Error('usuario não encontrado')
      }

      this.entries = [user, ...this.entries] //operador spreed operator (estou pegando o user que é o novo usuario e estou jogando ele dentro do entries formando um novo array, imultabilidade!)

      this.update() //depois de adicionar temos que chamar o update.//
      this.save()
    } catch (error) {
      //eu uso o catch, Se não achar o promessa o vou execultar esse codigo a baixo,
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      entry => entry.login !== user.login //usando o filter para percorrer o array, e executando a função que nela eu comparo o login de do que está no array com oq está na tela, se retornar positivo ele vai apagar e retornar outro array atualizado sem o objeto que foi selecionadom.
    )
    this.entries = filteredEntries // Aqui estou atribuindo o array que fopi filtrado para o array principal, meio que substituindo o velho pelo novo atualizado//
    this.update() //para carregar novamente os dados
    this.save() //tenho que salvar no local storage para quando recarregar não está com os dados novamente, no caso ele salvar também oq foi deletado!
  }
}

//Classe que vai criar a visualização e ecentos do HTML//
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root) //o supper faz herdar tudo q tem no construtor da classe mãe!

    this.tbody = this.root.querySelector('table tbody')
    this.update()

    this.onadd()
    console.log('olá')
  }

  //função de ouvir o evento do botão e pegar oq está no input do botão
  onadd() {
    const addButton = this.root.querySelector('.button')

    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
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
      row.querySelector('.user a').href = `https://github.com/${user.login}`

      //Aqui estou acessando o botão remove, ouvindo o click dele e executando uma função, nessa função estou usando o confirm para me retornar verdadeiro ou falso, e armazenando isso em uma constante, e essa constando voou colocar em um if para dentro do if usar a lógica de deletar!
      row.querySelector('.remove').onclick = () => {
        const isok = confirm('Tem certeza que deseja deletar essa inha?')
        if (isok) {
          this.delete(user)
        }
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
