package org.labelme.backend.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DatasetDTO {

    private int id;

    private String name;

    private List<Long> imageIds;

    private String description;

/*
    private List<DatasetImageDTO> images;
*/


}

