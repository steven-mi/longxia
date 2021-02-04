package org.labelme.backend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "LXUser")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "access_token")
    @JsonIgnore
    private String accessToken;

    @OneToMany(mappedBy = "owner",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    List<Dataset> datasets;

    @OneToMany(mappedBy = "owner",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    List<DatasetImage> images;

    @OneToMany(mappedBy = "owner",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    List<Project> projects;
}
