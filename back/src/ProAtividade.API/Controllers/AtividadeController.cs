using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public Atividade Get()
        {
            return new Atividade();
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return $"Meu primeiro método Get com parâmetro {id}";
        }

        [HttpPost]
        public string Post(Atividade atividade)
        {
            return "Meu primeiro método Post";
        }

        [HttpPut]
        public string Put()
        {
            return "Meu primeiro método Put";
        }

        [HttpDelete]
        public string Delete()
        {
            return "Meu primeiro método Delete";
        }
    }
}