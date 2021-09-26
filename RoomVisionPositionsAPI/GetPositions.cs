using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Collections.Generic;
using RoomVisionPositionsAPI.Entities;

namespace RoomVisionPositionsAPI
{
    public static class GetPositions
    {
        [FunctionName("GetPositions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            List<Position> listPositions = new List<Position>();

            try
            {
                using (SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("SqlConnectionString")))
                {
                    connection.Open();

                    var query = @"SELECT X, Y FROM [dbo].[Positions]";
                    SqlCommand command = new SqlCommand(query, connection);
                    
                    using(SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listPositions.Add(new Position() 
                                {
                                    X = (int)reader.GetValue(0), 
                                    Y = (int)reader.GetValue(1)
                                }
                            );
                        }
                    }
                }
            }
            catch (Exception e)
            {
                log.LogError(e.ToString());
                return new BadRequestResult();
            }

            return new OkObjectResult(listPositions);
        }
    }
}
