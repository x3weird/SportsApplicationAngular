using Microsoft.AspNetCore.Identity;
using SportsApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sports_Application.Models
{
    public interface IData
    {
        Task<IEnumerable<Test>> GetAllTestData();
        Task<Test> AddTest(Test Test);
        Task<List<AtheleteNameWithData>> GetAtheleteNamesWithDataByTestId(int id);
        Task DeleteTestByTestid(int Id);
        Task<int> AddResult(Result Result);
        Task<Test> GetTestByid(int Id);
        Task<List<Athelete>> GetAllAtheleteList();
        Task IncrementCountByTestId(int Id);
        Task DecrementCountByTestId(int Id);
        Task<Result> GetResultById(int Id);
        Task<int> Update(Result updatedResult);
        Task DeleteTestResultById(int Id);
        Task<List<AtheleteViewModel>> GetAtheleteData(string Id);
        Task<ApplicationUser> FindByEmailAsync(string Email);
        Task<bool> RoleExistsAsync(string Role);
        Task<IdentityResult> CreateRoleAsync(IdentityRole identityRole);
        Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password);
        Task SignOutAsync();
        Task<SignInResult> PasswordSignInAsync(string UserName, string Password, bool RememberMe);
        Task<bool> IsInRoleAsync(ApplicationUser LoggedInUser, string role);
        Task SignInAsync(ApplicationUser user, bool isPersistent);
        Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role);
        Task<IList<ApplicationUser>> GetUsersInRoleAsync(string role);
        Task<ApplicationUser> FindByIdAsync(string id);
        Task<IList<string>> GetRolesAsync(ApplicationUser user);
        Task<IdentityResult> RemoveFromRoleAsync(ApplicationUser user, string item);
        Task<IdentityResult> DeleteAsync(ApplicationUser user);
        Task<ApplicationUser> GetUserAsync(ClaimsPrincipal HttpContextUser);
        Task<IEnumerable<Test>> GetTests(string Id);
    }
}
