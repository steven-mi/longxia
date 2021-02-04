package org.labelme.backend.service;

import org.labelme.backend.dto.DatasetDTO;
import org.labelme.backend.dto.DatasetImageDTO;
import org.labelme.backend.model.Dataset;
import org.labelme.backend.model.DatasetImage;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.DatasetImageRepository;
import org.labelme.backend.repository.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DatasetService {

    @Autowired
    DatasetRepository datasetRepository;

    @Autowired
    DatasetImageRepository datasetImageRepository;

    @Autowired
    DatasetImageService datasetImageService;

    public List<DatasetDTO> findAll(User user) {
        Iterable<Dataset> datasets = this.datasetRepository.findAllByUser(user);
        List<DatasetDTO> datasetsDTO = new LinkedList<>();
        datasets.forEach(dataset -> datasetsDTO.add(DatasetDTO.builder()
                        .id(dataset.getId())
                        .name(dataset.getName())
                        .imageIds(dataset.getImages().stream()
                                .map(DatasetImage::getId)
                                .collect(Collectors.toList()))
/*
                .images(new ArrayList<>())
*/
                        .description(dataset.getDescription())
                        .build()
        ));
        return datasetsDTO;
    }

    public Optional<DatasetDTO> findById(Integer id, User user) {
        Dataset dataset = this.datasetRepository.findByIdAndUser(id, user).orElse(null);

        return dataset == null ?
                Optional.empty() :
                Optional.of(
                        DatasetDTO.builder()
                                .id(dataset.getId())
                                .name(dataset.getName())
                                /*.images(dataset.getImages().stream()
                                        .map(datasetImage ->
                                                DatasetImageDTO.builder()
                                                        .id(datasetImage.getId())
                                                        .url(datasetImageService.getSignedImageUrl(datasetImage))
                                                        .size(datasetImage.getImageSize())
                                                        .name(datasetImage.getImageName())
                                                        .build())
                                        .collect(Collectors.toList()))*/
                                .imageIds(dataset.getImages().stream()
                                        .map(DatasetImage::getId)
                                        .collect(Collectors.toList()))
                                .description(dataset.getDescription())
                                .build()
                );
    }

    public void save(DatasetDTO datasetDTO, User user) {
        Dataset dataset = this.datasetRepository.save(
                Dataset.builder()
                        .name(datasetDTO.getName())
                        .owner(user)
                        .description(datasetDTO.getDescription())
                        .build());

        List<DatasetImage> datasetImages = this.datasetImageRepository.findAllByIdsAndUser(datasetDTO.getImageIds(), user);
        datasetImages.forEach(datasetImage -> datasetImage.setDataset(dataset));
        datasetImageRepository.saveAll(datasetImages);
    }
}
