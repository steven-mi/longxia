package org.labelme.backend.security.oauth2.factory;

import org.labelme.backend.model.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface UserFactoryInterface {

    public User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User);

}
