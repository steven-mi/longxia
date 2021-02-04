package org.labelme.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {

    private int id;

    private String name;
    private String description;
    private List<Long> imageIds;
/*
    private List<DatasetImageDTO> images;
*/
}
