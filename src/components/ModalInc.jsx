import { useEffect, useState } from "react";

export default function ModalInc({
  aberto,
  equipamento,
  onClose,
  onSalvar,
}) {
  const [inc, setInc] = useState("");

  useEffect(() => {
    if (aberto) {
      setInc("");
    }
  }, [aberto]);

  if (!aberto) return null;

  function handleSubmit(event) {
    event.preventDefault();

    const novoInc = inc.trim().toUpperCase();

    if (!novoInc) return;

    onSalvar(novoInc);
    setInc("");
  }

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-transform duration-300"
        id="modal-content"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Adicionar Novo INC
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5 pb-4 border-b border-gray-100">
          Adicionando suporte para:
          <strong className="text-gray-800 block mt-1 text-base">
            {equipamento}
          </strong>
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label
            className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2"
            htmlFor="modal-input-inc"
          >
            Nº do Incidente
          </label>

          <input
            type="text"
            id="modal-input-inc"
            placeholder="Ex: INC123456"
            value={inc}
            onChange={(e) => setInc(e.target.value.toUpperCase())}
            required
            autoFocus
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 mb-6 text-gray-800 font-medium"
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors shadow-sm active:scale-95"
            >
              Salvar INC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}