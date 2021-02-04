package org.labelme.backend.service;

import org.labelme.backend.dto.DatasetDTO;
import org.labelme.backend.dto.DatasetImageDTO;
import org.labelme.backend.dto.ProjectDTO;
import org.labelme.backend.model.Dataset;
import org.labelme.backend.model.DatasetImage;
import org.labelme.backend.model.Project;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.DatasetImageRepository;
import org.labelme.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    DatasetImageRepository datasetImageRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    DatasetImageService datasetImageService;

    public void save(ProjectDTO projectDTO, User user) {
        Project project = this.projectRepository.save(
                Project.builder()
                        .name(projectDTO.getName())
                        .owner(user)
                        .description(projectDTO.getDescription())
                        .build());

        List<DatasetImage> datasetImages = this.datasetImageRepository
                .findAllByIdsAndUser(projectDTO.getImageIds(), user);
        datasetImages.forEach(datasetImage -> datasetImage.setProject(project));
        datasetImageRepository.saveAll(datasetImages);
    }

    public List<ProjectDTO> findAll(User user) {
        return this.projectRepository.findAllByUser(user).stream()
                .map(project -> ProjectDTO.builder()
                        .description(project.getDescription())
                        .id(project.getId())
                        .name(project.getName())
                        .imageIds(project.getImages().stream().map(DatasetImage::getId).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
    }

    public Optional<ProjectDTO> findById(Integer id, User user) {
        Project project = this.projectRepository.findByIdAndUser(id, user).orElse(null);

        return project != null ?
                Optional.of(
                        ProjectDTO.builder()
                                .id(project.getId())
                                .name(project.getName())
                                .description(project.getName())
                                .imageIds(project.getImages().stream().map(DatasetImage::getId).collect(Collectors.toList()))
                                /*.images(project.getImages().stream()
                                        // TODO: refactor dataset image service to provide such a return value
                                        .map(datasetImage -> DatasetImageDTO.builder()
                                                .name(datasetImage.getImageName())
                                                .size(datasetImage.getImageSize())
                                                .id(datasetImage.getId())
                                                .url(datasetImageService.getSignedImageUrl(datasetImage))
                                                .build())
                                .collect(Collectors.toList()))*/
                                .build()
                )
                : Optional.empty();
    }
}
