using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositores
{
    public class AtividadeRepo : GeneralRepo, IAtividadeRepo
    {
        public AtividadeRepo(DataContext dataContext) : base(dataContext) {}

        public async Task<Atividade> PegaPorIdAsync(int id)
        {
            IQueryable<Atividade> query = _dataContext.Atividades;

            return await query.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Atividade> PegaPorTituloAsync(string titulo)
        {
            IQueryable<Atividade> query = _dataContext.Atividades;

            query.AsNoTracking()
                .OrderBy(a => a.Id);

            return await query.FirstOrDefaultAsync(a => a.Titulo == titulo);
        }

        public async Task<Atividade[]> PegaTodasAsync()
        {
            IQueryable<Atividade> query = _dataContext.Atividades;

            query.AsNoTracking()
                .OrderBy(a => a.Id);

            return await query.ToArrayAsync();
        }
    }
}