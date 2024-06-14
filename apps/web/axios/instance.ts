import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://dadosabertos.camara.leg.br/api/v2',
})


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
}

export const getDeputados = async (): Promise<GetDeputadosResponse> => {
  const response = await axiosInstance.get('/deputados', {
    // params: {
    //   itens: 10,
    // },
  })
  return response.data
}