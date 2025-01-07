function bloquearCaracteresEspañol(event) {
    const char = event.key;

    // Caracteres especiales en español
    const caracteresBloqueados = [
        'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', // Tildes
        'ñ', 'Ñ', // Letra ñ
        'ü', 'Ü', // Diéresis
        'à', 'è', 'ì', 'ò', 'ù', 'À', 'È', 'Ì', 'Ò', 'Ù', // Acento grave
        'â', 'ê', 'î', 'ô', 'û', 'Â', 'Ê', 'Î', 'Ô', 'Û'  // Acento circunflejo
    ];

    if (caracteresBloqueados.includes(char)) {
        event.preventDefault();
    }
}

function eliminarCaracteresNoPermitidos(event) {
    const input = event.target;

    // Caracteres especiales en español
    const caracteresBloqueadosRegex = /[áéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ]/g;

    // Eliminar caracteres no permitidos del valor del input
    input.value = input.value.replace(caracteresBloqueadosRegex, '');
}

document.addEventListener('DOMContentLoaded', function() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        $(successModal).modal('show');
    }
    const inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach(input => {
        input.addEventListener('keypress', bloquearCaracteresEspañol);
        input.addEventListener('input', eliminarCaracteresNoPermitidos);
    });
    let institutionCount = 1;
    const institutionsContainer = document.getElementById('institutions_container');
    const addInstitutionButton = document.getElementById('add_institution');
    const removeInstitutionButton = document.getElementById('remove_institution');

    function updateRemoveButtonInstitution() {
        const institutionEntries = document.querySelectorAll('.institution-entry');
        if (institutionEntries.length > 1) {
            removeInstitutionButton.style.display = 'inline-block'; // Mostrar si hay más de un elemento
        } else {
            removeInstitutionButton.style.display = 'none'; // Ocultar si es el único elemento
        }
    }

    function updateInstitutionIDs() {
        const institutionEntries = document.querySelectorAll('.institution-entry');
        institutionEntries.forEach((entry, index) => {
            const count = index + 1;
            entry.querySelectorAll('input, select').forEach(input => {
                const name = input.getAttribute('name').split('_')[0];
                input.id = `${name}_${count}`;
                input.name = `${name}_${count}`;
            });
        });
    }

    addInstitutionButton.addEventListener('click', function() {
        institutionCount++;
        
        const newInstitution = document.createElement('div');
        newInstitution.className = 'institution-entry';
        newInstitution.innerHTML = `
            <div class="form-card__group">
                <label class="form-card__label" for="institution_name_${institutionCount}">NOMBRE DE LA INSTITUCIÓN EDUCATIVA:</label>
                <input class="form-card__input" type="text" id="institution_name_${institutionCount}" name="institution_name_${institutionCount}"  />
            </div>
            
            <div class="form-card__group">
                <label class="form-card__label" for="institution_address_${institutionCount}">DIRECCIÓN DE LA INSTITUCIÓN:</label>
                <input class="form-card__input" type="text" id="institution_address_${institutionCount}" name="institution_address_${institutionCount}"  />
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="institution_city_${institutionCount}">CIUDAD DE LA INSTITUCIÓN:</label>
                <input class="form-card__input" type="text" id="institution_city_${institutionCount}" name="institution_city_${institutionCount}"/>
            </div>
            
            <div class="form-card__group">
                <label class="form-card__label" for="course_name_${institutionCount}">CURSO O PROGRAMA DE ESTUDIO:</label>
                <input class="form-card__input" type="text" id="course_name_${institutionCount}" name="course_name_${institutionCount}"  />
            </div>
            
            <div class="form-card__group">
                <label class="form-card__label" for="start_date_${institutionCount}">FECHA DE INICIO:</label>
                <input class="form-card__input" type="date" id="start_date_${institutionCount}" name="start_date_${institutionCount}"  />
            </div>
            
            <div class="form-card__group">
                <label class="form-card__label" for="end_date_${institutionCount}">FECHA DE FINALIZACIÓN:</label>
                <input class="form-card__input" type="date" id="end_date_${institutionCount}" name="end_date_${institutionCount}"  />
            </div>
        `;
        
        institutionsContainer.appendChild(newInstitution);
        updateInstitutionIDs(); // Actualizar IDs
        updateRemoveButtonInstitution(); // Actualizar visibilidad del botón de eliminar
    });

    removeInstitutionButton.addEventListener('click', function() {
        const institutionEntries = document.querySelectorAll('.institution-entry');
        if (institutionEntries.length > 1) {
            institutionsContainer.removeChild(institutionEntries[institutionEntries.length - 1]);
            updateInstitutionIDs(); // Actualizar IDs
            updateRemoveButtonInstitution(); // Actualizar visibilidad del botón de eliminar
        }
    });

    // Al cargar la página, asegurarse de mostrar correctamente el botón de eliminar
    updateRemoveButtonInstitution();



    let socialMediaCount = 1;
    const socialMediaContainer = document.getElementById('social_media_container');
    const addSocialMediaBtn = document.getElementById('add_social_media_btn');
    const removeSocialMediaBtn = document.getElementById('remove_social_media_btn');
    const socialMediaButtons = document.getElementById('social_media_buttons');
    

    function updateRemoveButtonMedia() {
        const socialMediaGroups = document.querySelectorAll('.social-media-group');
        if (socialMediaGroups.length > 1) {
            removeSocialMediaBtn.style.display = 'inline-block'; // Mostrar si hay más de un elemento
        } else {
            removeSocialMediaBtn.style.display = 'none'; // Ocultar si es el único elemento
        }
    }

    function updateSocialMediaIDs() {
        const socialMediaGroups = document.querySelectorAll('.social-media-group');
        socialMediaGroups.forEach((group, index) => {
            const count = index + 1;
            group.id = `social_media_group_${count}`;
            group.querySelector('select').name = `social_media_type_${count}`;
            group.querySelector('input').name = `social_media_username_${count}`;
        });
    }

    addSocialMediaBtn.addEventListener('click', function() {
        socialMediaCount++;
        
        const newSocialMediaGroup = document.createElement('div');
        newSocialMediaGroup.className = 'form-card__group social-media-group';
        newSocialMediaGroup.id = `social_media_group_${socialMediaCount}`;
        newSocialMediaGroup.innerHTML = `
            <select class="form-card__select" name="social_media_type_${socialMediaCount}">
                <option disabled selected value="SONE">- SELECCIONE UNO -</option>
                <option value="ASKF">ASK.FM</option>
                <option value="DUBN">DOUBAN</option>
                <option value="FCBK">FACEBOOK</option>
                <option value="FLKR">FLICKR</option>
                <option value="GOGL">GOOGLE+</option>
                <option value="INST">INSTAGRAM</option>
                <option value="LINK">LINKEDIN</option>
                <option value="MYSP">MYSPACE</option>
                <option value="PTST">PINTEREST</option>
                <option value="QZNE">QZONE (QQ)</option>
                <option value="RDDT">REDDIT</option>
                <option value="SWBO">SINA WEIBO</option>
                <option value="TWBO">TENCENT WEIBO</option>
                <option value="TUMB">TUMBLR</option>
                <option value="TWIT">TWITTER</option>
                <option value="TWOO">TWOO</option>
                <option value="VINE">VINE</option>
                <option value="VKON">VKONTAKTE (VK)</option>
                <option value="YUKU">YOUKU</option>
                <option value="YTUB">YOUTUBE</option>
            </select>
            <input class="form-card__input" type="text" name="social_media_username_${socialMediaCount}" placeholder="Usuario">
        `;
        
        socialMediaContainer.appendChild(newSocialMediaGroup);
        socialMediaContainer.appendChild(socialMediaButtons); // Mover los botones al final
        updateSocialMediaIDs(); // Actualizar IDs
        updateRemoveButtonMedia(); // Actualizar visibilidad del botón de eliminar
    });

    removeSocialMediaBtn.addEventListener('click', function() {
        const socialMediaGroups = document.querySelectorAll('.social-media-group');
        if (socialMediaGroups.length > 1) {
            socialMediaContainer.removeChild(socialMediaGroups[socialMediaGroups.length - 1]);
            updateSocialMediaIDs(); // Actualizar IDs
            updateRemoveButtonMedia(); // Actualizar visibilidad del botón de eliminar
        }
    });

    // Al cargar la página, asegurarse de mostrar correctamente el botón de eliminar
    updateRemoveButtonMedia();


    const travelCompanionsYesRadio = document.getElementById('travel_companions_yes');
    const travelCompanionsNoRadio = document.getElementById('travel_companions_no');
    const companionsDetailsContainer = document.getElementById('companions_details_container');
    const companionsButtons = document.getElementById('companions_buttons');
    const addCompanionBtn = document.getElementById('add_companion_btn');
    const removeCompanionBtn = document.getElementById('remove_companion_btn');
    let companionCount = 1;

    travelCompanionsYesRadio.addEventListener('change', function() {
        companionsDetailsContainer.classList.remove('hidden');
        companionsButtons.classList.remove('hidden');
        updateRemoveButton();
    });

    travelCompanionsNoRadio.addEventListener('change', function() {
        companionsDetailsContainer.classList.add('hidden');
        companionsButtons.classList.add('hidden');
        resetCompanionFields();
    });

    addCompanionBtn.addEventListener('click', function() {
        companionCount++;
        
        const newCompanionGroup = document.createElement('div');
        newCompanionGroup.classList.add('form-card__group', 'companion-group');
        newCompanionGroup.id = `companion_group_${companionCount}`;

        newCompanionGroup.innerHTML = `
            <label class="form-card__label" for="companion_name_${companionCount}">NOMBRE COMPLETO:</label>
            <input class="form-card__input" type="text" id="companion_name_${companionCount}" name="companion_name_${companionCount}"  />

            <label class="form-card__label" for="companion_relationship_${companionCount}">TIPO DE PARENTESCO:</label>
            <select class="form-card__input" id="companion_relationship_${companionCount}" name="companion_relationship_${companionCount}" >
                <option disabled selected value="">- SELECCIONE UNO -</option>
                <option value="P">PADRE</option>
                <option value="S">CÓNYUGE</option>
                <option value="C">NIÑO</option>
                <option value="R">OTRO PARIENTE</option>
                <option value="F">AMIGO</option>
                <option value="B">SOCIO DE NEGOCIOS</option>
                <option value="O">OTRO</option>
            </select>
        `;

        companionsDetailsContainer.appendChild(newCompanionGroup);
        updateRemoveButton();
    });

    removeCompanionBtn.addEventListener('click', function() {
        if (companionCount > 1) {
            const lastCompanionGroup = document.getElementById(`companion_group_${companionCount}`);
            companionsDetailsContainer.removeChild(lastCompanionGroup);
            companionCount--;
            updateRemoveButton();
        }
    });

    function updateRemoveButton() {
        if (companionCount > 1) {
            removeCompanionBtn.classList.remove('hidden');
        } else {
            removeCompanionBtn.classList.add('hidden');
        }
    }

    function resetCompanionFields() {
        while (companionCount > 1) {
            const lastCompanionGroup = document.getElementById(`companion_group_${companionCount}`);
            companionsDetailsContainer.removeChild(lastCompanionGroup);
            companionCount--;
        }
        document.getElementById('companion_name_1').value = '';
        document.getElementById('companion_relationship_1').value = '';
        updateRemoveButton();
    }
    

    const beenToUsYesRadio = document.getElementById('been_to_us_yes');
    const beenToUsNoRadio = document.getElementById('been_to_us_no');
    const usVisitsContainer = document.getElementById('us_visits_container');
    const usVisitsButtons = document.getElementById('us_visits_buttons');
    const addVisitBtn = document.getElementById('add_visit_btn');
    const removeVisitBtn = document.getElementById('remove_visit_btn');
    let visitCount = 1;

    beenToUsYesRadio.addEventListener('change', function() {
        usVisitsContainer.classList.remove('hidden');
        usVisitsButtons.classList.remove('hidden');
        updateRemoveButton();
    });

    beenToUsNoRadio.addEventListener('change', function() {
        usVisitsContainer.classList.add('hidden');
        usVisitsButtons.classList.add('hidden');
        resetVisitFields();
    });

    addVisitBtn.addEventListener('click', function() {
        visitCount++;
        const newVisitGroup = document.createElement('div');
        newVisitGroup.classList.add('form-card__group', 'visit-group');
        newVisitGroup.id = `visit_group_${visitCount}`;

        newVisitGroup.innerHTML = `
            <label class="form-card__label" for="visit_date_${visitCount}">FECHA DE LLEGADA:</label>
            <input class="form-card__input" type="date" id="visit_date_${visitCount}" >

            <label class="form-card__label" for="visit_duration_${visitCount}">TIEMPO DE DURACIÓN DE LA ESTANCIA:</label>
            
            <input class="form-card__input-inline" type="number" id="visit_duration_number_${visitCount}" >
            <select class="form-card__input-inline" id="visit_duration_unit_${visitCount}" >
                <option value="">- SELECCIONE UNO -</option>
                <option value="Y">Años</option>
                <option value="M">Meses</option>
                <option value="W">Semanas</option>
                <option value="D">Días</option>
                <option value="H">Menos que 24 horas</option>
            </select>
            
        `;

        usVisitsContainer.appendChild(newVisitGroup);
        addChangeEvent(visitCount);
        updateRemoveButton();
    });

    removeVisitBtn.addEventListener('click', function() {
        if (visitCount > 1) {
            const lastVisitGroup = document.getElementById(`visit_group_${visitCount}`);
            usVisitsContainer.removeChild(lastVisitGroup);
            visitCount--;
            updateRemoveButton();
        }
    });

    function updateRemoveButton() {
        if (visitCount > 1) {
            removeVisitBtn.classList.remove('hidden');
        } else {
            removeVisitBtn.classList.add('hidden');
        }
    }

    function resetVisitFields() {
        while (visitCount > 1) {
            const lastVisitGroup = document.getElementById(`visit_group_${visitCount}`);
            usVisitsContainer.removeChild(lastVisitGroup);
            visitCount--;
        }
        document.getElementById('visit_date_1').value = '';
        document.getElementById('visit_duration_number_1').value = '';
        document.getElementById('visit_duration_unit_1').value = '';
    }
    function addChangeEvent(visitNumber) {
        const select = document.getElementById(`visit_duration_unit_${visitNumber}`);
        const numberInput = document.getElementById(`visit_duration_number_${visitNumber}`);

        select.addEventListener('change', function() {
            if (select.value === 'H') {
                numberInput.value = '';
                numberInput.disabled = true;
            } else {
                numberInput.disabled = false;
            }
        });
    }

    // Agregar el evento change al primer select
    addChangeEvent(1);


    const languageList = document.getElementById('language-list');
    const addLanguageBtn = document.querySelector('.add-language-btn');
    const removeLanguageBtn = document.querySelector('.remove-language-btn');

    function updateRemoveButton() {
        const languageItems = document.querySelectorAll('.language-item');
        if (languageItems.length > 1) {
            removeLanguageBtn.style.display = 'inline-block'; // Mostrar si hay más de un elemento
        } else {
            removeLanguageBtn.style.display = 'none'; // Ocultar si es el único elemento
        }
    }

    addLanguageBtn.addEventListener('click', function() {
        const languageCount = document.querySelectorAll('.language-item').length;
        const newLanguageItem = document.createElement('div');
        newLanguageItem.classList.add('language-item');
        newLanguageItem.innerHTML = `
            <input type="text" class="form-card__input" placeholder="Idioma" name="language_${languageCount + 1}" >
        `;
        languageList.appendChild(newLanguageItem);
        updateRemoveButton(); // Actualizar visibilidad del botón de eliminar
    });

    removeLanguageBtn.addEventListener('click', function() {
        const languageItems = document.querySelectorAll('.language-item');
        if (languageItems.length > 1) {
            languageItems[languageItems.length - 1].remove(); // Eliminar el último elemento
            updateRemoveButton(); // Actualizar visibilidad del botón de eliminar
        }
    });

    // Al cargar la página, asegurarse de mostrar correctamente el botón de eliminar
    updateRemoveButton();




    var relativesContainer = document.getElementById('relatives_container');
    var addRelativeBtn = document.getElementById('add_relative_btn');
    var removeRelativeBtn = document.getElementById('remove_relative_btn');
    var submitBtn = document.getElementById('submit_btn');
    var relativesUsaYes = document.getElementById('relatives_usa_yes');
    var relativeCount = 1;  // Comenzamos con 1 campo por defecto



    var employmentDetails = document.getElementById('employment_details');
    var employedYes = document.getElementById('employed_yes');

    var income_details = document.getElementById('income_details');
    var income_yes = document.getElementById('income_yes');

    var educationalHistoryDetails = document.getElementById('educational_history_details');
    var educationAttendedYes = document.getElementById('education_attended_yes');

    var previous_employment_details = document.getElementById('previous_employment_details');
    var work_attended_yes = document.getElementById('work_attended_yes');

    var social_media_container = document.getElementById('social_media_container');
    var social_media_yes = document.getElementById('social_media_yes');

    var countriesVisitedContainer = document.getElementById('countries_visited_container');
    var addCountryBtn = document.getElementById('add_country_btn');
    var removeCountryBtn = document.getElementById('remove_country_btn');
    var traveledRecentlyYes = document.getElementById('traveled_recently_yes');
    var traveledRecentlyNo = document.getElementById('traveled_recently_no');
 
    var admission_issue_details_container = document.getElementById('admission_issue_details_container');
    var admission_issue_yes = document.getElementById('admission_issue_yes');

    var passport_issue_details_container = document.getElementById('passport_issue_details_container');
    var passport_issue_yes = document.getElementById('passport_issue_yes');



    function toggleCompanionsDetails() {
        if (admission_issue_yes.checked){
            admission_issue_details_container.style.display = 'block';
        } else {
            admission_issue_details_container.style.display = 'none';
        }

        if (passport_issue_yes.checked) {
            passport_issue_details_container.style.display = 'block';
        } else {
            passport_issue_details_container.style.display = 'none';
        }

        if (relativesUsaYes.checked) {
            relativesContainer.style.display = 'block';
            addRelativeBtn.style.display = 'block';
        } else {
            relativesContainer.style.display = 'none';
            addRelativeBtn.style.display = 'none';
        }

        if (employedYes.checked) {
            employmentDetails.style.display = 'block';
        } else {
            employmentDetails.style.display = 'none';
        }

        if (income_yes.checked) {
            income_details.style.display = 'block';
        } else{
            income_details.style.display = 'none';
        }

        if (educationAttendedYes.checked) {
            educationalHistoryDetails.style.display = 'block';
        } else {
            educationalHistoryDetails.style.display = 'none';
        }

        if(work_attended_yes.checked){
            previous_employment_details.style.display = 'block';
        }else{
            previous_employment_details.style.display = 'none';
        }

        if(social_media_yes.checked){
            social_media_container.style.display = 'block';
            addSocialMediaBtn.style.display = 'block';
        }else{
            social_media_container.style.display = 'none';
            addSocialMediaBtn.style.display = 'none';
        }

        if (traveledRecentlyYes.checked) {
            addCountryBtn.style.display = 'block';
            // Agregar el primer campo si no existe
            if (countriesVisitedContainer.children.length === 0) {
                addCountry();
            }
            updateRemoveButton();
        } else {
            countriesVisitedContainer.innerHTML = ''; // Limpiar el contenedor
            addCountryBtn.style.display = 'none';
            removeCountryBtn.style.display = 'none';
        }
    }

    function updateRemoveButton() {
        var countryItems = document.querySelectorAll('.country-item');
        if (removeCountryBtn) { // Verificar que el botón existe

            if (countryItems.length > 1) {
                removeCountryBtn.style.display = 'block';
            } else {
                removeCountryBtn.style.display = 'none';
            }
        }
    }

    function addCountry() {
        var countryCount = document.querySelectorAll('.country-item').length;
        var newCountryItem = document.createElement('div');
        newCountryItem.classList.add('country-item', 'form-card__group');
        newCountryItem.innerHTML = `
            <label class="form-card__label">NOMBRA EL PAÍS O REGIÓN QUE HAS VISITADO EN LOS ÚLTIMOS CINCO AÑOS:</label>
            <select name="country_${countryCount + 1}" id="country_${countryCount + 1}" class="form-card__input">
                <option selected="selected" value="">- SELECCIONE UNO -</option>
                <option value="AFGH">AFGANISTÁN</option>
                <option value="ALB">ALBANIA</option>
                <option value="ALGR">Argelia</option>
                <option value="ASMO">SAMOA AMERICANA</option>
                <option value="ANDO">Andorra</option>
                <option value="ANGL">Angola</option>
                <option value="ANGU">ANGUILA</option>
                <option value="ANTI">ANTIGUA Y BARBUDA</option>
                <option value="ARG">ARGENTINA</option>
                <option value="ARM">ARMENIA</option>
                <option value="ARB">Aruba</option>
                <option value="ASTL">AUSTRALIA</option>
                <option value="AUST">AUSTRIA</option>
                <option value="AZR">AZERBAIYÁN</option>
                <option value="BAMA">BAHAMAS</option>
                <option value="BAHR">BAHREIN</option>
                <option value="BANG">BANGLADESH</option>
                <option value="BRDO">BARBADOS</option>
                <option value="BYS">BIELORRUSIA</option>
                <option value="BELG">BÉLGICA</option>
                <option value="BLZ">BELICE</option>
                <option value="BENN">Benín</option>
                <option value="BERM">ISLAS BERMUDAS</option>
                <option value="BHU">Bután</option>
                <option value="BOL">Bolivia</option>
                <option value="BON">Bonaire</option>
                <option value="BIH">BOSNIA Y HERZEGOVINA</option>
                <option value="BOT">BOTSUANA</option>
                <option value="BRZL">BRASIL</option>
                <option value="IOT">TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO</option>
                <option value="BRNI">Brunéi</option>
                <option value="BULG">BULGARIA</option>
                <option value="BURK">BURKINA FASO</option>
                <option value="BURM">Birmania</option>
                <option value="BRND">Burundi</option>
                <option value="CBDA">CAMBOYA</option>
                <option value="CMRN">CAMERÚN</option>
                <option value="CAN">CANADÁ</option>
                <option value="CAVI">CABO VERDE</option>
                <option value="CAYI">ISLAS CAIMÁN</option>
                <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                <option value="CHAD">CHAD</option>
                <option value="CHIL">CHILE</option>
                <option value="CHIN">PORCELANA</option>
                <option value="CHRI">ISLA DE NAVIDAD</option>
                <option value="COCI">ISLAS COCOS KEELING</option>
                <option value="COL">COLOMBIA</option>
                <option value="COMO">COMORAS</option>
                <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                <option value="CONB">CONGO, REPÚBLICA DEL</option>
                <option value="CKIS">ISLAS COOK</option>
                <option value="CSTR">COSTA RICA</option>
                <option value="IVCO">COSTA DE MARFIL</option>
                <option value="HRV">CROACIA</option>
                <option value="CUBA">CUBA</option>
                <option value="CUR">CURAZAO</option>
                <option value="CYPR">CHIPRE</option>
                <option value="CZEC">REPÚBLICA CHECA</option>
                <option value="DEN">DINAMARCA</option>
                <option value="DJI">YIBUTI</option>
                <option value="DOMN">DOMINICA</option>
                <option value="DOMR">REPÚBLICA DOMINICANA</option>
                <option value="ECUA">ECUADOR</option>
                <option value="EGYP">EGIPTO</option>
                <option value="ELSL">EL SALVADOR</option>
                <option value="EGN">GUINEA ECUATORIAL</option>
                <option value="ERI">ERITREA</option>
                <option value="EST">ESTONIA</option>
                <option value="SZLD">ESWATINI</option>
                <option value="ETH">ETIOPÍA</option>
                <option value="FKLI">ISLAS MALVINAS</option>
                <option value="FRO">ISLAS FAROE</option>
                <option value="FIJI">Fiyi</option>
                <option value="FIN">FINLANDIA</option>
                <option value="FRAN">FRANCIA</option>
                <option value="FRGN">GUAYANA FRANCESA</option>
                <option value="FPOL">POLINESIA FRANCÉS</option>
                <option value="FSAT">TERRITORIOS AUSTRALES Y ANTÁRTICOS FRANCESES</option>
                <option value="GABN">GABÓN</option>
                <option value="GAM">GAMBIA, LA</option>
                <option value="XGZ">FRANJA DE GAZA</option>
                <option value="GEO">GEORGIA</option>
                <option value="GER">ALEMANIA</option>
                <option value="GHAN">GHANA</option>
                <option value="GIB">GIBRALTAR</option>
                <option value="GRC">GRECIA</option>
                <option value="GRLD">GROENLANDIA</option>
                <option value="GREN">GRANADA</option>
                <option value="GUAD">GUADALUPE</option>
                <option value="GUAM">Guam</option>
                <option value="GUAT">GUATEMALA</option>
                <option value="GNEA">GUINEA</option>
                <option value="GUIB">GUINEA-BISSAU</option>
                <option value="GUY">GUAYANA</option>
                <option value="HAT">HAITÍ</option>
                <option value="HMD">ISLAS HEARD Y MCDONALD</option>
                <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                <option value="HOND">HONDURAS</option>
                <option value="HNK">HONG KONG</option>
                <option value="XHI">ISLA HOWLAND</option>
                <option value="HUNG">HUNGRÍA</option>
                <option value="ICLD">ISLANDIA</option>
                <option value="IND">INDIA</option>
                <option value="IDSA">INDONESIA</option>
                <option value="IRAN">IRÁN</option>
                <option value="IRAQ">IRAK</option>
                <option value="IRE">IRLANDA</option>
                <option value="ISRL">ISRAEL</option>
                <option value="ITLY">ITALIA</option>
                <option value="JAM">JAMAICA</option>
                <option value="JPN">JAPÓN</option>
                <option value="JRSM">JERUSALÉN</option>
                <option value="JORD">JORDÁN</option>
                <option value="KAZ">KAZAJSTÁN</option>
                <option value="KENY">KENIA</option>
                <option value="KIRI">Kiribati</option>
                <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DE (NORTE)</option>
                <option value="KOR">COREA, REPÚBLICA DE (SUR)</option>
                <option value="KSV">KOSOVO</option>
                <option value="KUWT">KUWAIT</option>
                <option value="KGZ">KIRGUISTÁN</option>
                <option value="LAOS">LAOS</option>
                <option value="LATV">LETONIA</option>
                <option value="LEBN">LÍBANO</option>
                <option value="LES">LESOTO</option>
                <option value="LIBR">LIBERIA</option>
                <option value="LBYA">LIBIA</option>
                <option value="LCHT">Liechtenstein</option>
                <option value="LITH">LITUANIA</option>
                <option value="LXM">LUXEMBURGO</option>
                <option value="MAC">MACAO</option>
                <option value="MKD">MACEDONIA, NORTE</option>
                <option value="MADG">MADAGASCAR</option>
                <option value="MALW">Malawi</option>
                <option value="MLAS">MALASIA</option>
                <option value="MLDI">ISLA MALDEN</option>
                <option value="MLDV">MALDIVAS</option>
                <option value="MALI">Malí</option>
                <option value="MLTA">MALTA</option>
                <option value="RMI">ISLAS MARSHALL</option>
                <option value="MART">MARTINICA</option>
                <option value="MAUR">MAURITANIA</option>
                <option value="MRTS">Mauricio</option>
                <option value="MYT">MAYOTTE</option>
                <option value="MEX">MÉXICO</option>
                <option value="FSM">MICRONESIA</option>
                <option value="MDWI">ISLAS MEDIAS</option>
                <option value="MLD">Moldavia</option>
                <option value="MON">MÓNACO</option>
                <option value="MONG">MONGOLIA</option>
                <option value="MTG">MONTENEGRO</option>
                <option value="MONT">MONTSERRAT</option>
                <option value="MORO">MARRUECOS</option>
                <option value="MOZ">MOZAMBIQUE</option>
                <option value="NAMB">NAMIBIA</option>
                <option value="NAU">Nauru</option>
                <option value="NEP">NEPAL</option>
                <option value="NETH">PAÍSES BAJOS</option>
                <option value="NCAL">NUEVA CALEDONIA</option>
                <option value="NZLD">NUEVA ZELANDA</option>
                <option value="NIC">NICARAGUA</option>
                <option value="NIR">NÍGER</option>
                <option value="NRA">NIGERIA</option>
                <option value="NIUE">Niue</option>
                <option value="NFK">ISLA NORFOLK</option>
                <option value="MNP">ISLAS MARIANAS DEL NORTE</option>
                <option value="NIRE">IRLANDA DEL NORTE</option>
                <option value="NORW">NORUEGA</option>
                <option value="OMAN">OMÁN</option>
                <option value="PKST">PAKISTÁN</option>
                <option value="PALA">PALAU</option>
                <option value="PLMR">ATOLÓN DE PALMYRA</option>
                <option value="PAN">PANAMÁ</option>
                <option value="PNG">PAPÚA NUEVA GUINEA</option>
                <option value="PARA">PARAGUAY</option>
                <option value="PERU">PERÚ</option>
                <option value="PHIL">FILIPINAS</option>
                <option value="PITC">ISLAS PITCAIRN</option>
                <option value="POL">POLONIA</option>
                <option value="PORT">PORTUGAL</option>
                <option value="PR">PUERTO RICO</option>
                <option value="QTAR">KATAR</option>
                <option value="REUN">REUNIÓN</option>
                <option value="ROM">RUMANIA</option>
                <option value="RUS">RUSIA</option>
                <option value="RWND">RUANDA</option>
                <option value="SABA">ISLA SABA</option>
                <option value="MAF">SAN MARTÍN</option>
                <option value="WSAM">SAMOA</option>
                <option value="SMAR">SAN MARINO</option>
                <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                <option value="SARB">ARABIA SAUDITA</option>
                <option value="SENG">SENEGAL</option>
                <option value="SBA">SERBIA</option>
                <option value="SEYC">SEYCHELLES</option>
                <option value="SLEO">SIERRA LEONA</option>
                <option value="SING">SINGAPUR</option>
                <option value="STM">San Martín</option>
                <option value="SVK">ESLOVAQUIA</option>
                <option value="SVN">ESLOVENIA</option>
                <option value="SLMN">ISLAS SALOMÓN</option>
                <option value="SOMA">SOMALIA</option>
                <option value="SAFR">SUDÁFRICA</option>
                <option value="SGS">GEORGIA DEL SUR Y LA ISLA SANDWICH DEL SUR</option>
                <option value="SSDN">SUDÁN DEL SUR</option>
                <option value="SPN">ESPAÑA</option>
                <option value="SRL">SRI LANKA</option>
                <option value="STEU">SAN EUSTACIO</option>
                <option value="SHEL">Santa Elena</option>
                <option value="STCN">SAINT KITTS Y NEVIS</option>
                <option value="SLCA">SANTA LUCÍA</option>
                <option value="SPMI">SAN PEDRO Y MIQUELÓN</option>
                <option value="STVN">SAN VICENTE Y LAS GRANADINAS</option>
                <option value="SUDA">SUDÁN</option>
                <option value="SURM">SURINAM</option>
                <option value="SJM">SVALBARD</option>
                <option value="SWDN">SUECIA</option>
                <option value="SWTZ">SUIZA</option>
                <option value="SYR">SIRIA</option>
                <option value="TWAN">Taiwán</option>
                <option value="TJK">TAYIKISTÁN</option>
                <option value="TAZN">TANZANIA</option>
                <option value="THAI">TAILANDIA</option>
                <option value="TMOR">TIMOR ORIENTAL</option>
                <option value="TOGO">IR</option>
                <option value="TKL">TOKELAU</option>
                <option value="TONG">TONGA</option>
                <option value="TRIN">TRINIDAD Y TOBAGO</option>
                <option value="TNSA">TÚNEZ</option>
                <option value="TRKY">PAVO</option>
                <option value="TKM">TURKMENISTÁN</option>
                <option value="TCIS">ISLAS TURCAS Y CAICOS</option>
                <option value="TUV">TUVALU</option>
                <option value="UGAN">UGANDA</option>
                <option value="UKR">UCRANIA</option>
                <option value="UAE">EMIRATOS ÁRABES UNIDOS</option>
                <option value="GRBR">REINO UNIDO</option>
                <option value="USA">ESTADOS UNIDOS DE AMÉRICA</option>
                <option value="URU">URUGUAY</option>
                <option value="UZB">UZBEKISTÁN</option>
                <option value="VANU">Vanuatu</option>
                <option value="VENZ">VENEZUELA</option>
                <option value="VTNM">VIETNAM</option>
                <option value="VI">ISLAS VÍRGENES (EE.UU.)</option>
                <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                <option value="WKI">ISLA DE vigilia</option>
                <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                <option value="XWB">BANCO OESTE</option>
                <option value="SSAH">SAHARA OCCIDENTAL</option>
                <option value="YEM">YEMEN</option>
                <option value="ZAMB">ZAMBIA</option>
                <option value="ZIMB">ZIMBABUE</option>

            </select>
        `;
        countriesVisitedContainer.appendChild(newCountryItem);
        updateRemoveButton();
    }

    addCountryBtn.addEventListener('click', addCountry);

    removeCountryBtn.addEventListener('click', function() {
        var countryItems = document.querySelectorAll('.country-item');
        if (countryItems.length > 1) {
            countryItems[countryItems.length - 1].remove();
            updateRemoveButton();
        }
    });


    function addRelative() {
        relativeCount++;
    
        // Crear elementos para los detalles del pariente
        var relativeGroup = document.createElement('div');
        relativeGroup.classList.add('form-card__group', 'relative-group');
        relativeGroup.dataset.relativeIndex = relativeCount;
    
        var relativeNameLabel = document.createElement('label');
        relativeNameLabel.classList.add('form-card__label');
        relativeNameLabel.textContent = 'NOMBRE COMPLETO:';
        relativeGroup.appendChild(relativeNameLabel);
    
        var relativeNameInput = document.createElement('input');
        relativeNameInput.classList.add('form-card__input');
        relativeNameInput.type = 'text';
        relativeNameInput.name = 'relative_name_' + relativeCount;
        relativeGroup.appendChild(relativeNameInput);
    
        var relativeRelationshipLabel = document.createElement('label');
        relativeRelationshipLabel.classList.add('form-card__label');
        relativeRelationshipLabel.textContent = 'RELACIÓN:';
        relativeGroup.appendChild(relativeRelationshipLabel);
    
        var relativeRelationshipSelect = document.createElement('select');
        relativeRelationshipSelect.classList.add('form-card__input');
        relativeRelationshipSelect.name = 'relative_relationship_' + relativeCount;
        relativeGroup.appendChild(relativeRelationshipSelect);
    
        var relationshipOptions = [
            { value: '', text: '- SELECCIONE UNO -'},
            { value: 'S', text: 'CÓNYUGE' },
            { value: 'F', text: 'PROMETIDO/PROMETIDA' },
            { value: 'C', text: 'HIJO/HIJA' },
            { value: 'B', text: 'HERMANO/HERMANA' }
        ];
    
        relationshipOptions.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            relativeRelationshipSelect.appendChild(optionElement);
        });

        relativeRelationshipSelect.options[0].disabled = true;
        relativeRelationshipSelect.options[0].selected = true;
    
        var relativeStatusLabel = document.createElement('label');
        relativeStatusLabel.classList.add('form-card__label');
        relativeStatusLabel.textContent = 'ESTATUS:';
        relativeGroup.appendChild(relativeStatusLabel);
    
        var relativeStatusSelect = document.createElement('select');
        relativeStatusSelect.classList.add('form-card__input');
        relativeStatusSelect.name = 'relative_status_' + relativeCount;
        relativeGroup.appendChild(relativeStatusSelect);
    
        var statusOptions = [
            { value: '', text: '- SELECCIONE UNO -'},
            { value: 'S', text: 'CIUDADANO ESTADOUNIDENSE/CIUDADANA ESTADOUNIDENSE' },
            { value: 'C', text: 'RESIDENTE LEGAL PERMANENTE DE ESTADOS UNIDOS (LPR)' },
            { value: 'P', text: 'NO INMIGRANTE' },
            { value: 'O', text: 'OTRO/NO SÉ' }
        ];
    
        statusOptions.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            relativeStatusSelect.appendChild(optionElement);
        });
        relativeStatusSelect.options[0].disabled = true;
        relativeStatusSelect.options[0].selected = true;
    
        // Agregar el grupo del pariente al contenedor
        relativesContainer.appendChild(relativeGroup);
    
        // Mostrar el botón de eliminar si hay más de un pariente agregado
        if (relativeCount > 1) {
            removeRelativeBtn.style.display = 'block';
        }
    
        // Mostrar el botón de submit cuando se añade el primer pariente
        if (relativeCount === 1) {
            submitBtn.style.display = 'block';
        }
    }
    
    function removeRelative() {
        var lastRelative = relativesContainer.querySelector('.relative-group:last-child');
        if (lastRelative) {
            relativesContainer.removeChild(lastRelative);
            relativeCount--;
    
            // Ocultar el botón de eliminar si solo queda un pariente
            if (relativeCount === 1) {
                removeRelativeBtn.style.display = 'none';
            }
    
            // Ocultar el botón de submit si no hay parientes
            if (relativeCount === 0) {
                submitBtn.style.display = 'none';
            }
        }
    }


    relativesUsaYes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('relatives_usa_no').addEventListener('change', toggleCompanionsDetails);
    addRelativeBtn.addEventListener('click', addRelative);
    removeRelativeBtn.addEventListener('click', removeRelative);

    employedYes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('employed_no').addEventListener('change', toggleCompanionsDetails);

    income_yes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('income_no').addEventListener('change', toggleCompanionsDetails);


    educationAttendedYes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('work_attended_no').addEventListener('change', toggleCompanionsDetails);

    work_attended_yes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('education_attended_no').addEventListener('change', toggleCompanionsDetails);

    social_media_yes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('social_media_no').addEventListener('change', toggleCompanionsDetails);

    passport_issue_yes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('passport_issue_no').addEventListener('change', toggleCompanionsDetails);

    admission_issue_yes.addEventListener('change', toggleCompanionsDetails);
    document.getElementById('admission_issue_no').addEventListener('change', toggleCompanionsDetails);



    traveledRecentlyYes.addEventListener('change', toggleCompanionsDetails);
    traveledRecentlyNo.addEventListener('change', toggleCompanionsDetails);

    // Trigger initial state
    toggleCompanionsDetails();


    let jobCount = 1;
    const jobsContainer = document.getElementById('previous_jobs_container');
    const addJobButton = document.getElementById('add_previous_job');
    const removeJobButton = document.getElementById('remove_previous_job');
    const jobsButtons = document.getElementById('previous_jobs_buttons');

    function updateRemoveButtonVisibility() {
        const jobEntries = document.querySelectorAll('.job-entry');
        if (jobEntries.length > 1) {
            removeJobButton.style.display = 'inline-block'; // Mostrar si hay más de un elemento
        } else {
            removeJobButton.style.display = 'none'; // Ocultar si es el único elemento
        }
    }

    function updateJobIDs() {
        const jobEntries = document.querySelectorAll('.job-entry');
        jobEntries.forEach((entry, index) => {
            const count = index + 1;
            entry.id = `previous_job_${count}`;
            entry.querySelectorAll('input, textarea').forEach(input => {
                const name = input.name.replace(/\d+/, count);
                input.id = name;
                input.name = name;
            });
        });
    }

    addJobButton.addEventListener('click', function() {
        jobCount++;
        
        const newJobEntry = document.createElement('div');
        newJobEntry.className = 'job-entry';
        newJobEntry.innerHTML = `
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_${jobCount}">EN QUÉ TRABAJABA ANTERIORMENTE (NOMBRE DE LA EMPRESA):</label>
                <input class="form-card__input" type="text" id="previous_job_${jobCount}" name="previous_job_${jobCount}" />
            </div>
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_address_${jobCount}">DIRECCIÓN DEL EMPLEO ANTERIOR:</label>
                <input class="form-card__input" type="text" id="previous_job_address_${jobCount}" name="previous_job_address_${jobCount}" />
            </div>
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_city_${jobCount}">CIUDAD DEL EMPLEO ANTERIOR:</label>
                <input class="form-card__input" type="text" id="previous_job_city_${jobCount}" name="previous_job_city_${jobCount}" />
            </div>
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_phone_${jobCount}">NÚMERO TELEFÓNICO DEL EMPLEO ANTERIOR:</label>
                <input class="form-card__input" type="text" id="previous_job_phone_${jobCount}" name="previous_job_phone_${jobCount}" />
            </div>
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_start_date_${jobCount}">FECHA DE INICIO DE EMPLEO:</label>
                <input class="form-card__input" type="date" id="previous_job_start_date_${jobCount}" name="previous_job_start_date_${jobCount}" />
            </div>
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_end_date_${jobCount}">FECHA DE FINALIZACIÓN DE EMPLEO:</label>
                <input class="form-card__input" type="date" id="previous_job_end_date_${jobCount}" name="previous_job_end_date_${jobCount}" />
            </div>
            <div class="form-card__group">
                <label class="form-card__label" for="previous_job_description_${jobCount}">BREVE DESCRIPCIÓN DE EMPLEO ANTERIOR:</label>
                <textarea class="form-card__input" id="previous_job_description_${jobCount}" name="previous_job_description_${jobCount}" rows="5"></textarea>
            </div>
        `;
        
        jobsContainer.appendChild(newJobEntry);
        jobsContainer.appendChild(jobsButtons); // Mover los botones al final
        updateJobIDs(); // Actualizar IDs
        updateRemoveButtonVisibility(); // Actualizar visibilidad del botón de eliminar
    });

    removeJobButton.addEventListener('click', function() {
        const jobEntries = document.querySelectorAll('.job-entry');
        if (jobEntries.length > 1) {
            jobsContainer.removeChild(jobEntries[jobEntries.length - 1]);
            updateJobIDs(); // Actualizar IDs
            updateRemoveButtonVisibility(); // Actualizar visibilidad del botón de eliminar
        }
    });

    // Al cargar la página, asegurarse de mostrar correctamente el botón de eliminar
    updateRemoveButtonVisibility();


    const emailContainer = document.getElementById('email-container');
    const addEmailButton = document.getElementById('add-email');
    const removeEmailButton = document.getElementById('remove-email');
    let emailCount = 1;

    // Función para actualizar la visibilidad del botón de eliminar
    function updateRemoveButtonVisibilityEmail() {
        removeEmailButton.style.display = emailCount > 1 ? 'inline-block' : 'none';
    }

    // Función para agregar un nuevo campo de correo
    function addEmailField() {
        emailCount++;
        const newEmailGroup = document.createElement('div');
        newEmailGroup.className = 'form-card__group email-group';
        newEmailGroup.innerHTML = `
            <label class="form-card__label" for="email_${emailCount}">CORREO ELECTRÓNICO:</label>
            <input class="form-card__input" type="email" id="email_${emailCount}" name="email_${emailCount}"/>
        `;
        emailContainer.appendChild(newEmailGroup);
        updateRemoveButtonVisibilityEmail();
    }

    // Función para eliminar el último campo de correo
    function removeEmailField() {
        if (emailCount > 1) {
            emailCount--;
            emailContainer.removeChild(emailContainer.lastChild);
            updateRemoveButtonVisibilityEmail();
        }
    }

    // Evento para agregar correo
    addEmailButton.addEventListener('click', addEmailField);

    // Evento para eliminar correo
    removeEmailButton.addEventListener('click', removeEmailField);

    // Actualizar visibilidad inicial del botón de eliminar
    updateRemoveButtonVisibilityEmail();
});