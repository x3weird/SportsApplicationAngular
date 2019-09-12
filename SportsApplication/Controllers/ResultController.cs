using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sports_Application.Models;
using SportsApplication.Models;

namespace SportsApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : Controller
    {
        private readonly IUnitOfWork unitOfWork;

        public ResultController(IData data,IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("{TestId:int}")]
        [Route("editTest/{TestId}")]
        public async Task<object> ViewResult(int TestId)
        {

            var test = await unitOfWork.Data.GetTestByid(TestId);
            ViewResultModel obj = new ViewResultModel
            {
                Date = test.Date,
                TestType = test.TestType,
                TestId = TestId,
                AtheleteNames = await unitOfWork.Data.GetAtheleteNamesWithDataByTestId(TestId)
            };
            return Ok(obj);
        }
       
        [HttpGet]
        [Route("addAthelete/{id}")]
        public async Task<object> CreateResult(int TestId)
        {
            var resultmodel = new CreateResultModel
            {
                TestId = TestId,
                AtheleteList = await unitOfWork.Data.GetAllAtheleteList()
            };
            return Ok(resultmodel);
        }

        [HttpPost]
        [Route("addAthelete")]
        public async Task<object> CreateResult(CreateResultModel resultmodel)
        {
            Result result = new Result
            {
                
                Id = resultmodel.Id,
                TestId = resultmodel.TestId,
                Data = resultmodel.Data,
                UserId = resultmodel.UserId
            };
            resultmodel.AtheleteList = await unitOfWork.Data.GetAllAtheleteList();
            int status = await unitOfWork.Data.AddResult(result);
            if(status==0)
            {
                 return Ok(new { status});
            }
            else
            {

                await unitOfWork.Data.IncrementCountByTestId(resultmodel.TestId);
                unitOfWork.Commit();
                return Ok(new { status });
            }
            
        }

        [HttpGet("{Id:int}")]
        [Route("editResult/{Id}")]
        public async Task<object> EditResult(int Id)
        {
            var result = await unitOfWork.Data.GetResultById(Id);
            var atheletes = await unitOfWork.Data.GetAtheleteNamesWithDataByTestId(result.TestId);
            CreateResultModel ResultModel = new CreateResultModel
            {
                TestId = result.TestId,
                UserId = result.UserId,
                Data = result.Data,
                Id = result.Id,
                AtheleteList = await unitOfWork.Data.GetAllAtheleteList()
            };
            return Ok(ResultModel);
        }

        [HttpPost]
        [Route("updateResult")]
        public async Task<object> EditResult(CreateResultModel resultmodel)
        {
            resultmodel.AtheleteList = await unitOfWork.Data.GetAllAtheleteList();
            Result result = new Result
            {

                Id = resultmodel.Id,
                TestId = resultmodel.TestId,
                Data = resultmodel.Data,
                UserId = resultmodel.UserId
            };
            
            int status = await unitOfWork.Data.Update(result);
            if (status == 0)
            {
                ViewBag.message = "Athelete already exists";
                return Ok(new { status });
            }
            else
            {
                unitOfWork.Commit();
                return Ok(new { status });
            }
        }

        [HttpDelete]
        [Route("deleteResult/{Id}/{TestId}")]
        public async Task<Object> DeleteResult(int Id,int TestId)
        {
            await unitOfWork.Data.DeleteTestResultById(Id);
            await unitOfWork.Data.DecrementCountByTestId(TestId);
            unitOfWork.Commit();
            return Ok();
        }
    }
}