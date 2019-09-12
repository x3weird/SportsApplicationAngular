using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sports_Application.Models;
using SportsApplication.Models;

namespace SportsApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {

        private readonly IUnitOfWork unitOfWork;

        public TestController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("createTest")]
        public async Task<Object> CreateTest(Test test)
        {

            await unitOfWork.Data.AddTest(test);
            unitOfWork.Commit();
            return Ok(new { test }); 
            
            
        }

        [Route("deleteTest/{Id}")]
        public async Task<object> DeleteTest(int Id)
        {
            await unitOfWork.Data.DeleteTestByTestid(Id);
            unitOfWork.Commit();
            return Ok();
        }
    }
}