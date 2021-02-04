package org.labelme.backend.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;


@Getter
@Setter
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final OAuth2 oauth2 = new OAuth2();

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static final class OAuth2 {
        private String authorizedRedirectUri = "";
    }

}
