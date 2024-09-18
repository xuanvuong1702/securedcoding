package com.sg.poc.exception;

import static java.util.Optional.ofNullable;

import com.sg.poc.domain.dto.ApiResponse;
import com.sg.poc.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler {

  @ExceptionHandler(MissingServletRequestParameterException.class)
  public ResponseEntity<ApiResponse<Object>> handleMissingServletRequestParameterException(
      HttpServletRequest request, MissingServletRequestParameterException ex) {
    log.error("MissingServletRequestParameterException: {}", ex.getMessage());
    return ResponseEntity.badRequest()
        .body(ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage()));
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ApiResponse<Object>> handleMethodArgumentTypeMismatchException(
      HttpServletRequest request, MethodArgumentTypeMismatchException ex) {
    Map<String, String> details = new HashMap<>();
    details.put("paramName", ex.getName());
    details.put("paramValue", ofNullable(ex.getValue()).map(Object::toString).orElse(""));
    details.put("errorMessage", ex.getMessage());
    log.error("MethodArgumentTypeMismatchException: {}", ex.getMessage());
    return ResponseEntity.badRequest()
        .body(
            ApiResponse.builder()
                .errorCode(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                .messages(Collections.singletonList("Method argument type mismatch"))
                .data(details)
                .build());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(
      HttpServletRequest request, MethodArgumentNotValidException ex) {
    BindingResult bindingResult = ex.getBindingResult();
    HashMap<String, String> fieldErrors = new HashMap<>();
    bindingResult
        .getFieldErrors()
        .forEach(
            fieldError -> {
              fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            });
    log.error("MethodArgumentNotValidException: {}", ex.getMessage());
    return ResponseEntity.badRequest()
        .body(
            ApiResponse.builder()
                .errorCode(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                .messages(Collections.singletonList("Method argument validation failed"))
                .data(fieldErrors)
                .build());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Object>> handleInternalServerError(
      HttpServletRequest request, Exception ex) {
    log.error("Exception: {}", ex.getMessage(), ex);
    return ResponseEntity.internalServerError()
        .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage()));
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ApiResponse<Object>> handleNotReadableException(
      HttpServletRequest request, HttpMessageNotReadableException ex) {
    log.error("HttpMessageNotReadableException: {}", ex.getMessage());
    return ResponseEntity.badRequest()
        .body(ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage()));
  }

  @ExceptionHandler(BusinessException.class)
  public ResponseEntity<ApiResponse<Object>> handleBusinessException(
      HttpServletRequest request, BusinessException ex) {
    log.error("BusinessException: {}", ex.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage()));
  }

}
