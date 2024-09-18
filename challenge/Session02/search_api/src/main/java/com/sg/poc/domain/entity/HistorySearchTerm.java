package com.sg.poc.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sg.poc.domain.dto.LocalDateTimeDeserializer;
import com.sg.poc.domain.dto.LocalDateTimeSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "history_search_term")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistorySearchTerm {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonProperty("id")
  private Integer id;
  @Column(name = "search_term")
  @JsonProperty("search_term")
  private String searchTerm;
  @Column(name = "date")
  @JsonProperty("date")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  @JsonDeserialize(using = LocalDateTimeDeserializer.class)
  private LocalDateTime date;

  public HistorySearchTerm(String searchTerm, LocalDateTime date) {
    this.searchTerm = searchTerm;
    this.date = date;
  }
}
