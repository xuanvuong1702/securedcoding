package com.sg.poc.controller;

import com.sg.poc.domain.dto.ApiResponse;
import com.sg.poc.domain.dto.IngestRequest;
import com.sg.poc.domain.dto.SearchRequest;
import com.sg.poc.service.LawInjuryCaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/poc/v1")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CaseController {

  private final LawInjuryCaseService injuryCaseService;

  @GetMapping(value = "/cases")
  public ResponseEntity<ApiResponse<Object>> findById(@RequestParam("id") Integer id) {
    return ResponseEntity.ok(ApiResponse.success(injuryCaseService.findById(id)));
  }

  @PostMapping(value = "/search/cases")
  public ResponseEntity<ApiResponse<Object>> search(@RequestBody SearchRequest searchRequest) {
    return ResponseEntity.ok(ApiResponse.success(injuryCaseService.search(searchRequest)));
  }

  @GetMapping(value = "/history/cases")
  public ResponseEntity<ApiResponse<Object>> history(){
    return ResponseEntity.ok(ApiResponse.success(injuryCaseService.history()));
  }
}
