package com.sg.poc.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class PocConfiguration {

  @Bean
  public ObjectMapper objectMapper() {
    return new ObjectMapper();
  }

  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

//  @Bean
//  public CorsFilter corsFilter() {
//    CorsConfiguration configuration = new CorsConfiguration();
//    configuration.setAllowedMethods(Collections.singletonList("*"));
//    configuration.setAllowedOrigins(Collections.singletonList("*"));
//    configuration.setAllowedHeaders(Collections.singletonList("*"));
//    configuration.setAllowCredentials(false);
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    source.registerCorsConfiguration("/**", configuration);
//    return new CorsFilter(source);
//  }
}
