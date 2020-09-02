using System;
using System.Threading.Tasks;
using Confluent.Kafka;
using Confluent.SchemaRegistry;
using Confluent.SchemaRegistry.Serdes;
using Microsoft.Extensions.Logging;

class Producer
{
    BrokerHelper _brokerHelper;
    private ILogger log;

    public Producer(BrokerHelper brokerHelper, ILogger log) { _brokerHelper = brokerHelper; this.log = log; }

    public async Task Produzir<TChave, TValor>(string topico, TChave chave, TValor valor)
    {

        using (var schemaRegistry = new CachedSchemaRegistryClient(_brokerHelper.SchemaRegistryConfig))
        using (var producer =
            new ProducerBuilder<TChave, TValor>(_brokerHelper.ProducerConfig)
                .SetKeySerializer(new AvroSerializer<TChave>(schemaRegistry))
                .SetValueSerializer(new AvroSerializer<TValor>(schemaRegistry))
                .Build())
        {
            try
            {
                var deliveryReport = await producer.ProduceAsync(topico, new Message<TChave, TValor> { Key = chave, Value = valor });
                log.LogInformation($"Entregou um objeto '{deliveryReport.Message.Value}' com a key '{deliveryReport.Message.Key}' em '{deliveryReport.TopicPartition} e offset '{deliveryReport.Offset}'");
            }
            catch (ProduceException<string, string> e)
            {
                log.LogError($"Falha na entrega: {e.Error.Reason}");
            }
            catch (Exception ex)
            {
                log.LogError($"Falha na entrega: {ex.Message}");
            }
        }
    }
}
