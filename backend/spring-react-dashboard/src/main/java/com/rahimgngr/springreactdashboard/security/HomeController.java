package com.rahimgngr.springreactdashboard.security;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class HomeController {

    @GetMapping(value = "/")
    public RedirectView redirect() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000/");

        return redirectView;
    }

}
