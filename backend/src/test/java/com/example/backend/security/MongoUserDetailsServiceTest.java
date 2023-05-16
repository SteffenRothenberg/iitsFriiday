package com.example.backend.security;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class MongoUserDetailsServiceTest {

    @Mock
    private MongoUserRepository mongoUserRepository;

    @InjectMocks
    private MongoUserDetailsService userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername_ExistingUser() {
        // GIVEN
        String username = "username";
        MongoUser mongoUser = new MongoUser("123", "username", "password");
        when(mongoUserRepository.findMongoUserByUsername(username)).thenReturn(Optional.of(mongoUser));

        // WHEN
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // THEN
        assertEquals(username, userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertEquals(Collections.emptySet(), userDetails.getAuthorities());
    }

    @Test
    void testLoadUserByUsername_NonExistingUser() {
        // GIVEN
        String username = "non_existing_user";
        when(mongoUserRepository.findMongoUserByUsername(username)).thenReturn(Optional.empty());

        // WHEN
        Throwable exception = null;
        try {
            userDetailsService.loadUserByUsername(username);
        } catch (Throwable ex) {
            exception = ex;
        }

        // THEN
        assertNotNull(exception);
        assertTrue(exception instanceof UsernameNotFoundException);
    }
}
