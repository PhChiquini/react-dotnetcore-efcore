using System;

namespace ProAtividade.Domain.Entities
{
    public class Atividade
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime DataDeCriacao { get; set; }
        public DateTime? DataDeConclusao { get; set; }
        public Prioridade Prioridade { get; set; }

        public Atividade()
        {
            DataDeCriacao = DateTime.Now;
            DataDeConclusao = null;
        }

        public Atividade(int id, string titulo, string descricao) : this()
        {
            Id = id;
        }

        public void Concluir()
        {
            if (DataDeConclusao == null)
            {
                DataDeConclusao = DateTime.Now;
            }
            else
            {
                throw new Exception($"Atividade concluída em: {DataDeConclusao?.ToString("dd/MM/yyyy hh:mm")}");
            }
        }
    }
}