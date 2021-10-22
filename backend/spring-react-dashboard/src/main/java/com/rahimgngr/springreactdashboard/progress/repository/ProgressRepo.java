package com.rahimgngr.springreactdashboard.progress.repository;

import com.rahimgngr.springreactdashboard.progress.entity.ProgEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepo extends JpaRepository<ProgEntity, Integer> {
}
