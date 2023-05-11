const axios = require("axios"); // Na primeira linha, importamos o módulo axios, que é uma biblioteca para fazer requisições HTTP.

async function buscaEnderecoPorCep(cep) {
  //Depois, definimos a função buscaEnderecoPorCep, que recebe um CEP como parâmetro.
  const url = `https://viacep.com.br/ws/${cep}/json/`; //Na terceira linha, construímos a URL da API ViaCep a partir do CEP informado.
  try {
    const resposta = await axios.get(url); //Em seguida, utilizamos o método get do módulo axios para fazer uma requisição HTTP para a URL construída. Usamos o await para aguardar a resposta da requisição.
    const { logradouro, complemento, bairro, localidade, uf } = resposta.data; //Na próxima linha, desestruturamos os campos logradouro, complemento, bairro, localidade e uf do objeto retornado pela API ViaCep.
    return { logradouro, complemento, bairro, cidade: localidade, uf }; //Então, criamos um objeto com os campos que desejamos retornar: logradouro, complemento, bairro, cidade e uf (note que renomeamos o campo localidade para cidade).
  } catch (erro) {
    if (erro.response && erro.response.status === 404) {
      throw new Error("CEP não encontrado"); //Caso a requisição HTTP retorne um erro 404 (CEP não encontrado), lançamos uma exceção com a mensagem "CEP não encontrado". Caso contrário, lançamos a exceção original.
    } else {
      throw erro;
    }
  }
}

module.exports = buscaEnderecoPorCep; //Por fim, exportamos a função buscaEnderecoPorCep, para que ela possa ser usada em outros módulos.
