package com.sg.poc.domain.converter;

import com.sg.poc.domain.enums.Level;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class LevelConverter implements AttributeConverter<Level, String> {

  @Override
  public String convertToDatabaseColumn(Level attribute) {
    return attribute.getValue();
  }

  @Override
  public Level convertToEntityAttribute(String dbData) {
    return Level.of(dbData);
  }
}
