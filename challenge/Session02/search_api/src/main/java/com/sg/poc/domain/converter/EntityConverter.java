package com.sg.poc.domain.converter;

import com.sg.poc.domain.enums._Entity;
import com.sg.poc.domain.enums._Entity;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EntityConverter implements AttributeConverter<_Entity, String> {

  @Override
  public String convertToDatabaseColumn(_Entity attribute) {
    return attribute.getValue();
  }

  @Override
  public _Entity convertToEntityAttribute(String dbData) {
    return _Entity.of(dbData);
  }
}
