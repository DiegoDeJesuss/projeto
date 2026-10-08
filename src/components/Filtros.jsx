import { equipamentosPorFornecedor } from "../data/equipamentos";

export default function Filtros({
  filtroFornecedor,
  setFiltroFornecedor,
  filtroEquipamento,
  setFiltroEquipamento,
}) {
  const equipamentos =
    filtroFornecedor === "TODOS"
      ? [...new Set(Object.values(equipamentosPorFornecedor).flat())]
      : equipamentosPorFornecedor[filtroFornecedor];

  function handleFornecedor(event) {
    const fornecedor = event.target.value;
    setFiltroFornecedor(fornecedor);

    if (
      filtroEquipamento !== "TODOS" &&
      fornecedor !== "TODOS" &&
      !equipamentosPorFornecedor[fornecedor]?.includes(filtroEquipamento)
    ) {
      setFiltroEquipamento("TODOS");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-gray-500 uppercase">
          Fornecedor:
        </label>

        <select
          value={filtroFornecedor}
          onChange={handleFornecedor}
          className="p-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer shadow-sm"
        >
          <option value="TODOS">Todos</option>
          <option value="ZHAZ">ZHAZ</option>
          <option value="ZEBRA">ZEBRA</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-gray-500 uppercase">
          Equipamento:
        </label>

        <select
          value={filtroEquipamento}
          onChange={(e) => setFiltroEquipamento(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer shadow-sm"
        >
          <option value="TODOS">Todos</option>

          {equipamentos.map((equipamento) => (
            <option key={equipamento} value={equipamento}>
              {equipamento}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}