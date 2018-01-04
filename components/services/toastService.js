angular.module('prescritor').service('toast', function () {
    
        this.success = (message, duration) => {
            $.toast({
                heading: 'Informação',
                text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                        
                icon: 'success',
                loader: true,
                loaderBg: '#0ca8ad',
                position: 'top-right',
                hideAfter: duration,
                bgColor: '#278412'
            })
        }
    
        this.error = (message, duration) => {
            $.toast({
                heading: 'Informação',
                text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                           
                icon: 'error',
                loader: true, 
                loaderBg: '#0ca8ad', 
                position: 'top-right',
                hideAfter: duration,
                bgColor: '#841212'
            })
        }
    
        this.warning = (message, duration) => {
            $.toast({
                heading: 'Informação',
                text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                                
                icon: 'warning',
                loader: true,
                loaderBg: '#0ca8ad',
                position: 'top-right',
                hideAfter: duration,
                bgColor: '#c6c91c'
            })
        }
    
        this.info = (message, duration) => {
            $.toast({
                heading: 'Informação',
                text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                              
                icon: 'info',
                loader: true,
                loaderBg: '#0ca8ad',
                position: 'top-right',
                hideAfter: duration,
                bgColor: '#126f84'
            })
        }
    
    })