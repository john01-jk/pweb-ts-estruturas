// Exercício 05: Caixa do mercado (projeto integrador)
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
const MAX_ITENS = 20;
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha === '') {
            continue; // linhas vazias são ignoradas sem contar
        }
        const preco = Number(linha.replace(',', '.'));
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
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
function calcularDesconto(total, desconto) {
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
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = campoCupom.value.trim();
    const descontoCupom = cupom !== '' ? calcularDesconto(subtotal, cupom) : 0;
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
    const total = aposCupom - descontoFidelidade;
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
export {};
//# sourceMappingURL=ex05.js.map