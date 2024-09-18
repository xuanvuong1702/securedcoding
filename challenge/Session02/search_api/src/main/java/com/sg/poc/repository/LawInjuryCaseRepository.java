package com.sg.poc.repository;

import com.sg.poc.domain.entity.LawInjuryCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LawInjuryCaseRepository extends JpaRepository<LawInjuryCase, Integer> {

}
