// Exercício 03: Simulador de parcelamento

const PARCELAS_NAO_OFERECIDAS: number[] = [7, 8, 9, 11];
const PARCELA_MINIMA = 50;

// Até 3 parcelas não há juros; a partir de 4, juros compostos de 2% ao mês.
function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * 1.02 ** parcelas;
}

// Devolve as linhas <tr>...</tr> da tabela de parcelamento.
function simularParcelamento(preco: number, entrada?: number): string {
  const financiado: number = typeof entrada !== 'undefined' ? preco - entrada : preco;
  let linhas = '';

  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    if (PARCELAS_NAO_OFERECIDAS.includes(parcelas)) {
      continue; // a loja não oferece essa quantidade
    }

    const total: number = calcularTotal(financiado, parcelas);
    const valorParcela: number = total / parcelas;

    if (valorParcela < PARCELA_MINIMA) {
      break; // as opções acabam
    }

    const juros: string = parcelas <= 3 ? 'sem juros' : '2% a.m.';
    linhas +=
      `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
      `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }

  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

botao.addEventListener('click', () => {
  const preco: number = campoPreco.valueAsNumber;
  corpoTabela.innerHTML = '';

  if (Number.isNaN(preco) || preco <= 0) {
    saida.textContent = 'Informe um preço válido';
    saida.className = 'erro';
    return;
  }

  let financiado: number = preco;
  let linhas: string;

  if (campoEntrada.value === '') {
    linhas = simularParcelamento(preco);
  } else {
    const entrada: number = campoEntrada.valueAsNumber;
    if (entrada < 0) {
      saida.textContent = 'A entrada não pode ser negativa';
      saida.className = 'erro';
      return;
    }
    if (entrada >= preco) {
      saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
      saida.className = 'sucesso';
      return;
    }
    financiado = preco - entrada;
    linhas = simularParcelamento(preco, entrada);
  }

  saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  saida.className = '';
  corpoTabela.innerHTML = linhas;

  if (linhas === '') {
    saida.textContent += `\nValor baixo demais: a parcela mínima é de R$ ${PARCELA_MINIMA.toFixed(2)}.`;
    saida.className = 'alerta';
  }
});
