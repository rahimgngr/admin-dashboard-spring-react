package com.rahimgngr.springreactdashboard.projects.controller;

import com.rahimgngr.springreactdashboard.projects.entity.ProjectEntity;
import com.rahimgngr.springreactdashboard.projects.repository.ProjectRepo;
import com.rahimgngr.springreactdashboard.projects.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @PostMapping("/add")
    public String add(@RequestBody ProjectEntity entity) {
        service.saveProject(entity);
        return "Proje eklendi!";
    }

    @GetMapping("/get")
    public Page<ProjectEntity> getAll(Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("/get/{id}")
    public Optional<ProjectEntity> getSpes(@PathVariable int id) {
        return service.getSpes(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/put/{id}")
    public ProjectEntity update(@RequestBody ProjectEntity newEntity, @PathVariable int id) {
        return service.update(newEntity, id);
    }


}
