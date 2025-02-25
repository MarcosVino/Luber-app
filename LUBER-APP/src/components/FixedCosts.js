import React from 'react';

function FixedCosts({ fixedCosts, onChange }) {
    return (
        <div>
            <h2>Custos Fixos</h2>
            <label>
                Quantos dias você trabalha por mês:
                <input type="number" id="diasTrabalhados" value={fixedCosts.diasTrabalhados} onChange={onChange} placeholder="20 (seg a sex)" />
            </label>
            <label>
                Parcelamento/Aluguel do Carro (caso seja carro proprio deixe vazio):
                <input type="number" id="gastofixo" value={fixedCosts.gastofixo} onChange={onChange} placeholder="R$ 0" />
            </label>
            <label>
                IPVA (caso seja alugado deixe vazio):
                <input type="number" id="ipva" value={fixedCosts.ipva} onChange={onChange} placeholder="R$ 0" />
            </label>
            <label>
                Seguro:
                <input type="number" id="seguro" value={fixedCosts.seguro} onChange={onChange} placeholder="R$ 0" />
            </label>
        </div>
    );
}

export default FixedCosts;