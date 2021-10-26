package com.rahimgngr.springreactdashboard.projects.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;


@Entity
@Table(name = "project")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column
    private String projectName;

    @Column
    private String startDate;

    @Column
    private String endDate;

}
