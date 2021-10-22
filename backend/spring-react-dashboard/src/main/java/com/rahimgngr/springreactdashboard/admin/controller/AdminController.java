package com.rahimgngr.springreactdashboard.admin.controller;


import com.rahimgngr.springreactdashboard.admin.entity.AdminEntity;
import com.rahimgngr.springreactdashboard.admin.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/add")
    public String add(@RequestBody AdminEntity entity) {
        service.saveAdmin(entity);
        return "Kullanıcı eklendi!";

    }

    @GetMapping("/get")
    public List<AdminEntity> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
        System.out.println("Deleted!");
    }

    @GetMapping("/get/{id}")
    public Optional<AdminEntity> getSpes(@PathVariable int id) {
        return service.getSpes(id);
    }

    @PutMapping("/put/{id}")
    public AdminEntity update(@RequestBody AdminEntity newEntity, @PathVariable int id) {
        return service.update(newEntity, id);
    }
}
