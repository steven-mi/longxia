package org.labelme.backend.security.oauth2.factory;

import org.labelme.backend.model.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class UserFactory {

    public static User getUser(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        String clientRegistrationId =
                oAuth2UserRequest.getClientRegistration().getRegistrationId();

        if (clientRegistrationId.equals("github")) {
            return new GitHubUserFactory().processOAuth2User(oAuth2UserRequest, oAuth2User);
        } else {
            return null;
        }
    }
}
