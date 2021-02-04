package org.labelme.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class DatasetImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_path", unique = true)
    private String imagePath;

    @Column(name = "image_size")
    private long imageSize;

    @ManyToOne
    @JoinColumn(name = "dataset_id")
    @JsonBackReference
    private Dataset dataset;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;

    @ManyToOne
    @JoinColumn(name = "image_owner_id")
    @JsonManagedReference
    private User owner;

}
