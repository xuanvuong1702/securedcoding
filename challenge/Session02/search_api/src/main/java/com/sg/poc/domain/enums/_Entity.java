package com.sg.poc.domain.enums;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum _Entity {
  INJURY_CASE("injury_case");
  private final String value;

  private static final Map<String, _Entity> statusMap = new HashMap<>();


  static {
    for (_Entity status : _Entity.values()) {
      statusMap.put(status.value, status);
    }
  }

  public static _Entity of(String i) {
    return statusMap.get(i);
  }
}
