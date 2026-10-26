// Exercício 03: Simulador de parcelamento
const PARCELAS_NAO_OFERECIDAS = [7, 8, 9, 11];
const PARCELA_MINIMA = 50;
// Até 3 parcelas não há juros; a partir de 4, juros compostos de 2% ao mês.
function calcularTotal(valor, parcelas) {
    if (parcelas <= 3) {
        return valor;
    }
    return valor * 1.02 ** parcelas;
}
// Devolve as linhas <tr>...</tr> da tabela de parcelamento.
function simularParcelamento(preco, entrada) {
    const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
    let linhas = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        if (PARCELAS_NAO_OFERECIDAS.includes(parcelas)) {
            continue; // a loja não oferece essa quantidade
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < PARCELA_MINIMA) {
            break; // as opções acabam
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas +=
            `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
                `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const corpoTabela = document.getElementById('parcelas');
botao.addEventListener('click', () => {
    const preco = campoPreco.valueAsNumber;
    corpoTabela.innerHTML = '';
    if (Number.isNaN(preco) || preco <= 0) {
        saida.textContent = 'Informe um preço válido';
        saida.className = 'erro';
        return;
    }
    let financiado = preco;
    let linhas;
    if (campoEntrada.value === '') {
        linhas = simularParcelamento(preco);
    }
    else {
        const entrada = campoEntrada.valueAsNumber;
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
export {};
//# sourceMappingURL=ex03.js.map