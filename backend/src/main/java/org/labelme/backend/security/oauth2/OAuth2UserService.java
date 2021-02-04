package org.labelme.backend.security.oauth2;

import org.labelme.backend.model.User;
import org.labelme.backend.repository.UserRepository;
import org.labelme.backend.security.oauth2.factory.UserFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        User user = UserFactory.getUser(oAuth2UserRequest, oAuth2User);
        if (user == null) {
            throw new OAuth2AuthenticationException(new OAuth2Error(OAuth2ErrorCodes.INSUFFICIENT_SCOPE), "Email not found from OAuth2 provider");
        }

        Optional<User> userList = userRepository.findByEmail(user.getEmail());
        if (!userList.isEmpty()) {
            String accessToken = user.getAccessToken();
            user = userList.get();
            user.setAccessToken(accessToken);
        }
        userRepository.save(user);

        Map<String, Object> attributes = new HashMap<String, Object>(oAuth2User.getAttributes());
        attributes.put("token", user.getAccessToken());
        attributes = Collections.unmodifiableMap(attributes);
        oAuth2User = new DefaultOAuth2User(
                oAuth2User.getAuthorities(),
                attributes,
                "name");
        return oAuth2User;
    }

}
