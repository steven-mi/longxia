package org.labelme.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "descriptipn")
    private String description;

    @OneToMany(mappedBy = "project",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<DatasetImage> images;

    @ManyToOne
    @JoinColumn(name = "project_owner_id")
    @JsonManagedReference
    private User owner;

}
