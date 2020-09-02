using System;
using System.Threading.Tasks;
using Confluent.Kafka;
using Confluent.SchemaRegistry;
using Confluent.SchemaRegistry.Serdes;

class Producer
{
    BrokerHelper _brokerHelper;

    public Producer(BrokerHelper brokerHelper) { _brokerHelper = brokerHelper; }

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
                Console.Write($"Entregou um objeto '{deliveryReport.Message.Value}' com a key '{deliveryReport.Message.Key}' em '{deliveryReport.TopicPartition} e offset '{deliveryReport.Offset}'");
            }
            catch (ProduceException<string, string> e)
            {
                Console.Write($"Falha na entrega: {e.Error.Reason}");
            }
            catch (Exception ex)
            {
                Console.Write($"Falha na entrega: {ex.Message}");
            }
        }
    }
}
