package com.sg.poc.domain.dto;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {

  private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

  @Override
  public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers)
        throws IOException {
      // Validate value
      if (value == null) {
        throw new IllegalArgumentException("Invalid LocalDateTime value");
      }

      try {
        gen.writeString(formatter.format(value));
      } catch (Exception e) {
        // Log the exception without exposing sensitive information
        log.error("Cannot format LocalDateTime value", e);

        // Throw a generic exception message
        throw new IOException("An error occurred while formatting LocalDateTime value");
      }
    }
}
