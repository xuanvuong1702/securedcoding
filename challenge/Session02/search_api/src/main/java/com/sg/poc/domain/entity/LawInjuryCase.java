package com.sg.poc.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "law_injurry_case")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LawInjuryCase {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonProperty("id")
  private Integer id;
  @Column(name = "uuid")
  @JsonProperty("uuid")
  private String uuid;
  @Column(name = "name")
  @JsonProperty("name")
  private String name;
  @Column(name = "party_name")
  @JsonProperty("party_name")
  private String party_name;
  @Column(name = "liability")
  @JsonProperty("liability")
  private String liability;
  @Column(name = "accident_time")
  @JsonProperty("accident_time")
  private Timestamp accident_time;
  @Column(name = "asessed_time")
  @JsonProperty("asessed_time")
  private Timestamp asessed_time;
  @Column(name = "plaintiff_sex")
  @JsonProperty("plaintiff_sex")
  private String plaintiff_sex;
  @Column(name = "plaintiff_age")
  @JsonProperty("plaintiff_age")
  private String plaintiff_age;
  @Column(name = "plaintiff_job")
  @JsonProperty("plaintiff_job")
  private String plaintiff_job;
  @Column(name = "injury")
  @JsonProperty("injury")
  private String injury;
  @Column(name = "treatment")
  @JsonProperty("treatment")
  private String treatment;
  @Column(name = "disabilities")
  @JsonProperty("disabilities")
  private String disabilities;
  @Column(name = "awarded")
  @JsonProperty("awarded")
  private String awarded;
  @Column(name = "doc_json")
  @JsonProperty("doc_json")
  private String doc_json;
}
