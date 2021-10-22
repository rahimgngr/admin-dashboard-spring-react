package com.rahimgngr.springreactdashboard.admin.service;

import com.rahimgngr.springreactdashboard.admin.entity.AdminEntity;
import com.rahimgngr.springreactdashboard.admin.repository.AdminRepo;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo repository;


    @Override
    public Object saveAdmin(AdminEntity adminEntity) {
        List<String> users = repository.findAll().stream().distinct().map(AdminEntity::getUserName).collect(Collectors.toList());
        if (users.contains(adminEntity.getUserName())) {
            System.out.println("User Exists Already! ");
            return "User Exists!";
        } else
            return repository.save(adminEntity);
    }

    @Override
    public List<AdminEntity> getAll() {
        return repository.findAll();
    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<AdminEntity> getSpes(int id) {
        return repository.findById(id);
    }

    @Override
    public AdminEntity update(AdminEntity adminEntity, int id) {
        AdminEntity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found for this id :: " + id));

        entity.setUserName(adminEntity.getUserName());
        entity.setPassword(adminEntity.getPassword());
        entity.setRole(adminEntity.getRole());

        final AdminEntity updatedEntity = repository.save(entity);
        return updatedEntity;
    }
}
