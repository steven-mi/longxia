package org.labelme.backend.security.oauth2;

import org.labelme.backend.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private AppProperties appProperties;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        String targetUrl = appProperties.getOauth2().getAuthorizedRedirectUri();
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String parametrizedTargetUrl = UriComponentsBuilder
                .fromUriString(targetUrl)
                .queryParam("token", (String) oAuth2User.getAttribute("token"))
                .build().toUriString();

        httpServletResponse.sendRedirect(parametrizedTargetUrl);
    }

}
