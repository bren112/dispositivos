import { useState, useEffect } from 'react';
import supabase from '../../../supabaseclient';
import './All.css';

function All() {
    const [aparelhos, setAparelhos] = useState([]);
    const [departamentoId, setDepartamentoId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [departamentoNome, setDepartamentoNome] = useState('');
    const [aparelhoEdit, setAparelhoEdit] = useState({});

    useEffect(() => {
        const depId = localStorage.getItem('departamentoId');
        if (depId) {
            setDepartamentoId(depId);
            fetchAparelhos(depId);
            fetchDepartamentoNome(depId);
        }
    }, []);

    const fetchAparelhos = async (depId) => {
        const { data, error } = await supabase
            .from('aparelho')
            .select('*')
            .eq('departamento_id', depId);

        if (error) {
            console.error('Erro ao buscar aparelhos:', error.message);
        } else {
            setAparelhos(data);
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

    const handleEdit = (aparelhoId) => {
        const aparelho = aparelhos.find((aparelho) => aparelho.id === aparelhoId);
        setAparelhoEdit(aparelho);
        setModalOpen(true);
    };

    const handleSaveEdit = async () => {
        const { id, ...updatedFields } = aparelhoEdit;
        const { error } = await supabase
            .from('aparelho')
            .update(updatedFields)
            .eq('id', id);

        if (error) {
            console.error('Erro ao salvar as edições:', error.message);
        } else {
            setAparelhos(aparelhos.map((aparelho) => (aparelho.id === id ? aparelhoEdit : aparelho)));
            setModalOpen(false);
            alert('Aparelho editado com sucesso!');
        }
    };

    const handleDelete = async (aparelhoId) => {
        const { error } = await supabase
            .from('aparelho')
            .delete()
            .eq('id', aparelhoId);

        if (error) {
            console.error('Erro ao excluir aparelho:', error.message);
        } else {
            setAparelhos(aparelhos.filter(aparelho => aparelho.id !== aparelhoId));
            alert('Aparelho excluído com sucesso!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAparelhoEdit((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <br />
            <a id='voltar' href={`/departamento/${departamentoId}`}>Voltar</a>
            <br />
            <br />
            <h2 className="text-x1">Aparelhos do Setor: <span className="font-bold">{departamentoNome}</span></h2>
            <div className="contadorContainer">
                <div className="subcontador">
                    <p>Alugados:</p>
                    <div className="contador">
                        <span>{aparelhos.filter(aparelho => aparelho.dia_alugado).length}</span>
                    </div>
                </div>
            </div>

            {aparelhos.length === 0 ? (
                <p>Nenhum aparelho encontrado neste setor.</p>
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aparelhos.map((aparelho) => (
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
                                <td>
                                    <button onClick={() => handleEdit(aparelho.id)}>Editar</button>
                                    <button onClick={() => handleDelete(aparelho.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <h3>Editar Aparelho</h3>
                        <form>
                            {Object.keys(aparelhoEdit).map((key) => (
                                <div key={key}>
                                    <label>{key}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={aparelhoEdit[key] || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={handleSaveEdit}>Salvar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default All;