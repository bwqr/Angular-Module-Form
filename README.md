# Angular-Module-User

This module helps user to manage their profile.

**Required Packages**
*--no required packages--*

**Required Modules**
1. fmblog-frontend-navigation
2. fmblog-frontend-shared
3. Angular-Module-Core

**Functionalities**
1. View submitted forms

**Installation**
1. Add the module to Angular Project as a submodule. 
`git submodule add https://github.com/bwqr/Angular-Module-Form src/app/form`
2. Import `FormModule` from inside `AppModule`.
3. This module requires the fmblog-frontend-navigation module's routes. In addition to this, these are also required
```json    
form: {
        url: 'form/',
        'forms': {
            url: 'forms/'
        },
        'applied-forms': {
            url: 'applied-forms/'
        },
        'form': {
            url: 'form/'
        },
        'form-read': {
            url: 'form-read/'
        }

    }
```