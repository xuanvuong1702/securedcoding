package com.sg.poc.domain.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

  private String errorCode;
  private List<String> messages;
  private T data;

  public static ApiResponse<Object> success(Object obj) {
    return ApiResponse.builder()
        .errorCode(String.valueOf(HttpStatus.OK.value()))
        .data(obj)
        .messages(Collections.singletonList(HttpStatus.OK.name()))
        .build();
  }

  public static ApiResponse<Object> error(HttpStatus status, String message) {
    return ApiResponse.builder()
        .errorCode(String.valueOf(status.value()))
        .data(null)
        .messages(Collections.singletonList(message))
        .build();
  }
}
