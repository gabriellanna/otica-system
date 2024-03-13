import { Environment } from "../../../environment";
import { Api } from "../axios-config";


export interface ICellphone {
  id?: number;
  number: string;
  identificacao: string;
  main: boolean;
}
export interface IEmail {
  id?: number;
  email: string;
  identificacao: string;
  main: boolean;
}

export interface IListagemCliente {
  id: number;
  name: string;
  emails: IEmail[];
  cellphones: ICellphone[];
  address: string;
}

export interface IDetalheCliente {
  id?: number;
  name: string;
  emails: IEmail[];
  cellphones: ICellphone[];
  address: string;

  // id: number;
  // type: boolean;
  // name: string;
  // nickname: string;
  // birthDate: string;
  // cpf: string;
  // email: string;
  // cellphone: string;
  // address: string;
}

type TClienteComTotalCount = {
  data: IListagemCliente[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TClienteComTotalCount | Error | undefined> => {
  try {
    const urlRelativa = `/clientes?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {

    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalheCliente | Error> => {
  try {
    const { data } = await Api.get(`/clientes/${id}`);

    if (data) {
      return data
    }

    return new Error('Erro ao consultar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
  }
};

const create = async (dados: Omit<IDetalheCliente, 'id'>): Promise<number | Error | undefined> => {
  try {
    const { data } = await Api.post<IDetalheCliente>('/clientes', dados);

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const updateById = async (id: number, dados: IDetalheCliente): Promise<void | Error> => {
  try {
    await Api.put<IDetalheCliente>(`/clientes/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheCliente>(`/clientes/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar os registros.');
  }
};


export const ClientesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};