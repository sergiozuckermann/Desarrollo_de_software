import { Logout } from "react-admin";

const authProvider = {
    
    // set user identity data to localstorage
    setAuthentication: ({ userIdentity }: { userIdentity: any }) => {
        console.log('Autenticacion');
        localStorage.setItem('name', userIdentity['given_name']);
        localStorage.setItem('middleName', userIdentity['family_name']);
        localStorage.setItem('authType', userIdentity['custom:job_level']);
    },
    // clean local storage
    logOut: () => {
        console.log('Cerrar sesion');
        localStorage.removeItem('name');
        localStorage.removeItem('middleName');
        localStorage.removeItem('authType');
        window.location.reload();
    },
    //authorization based on authentication status
    checkAuthentication: () => {
        console.log(localStorage.getItem('authType'));
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '/signup' || currentPath === '/signin')  {
            if (localStorage.getItem("authType") === 'Supervisor' || localStorage.getItem("authType") === 'Agent'){ //if is not initial
                authProvider.logOut
                return Promise.reject();
            }else{
                return Promise.resolve();
            }
        } else {
            return localStorage.getItem("authType") ? Promise.resolve() : Promise.reject();
        }
    },
    //authorization based on authType 
    checkAuthorization: () => {
        const currentPath = window.location.pathname;

            if (localStorage.getItem("authType") === 'Supervisor'){
                if(currentPath === '/profileTest' || currentPath === '/agent/home'){ //auth paths for Supervisor
                    return Promise.resolve();
                } else{
                    return Promise.reject();
                }
            } else if (localStorage.getItem("authType") === 'Agent'){ //auth paths for Agent
                if(currentPath === '/profileTest'){
                    return Promise.resolve();
                } else{
                    return Promise.reject();
                }
            } else{
                return Promise.resolve();
            }

    },

};

export default authProvider;