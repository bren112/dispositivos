import { useState, useEffect } from 'react';
import supabase from '../../../supabaseclient';

function Celular() {
    const [celulares, setCelulares] = useState([]);
    const [departamentoId, setDepartamentoId] = useState(null);
    const [departamentoNome, setDepartamentoNome] = useState('');
    const [alugadas, setAlugadas] = useState(0); 
    const volt = localStorage.getItem('departamentoId');

    useEffect(() => {
   
        const depId = localStorage.getItem('departamentoId');
        if (depId) {
            setDepartamentoId(depId);
            fetchCelulares(depId);
            fetchDepartamentoNome(depId); 
        }
    }, []);


    const fetchCelulares = async (depId) => {
        const { data, error } = await supabase
            .from('aparelho')
            .select('*')
            .eq('departamento_id', depId)
            .eq('tipo', 'Celular'); 

        if (error) {
            console.error('Erro ao buscar celulares:', error.message);
        } else {
            setCelulares(data);
            const alugadasCount = data.filter(celular => celular.dia_alugado).length;
            setAlugadas(alugadasCount);
        }
    };

    
    const fetchDepartamentoNome = async (depId) => {
        const { data, error } = await supabase
            .from('departamento')
            .select('nome')
            .eq('id', depId)
            .single(); 
        if (error) {
            console.error('Erro ao buscar nome do departamento:', error.message);
        } else {
            setDepartamentoNome(data?.nome || 'Departamento desconhecido');
        }
    };

    return (
        <> 
            <br />
            <a id='voltar' href={`/departamento/${volt}`}>Voltar</a>

            <div className="p-4 max-w-6xl mx-auto">
                <h2 className="text-x1">
                    Celulares do Setor: <span className="font-bold">{departamentoNome}</span>
                </h2>
                
                <div className="contadorContainer">
                    <div className="subcontador">
                        <p className="text-lg font-semibold mb-2">Alugados:</p>
                        <div className="contador">
                            <span className="text-red-600">{alugadas}</span>
                        </div>
                    </div>
                </div>

                {celulares.length === 0 ? (
                    <p>Nenhum celular encontrado neste setor.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Identificador</th>
                                    <th className="border p-2">Modelo</th>
                                    <th className="border p-2">Número de Série</th>
                                    <th className="border p-2">Usuário</th>
                                    <th className="border p-2">Descrição</th>
                                    <th className="border p-2">Data Alugado</th>
                                    <th className="border p-2">MAC Address</th>
                                    <th className="border p-2">Inquilino</th>
                                </tr>
                            </thead>
                            <tbody>
                                {celulares.map((celular) => (
                                    <tr key={celular.id} className="hover:bg-gray-100">
                                        <td className="border p-2">{celular.identificador}</td>
                                        <td className="border p-2">{celular.modelo}</td>
                                        <td className="border p-2">{celular.numero_serie}</td>
                                        <td className="border p-2">{celular.usuario}</td>
                                        <td className="border p-2">{celular.desc_aparelho}</td>
                                        <td className="border p-2">{celular.dia_alugado || 'N/A'}</td>
                                        <td className="border p-2">{celular.mac_addres}</td>
                                        <td className="border p-2">{celular.inquilino}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Celular;
