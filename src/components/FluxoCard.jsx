import React from "react";

function Circle({ className, children }) {
  return (
    <div
      className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center text-center font-bold z-10 p-2 break-words shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105 border-4 border-white ${className}`}
    >
      {children}
    </div>
  );
}

function LinhaSolida() {
  return (
    <div className="h-1.5 w-8 sm:w-16 bg-gradient-to-r from-gray-200 to-gray-300 z-0 -mx-3 shrink-0 rounded-full" />
  );
}

export default function FluxoCard({
  nota,
  problemas,
  onAdicionarInc,
  onExcluir,
}) {
  const ritmText = nota ? (
    <>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-60 block mb-0.5">
        Chamado
      </span>
      <span className="text-sm sm:text-base">{nota.ritm}</span>
    </>
  ) : (
    <span className="opacity-50">
      Aguardando
      <br />
      RITM
    </span>
  );

  const notaText = nota ? (
    <>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-60 block mb-0.5">
        Nota Fiscal
      </span>
      <span className="text-base sm:text-lg">{nota.numero}</span>
    </>
  ) : (
    <span className="opacity-50">
      Sem
      <br />
      Nota
    </span>
  );

  const ritmClass = nota
    ? "bg-gradient-to-br from-[#d8f1d3] to-[#bce5b3] text-green-900 shadow-green-100"
    : "bg-gray-50 border-dashed border-2 border-gray-300 text-gray-400 font-medium";

  const notaClass = nota
    ? "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 shadow-gray-200"
    : "bg-gray-50 border-dashed border-2 border-gray-300 text-gray-400 font-medium";

  const incClassFilled =
    "bg-gradient-to-br from-[#fdadad] to-[#fc9292] text-red-950 shadow-red-200 cursor-pointer hover:ring-4 hover:ring-red-200 group/inc transition-all";

  const incClassEmpty =
    "bg-gray-50 border-dashed border-2 border-gray-300 text-gray-400 font-medium";

  const equipamentos = [
    ...new Set(problemas.map((problema) => problema.descricao)),
  ];

  const probIds = problemas.map((problema) => problema.id);

  function excluir() {
    if (
      window.confirm(
        "Deseja excluir esta Nota e todos os INCs vinculados a ela?"
      )
    ) {
      onExcluir(nota?.id ?? null, probIds);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group">
      <div className="flex items-center justify-start sm:justify-center mb-8 mt-2 overflow-x-auto pb-4 pt-2 scrollbar-thin">
        <Circle className={ritmClass}>{ritmText}</Circle>

        <LinhaSolida />

        <Circle className={notaClass}>{notaText}</Circle>

        {problemas.length > 0 ? (
          problemas.map((problema) => (
            <React.Fragment key={problema.id}>
              <LinhaSolida />

              <Circle
                className={incClassFilled}
                onClick={() => onAdicionarInc(nota?.id, problema.descricao)}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-60 block mb-0.5">
                  Suporte
                </span>

                <span className="text-sm sm:text-base">{problema.inc}</span>

                {nota && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg shadow-lg opacity-0 group-hover/inc:opacity-100 transition-opacity z-20">
                    +
                  </div>
                )}
              </Circle>
            </React.Fragment>
          ))
        ) : (
          <>
            <LinhaSolida />

            <Circle className={incClassEmpty}>
              <span className="opacity-50">
                Aguardando
                <br />
                INC
              </span>
            </Circle>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/80 p-4 rounded-xl text-sm text-gray-600 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
          {equipamentos.length > 0 && (
            <span className="block sm:inline">
              <strong className="text-gray-700">Equipamento(s):</strong>{" "}
              {equipamentos.join(", ")}
            </span>
          )}

          {nota && (
            <span className="block sm:inline">
              <strong className="text-gray-700">Fornecedor:</strong>{" "}
              {nota.fornecedor}
            </span>
          )}

          {nota?.data && (
            <span className="block sm:inline">
              <strong className="text-gray-700">Data:</strong> {nota.data}
            </span>
          )}
        </div>

        <button
          className="w-full sm:w-auto shrink-0 px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 font-semibold transition-colors shadow-sm active:scale-95"
          onClick={excluir}
        >
          🗑️ Excluir Fluxo
        </button>
      </div>
    </div>
  );
}