// Exercício 04: Meta de economia

type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

const formatarMeses = (meses: number): string => {
  const anos: number = Math.floor(meses / 12);
  const resto: number = meses % 12;

  const textoAnos: string = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses: string = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;

  if (anos === 0) {
    return textoMeses;
  }
  return resto === 0 ? textoAnos : `${textoAnos} e ${textoMeses}`;
};

interface ResultadoMeta {
  meses: number;
  saldo: number;
  depositado: number;
}

function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): ResultadoMeta {
  let saldo = 0;
  let meses = 0;
  let depositado = 0;

  while (saldo < meta) {
    if (meses >= 600) {
      break; // 50 anos: meta inalcançável
    }
    meses++;
    // Em todo mês 12, 24, 36... (dezembro) o depósito é o dobro (13º salário).
    const valorDoMes: number = meses % 12 === 0 ? deposito * 2 : deposito;
    saldo = saldo * (1 + taxa / 100) + valorDoMes;
    depositado += valorDoMes;
  }

  return { meses, saldo, depositado };
}

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const meta: number = campoMeta.valueAsNumber;
  const deposito: number = campoDeposito.valueAsNumber;

  if (Number.isNaN(meta) || Number.isNaN(deposito) || meta <= 0 || deposito <= 0) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  const resultado: ResultadoMeta =
    campoTaxa.value === ''
      ? calcularMeses(meta, deposito)
      : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);

  if (resultado.saldo < meta) {
    saida.textContent =
      'Meta inalcançável em 50 anos.\n' +
      exibirValor('Saldo após 600 meses', resultado.saldo, formatarReal);
    saida.className = 'erro';
    return;
  }

  const rendimento: number = resultado.saldo - resultado.depositado;
  const textoMeses = `${resultado.meses} ${resultado.meses === 1 ? 'mês' : 'meses'}`;

  saida.textContent =
    `Você atinge a meta em ${textoMeses} (${formatarMeses(resultado.meses)}).\n` +
    exibirValor('Saldo final', resultado.saldo, formatarReal) + '\n' +
    exibirValor('Total depositado', resultado.depositado, formatarReal) + '\n' +
    exibirValor('Rendimento', rendimento, formatarReal);
  saida.className = 'sucesso';
});
