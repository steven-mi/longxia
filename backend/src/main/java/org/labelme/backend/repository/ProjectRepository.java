package org.labelme.backend.repository;

import org.labelme.backend.model.Project;
import org.labelme.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {

    @Query(value = "SELECT project FROM Project project WHERE project.owner = ?1")
    List<Project> findAllByUser(User user);

    @Query(value = "SELECT project FROM Project project WHERE project.id = ?1 and project.owner = ?2")
    Optional<Project> findByIdAndUser(Integer id, User user);
}
