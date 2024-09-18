package com.sg.poc.domain.dto;

import lombok.Data;

@Data
public class ElasticSearchRequest {

  private Query query;

  @Data
  public static class Query {
    private MultilMatch multi_match;
  }

  @Data
  public static class MultilMatch {
    private String query;

  }
}
