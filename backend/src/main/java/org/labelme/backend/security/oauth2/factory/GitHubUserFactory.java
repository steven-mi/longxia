package org.labelme.backend.security.oauth2.factory;

import org.labelme.backend.model.User;
import org.labelme.backend.security.oauth2.factory.user.GitHubUser;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.client.RestTemplate;

public class GitHubUserFactory implements UserFactoryInterface {

    @Override
    public User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        String accessToken = oAuth2UserRequest.getAccessToken().getTokenValue();
        String name = oAuth2User.getAttribute("name");

        String GITHUB_EMAIL_URL = "https://api.github.com/user/emails";
        RequestEntity<Void> request = RequestEntity
                .get(GITHUB_EMAIL_URL)
                .header("Authorization", "token " + accessToken)
                .build();
        ResponseEntity<GitHubUser[]> response = new RestTemplate().exchange(request, GitHubUser[].class);

        String email = "";
        if (response.hasBody()) {
            for (GitHubUser gitHubUser : response.getBody()) {
                if (gitHubUser.verified) {
                    email = gitHubUser.email;
                    break;
                }
            }
            return User.builder().email(email)
                    .name(name)
                    .accessToken(accessToken).build();
        }
        return null;
    }
}
