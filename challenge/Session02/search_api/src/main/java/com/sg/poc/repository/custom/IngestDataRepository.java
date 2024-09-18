package com.sg.poc.repository.custom;

import com.sg.poc.domain.dto.LawAttributes;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class IngestDataRepository {

  @PersistenceContext
  private EntityManager em;


  private List<LawAttributes> ingest(String id) {
    try {
      String sql = """
          (with recursive cte as
                 (select *
                  from law_attributes
                  where id = :id
                  union all
                  select s.*
                  from law_attributes s
                           inner join cte on s.parent = cte.id)
                  select *  as id
                  from cte)""";
      Query query = em.createNativeQuery(sql);
      query.setParameter("id", id);
      List<Object[]> result = query.getResultList();
      List<LawAttributes> lawAttributes = new LinkedList<>();
      result.forEach(objects -> {
        LawAttributes lawAttribute = new LawAttributes();
        lawAttribute.setId((Integer) objects[0]);
        lawAttribute.setPrimaryKey((String) objects[1]);
        lawAttribute.setName((String) objects[2]);
        lawAttribute.setLevel((String) objects[3]);
        lawAttribute.setEntity((String) objects[4]);
        lawAttribute.setValue((String) objects[5]);
        lawAttributes.add(lawAttribute);
      });
      return lawAttributes;
    } catch (Exception e) {
      return Collections.emptyList();
    }
  }

}
