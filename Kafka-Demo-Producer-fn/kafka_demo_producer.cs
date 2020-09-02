using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Kafka_Demo_Producer_fn
{
    public static class kafka_demo_producer
    {
        [FunctionName("kafka_demo_producer")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string playerName;
            int scoredPoints;
            double origemLat;
            double origemLng;
            double destinoLat;
            double destinoLng;
            
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic data = JsonConvert.DeserializeObject(requestBody);

                playerName = data.PlayerName;
                scoredPoints = data.ScoredPoints;
                origemLat = data.Origem.lat;
                origemLng = data.Origem.lng;
                destinoLat = data.Destino.lat;
                destinoLng = data.Destino.lng;
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new BadRequestResult();
            }


            try
            {
                var producer = new Producer(GerarBrokerConfig(), log);

                var record = new Streaming.Pokemon.PlayerAction
                {
                    Player = new Streaming.Pokemon.Player { PlayerID = playerName, PlayerName = playerName },
                    Score = new Streaming.Pokemon.Score { ScoredPoints = scoredPoints },
                    Timestamp = EpocTimeFromNow(),
                    Walk = new Streaming.Pokemon.Walk
                    {
                        From = new Streaming.Pokemon.From { Lat = origemLat.ToString(), Long = origemLng.ToString() },
                        To = new Streaming.Pokemon.To { Lat = destinoLat.ToString(), Long = destinoLng.ToString() },
                        Distance = (int)GFG.distance(origemLat, destinoLat, origemLng, destinoLng)
                    }
                };

                await producer.Produzir("streaming.pokemon.score", playerName, record);

                return new CreatedResult("", "");
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                throw;
            }
        }

        private static BrokerHelper GerarBrokerConfig()
        {
            return new BrokerHelper("localhost:9092",
                                           "SaslSsl",
                                           "Plain",
                                           "ALTERAR USUARIO BROKER AQUI",
                                           "ALTERAR SENHA BROKER AQUI",
                                           "",
                                           "https://localhost",
                                           5000,
                                           10,
                                           "ALTERAR SENHA REGISTRY AQUI:ALTERAR SENHA REGISTRY AQUI");
        }

        public static long EpocTimeFromNow()
        {
            return (long)Math.Truncate((DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds) * 1000000;
        }

    }
}
