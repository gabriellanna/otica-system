import { Environment } from "../../../environment";
import { Api } from "../axios-config";


export interface IListagemEstoque {
  id: number;
  nome: string;
}

export interface IDetalheEstoque {
  id: number;
  nome: string;
}

type TEstoqueComTotalCount = {
  data: IListagemEstoque[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TEstoqueComTotalCount | Error | undefined> => {
  try {
    const urlRelativa = `/estoques?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheEstoque | Error> => {
  try {
    const { data } = await Api.get(`/estoques/${id}`);

    if (data) {
      return data
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
  }
};

const create = async (dados: Omit<IDetalheEstoque, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheEstoque>('/estoques', dados);

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const updateById = async (id: number, dados: IDetalheEstoque): Promise<void | Error> => {
  try {
    await Api.put<IDetalheEstoque>(`/estoques/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheEstoque>(`/estoques/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};


export const EstoquesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};