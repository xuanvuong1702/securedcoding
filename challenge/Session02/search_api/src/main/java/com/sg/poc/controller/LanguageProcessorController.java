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
public class LanguageProcessorController {

  private final LawInjuryCaseService injuryCaseService;

  @PostMapping(value = "/npl")
  public ResponseEntity<ApiResponse<Object>> ingest(@RequestBody IngestRequest request) {
    return ResponseEntity.ok(ApiResponse.success(injuryCaseService.ingest(request)));
  }
}
