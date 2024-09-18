package com.sg.poc.configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import co.elastic.clients.util.ContentType;
import java.util.List;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponseInterceptor;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
public class ElasticSearchConfiguration {

  @Value("${elasticsearch.host}")
  private String host;
  @Value("${elasticsearch.port}")
  private Integer port;

  @Bean
  public RestClient getRestClient() {

    return RestClient.builder(
        new HttpHost(host, port))
        .setHttpClientConfigCallback(httpClientBuilder -> {
          httpClientBuilder.disableAuthCaching();
          httpClientBuilder.setDefaultHeaders(List.of(
              new BasicHeader(
                  HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON)));
          httpClientBuilder.addInterceptorLast((HttpResponseInterceptor)
              (response, context) ->
                  response.addHeader("X-Elastic-Product", "Elasticsearch"));
          return httpClientBuilder;
        })
        .build();
  }

  @Bean
  public ElasticsearchTransport getElasticsearchTransport() {
    return new RestClientTransport(
        getRestClient(), new JacksonJsonpMapper());
  }


  @Bean
  public ElasticsearchClient getElasticsearchClient() {
    return new ElasticsearchClient(getElasticsearchTransport());
  }
}
