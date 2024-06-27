// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const DEPUTADOS = "/deputados";
export const getDeputados = async (): Promise<GetDeputadosResponse> => {
	const response = await axiosInstance.get(DEPUTADOS, {
		params: {
			itens: 10,
		},
	});
	return response.data;
};

export const useDeputadoQuery = () => {
	return useQuery({
		queryKey: [DEPUTADOS],
		queryFn: () => getDeputados(),
	});
};

type Proposition = {
	id: number;
	uri: string;
	siglaTipo: "PL";
	codTipo: number;
	numero: number;
	ano: number;
	ementa: string;
};

const PROPOSITION = "/proposicoes";
export const getPropositions = async (): Promise<{ dados: Proposition[] }> => {
	const response = await axiosInstance.get(PROPOSITION, {
		params: {
			ordenarPor: "ano",
			ordem: "desc",
		},
	});
	return response.data;
};

export const usePropositionsQuery = () => {
	return useQuery({
		queryKey: [PROPOSITION],
		queryFn: () => getPropositions(),
	});
};
