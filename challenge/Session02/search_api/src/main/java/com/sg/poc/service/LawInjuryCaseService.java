package com.sg.poc.service;


import com.sg.poc.domain.dto.IngestRequest;
import com.sg.poc.domain.dto.SearchRequest;
import com.sg.poc.domain.entity.HistorySearchTerm;
import com.sg.poc.domain.entity.LawInjuryCase;
import java.util.List;

public interface LawInjuryCaseService {

  Integer ingest(IngestRequest request);

  LawInjuryCase findById(Integer id);

  Object search(SearchRequest searchTerm);

  List<HistorySearchTerm> history();

}
