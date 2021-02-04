package org.labelme.backend.repository;

import org.labelme.backend.model.DatasetImage;
import org.labelme.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DatasetImageRepository extends CrudRepository<DatasetImage, Long> {

    @Query(value = "SELECT datasetImage FROM DatasetImage datasetImage WHERE datasetImage.imagePath = ?1")
    Optional<DatasetImage> findByImagePath(String imagePath);

    @Query(value = "SELECT datasetImage FROM DatasetImage datasetImage WHERE datasetImage.id = ?1 and datasetImage.owner = ?2")
    Optional<DatasetImage> findByIdAndUser(Long id, User user);

    @Query("SELECT datasetImage FROM DatasetImage datasetImage WHERE datasetImage.id IN ?1 and datasetImage.owner = ?2")
    List<DatasetImage> findAllByIdsAndUser(List<Long> ids, User user);
}
