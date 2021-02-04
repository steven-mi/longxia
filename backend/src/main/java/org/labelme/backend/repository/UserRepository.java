package org.labelme.backend.repository;

import org.labelme.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query(value = "SELECT user FROM LXUser user WHERE user.email = ?1")
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT user FROM LXUser user WHERE user.accessToken = ?1")
    Optional<User> findByAccessToken(String accessToken);
}
