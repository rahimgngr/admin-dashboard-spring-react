package com.rahimgngr.springreactdashboard.progress.service;

import com.rahimgngr.springreactdashboard.progress.entity.ProgEntity;
import com.rahimgngr.springreactdashboard.progress.repository.ProgressRepo;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgServiceImpl implements ProgService {

    @Autowired
    ProgressRepo repository;

    @Override
    public Object saveProg(ProgEntity progEntity) {
        return repository.save(progEntity);
    }

    @Override
    public List<ProgEntity> getAll() {
        return repository.findAll();
    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<ProgEntity> getSpes(int id) {
        return repository.findById(id);
    }

    @Override
    public ProgEntity update(ProgEntity progEntity, int id) {
        ProgEntity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found for this id :: " + id));

        entity.setUserName(progEntity.getUserName());
        entity.setProjectName((progEntity.getProjectName()));
        entity.setStartedTime(progEntity.getStartedTime());

        final ProgEntity updatedEntity = repository.save(entity);
        return updatedEntity;
    }
}
