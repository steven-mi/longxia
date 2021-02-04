package org.labelme.backend.controller;

import org.labelme.backend.dto.DatasetImageDTO;
import org.labelme.backend.model.DatasetImage;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.UserRepository;
import org.labelme.backend.service.DatasetImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/datasetImages")
public class DatasetImageController {

    @Autowired
    private DatasetImageService datasetImageService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Void> postDatasetImage(@RequestPart(value = "file") MultipartFile file,
                                                 @RequestHeader("Authorization") String token) throws IOException {
        Optional<User> user = userRepository.findByAccessToken(token);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        DatasetImage datasetImage = this.datasetImageService.save(file, user.get());
        if (datasetImage == null) {
            return ResponseEntity.badRequest().build();
        }

        Long datasetId = datasetImage.getId();
        URI songUri = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + datasetId.toString()).build().toUri();
        return ResponseEntity.created(songUri).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<DatasetImageDTO> getDatasetImage(@PathVariable(value = "id") Long id) {
        Optional<DatasetImageDTO> datasetImageDTO = this.datasetImageService.findById(id);
        if (datasetImageDTO.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(datasetImageDTO.get());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatasetImage(@PathVariable(value = "id") Long id) {
        Optional<DatasetImage> datasetImage = this.datasetImageService.delete(id);
        if (datasetImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {

            return ResponseEntity.noContent().build();
        }
    }

}
