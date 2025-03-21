import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseclient';
import './Home.css';
function Home() {
    const [departamentos, setDepartamentos] = useState([]);
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

    return (
        <div className="home-container">
            <h2 className="home-title">Departamentos</h2>
            <div className="department-list">
                {departamentos.map((dep) => (
                    <div className="deps">
                <button 
    key={dep.id} 
    className="department-button"
    style={{ 
        backgroundColor: '#7dba06'  
    }}
    onClick={() => handleClick(dep.id)}
>
    {dep.nome}
</button>
</div>
                ))}
            </div>
        </div>
    );
}

export default Home;
