package com.example.backend.security;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("/me")
    public String getMe(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
    @PostMapping("/logout")
    public void logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder
                .clearContext();
    }
    @PostMapping("/signup")
    public MongoUser signUp(@RequestBody @Valid MongoUser user) {
        if (mongoUserRepository.findMongoUserByUsername(user.username()).isPresent()) {
            String errorMessage = "Username already exists!";
            throw new IllegalArgumentException(errorMessage);
        }
        String encodedPassword = passwordEncoder.encode(user.password());
        MongoUser newUser = new MongoUser(null, user.username(), encodedPassword);
        return mongoUserRepository.save(newUser);
    }
}