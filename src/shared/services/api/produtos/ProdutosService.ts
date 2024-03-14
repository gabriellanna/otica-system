import { Environment } from "../../../environment";
import { Api } from "../axios-config";


export interface IListagemProduto {
  id: number;
  nome: string;
}

export interface IDetalheProduto {
  id: number;
  nome: string;
}

type TProdutoComTotalCount = {
  data: IListagemProduto[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TProdutoComTotalCount | Error | undefined> => {
  try {
    const urlRelativa = `/produtos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheProduto | Error> => {
  try {
    const { data } = await Api.get(`/produtos/${id}`);

    if (data) {
      return data
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
  }
};

const create = async (dados: Omit<IDetalheProduto, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheProduto>('/produtos', dados);

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const updateById = async (id: number, dados: IDetalheProduto): Promise<void | Error> => {
  try {
    await Api.put<IDetalheProduto>(`/produtos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheProduto>(`/produtos/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};


export const ProdutosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};