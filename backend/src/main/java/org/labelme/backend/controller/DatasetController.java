package org.labelme.backend.controller;

import org.labelme.backend.dto.DatasetDTO;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.UserRepository;
import org.labelme.backend.service.DatasetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/datasets")
public class DatasetController {

    @Autowired
    DatasetService datasetService;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<DatasetDTO>> getDatasets(@RequestHeader("Authorization") String token) {
        User user = userRepository.findByAccessToken(token).get();

        return ResponseEntity.ok(this.datasetService.findAll(user));
    }

    @GetMapping("{id}")
    public ResponseEntity<DatasetDTO> getDataset(@PathVariable(value = "id") Integer id,
                                                 @RequestHeader("Authorization") String token) {
        User user = this.userRepository.findByAccessToken(token).get();

        Optional<DatasetDTO> dataset = this.datasetService.findById(id, user);
        return dataset.isEmpty()
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(dataset.get());
    }

    @PostMapping
    public ResponseEntity<Void> createDataset(@RequestBody DatasetDTO datasetDTO,
                                              @RequestHeader("Authorization") String token) {
        User user = this.userRepository.findByAccessToken(token).get();
        this.datasetService.save(datasetDTO, user);
        return ResponseEntity.noContent().build();
    }
}
