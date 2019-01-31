package com.team22.backend.Controller;

import com.team22.backend.Entity.*;
import com.team22.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CheckController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CheckProductRepository checkProductRepository;

    @GetMapping(path = "/checkproduct", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<CheckProduct> checkProduct() {
        return checkProductRepository.findAll().stream().collect(Collectors.toList());
    }
  
    @PostMapping("/checkproduct/{prodId}/{levelCheck}/{commemtCheck}")
    public CheckProduct newcheck(@RequestBody CheckProduct newcheck, @PathVariable Long prodId, @PathVariable Integer levelCheck,@PathVariable String commemtCheck)
    {
        Product setProd = productRepository.findByProdId(prodId);
        newcheck.setCheckComment(commemtCheck);
        newcheck.setCheckLevel(levelCheck);
        newcheck.setProduct(setProd);
        return checkProductRepository.save(newcheck);
    }
}