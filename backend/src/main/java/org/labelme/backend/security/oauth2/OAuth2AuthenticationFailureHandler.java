package org.labelme.backend.security.oauth2;

import org.labelme.backend.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Autowired
    private AppProperties appProperties;


    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        String targetUrl = appProperties.getOauth2().getAuthorizedRedirectUri();
        String parametrizedTargetUrl = UriComponentsBuilder
                .fromUriString(targetUrl)
                .queryParam("token", "AuthenticationFailed")
                .build().toUriString();

        httpServletResponse.sendRedirect(parametrizedTargetUrl);
    }
}
