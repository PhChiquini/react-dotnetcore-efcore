import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';

function App() {

  const [showAtividadeModal, setAtividadeModal] = useState(false);
  const [showConfirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  const toggleAtividadeModal = () => setAtividadeModal(!showAtividadeModal);

  const toggleConfirmDeleteModal = (id) => {
    if (id !== 0 && id !== undefined) {

      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade({ id: 0 });
    }
    setConfirmDeleteModal(!showConfirmDeleteModal);
  }

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  useEffect(() => {

    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    }

    getAtividades();
  }, []);

  const addAtividade = async (atividade) => {

    const response = await api.post('atividade', atividade);

    setAtividades([...atividades, response.data]);

    resetaModal();
  }

  const atualizarAtividade = async (atividade) => {

    const response = await api.put(`atividade/${atividade.id}`, atividade);
    const { id } = response.data

    setAtividades(
      atividades.map(item => item.id === id ? response.data : item)
    );

    resetaModal();
  }

  const resetaModal = () => {
    setAtividade({ id: 0 });
    toggleAtividadeModal();
  }

  const cancelarAtividade = () => {
    setAtividade({ id: 0 });
    toggleAtividadeModal();
  }

  const deletarAtividade = async (id) => {

    const response = await api.delete(`atividade/${id}`);

    toggleConfirmDeleteModal(0);

    if (response) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
      setAtividades([...atividadesFiltradas]);
    }
  }

  const pegarAtividade = (id) => {

    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);

    toggleAtividadeModal();
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1'>
        <h1 className='m-0 p-0'>Atividade{atividade.id !== 0 ? ' ' + atividade.id : 's'}</h1>
        <Button variant='secondary' onClick={toggleAtividadeModal}>
          <i className='fas fa-plus' />
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        toggleConfirmDeleteModal={toggleConfirmDeleteModal}
      />


      <Modal show={showAtividadeModal} onHide={resetaModal}>
        <Modal.Header closeButton>
          Atividade{atividade.id !== 0 ? ' ' + atividade.id : 's'}
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            atualizarAtividade={atualizarAtividade}
            cancelarAtividade={cancelarAtividade}
            atividadeSelecionada={atividade}
            atividades={atividades}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showConfirmDeleteModal} onHide={() => toggleConfirmDeleteModal(0)}>
        <Modal.Header closeButton>
          Excluir Atividade {atividade.id}
        </Modal.Header>
        <Modal.Body>
          Deseja realmente Excluir a Atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            onClick={() => deletarAtividade(atividade.id)}
            variant='success'
            className='me-2' >
            <i className='fas fa-check me-2' /> Sim
          </Button>
          <Button
            onClick={() => toggleConfirmDeleteModal(0)}
            variant='danger'
            className='' >
            <i className='fas fa-times me-2' /> Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
