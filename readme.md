## O que é?

Demonstração de features básicas para uso do Apache Kafka, desde pub-sub até Stream Processing, através de um Game divertido.

Este repositorio é composto por:

- game-client-react: Jogo de caça aos Pokémons, onde o jogador gera telemetrias de acerto de nomes de Pokémons e de KM percorrido
- Kafka-Demo-Producer: Backend Serverless para captura dos eventos do game
- producer-netcore: Console App para geração de dados de teste, para substituir a necessidade de jogadores reais
- streams-score: Kafka Streams App para processamento em tempo real da pontuação dos jogadores
- streams-walk: Kafka Streams App para processamento em tempo real da quilometragem percorrida pelos jogadores

### Pré-Requisitos

- .Net Core 3+
- Java 8+
- Gradle
- Node

## Como configurar o ambiente:

### Kafka:
1) Criar os tópicos no Kafka, caso autocreate esteja desabilitado

- streaming.pokemon.score
- streaming.pokemon.score.aggregated
- streaming.pokemon.walk.aggregated

2) Executar os seguintes comandos para acompanhar os dados sumarizados em tempo real

```sh
./kafka-console-consumer.sh --bootstrap-server pkc-4nym6.us-east-1.aws.confluent.cloud:9092  --consumer.config ../config/consumer.properties  \    --topic streaming.pokemon.walk.aggregated \    --from-beginning \    --formatter kafka.tools.DefaultMessageFormatter \    --property print.key=true \    --property print.value=true \    --property key.deserializer=org.apache.kafka.common.serialization.StringDeserializer \    --property value.deserializer=org.apache.kafka.common.serialization.IntegerDeserializer

./kafka-console-consumer.sh --bootstrap-server pkc-4nym6.us-east-1.aws.confluent.cloud:9092  --consumer.config ../config/consumer.properties  \    --topic streaming.pokemon.score.aggregated \    --from-beginning \    --formatter kafka.tools.DefaultMessageFormatter \    --property print.key=true \    --property print.value=true \    --property key.deserializer=org.apache.kafka.common.serialization.StringDeserializer \    --property value.deserializer=org.apache.kafka.common.serialization.IntegerDeserializer
```

### Execução:

Java:
```sh
./gradlew build
./gradlew shadowJar
java -jar build/libs/kstreams-playeraction-sum-score-standalone-0.0.1.jar configuration/dev.properties
java -jar build/libs/kstreams-playeraction-sum-walk-standalone-0.0.1.jar  configuration/dev.properties
```