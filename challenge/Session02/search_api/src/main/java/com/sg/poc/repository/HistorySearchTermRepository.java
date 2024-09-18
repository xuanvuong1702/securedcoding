package com.sg.poc.repository;

import com.sg.poc.domain.entity.HistorySearchTerm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistorySearchTermRepository extends JpaRepository<HistorySearchTerm, Integer> {

  List<HistorySearchTerm> findBySearchTerm(String searchTerm);

}
