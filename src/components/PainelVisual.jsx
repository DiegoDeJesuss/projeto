import FluxoCard from "./FluxoCard";

export default function PainelVisual({
  notasFiscais,
  problemas,
  filtroFornecedor,
  filtroEquipamento,
  onAdicionarInc,
  onExcluir,
}) {
  const fluxos = [];

  notasFiscais.forEach((nf) => {
    const problemasVinculados = problemas.filter((p) => p.nfId == nf.id);

    const passaFornecedor =
      filtroFornecedor === "TODOS" || nf.fornecedor === filtroFornecedor;

    const passaEquipamento =
      filtroEquipamento === "TODOS" ||
      problemasVinculados.some(
        (p) => p.descricao === filtroEquipamento
      );

    if (passaFornecedor && passaEquipamento) {
      fluxos.push({
        key: `nf-${nf.id}`,
        nota: nf,
        problemas: problemasVinculados,
      });
    }
  });

  const problemasOrfaos = problemas.filter((p) => !p.nfId);

  problemasOrfaos.forEach((problema) => {
    const passaFornecedor = filtroFornecedor === "TODOS";

    const passaEquipamento =
      filtroEquipamento === "TODOS" ||
      problema.descricao === filtroEquipamento;

    if (passaFornecedor && passaEquipamento) {
      fluxos.push({
        key: `prob-${problema.id}`,
        nota: null,
        problemas: [problema],
      });
    }
  });

  if (fluxos.length === 0) {
    return (
      <p className="text-center text-gray-400 italic py-8 bg-white rounded-xl border border-gray-200">
        Nenhum chamado atende ao filtro.
      </p>
    );
  }

  return (
    <>
      {fluxos.map((fluxo) => (
        <FluxoCard
          key={fluxo.key}
          nota={fluxo.nota}
          problemas={fluxo.problemas}
          onAdicionarInc={onAdicionarInc}
          onExcluir={onExcluir}
        />
      ))}
    </>
  );
}