import { Environment } from "../../../environment";
import { Api } from "../axios-config";


export interface IListagemOrdensDeServico {
  id: number;
  nome: string;
}

export interface IDetalheOrdensDeServico {
  id: number;
  nome: string;
}

type TOrdensDeServicoComTotalCount = {
  data: IListagemOrdensDeServico[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TOrdensDeServicoComTotalCount | Error | undefined> => {
  try {
    const urlRelativa = `/ordensDeServicos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.')
  } catch (error) {
    
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalheOrdensDeServico | Error> => {
  try {
    const { data } = await Api.get(`/ordensDeServicos/${id}`);

    if (data) {
      return data
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
  }
};

const create = async (dados: Omit<IDetalheOrdensDeServico, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheOrdensDeServico>('/ordensDeServicos', dados);

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const updateById = async (id: number, dados: IDetalheOrdensDeServico): Promise<void | Error> => {
  try {
    await Api.put<IDetalheOrdensDeServico>(`/ordensDeServicos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheOrdensDeServico>(`/ordensDeServicos/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};


export const OrdensDeServicosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};