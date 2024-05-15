'use client'

import { useState } from "react"
import { useRouter } from 'next/router';


export function Form() {

    const [results, setResults] = useState<boolean>(false)
    const [nome, setNome] = useState<string>('')
    const [idade, setIdade] = useState<number>()
    const [altura, setAltura] = useState<number>()
    const [pesoAtual, setPesoAtual] = useState<number>()
    const [pesoDesejado, setPesoDesejado] = useState<number>()
    const [genero, setGenero] = useState<string>('')
    const [nivelAtividade, setNivelAtividade] = useState<string>('')
    const [diferenca, setDiferenca] = useState<number>()
    let NoInfo = false;


   

if(nome && idade && altura && pesoAtual && pesoDesejado) {
    NoInfo = true
    
} else {
    NoInfo = false
}

    function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setResults(true)
       if(pesoAtual && pesoDesejado) {
        setDiferenca(pesoAtual-pesoDesejado)
       }
    }

    return (
        <>
        {results === false ? (
            <>
            <h1 className="font-black uppercase text-4xl text-center">Você ganhou um teste gratuito</h1>
            <p className="font-bold text-xl text-center">Responda as questões abaixo e veja quantos <span className="text-[#0E3DC1]">Kg</span> pode perder com <span className="text-[#0E3DC1]">OzempicNatural</span></p>
            <div className="bg-[#0E3DC1] max-w-4xl p-6 mt-5">

                    <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmitForm}>
                        <input type="text" placeholder="Nome" className="h-10 rounded px-2" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="number" placeholder="Idade" className="h-10 rounded px-2" value={idade} onChange={(e) => setIdade(e.target.valueAsNumber)} />
                        <input type="number" placeholder="Altura (cm)" className="h-10 rounded px-2" value={altura} onChange={(e) => setAltura(e.target.valueAsNumber)} />
                        <input type="number" placeholder="Peso atual" className="h-10 rounded px-2" value={pesoAtual} onChange={(e) => setPesoAtual(e.target.valueAsNumber)} />
                        <input type="number" placeholder="Peso desejado" className="h-10 rounded px-2" value={pesoDesejado} onChange={(e) => setPesoDesejado(e.target.valueAsNumber)} />
                        <div className="flex justify-center items-center gap-4">
                            <label className="flex items-center gap-2 text-white">
                                <input type="checkbox" value="Feminino" checked={genero === 'Feminino'} onChange={(e) => setGenero(e.target.checked ? 'Feminino' : 'Masculino')} />
                                Feminino
                            </label>
                            <label className="flex items-center gap-2 text-white">
                                <input type="checkbox" value="Masculino" checked={genero === 'Masculino'} onChange={(e) => setGenero(e.target.checked ? 'Masculino' : 'Feminino')} />
                                Masculino
                            </label>
                        </div>
                        <select className="h-10 rounded px-2" value={nivelAtividade} onChange={(e) => setNivelAtividade(e.target.value)}>
                            <option value="">Selecione o nível de atividade física</option>
                            <option value="sedentario">Sedentário</option>
                            <option value="leve">Leve (exercício leve 1-3 dias por semana)</option>
                            <option value="moderado">Moderado (exercício moderado 3-5 dias por semana)</option>
                            <option value="ativo">Ativo (exercício pesado 6-7 dias por semana)</option>
                            <option value="muito-ativo">Muito Ativo (exercício pesado diariamente e trabalho físico)</option>
                        </select>
                        <button type="submit" className="bg-green-600 py-3 rounded text-white uppercase font-bold">Realizar Cálculo</button>
                    </form>
                    </div>
                    </>
        ) : (
            <>
         
                    <div className="bg-[#0E3DC1] max-w-4xl p-6 mt-5">
                        <h3 className="text-white text-3xl uppercase font-semibold mb-5">{NoInfo ? `Ola ${nome}, Veja agora o seu resultado:` : "Volte e preencha suas informações"}</h3>
                 
                            <div>
                             {diferenca ? (
                                <div className="bg-white p-2 rounded"> 
                                    <h1 className="text-center text-2xl font-semibold">Você vai perder <span className="text-[#0E3DC1]">{diferenca}kg</span> em <span className="text-[#0E3DC1]">{diferenca*2}</span> dias com o OzempicNatural</h1>
                                </div>
                             ): (
                                <button onClick={()=>setResults(false)} className="bg-green-600 py-3 rounded text-white uppercase font-bold w-full">VOLTAR</button>
                             )}
                            </div>
                        </div>
                        </>
        )}
        </>
    )
   
}