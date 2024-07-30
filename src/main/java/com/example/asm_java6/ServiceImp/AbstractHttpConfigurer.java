package com.example.asm_java6.ServiceImp;

import org.springframework.context.ApplicationContext;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.SecurityConfigurer;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.HttpSecurityBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.DefaultSecurityFilterChain;

/**
 * Adds a convenient base class for {@link SecurityConfigurer} instances that operate on
 * {@link HttpSecurity}.
 *
 * @author Rob Winch
 */
public abstract class AbstractHttpConfigurer<T extends AbstractHttpConfigurer<T, B>, B extends HttpSecurityBuilder<B>>
        extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, B> {

    private SecurityContextHolderStrategy securityContextHolderStrategy;

    /**
     * Disables the {@link AbstractHttpConfigurer} by removing it. After doing so a fresh
     * version of the configuration can be applied.
     * @return the {@link HttpSecurityBuilder} for additional customizations
     */
    @SuppressWarnings("unchecked")
    public B disable() {
        getBuilder().removeConfigurer(getClass());
        return getBuilder();
    }

    @SuppressWarnings("unchecked")
    public T withObjectPostProcessor(ObjectPostProcessor<?> objectPostProcessor) {
        addObjectPostProcessor(objectPostProcessor);
        return (T) this;
    }

    protected SecurityContextHolderStrategy getSecurityContextHolderStrategy() {
        if (this.securityContextHolderStrategy != null) {
            return this.securityContextHolderStrategy;
        }
        ApplicationContext context = getBuilder().getSharedObject(ApplicationContext.class);
        String[] names = context.getBeanNamesForType(SecurityContextHolderStrategy.class);
        if (names.length == 1) {
            this.securityContextHolderStrategy = context.getBean(SecurityContextHolderStrategy.class);
        }
        else {
            this.securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
        }
        return this.securityContextHolderStrategy;
    }

}