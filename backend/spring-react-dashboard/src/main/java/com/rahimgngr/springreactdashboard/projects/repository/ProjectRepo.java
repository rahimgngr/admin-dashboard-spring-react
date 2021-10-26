package com.rahimgngr.springreactdashboard.projects.repository;

import com.rahimgngr.springreactdashboard.projects.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.*;

@Repository
public interface ProjectRepo extends PagingAndSortingRepository<ProjectEntity, Integer> {}
