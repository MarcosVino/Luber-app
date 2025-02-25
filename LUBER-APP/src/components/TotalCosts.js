import React from 'react';

function TotalCosts({ totalDaily, costPerKm, paymentPerKm, metaDiaria, salarioMensal }) {
    return (
        <div class = "total-costs">
            <h2>Custos Totais</h2>
            <p>Total Diário: {totalDaily.toFixed(2)}</p>
            <p>Custo por Km: {costPerKm.toFixed(2)}</p>
            <p>Pagamento por Km: {paymentPerKm.toFixed(2)}</p>
            <p>Meta Diaria: {metaDiaria.toFixed(2)}</p>
            <p>seguindo a meta, no final do mes vc tera feito: {salarioMensal.toFixed(2)}</p>
        </div>
    );
}

export default TotalCosts;