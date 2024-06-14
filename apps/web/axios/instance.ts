import axios from "axios";
import { treaty } from "@elysiajs/eden";
import { App } from "@repo/api/server"
// import { App } from "@repo/server/app";

const client = treaty<App>("localhost:3000");

export const getIndex = () => client.index.get();

export const doSomething = async () => {
  const response = await client.hi.get();
  console.log(response.data);
};



const axiosInstance = axios.create({
  baseURL: "https://dadosabertos.camara.leg.br/api/v2",
});

export interface ProfileData {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

type GetDeputadosResponse = {
  dados: ProfileData[];
};

export const getDeputados = async (): Promise<GetDeputadosResponse> => {
  const response = await axiosInstance.get("/deputados", {
    // params: {
    //   itens: 10,
    // },
  });
  return response.data;
};
