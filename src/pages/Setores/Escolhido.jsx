import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../supabaseclient';
import './Escolhido.css';
import { Link } from 'react-router-dom';

import radin from './radin.png'
function Escolhido() {
    const { id } = useParams();
    const [departamento, setDepartamento] = useState(null);

    useEffect(() => {
        const fetchDepartamento = async () => {
            const { data, error } = await supabase
                .from('departamento')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Erro ao buscar departamento:', error.message);
            } else {
                setDepartamento(data);
            }
        };

        fetchDepartamento();
    }, [id]);

    if (!departamento) {
        return <p>Carregando...</p>;
    }

    return (
        <>
        <br/>
        <a id='voltar' href="/">Voltar</a>
        <div className="container-escolhido">
            <h1 className="home-escolhido">Controle de aparelhos <span style={{ backgroundColor: '#7dba06' }}> {departamento.nome+'!'}</span></h1>
        <br />

        <div className="acoes">

            <div className="botao">
                <Link to='/notebook'>
                <button ><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
        <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
                </svg></button>
                </Link>       
                <p>Notebook</p>
            </div>
            <div className="botao">
                <Link to='/computador'>
                <button ><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-pc-display" viewBox="0 0 16 16">
        <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z"/>
                </svg></button>
                </Link>
                <p>Computador</p>
            </div>

            <div className="botao">
            <Link to='/celular'> 
            <button ><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg></button>                
            </Link>
                <p>Celular</p>
            </div>


            <div className="botao">
            <Link to='/radio'> 
                <button  id='radin'><img src={radin} alt="" srcset="" /></button>
            </Link>                
                <p>Rádio</p>
            </div>

        <Link to='/impressora'>
            <div className="botao">
                <button> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
        <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/>
        <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                </svg></button>
                <p>Impressora</p>
            </div>
        </Link>
            <div className="botao">
                <Link to='/all'>   
                <button><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-5-square" viewBox="0 0 16 16">
  <path d="M7.994 12.158c-1.57 0-2.654-.902-2.719-2.115h1.237c.14.72.832 1.031 1.529 1.031.791 0 1.57-.597 1.57-1.681 0-.967-.732-1.57-1.582-1.57-.767 0-1.242.45-1.435.808H5.445L5.791 4h4.705v1.103H6.875l-.193 2.343h.064c.17-.258.715-.68 1.611-.68 1.383 0 2.561.944 2.561 2.585 0 1.687-1.184 2.806-2.924 2.806Z"/>
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                </svg></button> 
                </Link>           
                <p>Todos</p>
            </div>

            <div className="botao">
            <Link to='/cadastromaq'>
            <button><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                </svg></button>
            </Link>
                <p>Cadastrar</p>
                            
            </div>
        </div>
        </div></>
    );
}

export default Escolhido;
