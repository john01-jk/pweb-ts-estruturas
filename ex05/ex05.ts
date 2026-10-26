// Exercício 05: Caixa do mercado (projeto integrador)

type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

const MAX_ITENS = 20;

function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas: string[] = texto.split('\n');
  const precos: number[] = [];
  let ignorados = 0;

  for (let i = 0; i < linhas.length; i++) {
    const linha: string = linhas[i].trim();

    if (linha === '') {
      continue; // linhas vazias são ignoradas sem contar
    }

    const preco: number = Number(linha.replace(',', '.'));
    if (Number.isNaN(preco) || preco <= 0) {
      ignorados++;
      continue;
    }

    precos.push(preco);
    if (precos.length === MAX_ITENS) {
      break; // os itens seguintes são desconsiderados
    }
  }

  return { precos, ignorados };
}

function somarItens(...precos: number[]): number {
  let soma = 0;
  for (const preco of precos) {
    soma += preco;
  }
  return soma;
}

function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, desconto: number | string): number {
  if (typeof desconto === 'number') {
    return (total * desconto) / 100;
  }

  switch (desconto.trim().toUpperCase()) {
    case 'BEMVINDO':
      return (total * 10) / 100;
    case 'PROMO20':
      return (total * 20) / 100;
    case 'MENOS15':
      return total >= 100 ? 15 : 0;
    default:
      return 0;
  }
}

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const { precos, ignorados } = lerPrecos(campoItens.value);

  if (precos.length === 0) {
    saida.textContent = 'Nenhum item válido';
    saida.className = 'erro';
    return;
  }

  const subtotal: number = somarItens(...precos);
  const cupom: string = campoCupom.value.trim();
  const descontoCupom: number = cupom !== '' ? calcularDesconto(subtotal, cupom) : 0;
  const aposCupom: number = subtotal - descontoCupom;
  const descontoFidelidade: number = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
  const total: number = aposCupom - descontoFidelidade;

  let texto = `Itens: ${precos.length}`;
  if (ignorados > 0) {
    texto += ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
  }
  texto += '\n' + `Subtotal: ${formatarReal(subtotal)}`;

  if (cupom !== '') {
    texto += descontoCupom > 0
      ? `\nCupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`
      : '\nCupom inválido ou não aplicável';
  }
  if (campoFidelidade.checked) {
    texto += `\nFidelidade (5%): - ${formatarReal(descontoFidelidade)}`;
  }
  texto += `\nTotal a pagar: ${formatarReal(total)}`;

  saida.textContent = texto;
  saida.className = 'sucesso';
});
