import { useState } from "react";
import { fornecedores } from "../data/equipamentos";

export default function RegistroNota({ onSalvar }) {
  const [ritm, setRitm] = useState("");
  const [numero, setNumero] = useState("");
  const [fornecedor, setFornecedor] = useState("ZHAZ");

  function handleSubmit(event) {
    event.preventDefault();

    onSalvar({
      ritm: ritm.toUpperCase(),
      numero,
      fornecedor,
    });

    setRitm("");
    setNumero("");
  }

  return (
    <section className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-md border-t-4 border-green-600">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-5">
        1. Registrar Nota (RITM)
      </h2>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nº do Chamado (ex: CSAB0839924)"
          value={ritm}
          onChange={(e) => setRitm(e.target.value.toUpperCase())}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        />

        <input
          type="text"
          placeholder="Número da Nota (ex: 6565)"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        />

        <select
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 cursor-pointer text-gray-700"
        >
          {fornecedores.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="mt-2 w-full p-3 font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors active:scale-95 shadow-sm"
        >
          Salvar Nota / RITM
        </button>
      </form>
    </section>
  );
}