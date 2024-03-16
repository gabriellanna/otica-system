import { Routes, Route, useNavigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
    Dashboard,
    DetalheDePessoas,
    ListagemDePessoas,
    DetalheDeCidades,
    ListagemDeCidades,
    ListagemDeClientes,
    DetalheDeClientes,
    NovoCliente,
    ListagemDeProdutos,
    DetalheDeProdutos,
    ListagemDeOrdensDeServicos,
    DetalheDeOrdensDeServicos,
    ListagemDeVendas,
    DetalheDeVendas,
    ListagemDeEstoques,
    DetalheDeEstoques,
    ListagemDeCadastros,
    DetalheDeCadastros,
} from "../pages";

export const AppRouters = () => {

    const { setDrawerOptions } = useDrawerContext();
    const Nav = useNavigate();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial'
            },
            {
                icon: 'people',
                path: '/clientes',
                label: 'Clientes'
            },
            {
                icon: 'local_grocery_store',
                path: '/produtos',
                label: 'Produtos'
            },
            {
                icon: 'upload_file',
                path: '/ordensDeServicos',
                label: 'Ordens de Serviços'
            },
            {
                icon: 'local_mall',
                path: '/vendas',
                label: 'Vendas'
            },
            {
                icon: 'sync_alt',
                path: '/estoques',
                label: 'Estoques'
            },
            {
                icon: 'app_registration',
                path: '/cadastros',
                label: 'Cadastros'
            },
            {
                icon: '',
                path: '/pessoas',
                label: ''
            },
            {
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades'
            },
        ])
    }, [setDrawerOptions]);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />

            <Route path="/clientes/:id" element={<NovoCliente />} />
            <Route path="/clientes" element={<ListagemDeClientes />} />
            <Route path="/clientes/detalhe/:id" element={<DetalheDeClientes />} />

            <Route path="/produtos" element={<ListagemDeProdutos />} />
            <Route path="/produtos/detalhe/:id" element={<DetalheDeProdutos />} />

            <Route path="/ordensDeServicos" element={<ListagemDeOrdensDeServicos />} />
            <Route path="/ordensDeServicos/detalhe/:id" element={<DetalheDeOrdensDeServicos />} />

            <Route path="/vendas" element={<ListagemDeVendas />} />
            <Route path="/vendas/detalhe/:id" element={<DetalheDeVendas />} />
            
            <Route path="/estoques" element={<ListagemDeEstoques />} />
            <Route path="/estoques/detalhe/:id" element={<DetalheDeEstoques />} />
            
            <Route path="/cadastros" element={<ListagemDeCadastros />} />
            <Route path="/cadastros/detalhe/:id" element={<DetalheDeCadastros />} />

            <Route path="/pessoas" element={<ListagemDePessoas />} />
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

            <Route path="/cidades" element={<ListagemDeCidades />} />
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />

            <Route path="*" element={<button onClick={() => Nav("/pagina-inicial")}>Ir para Página inicial</button>} />
        </Routes>
    );
};