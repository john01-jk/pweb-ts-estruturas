// Exercício 01: Situação do aluno no semestre
function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
// Os dados são inválidos se qualquer valor estiver fora da faixa (ou vazio, que vira NaN).
function dadosValidos(n1, n2, frequencia) {
    return !(Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(frequencia) ||
        n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || frequencia < 0 || frequencia > 100);
}
// A frequência é testada primeiro: abaixo de 75% reprova por falta, qualquer que seja a média.
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const nome = campoNome.value;
    const n1 = campoN1.valueAsNumber;
    const n2 = campoN2.valueAsNumber;
    const frequencia = campoFrequencia.valueAsNumber;
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.textContent = 'Dados inválidos';
        saida.className = 'erro';
        return;
    }
    const media = calcularMedia(n1, n2);
    const resultado = situacao(media, frequencia);
    saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
    saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
export {};
//# sourceMappingURL=ex01.js.map