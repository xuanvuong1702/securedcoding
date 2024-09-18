package com.sg.poc.configuration;

import jakarta.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Component
@Aspect
@Slf4j
@RequiredArgsConstructor
public class LogConfiguration {

  private final HttpServletRequest request;

  @Around("within(com.sg.poc.controller.*)")
  public Object writeLog(ProceedingJoinPoint joinPoint) throws Throwable {
    StringBuilder requestBuilder = new StringBuilder();
    Arrays.stream(joinPoint.getArgs()).forEach(s -> requestBuilder.append(s).append("|"));
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    Method method = signature.getMethod();
    Object resultAfterProcess = joinPoint.proceed();
    MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
    String className = methodSignature.getDeclaringType().getSimpleName();
    String methodName = methodSignature.getName();
    StopWatch stopWatch = calculateTime(className, methodName);
    log.info(
        "\n "
            + "#### Request ####: \n "
            + "| (1). URL: {} \n "
            + "| (2). Request PAYLOAD or Parameter: {} \n "
            + "| (3). Method: {} \n "
            + "| (4). Class: {} \n "
            + "| (5). Function: {} \n "
            + "#### Response ####: \n "
            + "| (1) Result: {} \n "
            + "#### Time execution ####: \n "
            + "| (1) Result: {}(ns) \n ",
        request.getRequestURL(),
        requestBuilder,
        request.getMethod(),
        signature.getDeclaringTypeName(),
        method.getName(),
        resultAfterProcess,
        stopWatch.getTotalTimeNanos());
    return resultAfterProcess;
  }

  private static StopWatch calculateTime(String className, String methodName) {
    StopWatch stopWatch = new StopWatch(className + "->" + methodName);
    stopWatch.start(methodName);
    stopWatch.stop();
    return stopWatch;
  }

}
