import React, { useEffect, useState } from "react";

const atividadeInicial = {
    id: 0,
    titulo: '',
    prioridade: 0,
    descricao: ''
};

export default function AtividadeForm(props) {

    const [atividade, setAtividade] = useState(atividadeAtual());

    useEffect(() => {
        if (props.atividadeSelecionada.id !== 0) {
            setAtividade(props.atividadeSelecionada);
        }
    }, [props.atividadeSelecionada]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setAtividade({ ...atividade, [name]: value });
    };

    const handleSubmit = ((e) => {
        e.preventDefault();

        if (props.atividadeSelecionada.id !== 0) {
            props.atualizarAtividade(atividade);
        }
        else {
            props.addAtividade(atividade)
        }
    });

    const handleCancelar = ((e) => {
        e.preventDefault();

        props.cancelarAtividade();

        setAtividade(atividadeInicial);
    });

    function atividadeAtual() {
        if (props.atividadeSelecionada.id !== 0) {
            return props.atividadeSelecionada;
        }
        else {
            return atividadeInicial;
        }
    };

    return (
        <div>

            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-md-6'>
                    <label className='form-label'>Título</label>
                    <input
                        id='titulo'
                        name="titulo"
                        type='text'
                        onChange={inputTextHandler}
                        value={atividade.titulo}
                        className='form-control' />
                </div>
                <div className='col-md-6'>
                    <label className='form-label'>Prioridade</label>
                    <select
                        id='prioridade'
                        name="prioridade"
                        onChange={inputTextHandler}
                        value={atividade.prioridade}
                        className='form-select'>
                        <option defaultValue="NaoDefinido">Selecionar...</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Normal">Normal</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className='form-label'>Descrição</label>
                    <textarea
                        id='descricao'
                        name="descricao"
                        type='text'
                        onChange={inputTextHandler}
                        value={atividade.descricao}
                        className='form-control' />
                </div>
                <hr />
                <div className='col-12'>

                    <button type="submit" className='btn btn-outline-success me-2'>
                        <i className="fas fa-check me-2"></i>
                        Salvar
                    </button>
                    {
                        atividade.id !== 0 ?
                            <>
                                <button onClick={handleCancelar} className='btn btn-outline-warning me-2'>
                                    <i className="fas fa-xmark me-2"></i>
                                    Cancelar
                                </button>
                            </>
                            :
                            <></>
                    }
                </div>
            </form>
        </div>
    )
}