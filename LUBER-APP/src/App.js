import React, { useState, useEffect } from 'react';
import FixedCosts from './components/FixedCosts';
import VariableCosts from './components/VariableCosts';
import TotalCosts from './components/TotalCosts';
import CostDetails from './components/CostDetails';
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

    //cancela o scroll nos inputs

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

        //recebe os valores
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

        const totalDaily = totalFixed + totalVariable; //total diário
        const costPerKm = kmDiarios > 0 ? totalDaily / kmDiarios : 0; //custo por km
        const paymentPerKm = costPerKm / 0.40; //pagamento por km

        //calcula os valores finais

        const metaDiaria = paymentPerKm * kmDiarios;
        const salarioMensal = (metaDiaria * diasTrabalhados) - (costPerKm * diasTrabalhados);


        return { totalDaily, costPerKm, paymentPerKm, metaDiaria, salarioMensal, gastoComCombustivel, gastoComRevisao, gastoComPneus, manutencaoEmergencial, totalVariable, totalFixed, kmDiarios, gastofixo, diasTrabalhados, ipva, seguro };
    };

    const { totalDaily, costPerKm, paymentPerKm, metaDiaria, salarioMensal, gastoComCombustivel, gastoComRevisao, gastoComPneus, manutencaoEmergencial, totalVariable, totalFixed, kmDiarios, gastofixo, diasTrabalhados, ipva, seguro } = calculateTotalCosts();

    return (
        <>
            <div className="container">
                <img src={logo} alt="LUBER Logo" className="logo" />
                <hr className="logo-separator" />
                <FixedCosts fixedCosts={fixedCosts} onChange={handleFixedCostChange} />
                <hr className="logo-separator" />
                <VariableCosts variableCosts={variableCosts} onChange={handleVariableCostChange} />
                <hr className="logo-separator" />
                <TotalCosts totalDaily={totalDaily} costPerKm={costPerKm} paymentPerKm={paymentPerKm} metaDiaria={metaDiaria} salarioMensal={salarioMensal}/>
            </div>
            <CostDetails 
                seguro={(seguro / diasTrabalhados) || 0}
                IPVA={(ipva / 12) / diasTrabalhados || 0}
                parcelas={gastofixo / diasTrabalhados || 0}
                gastoComCombustivel={gastoComCombustivel / kmDiarios || 0}
                gastoComRevisao={gastoComRevisao / kmDiarios || 0}
                gastoComPneus={gastoComPneus / kmDiarios || 0}
                manutencaoEmergencial={manutencaoEmergencial / kmDiarios || 0}

                totalVariable={totalVariable}
                totalFixed={totalFixed}
                totalDaily={totalDaily}
                costPerKm={costPerKm}
                paymentPerKm={paymentPerKm}
                metaDiaria={metaDiaria}
                salarioMensal={salarioMensal}
            />
        </>
    );
}

export default App;