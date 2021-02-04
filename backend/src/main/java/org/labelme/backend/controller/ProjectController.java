package org.labelme.backend.controller;

import org.labelme.backend.dto.DatasetDTO;
import org.labelme.backend.dto.ProjectDTO;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.UserRepository;
import org.labelme.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectService projectService;

    @PostMapping
    public ResponseEntity<Void> createProject(@RequestBody ProjectDTO projectDTO,
                                              @RequestHeader("Authorization") String token) {
        User user = this.userRepository.findByAccessToken(token).get();
        this.projectService.save(projectDTO, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getProjects(@RequestHeader("Authorization") String token) {
        User user = userRepository.findByAccessToken(token).get();

        return ResponseEntity.ok(this.projectService.findAll(user));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable(value = "id") Integer id,
                                                 @RequestHeader("Authorization") String token) {
        User user = this.userRepository.findByAccessToken(token).get();

        Optional<ProjectDTO> project = this.projectService.findById(id, user);
        return project.isEmpty()
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(project.get());
    }
}
