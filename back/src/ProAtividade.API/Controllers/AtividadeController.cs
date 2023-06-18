using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService _atividadeService;

        public AtividadeController(IAtividadeService atividadeService)
        {
            this._atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _atividadeService.PegarTodasAtividades();

                if (atividades == null) return NoContent();

                return Ok(atividades);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar as atividades. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorId(id);

                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar a atividade com id: {id}. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade atividade)
        {
            try
            {
                atividade = await _atividadeService.AdicionarAtividade(atividade);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar cadastrar a atividade {atividade.Titulo}. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade atividade)
        {
            try
            {
                if (id != atividade.Id) return Conflict("Você está tentando atualizar a atividade errada!");

                atividade = await _atividadeService.AtualizarAtividade(atividade);
                if (atividade == null) return NoContent();

                return base.Ok((object)atividade);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar a atividade {atividade.Titulo}. Erro: {ex.Message}");
            }
        }

        // [HttpPut("{atividadeId}")]
        // public async Task<IActionResult> Concluir(int atividadeId, Atividade atividade)
        // {
        //     try
        //     {
        //         if (atividadeId != atividade.Id) return Conflict("Você está tentando concluir a atividade errada!");

        //         var concluída = await _atividadeService.ConcluirAtividade(atividade);

        //         return concluída ? base.Ok(concluída) : base.NoContent();
        //     }
        //     catch (Exception ex)
        //     {
        //         return this.StatusCode(StatusCodes.Status500InternalServerError,
        //             $"Erro ao tentar concluir a atividade {atividade.Titulo}. Erro: {ex.Message}");
        //     }
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorId(id);
                if (atividade == null) return NoContent();

                var removida = await _atividadeService.DeletarAtividade(id);
                return removida ? Ok(removida) : BadRequest("Ocorreu um erro ao tentar deletar atividade");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar remover a atividade com id: {id}. Erro: {ex.Message}");
            }
        }
    }
}