package com.wedspot.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class ApiGatewayApplication {
//	@Autowired
//	RouteDefinitionLocator locator;
//
//	@PostConstruct
//	public void printRoutes() {
//		locator.getRouteDefinitions().subscribe(route ->
//				System.out.println("Loaded Route: " + route.getId()));
//	}

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}
