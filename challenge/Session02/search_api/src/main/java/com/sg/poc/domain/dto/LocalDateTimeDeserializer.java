package com.sg.poc.domain.dto;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {
  private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

  @Override
  public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)
        throws IOException, JsonProcessingException {
      ObjectCodec codec = p.getCodec();
      String dateString = codec.readValue(p, String.class);

      // Validate dateString
      if (dateString == null || dateString.isEmpty()) {
        throw new IllegalArgumentException("Invalid date string");
      }

      try {
        return LocalDateTime.parse(dateString, formatter);
      } catch (DateTimeParseException e) {
        // Log the exception without exposing sensitive information
        log.error("Cannot parse date string", e);

        // Throw a generic exception message
        throw new JsonProcessingException("An error occurred while parsing date string");
      }
    }
}
