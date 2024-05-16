'use client';

import { useState } from "react";
import ReactPlayer from "react-player";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, ref, string } from "yup";

interface IDataFormProps {
    name: string;
    age: number;
    height: number;
    currentWeight: number;
    desiredWeight: number;
    activityLevel: string;
}

const schema = object({
    name: string()
        .required("Campo Obrigatório")
        .min(3, "Deve conter pelo menos 3 caracteres"),
    age: number()
        .typeError("Por favor, insira um número válido")
        .positive("Deve ser um número positivo.")
        .integer("Deve ser um número inteiro.")
        .required("Campo Obrigatório"),
    height: number()
        .typeError("Por favor, insira um número válido")
        .positive("Deve ser um número positivo.")
        .integer("Deve ser um número inteiro.")
        .required("Campo Obrigatório"),
    currentWeight: number()
        .typeError("Por favor, insira um número válido")
        .positive("Deve ser um número positivo.")
        .integer("Deve ser um número inteiro.")
        .required("Campo Obrigatório")
        .min(ref("desiredWeight"), "O peso atual não pode ser menor que o peso desejado."),
    desiredWeight: number()
        .typeError("Por favor, insira um número válido")
        .positive("Deve ser um número positivo.")
        .integer("Deve ser um número inteiro.")
        .required("Campo Obrigatório"),
    activityLevel: string().required("Campo Obrigatório"),
});

export function Form() {
    const { register, handleSubmit: onSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [results, setResults] = useState<boolean>(false);
    const [gender, setGender] = useState<string>();
    const [genderError, setGenderError] = useState(false);
    const [dataUser, setDataUser] = useState<IDataFormProps>();

    console.log(dataUser?.name);

    function handleClickButtonForm() {
        if (!gender) {
            setGenderError(true);
            return;
        } else {
            setGenderError(false);
        }
    }

    function handleSubmitForm(data: any) {
        if (!gender) {
            setGenderError(true);
            return;
        } else {
            setGenderError(false);
            setDataUser(data);
            setResults(true);
            setGender('');
            reset();
        }
    }

    const diferenca = dataUser && dataUser?.currentWeight - dataUser?.desiredWeight;

    return (
        <>
            {results === false ? (
                <>
                    <h1 className="font-black uppercase text-4xl text-center">Você ganhou um teste gratuito</h1>
                    <p className="font-bold text-xl text-center">Responda as questões abaixo e veja quantos <span className="text-[#0E3DC1]">Kg</span> pode perder com <span className="text-[#0E3DC1]">OzempicNatural</span></p>
                    <div className="bg-[#0E3DC1] max-w-4xl p-6 mt-5 rounded">
                        <form className="flex flex-col gap-4 justify-center " onSubmit={onSubmit(handleSubmitForm)}>
                            <div className="flex flex-col">
                                <input type="text" placeholder="Nome" className="h-10 rounded px-2" id="name" {...register("name")} />
                                {errors.name && <span className="mt-1 text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <input type="number" placeholder="Idade" className="h-10 rounded px-2" id="age" {...register("age")} />
                                {errors.age && <span className="mt-1 text-red-500">{errors.age.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <input type="number" placeholder="Altura (cm)" className="h-10 rounded px-2" id="height" {...register("height")} />
                                {errors.height && <span className="mt-1 text-red-500">{errors.height.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <input type="number" placeholder="Peso atual" className="h-10 rounded px-2" id="currentWeight" {...register("currentWeight")} />
                                {errors.currentWeight && <span className="mt-1 text-red-500">{errors.currentWeight.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <input type="number" placeholder="Peso desejado" className="h-10 rounded px-2" id="desiredWeight" {...register("desiredWeight")} />
                                {errors.desiredWeight && <span className="mt-1 text-red-500">{errors.desiredWeight.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-center items-center gap-4">
                                    <label className="flex items-center gap-2 text-white">
                                        <input type="checkbox" value="Feminino" checked={gender === 'Feminino'} onChange={(e) => setGender(e.target.checked ? 'Feminino' : '')} />
                                        Feminino
                                    </label>
                                    <label className="flex items-center gap-2 text-white">
                                        <input type="checkbox" value="Masculino" checked={gender === 'Masculino'} onChange={(e) => setGender(e.target.checked ? 'Masculino' : '')} />
                                        Masculino
                                    </label>
                                </div>
                                {genderError && <span className="mt-1 text-red-500 text-center">Campo Obrigatório</span>}
                            </div>
                            <div className="flex flex-col">
                                <select className="h-10 rounded px-2" id="activityLevel" {...register("activityLevel")}>
                                    <option value="">Selecione o nível de atividade física</option>
                                    <option value="sedentario">Sedentário</option>
                                    <option value="leve">Leve (exercício leve 1-3 dias por semana)</option>
                                    <option value="moderado">Moderado (exercício moderado 3-5 dias por semana)</option>
                                    <option value="ativo">Ativo (exercício pesado 6-7 dias por semana)</option>
                                    <option value="muito-ativo">Muito Ativo (exercício pesado diariamente e trabalho físico)</option>
                                </select>
                                {errors.activityLevel && <span className="mt-1 text-red-500">{errors.activityLevel.message}</span>}
                            </div>
                            <button type="submit" onClick={handleClickButtonForm} className="bg-green-600 py-3 rounded text-white uppercase font-bold">Realizar Cálculo</button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-[#0E3DC1] max-w-4xl p-6 mt-5">
                        <h3 className="text-white text-2xl uppercase font-semibold mb-5 text-center">{dataUser ? `Olá ${dataUser.name && dataUser.name}, Veja agora o seu resultado:` : "Volte e preencha suas informações"}</h3>
                        <div>
                            {dataUser && results ? (
                                <div className="bg-white p-2 rounded">
                                    <h1 className="text-center text-2xl font-semibold">Você vai perder <span className="text-[#0E3DC1]">{diferenca}kg</span> em <span className="text-[#0E3DC1]">{diferenca && diferenca * 2}</span> dias com o OzempicNatural</h1>
                                    <div className="grid justify-center mt-2 mb-4">
                                        <p className="text-center mb-2 text-xl">Quer saber como? Assista o video abaixo!</p>
                                        <ReactPlayer url='https://www.youtube.com/watch?v=Il3UZXPrZlw' controls />
                                    </div>
                                    <button onClick={() => setResults(false)} className="bg-green-600 py-3 rounded text-white uppercase font-bold w-full">Fazer outro cálculo</button>
                                </div>
                            ) : (
                                <button onClick={() => setResults(false)} className="bg-green-600 py-3 rounded text-white uppercase font-bold w-full">Voltar</button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
