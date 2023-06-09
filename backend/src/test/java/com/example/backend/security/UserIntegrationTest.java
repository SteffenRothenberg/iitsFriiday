package com.example.backend.security;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserIntegrationTest {

    private MockMvc mockMvc;

    @Mock
    private Authentication mockAuthentication;

    @Mock
    private SecurityContext mockSecurityContext;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        SecurityContextHolder.setContext(mockSecurityContext);
        when(mockSecurityContext.getAuthentication()).thenReturn(mockAuthentication);
    }

    @Test
    @WithMockUser(username = "testuser")
    void testGetMe() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk());
    }


    @Test
    @WithMockUser(username = "testuser")
    void testLogin() throws Exception {
        mockMvc.perform(post("/api/users/login"))
                .andExpect(status().isOk());
    }
}