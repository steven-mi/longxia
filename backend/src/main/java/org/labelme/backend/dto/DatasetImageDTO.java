package org.labelme.backend.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DatasetImageDTO {

    private Long id;

    private String name;

    private String url;

    private long size;

}
