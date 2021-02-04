package org.labelme.backend.controller;

import org.labelme.backend.model.Dataset;
import org.labelme.backend.model.DatasetImage;
import org.labelme.backend.model.Project;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.DatasetImageRepository;
import org.labelme.backend.repository.DatasetRepository;
import org.labelme.backend.repository.ProjectRepository;
import org.labelme.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tests")
public class TestController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DatasetRepository datasetRepository;

    @Autowired
    DatasetImageRepository datasetImageRepository;

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping("/user")
    public ResponseEntity<Iterable<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/data")
    public ResponseEntity<Iterable<Dataset>> getDatasets() {
        return ResponseEntity.ok(datasetRepository.findAll());
    }

    @GetMapping("/image")
    public ResponseEntity<Iterable<DatasetImage>> getImages() {
        return ResponseEntity.ok(datasetImageRepository.findAll());
    }

    @GetMapping("/project")
    public ResponseEntity<Iterable<Project>> getProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }


}