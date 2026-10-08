# Fluxo de Chamados e Notas Fiscais — React

Conversão do projeto HTML original para React + Vite.

## Requisitos

- Node.js instalado
- npm

## Instalação

```bash
npm install
```

## Executar

```bash
npm run dev
```

Depois abra o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

## Build de produção

```bash
npm run build
```

## Estrutura

```text
src/
├── components/
│   ├── Filtros.jsx
│   ├── FluxoCard.jsx
│   ├── Header.jsx
│   ├── ModalInc.jsx
│   ├── PainelVisual.jsx
│   ├── RegistroNota.jsx
│   └── ReportarEquipamento.jsx
├── data/
│   └── equipamentos.js
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── fluxoUtils.js
├── App.jsx
├── index.css
└── main.jsx
```

## Persistência

A aplicação continua usando `localStorage`, mantendo as chaves:

- `notasFiscais`
- `problemas`

Isso permite migrar posteriormente para uma API/banco de dados sem precisar refazer a interface.
