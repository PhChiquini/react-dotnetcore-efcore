using System.Threading.Tasks;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositores
{
    public class GeneralRepo : IGeneralRepo
    {
        protected readonly DataContext _dataContext;
        public GeneralRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Adicionar<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public void DeletarVarias<T>(T[] entityArray) where T : class
        {
            _dataContext.RemoveRange(entityArray);
        }

        public async Task<bool> SalvarMudancasAsync()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }
    }
}