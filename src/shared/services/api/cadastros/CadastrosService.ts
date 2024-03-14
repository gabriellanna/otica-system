import { Environment } from "../../../environment";
import { Api } from "../axios-config";


export interface IListagemCadastro {
  id: number;
  nome: string;
}

export interface IDetalheCadastro {
  id: number;
  nome: string;
}

type TCadastroComTotalCount = {
  data: IListagemCadastro[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCadastroComTotalCount | Error | undefined> => {
  try {
    const urlRelativa = `/cadastros?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCadastro | Error> => {
  try {
    const { data } = await Api.get(`/cadastros/${id}`);

    if (data) {
      return data
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
  }
};

const create = async (dados: Omit<IDetalheCadastro, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCadastro>('/cadastros', dados);

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const updateById = async (id: number, dados: IDetalheCadastro): Promise<void | Error> => {
  try {
    await Api.put<IDetalheCadastro>(`/cadastros/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheCadastro>(`/cadastros/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};


export const CadastrosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};