import { useState, useEffect } from 'react';
import supabase from '../../../supabaseclient';
const volt = localStorage.getItem('departamentoId');

function Radio() {
    const [notebooks, setNotebooks] = useState([]);
    const [departamentoId, setDepartamentoId] = useState(null);
    const [alugadas, setAlugadas] = useState(0); // Contador de notebooks alugados
    const [departamentoNome, setDepartamentoNome] = useState(''); // Nome do departamento

    useEffect(() => {
        // Recupera o ID do departamento salvo no localStorage
        const depId = localStorage.getItem('departamentoId');
        if (depId) {
            setDepartamentoId(depId);
            fetchNotebooks(depId);
            fetchDepartamentoNome(depId); // Agora está sendo chamada corretamente!
        }
    }, []);

    // Função para buscar notebooks (na verdade, rádios)
    const fetchNotebooks = async (depId) => {
        const { data, error } = await supabase
            .from('aparelho')
            .select('*')
            .eq('departamento_id', depId)
            .eq('tipo', 'Rádio'); // Filtra apenas rádios

        if (error) {
            console.error('Erro ao buscar rádios:', error.message);
        } else {
            setNotebooks(data);
            // Conta quantos rádios estão alugados
            const alugadasCount = data.filter(notebook => notebook.dia_alugado).length;
            setAlugadas(alugadasCount);
        }
    };

    // Função para buscar o nome do departamento (agora está FORA de fetchNotebooks)
    const fetchDepartamentoNome = async (depId) => {
        const { data, error } = await supabase
            .from('departamento')
            .select('nome')
            .eq('id', depId)
            .single(); // Pega apenas um resultado

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
                    Rádios do Setor: <span className="font-bold">{departamentoNome}</span>
                </h2>            

                <div className="contadorContainer">
                    <div className="subcontador">
                        <p className="text-lg font-semibold mb-2">
                            Alugados: 
                        </p>
                        <div className="contador">
                            <span className="text-red-600">{alugadas}</span>
                        </div>
                    </div>
                </div>

                {notebooks.length === 0 ? (
                    <p>Nenhum rádio encontrado neste setor</p>
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
                                {notebooks.map((notebook) => (
                                    <tr key={notebook.id} className="hover:bg-gray-100">
                                        <td className="border p-2">{notebook.identificador}</td>
                                        <td className="border p-2">{notebook.modelo}</td>
                                        <td className="border p-2">{notebook.numero_serie}</td>
                                        <td className="border p-2">{notebook.usuario}</td>
                                        <td className="border p-2">{notebook.desc_aparelho}</td>
                                        <td className="border p-2">{notebook.dia_alugado || 'N/A'}</td>
                                        <td className="border p-2">{notebook.mac_addres}</td>
                                        <td className="border p-2">{notebook.inquilino}</td>
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

export default Radio;
