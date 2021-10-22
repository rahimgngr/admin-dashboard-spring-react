package com.rahimgngr.springreactdashboard.admin.service;

import com.rahimgngr.springreactdashboard.admin.entity.AdminEntity;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Object saveAdmin(AdminEntity adminEntity);
    List<AdminEntity> getAll();
    void delete(int id);
    Optional<AdminEntity> getSpes(int id);
    AdminEntity update (AdminEntity adminEntity, int id);
}
