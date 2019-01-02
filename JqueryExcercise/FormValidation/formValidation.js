function validate() {
    let username = $('#username');
    let email = $('#email');
    let password = $('#password');
    let passwordConfirm = $('#confirm-password');
    let companyCheckbox = $('#company');
    let companyNumber = $('#companyNumber');
    let companyInfo = $('#companyInfo');

    let submitBtn = $('#submit');
    let validationDiv = $('#valid');

    let allisValid = true;


    companyCheckbox.on('change',function () {
        if(companyCheckbox.is(':checked')){
            companyInfo.css('display','block')
        }else {
            companyInfo.css('display','none')
        }

    });

    submitBtn.on('click',function (event) {
        event.preventDefault();
        validateForm();
        validationDiv.css('display',allisValid ? "block" : "none");
        allisValid = true;


    });

    function validateForm() {
        validateInput(username,/^[A-Za-z\d]{3,20}$/g);
        validateInput(email,/^.*?@.*?\..*$/g);

        if ((password.val() === passwordConfirm.val())) {
            validateInput(password,/^\w{5,15}$/g);
            validateInput(passwordConfirm,/^\w{5,15}$/);

        }else {
            password.css("border-color", "red");
            passwordConfirm.css("border-color", "red");
            allisValid = false;
        }
        if(companyCheckbox.is(':checked')){
            validateCompanyInfo();
        }


    }

    function validateInput(input,pattern) {
        if(pattern.test(input.val())){
            input.css("border", "none")
        }else   {
            input.css("border-color", "red");
            allisValid = false;

        }
    }

    function validateCompanyInfo() {
        let numValue = Number(companyNumber.val());
        if(numValue>=1000 && numValue <=9999){
            companyNumber.css("border", "none");
        }else {
            companyNumber.css("border-color", "red");
            allisValid = false;
        }
    }



}
