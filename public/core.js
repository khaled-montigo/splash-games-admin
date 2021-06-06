var jqueryScript = document.createElement('script');
jqueryScript.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
document.getElementsByTagName('head')[0].appendChild(jqueryScript);


var BootstrapScript = document.createElement('script');
BootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js';
document.getElementsByTagName('head')[0].appendChild(BootstrapScript);




var summernoteScript = document.createElement('script');
summernoteScript.type = 'text/javascript';
summernoteScript.src = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js';
document.getElementsByTagName('head')[0].appendChild(summernoteScript);

var summernoteCss = document.createElement('link');
summernoteCss.rel = 'stylesheet';
summernoteCss.href = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css';
document.getElementsByTagName('head')[0].appendChild(summernoteCss);

setTimeout(function (){
    $('.summernote').summernote({
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['forecolor']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ],
        height: 1000
    });
},1000)


