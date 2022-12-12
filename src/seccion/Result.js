export const result =[
  {
    id: 1,
    name: "ImpuestoPrisma",
    type: "text",
    errorMessage:
      "OnlyNumber",
    label: "Monto Arancel ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 2,
    name: "Neto",
    type: "text",
    errorMessage:
      "OnlyNumber",
    label: "Valor Cuota ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 3,
    name: "Total",
    type: "text",
    errorMessage:
      "OnlyNumber",
    label: "Arancel Cuota ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 4,
    name: "Total",
    type: "text",
    errorMessage:
      "OnlyNumber",
    label: "Total Van ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  },
  {
    id: 5,
    name: "Total",
    type: "text",
    errorMessage:
      "OnlyNumber",
    label: "CF ($AR)",
    pattern: "^[0-9]+([.][0-9]+)?$",
    required: true,
  }
];