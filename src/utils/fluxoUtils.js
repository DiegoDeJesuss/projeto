export function obterProblemasVinculados(problemas, nfId) {
  return problemas.filter((problema) => problema.nfId == nfId);
}

export function equipamentoPassaNoFiltro(problemas, filtroEquipamento) {
  if (filtroEquipamento === "TODOS") return true;

  return problemas.some(
    (problema) => problema.descricao === filtroEquipamento
  );
}