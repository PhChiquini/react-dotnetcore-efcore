import React from "react";

export default function Atividade(props) {

    function prioridadeIcon(param) {
        switch (param) {
            case "Baixa":
                return 'smile'
            case "Normal":
                return 'meh'
            case "Alta":
                return 'frown'
            default:
                return 'Não definido'
        }
    }

    function prioridadeStyle(param) {
        switch (param) {
            case "Baixa":
                return 'success'
            case "Normal":
                return 'black'
            case "Alta":
                return 'warning'
            default:
                return 'Não definido'
        }
    }

    return (
        <div className={'card mb-2 shadow-sm border-' + prioridadeStyle(props.atividade.prioridade)}>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <h5 className='card-title'>
                        <span className='badge bg-secondary me-1'>{props.atividade.id}</span>
                        - {props.atividade.titulo}
                    </h5>
                    <h6>
                        Prioridade:
                        <span className={'ms-1 text-' + prioridadeStyle(props.atividade.prioridade)}>
                            <i className={'me-1 far fa-' + prioridadeIcon(props.atividade.prioridade)}></i>
                            {props.atividade.prioridade}
                        </span>
                    </h6>
                </div>
                <p className='card-text'>
                    {props.atividade.descricao}
                </p>
                <div className='d-flex content-justify-end pt-2 m-0 border-top'>
                    <button className='btn btn-sm btn-outline-primary me-2'
                        onClick={() => props.pegarAtividade(props.atividade.id)}>
                        <i className='fas fa-pen me-2' />
                        Editar
                    </button>
                    <button className='btn btn-sm btn-outline-danger'
                        onClick={() => props.toggleConfirmDeleteModal(props.atividade.id)}>
                        <i className='fas fa-trash me-2' />
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    )
}