export const inputs = [
  {
    id: 3,
    name: "impuestoBruto",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "Cuotas ($AR)",
    pattern: "^[0-9]+$",
    required: true,
  },
  {
    id: 1,
    name: "tasa",
    type: "date",
    errorMessage:
      "Solo numeros",
    label: "FPres ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 2,
    name: "diasAdelantado",
    type: "date",
    errorMessage:
      "Solo numeros",
    label: "FPago ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },

  {
    id: 4,
    name: "porcentaje",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "Arancel",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 5,
    name: "cf",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "TNA ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 6,
    name: "promo",
    type: "text",
    errorMessage:
      "Solo numeros",
    label: "Importe ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  }
];