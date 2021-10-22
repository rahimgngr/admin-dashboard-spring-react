package com.rahimgngr.springreactdashboard.admin.repository;

import com.rahimgngr.springreactdashboard.admin.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<AdminEntity,Integer> {
    Optional<AdminEntity> findByUserName(String userName);
}
