import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseclient';
import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
    const [departamentos, setDepartamentos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartamentos = async () => {
            const { data, error } = await supabase.from('departamento').select('*');
            if (error) {
                console.error('Erro ao buscar departamentos:', error.message);
            } else {
                setDepartamentos(data);
            }
        };
        fetchDepartamentos();
    }, []);

    const handleClick = (id) => {
        localStorage.setItem('departamentoId', id);
        navigate(`/departamento/${id}`);
    };

    // Filtra os departamentos com base no termo de busca
    const filteredDepartamentos = departamentos.filter(dep =>
        dep.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-container">
            <h2 className="home-title">Departamentos</h2>
            
            {/* Campo de busca */}
            <input
                type="text"
                placeholder="Buscar Departamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <Link to='/todos'>
            <button>Todos</button>
            </Link>
            <div className="department-list">
                {filteredDepartamentos.length > 0 ? (
                    filteredDepartamentos.map((dep) => (
                        <div className="deps" key={dep.id}>
                            <button
                                className="department-button"
                                style={{ backgroundColor: '#7dba06' }}
                                onClick={() => handleClick(dep.id)}
                            >
                                {dep.nome}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum departamento encontrado.</p> // Mensagem caso não encontre nada
                )}
            </div>
        </div>
    );
}

export default Home;
