package com.rahimgngr.springreactdashboard.progress.service;

import com.rahimgngr.springreactdashboard.progress.entity.ProgEntity;

import java.util.List;
import java.util.Optional;

public interface ProgService {
    Object saveProg(ProgEntity progEntity);

    List<ProgEntity> getAll();

    void delete(int id);

    Optional<ProgEntity> getSpes(int id);

    ProgEntity update(ProgEntity progEntity, int id);
}
