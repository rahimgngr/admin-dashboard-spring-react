package com.rahimgngr.springreactdashboard.projects.service;

import com.rahimgngr.springreactdashboard.projects.entity.ProjectEntity;
import com.rahimgngr.springreactdashboard.projects.repository.ProjectRepo;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectRepo repository;

    @Override
    public ProjectEntity saveProject(ProjectEntity projectEntity) {
        return repository.save(projectEntity);
    }

    @Override
    public List<ProjectEntity> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<ProjectEntity> getSpes(int id) {
        return repository.findById(id);
    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Override
    public ProjectEntity update(ProjectEntity projectEntity, int id) {
        ProjectEntity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found for this id :: " + id));

        entity.setProjectName(projectEntity.getProjectName());
        entity.setStartDate(projectEntity.getStartDate());
        entity.setEndDate(projectEntity.getEndDate());

        final ProjectEntity updatedEntity = repository.save(entity);
        return updatedEntity;
    }


}
