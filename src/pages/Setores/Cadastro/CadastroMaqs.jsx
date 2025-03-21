import { useState, useEffect } from 'react';
import supabase from '../../../supabaseclient';

function CadastroMaqs() {
    const [identificador, setIdentificador] = useState('');
    const [tipo, setTipo] = useState('');
    const [modelo, setModelo] = useState('');
    const [numeroSerie, setNumeroSerie] = useState('');
    const [usuario, setUsuario] = useState('');
    const [descAparelho, setDescAparelho] = useState('');
    const [diaAlugado, setDiaAlugado] = useState('');
    const [macAddress, setMacAddress] = useState('');
    const [inquilino, setInquilino] = useState('');
    const [departamentoId, setDepartamentoId] = useState(null);

    const tipos = ['Notebook', 'Computador', 'Celular', 'Rádio', 'Impressora'];

    useEffect(() => {
        // Recupera o ID do departamento salvo no localStorage
        const depId = localStorage.getItem('departamentoId');
        if (depId) {
            setDepartamentoId(depId);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('aparelho')
            .insert([{
                identificador,
                tipo,
                modelo,
                numero_serie: numeroSerie,
                usuario,
                desc_aparelho: descAparelho,
                dia_alugado: diaAlugado,
                mac_addres: macAddress,
                inquilino,
                departamento_id: departamentoId
            }]);

        if (error) {
            console.error('Erro ao cadastrar aparelho:', error.message);
        } else {
            console.log('Aparelho cadastrado com sucesso:', data);
            // Reseta os campos
            setIdentificador('');
            setTipo('');
            setModelo('');
            setNumeroSerie('');
            setUsuario('');
            setDescAparelho('');
            setDiaAlugado('');
            setMacAddress('');
            setInquilino('');
        }
    };
    const volt = localStorage.getItem('departamentoId');
    return (
        <> <br />
<a id='voltar' href={`/departamento/${volt}`}>Voltar</a>

        <div id='form-container'>
            <h2 className="text-xl font-bold mb-4">Cadastro de Aparelho</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Identificador</label>
                    <input
                        type="text"
                        value={identificador}
                        onChange={(e) => setIdentificador(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Selecione um tipo</option>
                        {tipos.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Modelo</label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Número de Série</label>
                    <input
                        type="text"
                        value={numeroSerie}
                        onChange={(e) => setNumeroSerie(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Usuário</label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descrição</label><br />
                    <textarea
                        value={descAparelho}
                        onChange={(e) => setDescAparelho(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Data de Aluguel</label><br />
                    <input
                        type="date"
                        value={diaAlugado}
                        onChange={(e) => setDiaAlugado(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">MAC Address</label>
                    <input
                        type="text"
                        value={macAddress}
                        onChange={(e) => setMacAddress(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Inquilino</label>
                    <input
                        type="text"
                        value={inquilino}
                        onChange={(e) => setInquilino(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Departamento ID</label>
                    <input
                        type="text"
                        value={departamentoId || 'Nenhum departamento selecionado'}
                        className="w-full p-2 border rounded-md bg-gray-200"
                        disabled
                    />
                </div>
                <button  id="submit-button"  type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
                    Cadastrar Aparelho
                </button>
            </form>
        </div></>
    );
}

export default CadastroMaqs;
