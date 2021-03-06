﻿using cran.Model.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cran.Services
{
    public interface IUserProfileService
    {
        Task<UserInfoDto> GetUserInfoAsync();
        Task CreateUserAsync(UserInfoDto userInfo);
    }
}
