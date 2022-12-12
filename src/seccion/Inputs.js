export const inputs = [
  {
    id: 3,
    name: "cuotas",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "Cuotas ($AR)",
    pattern: "^[0-9]+$",
    required: true,
  },
  {
    id: 1,
    name: "fPres",
    type: "date",
    errorMessage:
      "Solo numeros",
    label: "FPres ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 2,
    name: "fPago",
    type: "date",
    errorMessage:
      "Solo numeros",
    label: "FPago ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },

  {
    id: 4,
    name: "arancel",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "Arancel",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 5,
    name: "tna",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "TNA ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 6,
    name: "importe",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "Importe ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  }
];