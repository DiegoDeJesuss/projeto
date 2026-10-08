import { useState } from "react";
import Header from "./components/Header";
import RegistroNota from "./components/RegistroNota";
import ReportarEquipamento from "./components/ReportarEquipamento";
import Filtros from "./components/Filtros";
import PainelVisual from "./components/PainelVisual";
import ModalInc from "./components/ModalInc";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [notasFiscais, setNotasFiscais] = useLocalStorage(
    "notasFiscais",
    []
  );

  const [problemas, setProblemas] = useLocalStorage("problemas", []);

  const [filtroFornecedor, setFiltroFornecedor] = useState("TODOS");
  const [filtroEquipamento, setFiltroEquipamento] = useState("TODOS");

  const [modal, setModal] = useState({
    aberto: false,
    nfId: null,
    descricao: null,
  });

  function salvarNota(dados) {
    const novaNf = {
      id: Date.now(),
      ritm: dados.ritm,
      numero: dados.numero,
      fornecedor: dados.fornecedor,
      data: new Date().toLocaleString("pt-BR"),
    };

    setNotasFiscais((atual) => [novaNf, ...atual]);
  }

  function salvarProblema(dados) {
    const novoProblema = {
      id: Date.now(),
      inc: dados.inc,
      descricao: dados.descricao,
      nfId: dados.nfId,
    };

    setProblemas((atual) => [novoProblema, ...atual]);
  }

  function abrirModal(nfId, descricao) {
    if (!nfId) return;

    setModal({
      aberto: true,
      nfId,
      descricao,
    });
  }

  function fecharModal() {
    setModal({
      aberto: false,
      nfId: null,
      descricao: null,
    });
  }

  function salvarIncPeloModal(novoInc) {
    if (!novoInc || !modal.nfId) return;

    const novoProblema = {
      id: Date.now(),
      inc: novoInc,
      descricao: modal.descricao,
      nfId: String(modal.nfId),
    };

    setProblemas((atual) => [...atual, novoProblema]);
    fecharModal();
  }

  function excluirFluxo(nfId, probIds) {
    if (nfId) {
      setNotasFiscais((atual) =>
        atual.filter((nf) => nf.id != nfId)
      );
    }

    if (probIds?.length > 0) {
      setProblemas((atual) =>
        atual.filter((problema) => !probIds.includes(problema.id))
      );
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 mb-10">
        <RegistroNota onSalvar={salvarNota} />

        <ReportarEquipamento
          notasFiscais={notasFiscais}
          onSalvar={salvarProblema}
        />
      </main>

      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              Acompanhamento Visual
            </h2>
          </div>

          <Filtros
            filtroFornecedor={filtroFornecedor}
            setFiltroFornecedor={setFiltroFornecedor}
            filtroEquipamento={filtroEquipamento}
            setFiltroEquipamento={setFiltroEquipamento}
          />
        </div>

        <div className="flex flex-col gap-5">
          <PainelVisual
            notasFiscais={notasFiscais}
            problemas={problemas}
            filtroFornecedor={filtroFornecedor}
            filtroEquipamento={filtroEquipamento}
            onAdicionarInc={abrirModal}
            onExcluir={excluirFluxo}
          />
        </div>
      </section>

      <ModalInc
        aberto={modal.aberto}
        equipamento={modal.descricao}
        onClose={fecharModal}
        onSalvar={salvarIncPeloModal}
      />
    </>
  );
}