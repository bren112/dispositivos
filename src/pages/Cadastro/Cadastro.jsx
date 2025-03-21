import { useState } from 'react';
import supabase from '../../supabaseclient';

function CadastroDep() {
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    
    const cores = [
        'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White', 'Gray', 'Pink',
        'Cyan', 'Magenta', 'Lime', 'Teal', 'Brown', 'Azure', 'Beige', 'Coral', 'Crimson', 'Gold',
        'Indigo', 'Ivory', 'Khaki', 'Lavender', 'Maroon', 'Navy', 'Olive', 'Plum', 'Salmon', 'Silver',
        'Tan', 'Turquoise', 'Violet'
    ];
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('departamento')
            .insert([{ nome, cor }]);
        
        if (error) {
            console.error('Erro ao cadastrar departamento:', error.message);
        } else {
            console.log('Departamento cadastrado com sucesso:', data);
            setNome('');
            setCor('');
        }
    };
    
    return (
        <>
        <br />
        <a id='voltar' href="/">Voltar</a>
        <br/>
        <div id="form-container">
            <h2>Cadastro de Departamento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="nome" className="text-sm font-medium">Nome do Departamento</label>
                    <input 
                        type="text" 
                        id="nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cor" className="text-sm font-medium">Cor</label>
                    <select 
                        id="cor"
                        value={cor} 
                        onChange={(e) => setCor(e.target.value)} 
                        className="w-full p-2 border rounded-md"
                        required
                    ><br />
                        <option value="">Selecione uma cor</option><br /><br />
                        {cores.map((cor) => (
                            <option key={cor} value={cor}>{cor}</option>
                        ))}
                    </select>
                </div>
                <button id="submit-button" type="submit">
                    Cadastrar
                </button>
            </form>
            <div id="message"></div>
        </div></>
    );
}

export default CadastroDep;
