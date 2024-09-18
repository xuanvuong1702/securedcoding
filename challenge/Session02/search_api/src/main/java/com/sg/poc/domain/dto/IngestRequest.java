package com.sg.poc.domain.dto;

import java.util.List;
import lombok.Data;

@Data
public class IngestRequest {

  private List<Integer> ids;
}
