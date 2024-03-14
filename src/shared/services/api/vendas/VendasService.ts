import { Environment } from "../../../environment";
import { Api } from "../axios-config";


export interface IListagemVenda {
  id: number;
  nome: string;
}

export interface IDetalheVenda {
  id: number;
  nome: string;
}

type TVendaComTotalCount = {
  data: IListagemVenda[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TVendaComTotalCount | Error | undefined> => {
  try {
    const urlRelativa = `/vendas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheVenda | Error> => {
  try {
    const { data } = await Api.get(`/vendas/${id}`);

    if (data) {
      return data
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
  }
};

const create = async (dados: Omit<IDetalheVenda, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheVenda>('/vendas', dados);

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const updateById = async (id: number, dados: IDetalheVenda): Promise<void | Error> => {
  try {
    await Api.put<IDetalheVenda>(`/vendas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheVenda>(`/vendas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};


export const VendasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};