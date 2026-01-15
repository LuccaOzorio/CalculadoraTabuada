// Elementos DOM
const multiplicationForm = document.querySelector('#multiplication-form');
const numberInput = document.querySelector('#number');
const multiplicationInput = document.querySelector('#multiplicator');
const multiplicationTable = document.querySelector('#multiplication-operations');
const currentNumberSpan = document.querySelector('#current-number');

// Configurações
const MAX_MULTIPLICATOR = 100; // Limite para evitar sobrecarga

// Criar tabuada (mantendo estilo antigo)
function createTable(number, multiplicatorNumber) {
    // Limpar resultados anteriores
    multiplicationTable.innerHTML = '';

    // Validar limites
    if (multiplicatorNumber > MAX_MULTIPLICATOR) {
        showError(`O multiplicador máximo é ${MAX_MULTIPLICATOR}`);
        return;
    }

    // Atualizar número atual
    currentNumberSpan.textContent = number;

    // Criar as linhas da tabuada
    for (let i = 1; i <= multiplicatorNumber; i++) {
        const result = number * i;

        // Criar a linha como no estilo antigo
        const row = document.createElement('div');
        row.className = 'row fade-in';
        row.style.animationDelay = `${i * 0.03}s`;

        const operation = document.createElement('div');
        operation.className = 'operation';
        operation.textContent = `${number} × ${i} = `;

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.textContent = result;

        // Efeito sutil de entrada
        setTimeout(() => {
            resultDiv.style.transform = 'scale(1.1)';
            setTimeout(() => {
                resultDiv.style.transform = 'scale(1)';
            }, 100);
        }, i * 50);

        row.appendChild(operation);
        row.appendChild(resultDiv);
        multiplicationTable.appendChild(row);
    }

    // Efeito visual
    currentNumberSpan.classList.add('glowing');
    setTimeout(() => {
        currentNumberSpan.classList.remove('glowing');
    }, 1000);
}

// Mostrar mensagem de erro
function showError(message) {
    // Limpar erros anteriores
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Criar mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--accent);
        text-align: center;
        padding: 0.8rem;
        margin-top: 1rem;
        border: 1px solid var(--accent);
        border-radius: 6px;
        background: rgba(255, 0, 170, 0.1);
        font-weight: bold;
    `;

    multiplicationForm.appendChild(errorDiv);

    // Remover após 4 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                if (errorDiv.parentNode) errorDiv.remove();
            }, 500);
        }
    }, 4000);
}

// Validar entrada
function validateInput(number, multiplicator) {
    if (!number || number < 1) {
        showError("Por favor, insira um número válido (maior que 0)");
        return false;
    }

    if (!multiplicator || multiplicator < 1) {
        showError("Por favor, insira um multiplicador válido (maior que 0)");
        return false;
    }

    if (multiplicator > MAX_MULTIPLICATOR) {
        showError(`O multiplicador máximo é ${MAX_MULTIPLICATOR} para melhor performance`);
        return false;
    }

    return true;
}

// Inicializar evento do formulário
function initFormEvent() {
    multiplicationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const number = parseInt(numberInput.value, 10);
        const multiplicator = parseInt(multiplicationInput.value, 10);

        if (validateInput(number, multiplicator)) {
            createTable(number, multiplicator);
        }
    });
}

// Efeito nos inputs
function initInputEffects() {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.boxShadow = 'var(--neon-glow)';
        });

        input.addEventListener('blur', function () {
            this.style.boxShadow = 'none';
        });
    });
}

// Inicializar tabuada padrão
function initDefaultTable() {
    // Limpar a tabela e mostrar apenas a mensagem
    multiplicationTable.innerHTML = '<p>Informe um número para calcular uma tabuada...</p>';
    currentNumberSpan.textContent = '---';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    initFormEvent();
    initInputEffects();
    initDefaultTable();
});