package com.michaelcosta.developer;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;

import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.Grouped;
import org.apache.kafka.streams.kstream.Produced;

import Streaming.Pokemon.PlayerAction;
import io.confluent.kafka.serializers.AbstractKafkaAvroSerDeConfig;
import io.confluent.kafka.streams.serdes.avro.SpecificAvroSerde;

public class PlayerActionScore {

  public Properties buildStreamsProperties(Properties envProps) {
    Properties props = new Properties();

    props.put(StreamsConfig.APPLICATION_ID_CONFIG, envProps.getProperty("application.id"));
    props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, envProps.getProperty("bootstrap.servers"));
    props.put(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, envProps.getProperty("schema.registry.url"));
    props.put(StreamsConfig.SECURITY_PROTOCOL_CONFIG, envProps.getProperty("security.protocol"));
    props.put(SaslConfigs.SASL_MECHANISM, envProps.getProperty("sasl.mechanism"));
    props.put(SaslConfigs.SASL_JAAS_CONFIG, envProps.getProperty("sasl.jaas.config"));
    props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
    props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
    props.put(StreamsConfig.CACHE_MAX_BYTES_BUFFERING_CONFIG, 0);
    props.put(StreamsConfig.REPLICATION_FACTOR_CONFIG, envProps.getProperty("input.topic.replication.factor"));

    return props;
  }

  private SpecificAvroSerde<PlayerAction> playerActionSerde(final Properties envProps) {
    final SpecificAvroSerde<PlayerAction> serde = new SpecificAvroSerde<>();
    Map<String, String> config = new HashMap<>();
    
    config.put(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, envProps.getProperty("schema.registry.url"));
    config.put(AbstractKafkaAvroSerDeConfig.BASIC_AUTH_CREDENTIALS_SOURCE, envProps.getProperty("basic.auth.credentials.source"));
    config.put(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_USER_INFO_CONFIG, envProps.getProperty("schema.registry.basic.auth.user.info"));

    serde.configure(config, false);
    return serde;
  }

  public Topology buildTopology(Properties envProps,
                                final SpecificAvroSerde<PlayerAction> playerActionSerde) {
    final StreamsBuilder builder = new StreamsBuilder();

    final String inputTopic = envProps.getProperty("input.topic.name");
    final String outputTopic = envProps.getProperty("output.topic.name");

    builder.stream(inputTopic, Consumed.with(Serdes.String(), playerActionSerde))
        // chave será nome e valor será o score
        .map((k, v) -> new KeyValue<>((String) v.getPlayer().getPlayerName(), (Integer) v.getScore().getScoredPoints()))
        // agrupa por nome do jogador
        .groupByKey(Grouped.with(Serdes.String(), Serdes.Integer()))
        // Apply SUM aggregation
        .reduce(Integer::sum)
        // Write to stream specified by outputTopic
        .toStream().to(outputTopic, Produced.with(Serdes.String(), Serdes.Integer()));

    return builder.build();
  }

  public Properties loadEnvProperties(final String fileName) throws IOException {
    final Properties envProps = new Properties();
    final FileInputStream input = new FileInputStream(fileName);
    envProps.load(input);
    input.close();

    return envProps;
  }

  public static void main(final String[] args) throws IOException {
    if (args.length < 1) {
      throw new IllegalArgumentException(
          "This program takes one argument: the path to an environment configuration file.");
    }

    new PlayerActionScore().runRecipe(args[0]);
  }

  private void runRecipe(final String configPath) throws IOException {
    final Properties envProps = this.loadEnvProperties(configPath);
    final Properties streamProps = this.buildStreamsProperties(envProps);

    final Topology topology = this.buildTopology(envProps, this.playerActionSerde(envProps));

    final KafkaStreams streams = new KafkaStreams(topology, streamProps);
    final CountDownLatch latch = new CountDownLatch(1);

    // Attach shutdown handler to catch Control-C.
    Runtime.getRuntime().addShutdownHook(new Thread("streams-shutdown-hook") {
      @Override
      public void run() {
        streams.close();
        latch.countDown();
      }
    });

    try {
      System.out.println("****** iniciando o analisador de stream de pontuacao ******");

      streams.start();
      latch.await();
    } catch (final Throwable e) {
      System.exit(1);
    }
    System.exit(0);

  }
}
