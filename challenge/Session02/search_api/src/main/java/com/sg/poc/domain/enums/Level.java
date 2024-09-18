package com.sg.poc.domain.enums;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Level {
  L1("Level 1"),
  L2("Level 2"),
  L3("Level 3");

  private final String value;

  private static final Map<String, Level> statusMap = new HashMap<>();


  static {
    for (Level status : Level.values()) {
      statusMap.put(status.value, status);
    }
  }

  public static Level of(String i) {
    return statusMap.get(i);
  }
}
