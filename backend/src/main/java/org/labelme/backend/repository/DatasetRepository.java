package org.labelme.backend.repository;

import org.labelme.backend.model.Dataset;
import org.labelme.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DatasetRepository extends CrudRepository<Dataset, Integer> {


    @Query(value = "SELECT dataset FROM Dataset dataset WHERE dataset.owner = ?1")
    List<Dataset> findAllByUser(User user);

    @Query(value = "SELECT dataset FROM Dataset dataset WHERE dataset.id = ?1 and dataset.owner = ?2")
    Optional<Dataset> findByIdAndUser(Integer id, User user);
}
