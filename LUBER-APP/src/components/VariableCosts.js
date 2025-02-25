import React from 'react';

function VariableCosts({ variableCosts, onChange }) {
    return (
        <div>
            <h2>Custos Variáveis</h2>
            <label>
                Quantos Km você roda por dia?:
                <input type="number" id="kmDiarios" value={variableCosts.kmDiarios} onChange={onChange} placeholder="0 Km" />
            </label>
            <label>
                Quantos Km por Litro seu carro faz?:
                <input type="number" id="kmPorLitro" value={variableCosts.kmPorLitro} onChange={onChange} placeholder="0 Km/L" />
            </label>
            <label>
                Preço do Combustível:
                <input type="number" id="precoCombustivel" value={variableCosts.precoCombustivel} onChange={onChange} placeholder="R$ 0" />
            </label>
            <label>
                Custo da revisão (a cada 10.000 km):
                <input type="number" id="custoManutencao" value={variableCosts.custoManutencao} onChange={onChange} placeholder="R$ 0" />
            </label>
            <label>
                Custo dos Pneus:
                <input type="number" id="custoPneus" value={variableCosts.custoPneus} onChange={onChange} placeholder="R$ 0" />
            </label>
            <label>
                Tempo de Substituição dos Pneus (em km):
                <input type="number" id="tempoSubstituicaoPneus" value={variableCosts.tempoSubstituicaoPneus} onChange={onChange} placeholder="0 km" />
            </label>
            <label>
                Reserva Para Manutenção Emergencial (valor mensal):
                <input type="number" id="manutencaoEmergencia" value={variableCosts.manutencaoEmergencia} onChange={onChange} placeholder="R$ 0" />
            </label>
        </div>
    );
}

export default VariableCosts;