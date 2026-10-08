import { useEffect, useState } from "react";
import { equipamentosPorFornecedor } from "../data/equipamentos";

export default function ReportarEquipamento({
  notasFiscais,
  onSalvar,
}) {
  const [inc, setInc] = useState("");
  const [fornecedor, setFornecedor] = useState("ZHAZ");
  const [descricao, setDescricao] = useState("Scanner de mão");
  const [nfId, setNfId] = useState("");

  const equipamentos = equipamentosPorFornecedor[fornecedor];

  useEffect(() => {
    if (!equipamentos.includes(descricao)) {
      setDescricao(equipamentos[0]);
    }
  }, [fornecedor, equipamentos, descricao]);

  const notasDisponiveis = notasFiscais;

  function handleSubmit(event) {
    event.preventDefault();

    onSalvar({
      inc: inc.toUpperCase(),
      descricao,
      nfId,
    });

    setInc("");
    setNfId("");
    setFornecedor("ZHAZ");
    setDescricao("Scanner de mão");
  }

  return (
    <section className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-md border-t-4 border-red-500">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-5">
        2. Reportar Equipamento (INC)
      </h2>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nº do Incidente (ex: INC3526565)"
          value={inc}
          onChange={(e) => setInc(e.target.value.toUpperCase())}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
        />

        <select
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 cursor-pointer text-gray-700"
        >
          {equipamentos.map((equipamento) => (
            <option key={equipamento} value={equipamento}>
              {equipamento}
            </option>
          ))}
        </select>

        <select
          value={nfId}
          onChange={(e) => setNfId(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 cursor-pointer text-gray-600"
        >
          <option value="">Vincular a uma Nota existente ...</option>

          {notasDisponiveis.map((nf) => (
            <option key={nf.id} value={nf.id}>
              {nf.ritm} | Nota: {nf.numero}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="mt-2 w-full p-3 font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors active:scale-95 shadow-sm"
        >
          Registrar Incidente
        </button>
      </form>
    </section>
  );
}