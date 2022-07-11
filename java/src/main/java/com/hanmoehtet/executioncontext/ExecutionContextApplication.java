package com.hanmoehtet.executioncontext;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ExecutionContextApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExecutionContextApplication.class, args);
	}

	@GetMapping
	public String doGet() {
		Counter.count++;
		return "Count: " + Counter.count;
	}
}
