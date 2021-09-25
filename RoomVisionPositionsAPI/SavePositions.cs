using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using RoomVisionPositionsAPI.Entities;
using System.Data.SqlClient;

namespace RoomVisionPositionsAPI
{
    public static class SavePositions
    {
        [FunctionName("SavePositions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            List<Position> listPositions = JsonConvert.DeserializeObject<List<Position>>(requestBody);

            try
            {
                using (SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("SqlConnectionString")))
                {
                    connection.Open();
                    
                    var query = @"INSERT INTO [dbo].[Positions](X, Y) VALUES(@X, @Y)";
                    SqlCommand command = new SqlCommand(query, connection);
                    var sqlTran = connection.BeginTransaction();

                    foreach (var position in listPositions)
                    {
                        command.Transaction = sqlTran;
                        command.Parameters.Clear();
                        command.Parameters.AddWithValue("@X", position.X);
                        command.Parameters.AddWithValue("@Y", position.Y);
                        command.ExecuteNonQuery();
                    }
                    sqlTran.Commit();
                }
            }
            catch (Exception e)
            {
                log.LogError(e.ToString());
                return new BadRequestResult();
            }

            string responseMessage = "Data inserted";

            return new OkObjectResult(responseMessage);
        }
    }
}
