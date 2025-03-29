import { useState, useEffect } from 'react';
import supabase from '../../../supabaseclient';
import { Link } from 'react-router-dom';
function Todos() {
    const [aparelhos, setAparelhos] = useState([]);
    const [filtro, setFiltro] = useState('todos');

    useEffect(() => {
        fetchAparelhos();
    }, []);

    const fetchAparelhos = async () => {
        const { data, error } = await supabase.from('aparelho').select('*');
        if (error) {
            console.error('Erro ao buscar aparelhos:', error.message);
        } else {
            setAparelhos(data);
        }
    };

    const aparelhosFiltrados = aparelhos.filter(aparelho => {
        if (filtro === 'alugado') return aparelho.inquilino === 'VIVO';
        if (filtro === 'proprio') return aparelho.inquilino.trim() === 'Usina';
        if (filtro === 'outros') return !['VIVO', 'Usina'].includes(aparelho.inquilino.trim());
        return true;
    });

    return (
        <>
         <br />
            <a id='voltar' href='/'>Voltar</a>
            <br />
            <h2 className="text-x1">Todos os Aparelhos</h2>

            <style>
                {`
                    .filter-buttons {
                        display: flex;
                        justify-content: space-around;
                    }
                    .filter-buttons button {    
                        background-color: #7dba06;
                        height: 4pc;
                        width: 8pc;
                        border: none;
                        font-size: 1.1pc;
                        border-radius: 1pc;
                    }
                        table{
                        margin:2pc;
                        }
                `}
            </style>


            <div className="filter-buttons">
                <button onClick={() => setFiltro('todos')}>Todos ({aparelhos.length})</button>
                <button onClick={() => setFiltro('alugado')}>Alugado ({aparelhos.filter(a => a.inquilino === 'VIVO').length})</button>
                <button onClick={() => setFiltro('proprio')}>
                    Próprio ({aparelhos.filter(a => a.inquilino.trim() === 'Usina').length})
                </button>
                <button onClick={() => setFiltro('outros')}>
                    Outros ({aparelhos.filter(a => !['VIVO', 'Usina'].includes(a.inquilino.trim())).length})
                </button>
            </div>

            {aparelhosFiltrados.length === 0 ? (
                <p>Nenhum aparelho encontrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Tipo</th>
                            <th>Modelo</th>
                            <th>Número de Série</th>
                            <th>Usuário</th>
                            <th>Descrição</th>
                            <th>Data Alugado</th>
                            <th>MAC Address</th>
                            <th>Inquilino</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aparelhosFiltrados.map(aparelho => (
                            <tr key={aparelho.id}>
                                <td>{aparelho.identificador}</td>
                                <td>{aparelho.tipo}</td>
                                <td>{aparelho.modelo}</td>
                                <td>{aparelho.numero_serie}</td>
                                <td>{aparelho.usuario}</td>
                                <td>{aparelho.desc_aparelho}</td>
                                <td>{aparelho.dia_alugado}</td>
                                <td>{aparelho.mac_addres}</td>
                                <td>{aparelho.inquilino}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default Todos;
