import React from 'react';

const CostDetails = ({ gastoComCombustivel, gastoComRevisao, gastoComPneus, manutencaoEmergencial, parcelas, IPVA, seguro }) => {
    return (
        <div className="cost-details">
            <h2>Detalhes dos Custos</h2>
            <hr className="logo-separator" />
            <p><strong>Parcelas por dia:</strong> R$ {parcelas.toFixed(2)}</p>
            <p><strong>Valor do IPVA por dia:</strong> R$ {IPVA.toFixed(2)}</p>
            <p><strong>Valor do SEGURO por dia:</strong> R$ {seguro.toFixed(2)}</p>
            <p><strong>Gasto com Combustível por km:</strong> R$ {gastoComCombustivel.toFixed(2)}</p>
            <p><strong>Gasto com Revisão por km:</strong> R$ {gastoComRevisao.toFixed(2)}</p>
            <p><strong>Gasto com Pneus por km:</strong> R$ {gastoComPneus.toFixed(2)}</p>
            <p><strong>Manutenção Emergencial por km:</strong> R$ {manutencaoEmergencial.toFixed(2)}</p>
            <hr className="logo-separator" />
            {/* <h2>Como são feitas as contas</h2>
            <hr className="logo-separator" />
            <p>Os custos são calculados com base nos seguintes fatores:</p>
            <ul>
                <li><strong>Combustível:</strong> Calculado com base no consumo de combustível (km por litro) e no preço do combustível. <strong>(Km rodados por dia / km por litro = litros de combustivel gasto, litro de combustivel gasto <strong>x</strong> valor do combustivel = gasto diario com combustivel).</strong></li>
                <li><strong>Revisão:</strong> Calculado com base no custo de manutenção dividido pela quilometragem total para a revisão.</li>
                <li><strong>Pneus:</strong> Calculado com base no custo dos pneus dividido pelo tempo de substituição dos pneus.</li>
                <li><strong>Manutenção Emergencial:</strong> Calculado com base no custo de manutenção emergencial dividido pelos dias trabalhados.</li>
                <li><strong>Custo Fixo:</strong> Inclui gastos fixos como IPVA, seguro e outros custos fixos divididos pelos dias trabalhados.</li>
            </ul> */}
        </div>
    );
};

export default CostDetails;