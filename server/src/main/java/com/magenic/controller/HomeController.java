package com.magenic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@RequestMapping("/")
	String welcome() {
		return "Hello. Welcome to the Health Hub!";
	}
}
