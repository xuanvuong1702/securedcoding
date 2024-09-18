package com.sg.poc.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.DeleteRequest;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.indices.ExistsRequest;
import com.sg.poc.domain.dto.IngestRequest;
import com.sg.poc.domain.dto.SearchRequest;
import com.sg.poc.domain.entity.HistorySearchTerm;
import com.sg.poc.domain.entity.LawInjuryCase;
import com.sg.poc.exception.BusinessException;
import com.sg.poc.repository.HistorySearchTermRepository;
import com.sg.poc.repository.LawInjuryCaseRepository;
import com.sg.poc.service.LawInjuryCaseService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;


@Service
@Slf4j
@RequiredArgsConstructor
public class LawInjuryCaseServiceImpl implements LawInjuryCaseService {

  private final ElasticsearchClient elasticsearchClient;
  private final LawInjuryCaseRepository lawInjuryCaseRepository;
  private final RestTemplate restTemplate;
  private final HistorySearchTermRepository historySearchTermRepo;
  @Value("${elasticsearch.index}")
  private String INDEX_NAME;
  @Value("${elasticsearch.search}")
  private String ES_FULL_TEXT_SEARCH_URL;

  @Override
  public Integer ingest(IngestRequest request) {
    if (!isExist()) {
      create();
    }
    if (CollectionUtils.isEmpty(request.getIds())) {
      lawInjuryCaseRepository.findAll().stream().parallel().forEach(this::save);
      return Math.toIntExact(lawInjuryCaseRepository.count());
    } else {
      AtomicInteger count = new AtomicInteger();
      request.getIds().stream().parallel().forEach(id -> {
        try {
          GetResponse<LawInjuryCase> response = retrieveDocument(id);
          if (response != null && response.found()) {
            deleteDocument(id);
          }
          lawInjuryCaseRepository.findById(id).ifPresent(injuryCase -> {
            count.getAndIncrement();
            save(injuryCase);
          });
        } catch (Exception e) {
          log.error("Ingest id: {} fails and message: {}", id, e.getMessage());
        }
      });
      return count.get();
    }
  }

  @Override
  public LawInjuryCase findById(Integer id) {
    try {
      GetResponse<LawInjuryCase> response = elasticsearchClient.get(g -> g
              .index(INDEX_NAME)
              .id(String.valueOf(id)),
          LawInjuryCase.class);
      log.info("Retrieve data completed id: ###{}", id);
      if (response.source() != null) {
        return response.source();
      } else {
        throw new BusinessException("Can not find LawInjuryCase with id " + id);
      }
    } catch (Exception e) {
      log.error("Cannot retrieve data id: {} and message: {}", id, e.getMessage());
      throw new BusinessException(e.getMessage());
    }
  }

  @Override
  @SneakyThrows
  public Object search(SearchRequest searchRequest) {
    if (StringUtils.hasText(searchRequest.getQuery())
        && CollectionUtils.isEmpty(historySearchTermRepo.findBySearchTerm(searchRequest.getQuery()))) {
      historySearchTermRepo.save(new HistorySearchTerm(searchRequest.getQuery(), LocalDateTime.now()));
    }
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    String requestBody = """
        {
          "query": {
            "bool": {
              "should": [
                { "term": { "name": "%s"}},
                { "term": { "party_name": "%s"}},
                { "term": { "liability": "%s"}},
                { "term": { "plaintiff_sex": "%s"}},
                { "term": { "plaintiff_age": "%s"}},
                { "term": { "plaintiff_job": "%s"}},
                { "term": { "injury": "%s"}},
                { "term": { "treatment": "%s"}},
                { "term": { "disabilities": "%s"}},
                { "term": { "awarded": "%s"}}
              ],
              "filter": [
                { "term": { "party_name": "Yoshida Yuna" }},
                {
                  "query_string": {
                    "query": "%s"
                  }
                }
              ]
            }
          },
          "aggs": {
            "part_name": {
              "filter": {
                "range": {
                  "part_name": {
                    "gte": 1,
                    "lte": 10000
                  }
                }
              }
            }
          }
        }
        """;

    String formattedRequestBody = String.format(requestBody,
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery(),
        searchRequest.getQuery());
    HttpEntity<String> requestEntity = new HttpEntity<>(
        StringUtils.hasText(searchRequest.getQuery()) ? requestBody : null, headers);
    ResponseEntity<Object> responseEntity = restTemplate.exchange(
        ES_FULL_TEXT_SEARCH_URL,
        HttpMethod.POST,
        requestEntity,
        Object.class);
    return responseEntity.getBody();
  }

  @Override
  public List<HistorySearchTerm> history() {
    return historySearchTermRepo
        .findAll(PageRequest.of(0, 10, Sort.by("date").descending()))
        .getContent();
  }

  private void deleteDocument(Integer id) {
    try {
      DeleteRequest deleteRequest = DeleteRequest.of(
          d -> d.index(INDEX_NAME).id(String.valueOf(id)));
      elasticsearchClient.delete(deleteRequest);
      log.info("Delete completed id: {}", id);
    } catch (Exception e) {
      log.error("Cannot delete data id: {} and message: {}", id, e.getMessage());
    }
  }


  public GetResponse<LawInjuryCase> retrieveDocument(Integer id) {
    try {
      GetResponse<LawInjuryCase> response = elasticsearchClient.get(g -> g
              .index(INDEX_NAME)
              .id(String.valueOf(id)),
          LawInjuryCase.class);
      log.info("Retrieve data completed id: ###{}", id);
      return response;
    } catch (Exception e) {
      log.error("Cannot retrieve data id: {} and message: {}", id, e.getMessage());
      throw new BusinessException(e.getMessage());
    }
  }

  private void save(LawInjuryCase obj) {
    try {
      elasticsearchClient.index(i -> i
          .index(INDEX_NAME)
          .id(String.valueOf(obj.getId()))
          .document(obj)
      );
      log.info("Ingest data completed id: ###{}", obj.getId());
    } catch (Exception e) {
      log.error("Cannot ingest data id: {} and message: {}", obj.getId(), e.getMessage());
      throw new BusinessException(e.getMessage());
    }
  }

  private void create() {
    try {
      elasticsearchClient.indices()
          .create(c -> c.index(INDEX_NAME));
    } catch (Exception e) {
    }
  }

  private boolean isExist() {
    try {
      return elasticsearchClient.indices().exists(ExistsRequest.of(e -> e.index(INDEX_NAME)))
          .value();
    } catch (Exception e) {
      return Boolean.FALSE;
    }
  }
}




