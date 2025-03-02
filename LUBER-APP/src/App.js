import React, { useState, useEffect } from 'react';
import FixedCosts from './components/FixedCosts';
import VariableCosts from './components/VariableCosts';
import TotalCosts from './components/TotalCosts';
import './styles.css';
import logo from './assets/logo.png';

function App() {
    const [fixedCosts, setFixedCosts] = useState({
        diasTrabalhados: "",
        gastofixo: "",
        ipva: "",
        seguro: "",
    });

    const [variableCosts, setVariableCosts] = useState({
        kmDiarios: "",
        kmPorLitro: "",
        precoCombustivel: "",
        custoManutencao: "",
        custoPneus: "",
        tempoSubstituicaoPneus: "",
        manutencaoEmergencia: "",
    });

    useEffect(() => {
        const handleWheel = (e) => {
            if (document.activeElement.type === 'number') {
                document.activeElement.blur();
            }
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleFixedCostChange = (e) => {
        const { id, value } = e.target;
        setFixedCosts((prev) => ({ ...prev, [id]: value }));
    };

    const handleVariableCostChange = (e) => {
        const { id, value } = e.target;
        let normalizedValue = value;
        if (id === "kmPorLitro") {
            normalizedValue = value.replace(",", ".");
        }
        setVariableCosts((prev) => ({ ...prev, [id]: normalizedValue }));
    };

    const calculateTotalCosts = () => {
        const diasTrabalhados = Number(fixedCosts.diasTrabalhados) || 0;
        const gastofixo = Number(fixedCosts.gastofixo) || 0;
        const ipva = Number(fixedCosts.ipva) || 0;
        const seguro = Number(fixedCosts.seguro) || 0;

        const kmDiarios = Number(variableCosts.kmDiarios) || 0;
        const kmPorLitro = Number(variableCosts.kmPorLitro) || 0;
        const precoCombustivel = Number(variableCosts.precoCombustivel) || 0;
        const custoManutencao = Number(variableCosts.custoManutencao) || 0;
        const custoPneus = Number(variableCosts.custoPneus) || 0;
        const tempoSubstituicaoPneus = Number(variableCosts.tempoSubstituicaoPneus) || 0;
        const manutencaoEmergencia = Number(variableCosts.manutencaoEmergencia) || 0;

        const totalFixed = diasTrabalhados > 0 ? (gastofixo / diasTrabalhados) + ((ipva / 12) / diasTrabalhados) + (seguro / diasTrabalhados) : 0;

        const gastoComCombustivel = kmPorLitro > 0 ? (kmDiarios / kmPorLitro) * precoCombustivel : 0;
        const gastoComRevisao = (custoManutencao / 10000) * kmDiarios;
        const gastoComPneus = tempoSubstituicaoPneus > 0 ? (custoPneus / tempoSubstituicaoPneus) * kmDiarios : 0;
        const manutencaoEmergencial = diasTrabalhados > 0 ? manutencaoEmergencia / diasTrabalhados : 0;

        const totalVariable = gastoComCombustivel + gastoComRevisao + gastoComPneus + manutencaoEmergencial;

        const totalDaily = totalFixed + totalVariable;
        const costPerKm = kmDiarios > 0 ? totalDaily / kmDiarios : 0;
        const paymentPerKm = costPerKm / 0.40;

        const metaDiaria = paymentPerKm * kmDiarios;
        const salarioMensal = (metaDiaria * diasTrabalhados) - (costPerKm * diasTrabalhados);

        return { totalDaily, costPerKm, paymentPerKm, metaDiaria, salarioMensal };
    };

    const { totalDaily, costPerKm, paymentPerKm, metaDiaria, salarioMensal } = calculateTotalCosts();

    return (
        <div className="container">
            <img src={logo} alt="LUBER Logo" className="logo" />
            <hr className="logo-separator" />
            <FixedCosts fixedCosts={fixedCosts} onChange={handleFixedCostChange} />
            <hr className="logo-separator" />
            <VariableCosts variableCosts={variableCosts} onChange={handleVariableCostChange} />
            <hr className="logo-separator" />
            <TotalCosts totalDaily={totalDaily} costPerKm={costPerKm} paymentPerKm={paymentPerKm} metaDiaria={metaDiaria} salarioMensal={salarioMensal}/>
        </div>
    );
}

export default App;