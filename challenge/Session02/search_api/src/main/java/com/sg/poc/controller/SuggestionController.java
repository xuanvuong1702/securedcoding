package com.sg.poc.controller;

import com.sg.poc.domain.dto.ApiResponse;
import com.sg.poc.domain.dto.IngestRequest;
import com.sg.poc.service.LawInjuryCaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/poc/v1")
@RequiredArgsConstructor
@Slf4j
// CORS is enabled for all origins
@CrossOrigin("*")
public class SuggestionController {

  private final LawInjuryCaseService injuryCaseService;

  @PostMapping(value = "/suggest")
  public ResponseEntity<ApiResponse<Object>> ingest(@Valid @RequestBody IngestRequest request) {
    try {
      return ResponseEntity.ok(ApiResponse.success(injuryCaseService.ingest(request)));
    } catch (Exception e) {
      // Log the exception without exposing sensitive information
      log.error("Cannot ingest data", e);
  
      // Throw a generic exception message
      throw new BusinessException("An error occurred while ingesting data");
    }
  }
}
