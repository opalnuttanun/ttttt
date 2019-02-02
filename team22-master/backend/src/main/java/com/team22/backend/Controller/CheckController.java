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
  
    @PostMapping("/checkproduct/{prodId}/{checkLevel}/{checkComment}")
    public CheckProduct newcheck(@RequestBody CheckProduct newcheck, @PathVariable Long prodId, @PathVariable Integer checkLevel,@PathVariable String checkComment)
    {
        Product setProd = productRepository.findByProdId(prodId);
        newcheck.setCheckComment(checkComment);
        newcheck.setCheckLevel(checkLevel);
        newcheck.setProduct(setProd);
        return checkProductRepository.save(newcheck);
    }
    @DeleteMapping("/checkhistory/{checkId}")
    public void deletecheckproductHistory(@PathVariable Long checkId) {
        checkProductRepository.deleteById(checkId);
    }
    @PutMapping("/checkproduct/editcheck/{prodId}/{checkId}/{checkLevel}/{checkComment}")
    public CheckProduct editcheckproduct(@RequestBody CheckProduct checkp, @PathVariable Long prodId,@PathVariable Long checkId, @PathVariable Integer checkLevel, @PathVariable String checkComment) {
        CheckProduct setchP = checkProductRepository.findByCheckId(checkId);
        return checkProductRepository.findById(prodId).map(checkEdit -> {
                    checkEdit.setCheckLevel(checkLevel);
                    checkEdit.setCheckComment(checkComment);
                    return checkProductRepository.save(checkEdit);
                }
        ).orElseGet(() -> {
            return checkProductRepository.save(checkp);
        });
    }
}