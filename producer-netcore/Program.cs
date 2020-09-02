using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace producer
{
    class Program
    {
        public static IConfigurationRoot Configuration { get; set; }
        
        private static BrokerHelper GerarBrokerConfig()
        {
            return new BrokerHelper(Configuration["BootstrapServers"],
                                           Configuration["SecurityProtocol"],
                                           Configuration["SaslMechanism"],
                                           Configuration["SaslUsername"],
                                           Configuration["SaslPassword"],
                                           Configuration["SslCaLocation"],
                                           Configuration["SchemaRegistryUrl"],
                                           int.Parse(Configuration["SchemaRegistryRequestTimeoutMs"]),
                                           int.Parse(Configuration["SchemaRegistryMaxCachedSchemas"]),
                                           Configuration["SchemaRegistryBasicAuthUserInfo"]);
        }

        static async Task Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            Console.WriteLine("Produzindo dados aleatórios, pressionar CTRL-C para finalizar.");

            await Task.Run(async () =>
            {
                await Produzir();
            });

            Console.WriteLine("Processo finalizado.");
        }

        public static long EpocTimeFromNow()
        {
            return (long)Math.Truncate((DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds) * 1000000;
        }

        private async static Task Produzir()
        {
            var producer = new Producer(GerarBrokerConfig());

            CancellationTokenSource cts = new CancellationTokenSource();
            Console.CancelKeyPress += (_, e) => {
                e.Cancel = true;
                cts.Cancel();
            };

            try
            {
                var playerId = Guid.NewGuid().ToString();

                while (!cts.IsCancellationRequested)
                {
                    //Console.WriteLine("Pressione ENTER para gerar uma nova mensagem, ou digite 'SAIR' para finalizar.");
                    //string cmd = Console.ReadLine();
                    //if (cmd.ToUpper() == "SAIR") return;

                    double lat = -19.9821259;
                    double lng = -43.9792356;

                    Random r = new Random();
                    int rand = r.Next(-10, 10);

                    double newLat = lat + ((double)rand /100);

                    rand = r.Next(-10, 10);
                    double newLng = lng + ((double)rand/100);


                    var record = new Streaming.Pokemon.PlayerAction
                    {
                        Player = new Streaming.Pokemon.Player { PlayerID = playerId, PlayerName = "Michael" },
                        Score = new Streaming.Pokemon.Score { ScoredPoints = (new Random()).Next(0, 5) },
                        Timestamp = EpocTimeFromNow(),
                        Walk = new Streaming.Pokemon.Walk
                        {
                            From = new Streaming.Pokemon.From { Lat = "-19.9821259", Long = "-43.9792356" },
                            To = new Streaming.Pokemon.To { Lat = (lat + newLat).ToString(), Long = (lng + newLng).ToString() },
                            Distance = (int)GFG.distance(lat, newLat, lng, newLng)
                        }
                    };

                    await producer.Produzir("streaming.pokemon.score", playerId, record);

                    //var record = new io.confluent.developer.avro.TicketSale() { title = "Die Hard", sale_ts = "2019-07-18T10:00:00Z", ticket_total_value = 10 };
                    //await producer.Produzir<string, io.confluent.developer.avro.TicketSale>("movie-ticket-sales", string.Empty, record);
                    Thread.Sleep(1000);
                }

            }
            catch (OperationCanceledException)
            {
                // Ctrl-C foi pressionado.
            }
        }
     }
}
