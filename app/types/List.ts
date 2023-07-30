import type { Nullable } from "utils/types";

export interface Product {
  armazenamento: Nullable<string>;
  categoria: Nullable<string>;
  cor: Nullable<string>;
  descricao: Nullable<string>;
  inativo: boolean;
  marca: Nullable<string>;
  linkFoto: Nullable<string>;
  ram: Nullable<string>;
  valor: number;
}

export interface Link {
  nome: string;
  link: string;
}

export interface Tax {
  nomeMaquina: string;
  parcela1: number;
  parcela2: number;
  parcela3: number;
  parcela4: number;
  parcela5: number;
  parcela6: number;
  parcela7: number;
  parcela8: number;
  parcela9: number;
  parcela10: number;
  parcela11: number;
  parcela12: number;
}

export interface List {
  productList: Product[];
  links: Link[];
  taxes: Tax[];
  updateDate: string;
}
