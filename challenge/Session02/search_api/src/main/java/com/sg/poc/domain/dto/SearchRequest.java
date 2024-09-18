package com.sg.poc.domain.dto;

import java.util.List;
import lombok.Data;

@Data
public class SearchRequest {

  private Filter filter;
  private Pagination pagination;
  private String query;
  private String sorting;
  private List<String> returnFilterable;
  private String block;
  private String slug;
  private String terminalCode;

  @Data
  private static class Filter {

    private List<String> attributes;
  }

  @Data
  private static class Pagination {

    private Integer itemsPerPage;
    private Integer pageNumber;
  }


}
