package com.rahimgngr.springreactdashboard.projects.service;

import com.rahimgngr.springreactdashboard.projects.entity.ProjectEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface ProjectService {
    ProjectEntity saveProject(ProjectEntity projectEntity);
    Page<ProjectEntity> getAll(Pageable pageable);
    Optional<ProjectEntity> getSpes(int id);
    void delete(int id);
    ProjectEntity update (ProjectEntity projectEntity, int id);

}
