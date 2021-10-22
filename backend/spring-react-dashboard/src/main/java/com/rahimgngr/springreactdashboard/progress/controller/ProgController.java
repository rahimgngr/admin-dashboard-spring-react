package com.rahimgngr.springreactdashboard.progress.controller;


import com.rahimgngr.springreactdashboard.progress.entity.ProgEntity;
import com.rahimgngr.springreactdashboard.progress.service.ProgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/progress")
@CrossOrigin
public class ProgController {
    @Autowired
    private ProgService service;

    @PostMapping("/add")
    public String add(@RequestBody ProgEntity entity) {
        service.saveProg(entity);
        return "User Added!";

    }

    @GetMapping("/get")
    public List<ProgEntity> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
        System.out.println("Deleted!");
    }

    @GetMapping("/get/{id}")
    public Optional<ProgEntity> getSpes(@PathVariable int id) {
        return service.getSpes(id);
    }

    @PutMapping("/put/{id}")
    public ProgEntity update(@RequestBody ProgEntity newEntity, @PathVariable int id) {
        return service.update(newEntity, id);
    }
}
