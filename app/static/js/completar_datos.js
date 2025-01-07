document.addEventListener('DOMContentLoaded', function() {
    var selectElementSex = document.getElementById("sex");
    var codSex = selectElementSex.getAttribute("data-cod-sex");
    if (codSex=="None") {
        selectElementSex.selectedIndex = 0;
    } else {
        selectElementSex.value = codSex;
    }


    var selectElementCivilStatus = document.getElementById("civil_status");
    var addDivorceButton = document.getElementById('addDivorceButton');
    var removeDivorceButton = document.getElementById('removeDivorceButton');

    var dynamicContent = document.getElementById('dynamic-content');
    var codCivilStatus = selectElementCivilStatus.getAttribute("data-cod-civil-status");
    if (codCivilStatus === "None") {
        selectElementCivilStatus.selectedIndex = 0;
    } else {
        selectElementCivilStatus.value = codCivilStatus;
        generateDynamicContent(codCivilStatus);
    }

    function setElementValueById(elementId, attributeName, defaultValue = 0) {
        var element = document.getElementById(elementId);
        if (element) {
            var attributeValue = element.getAttribute(attributeName);
            if (attributeValue === "null") {
                element.selectedIndex = defaultValue;
            } else {
                element.value = attributeValue;
            }
        }
    }

    setElementValueById("couple_nationality", "cod_couple_nacioality");
    setElementValueById("couple_place", "cod_couple_place");
    setElementValueById("couple_address_select", "cod_couple_address_select");

    selectElementCivilStatus.addEventListener('change', function () {
        var selectedValue = this.value;
        generateDynamicContent(selectedValue);

        setElementValueById("couple_nationality", "cod_couple_nacioality");
        setElementValueById("couple_place", "cod_couple_place");
        setElementValueById("couple_address_select", "cod_couple_address_select");
    });


    


    function generateDynamicContent(selectedValue) {
        dynamicContent.innerHTML = '';
    
        switch (selectedValue) {
            case 'O': // OTRO
                dynamicContent.innerHTML = `
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_explication">EXPLIQUE:</label>
                        <input type="text" class="form-card__input" name="couple_explication" placeholder="Explique su estado civil" value="${usuarioData.explicacion || ''}">
                    </div>`;
                break;
            case 'W': // VIUDO/VIUDA
                dynamicContent.innerHTML = `
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_names">NOMBRES VIUDEZ:</label>
                        <input type="text" class="form-card__input" name="couple_names" placeholder="Nombres" value="${usuarioData.nombres || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_surnames">APELLIDOS VIUDEZ:</label>
                        <input type="text" class="form-card__input" name="couple_surnames" placeholder="Apellidos" value="${usuarioData.apellidos || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_birthdate">FECHA DE NACIMIENTO VIUDEZ:</label>
                        <input type="date" class="form-card__input" name="couple_birthdate" value="${usuarioData.fecha_nacimiento || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_nationality">NACIONALIDAD VIUDEZ:</label>
                        <select class="form-card__input" name="couple_nationality" id="couple_nationality" cod_couple_nacioality="${usuarioData.nacionalidad}">
                            <option disabled value="">- SELECCIONE UNO -</option>
                            <option value="AFGH">AFGANISTÁN</option>
                            <option value="ALB">ALBANIA</option>
                            <option value="ALGR">ARGELIA</option>
                            <option value="ANDO">ANDORRA</option>
                            <option value="ANGL">ANGOLA</option>
                            <option value="ANGU">ANGUILA</option>
                            <option value="ANTI">ANTIGUA Y BARBUDA</option>
                            <option value="ARG">ARGENTINA</option>
                            <option value="ARM">ARMENIA</option>
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
                            <option value="BENN">BENÍN</option>
                            <option value="BERM">ISLAS BERMUDAS</option>
                            <option value="BHU">BUTÁN</option>
                            <option value="BOL">BOLIVIA</option>
                            <option value="BIH">BOSNIA-HERZEGOVINA</option>
                            <option value="BOT">BOTSUANA</option>
                            <option value="BRZL">BRASIL</option>
                            <option value="BRNI">BRUNEI</option>
                            <option value="BULG">BULGARIA</option>
                            <option value="BURK">BURKINA FASO</option>
                            <option value="BURM">BIRMANIA</option>
                            <option value="BRND">BURUNDI</option>
                            <option value="CBDA">CAMBOYA</option>
                            <option value="CMRN">CAMERÚN</option>
                            <option value="CAN">CANADÁ</option>
                            <option value="CAVI">CABO VERDE</option>
                            <option value="CAYI">ISLAS CAIMÁN</option>
                            <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                            <option value="CHAD">CHAD</option>
                            <option value="CHIL">CHILE</option>
                            <option value="CHIN">PORCELANA</option>
                            <option value="COL">COLOMBIA</option>
                            <option value="COMO">COMORAS</option>
                            <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                            <option value="CONB">CONGO, REPÚBLICA DEL</option>
                            <option value="CSTR">COSTA RICA</option>
                            <option value="IVCO">COSTA DE MARFIL</option>
                            <option value="HRV">CROACIA</option>
                            <option value="CUBA">CUBA</option>
                            <option value="CYPR">CHIPRE</option>
                            <option value="CZEC">REPÚBLICA CHECA</option>
                            <option value="DEN">DINAMARCA</option>
                            <option value="DJI">Djibouti</option>
                            <option value="DOMN">DOMINICA</option>
                            <option value="DOMR">REPÚBLICA DOMINICANA</option>
                            <option value="ECUA">ECUADOR</option>
                            <option value="EGYP">EGIPTO</option>
                            <option value="ELSL">EL SALVADOR</option>
                            <option value="EGN">GUINEA ECUATORIAL</option>
                            <option value="ERI">ERITREA</option>
                            <option value="EST">ESTONIA</option>
                            <option value="SZLD">ESWATINÍ</option>
                            <option value="ETH">ETIOPÍA</option>
                            <option value="FIJI">FIJI</option>
                            <option value="FIN">FINLANDIA</option>
                            <option value="FRAN">FRANCIA</option>
                            <option value="GABN">GABÓN</option>
                            <option value="GAM">GAMBIA, EL</option>
                            <option value="GEO">GEORGIA</option>
                            <option value="GER">ALEMANIA</option>
                            <option value="GHAN">GHANA</option>
                            <option value="GIB">GIBRALTAR</option>
                            <option value="GRC">GRECIA</option>
                            <option value="GREN">GRANADA</option>
                            <option value="GUAT">GUATEMALA</option>
                            <option value="GNEA">GUINEA</option>
                            <option value="GUIB">GUINEA - BISSAU</option>
                            <option value="GUY">GUAYANA</option>
                            <option value="HAT">HAITÍ</option>
                            <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                            <option value="HOND">HONDURAS</option>
                            <option value="HOKO">BNO DE HONG KONG</option>
                            <option value="HNK">RAE DE HONG KONG</option>
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
                            <option value="JORD">JORDÁN</option>
                            <option value="KAZ">KAZAJSTÁN</option>
                            <option value="KENY">KENIA</option>
                            <option value="KIRI">KIRIBATI</option>
                            <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                            <option value="LCHT">LIECHTENSTEIN</option>
                            <option value="LITH">LITUANIA</option>
                            <option value="LXM">LUXEMBURGO</option>
                            <option value="MAC">MACAO</option>
                            <option value="MKD">MACEDONIA, NORTE</option>
                            <option value="MADG">MADAGASCAR</option>
                            <option value="MALW">MALAUI</option>
                            <option value="MLAS">MALASIA</option>
                            <option value="MLDV">MALDIVAS</option>
                            <option value="MALI">MALÍ</option>
                            <option value="MLTA">MALTA</option>
                            <option value="RMI">ISLAS MARSHALL</option>
                            <option value="MAUR">MAURITANIA</option>
                            <option value="MRTS">MAURICIO</option>
                            <option value="MEX">MÉXICO</option>
                            <option value="FSM">MICRONESIA</option>
                            <option value="MLD">MOLDAVIA</option>
                            <option value="MON">MÓNACO</option>
                            <option value="MONG">MONGOLIA</option>
                            <option value="MTG">MONTENEGRO</option>
                            <option value="MONT">MONTSERRAT</option>
                            <option value="MORO">MARRUECOS</option>
                            <option value="MOZ">MOZAMBIQUE</option>
                            <option value="NAMB">NAMIBIA</option>
                            <option value="NAU">NAURÚ</option>
                            <option value="NEP">NEPAL</option>
                            <option value="NETH">PAÍSES BAJOS</option>
                            <option value="NZLD">NUEVA ZELANDA</option>
                            <option value="NIC">NICARAGUA</option>
                            <option value="NIR">NÍGER</option>
                            <option value="NRA">NIGERIA</option>
                            <option value="NORW">NORUEGA</option>
                            <option value="OMAN">OMÁN</option>
                            <option value="PKST">PAKISTÁN</option>
                            <option value="PALA">PALAU</option>
                            <option value="PAL">AUTORIDAD PALESTINA</option>
                            <option value="PAN">PANAMÁ</option>
                            <option value="PNG">PAPÚA NUEVA GUINEA</option>
                            <option value="PARA">PARAGUAY</option>
                            <option value="PERU">PERÚ</option>
                            <option value="PHIL">FILIPINAS</option>
                            <option value="PITC">ISLAS PITCAIRN</option>
                            <option value="POL">POLONIA</option>
                            <option value="PORT">PORTUGAL</option>
                            <option value="QTAR">KATAR</option>
                            <option value="ROM">RUMANIA</option>
                            <option value="RUS">RUSIA</option>
                            <option value="RWND">RUANDA</option>
                            <option value="WSAM">SAMOA</option>
                            <option value="SMAR">SAN MARINO</option>
                            <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                            <option value="SARB">ARABIA SAUDITA</option>
                            <option value="SENG">SENEGAL</option>
                            <option value="SBA">SERBIA</option>
                            <option value="SEYC">SEYCHELLES</option>
                            <option value="SLEO">SIERRA LEONA</option>
                            <option value="SING">SINGAPUR</option>
                            <option value="SVK">ESLOVAQUIA</option>
                            <option value="SVN">ESLOVENIA</option>
                            <option value="SLMN">ISLAS SALOMÓN</option>
                            <option value="SOMA">SOMALIA</option>
                            <option value="SAFR">SUDÁFRICA</option>
                            <option value="SSDN">SUDÁN DEL SUR</option>
                            <option value="SPN">ESPAÑA</option>
                            <option value="SRL">SRI LANKA</option>
                            <option value="SHEL">CALLE. ELENA</option>
                            <option value="STCN">CALLE. Kitts y Nevis</option>
                            <option value="SLCA">CALLE. LUCÍA</option>
                            <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                            <option value="XXX">APÁTRIDA</option>
                            <option value="SUDA">SUDÁN</option>
                            <option value="SURM">SURINAME</option>
                            <option value="SWDN">SUECIA</option>
                            <option value="SWTZ">SUIZA</option>
                            <option value="SYR">SIRIA</option>
                            <option value="TWAN">TAIWÁN</option>
                            <option value="TJK">TAYIKISTÁN</option>
                            <option value="TAZN">TANZANIA</option>
                            <option value="THAI">TAILANDIA</option>
                            <option value="TMOR">TIMOR-LESTE</option>
                            <option value="TOGO">IR</option>
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
                            <option value="URU">URUGUAY</option>
                            <option value="UZB">UZBEKISTÁN</option>
                            <option value="VANU">VANUATU</option>
                            <option value="VENZ">VENEZUELA</option>
                            <option value="VTNM">VIETNAM</option>
                            <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                            <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                            <option value="SSAH">SAHARA OCCIDENTAL</option>
                            <option value="YEM">YEMEN</option>
                            <option value="ZAMB">ZAMBIA</option>
                            <option value="ZIMB">ZIMBABUE</option>
                        </select>
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_city">CIUDAD DE NACIMIENTO VIUDEZ:</label>
                        <input type="text" class="form-card__input" name="couple_city" placeholder="Ciudad de nacimiento" value="${usuarioData.ciudad_nacimiento || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_place">LUGAR DE NACIMIENTO VIUDEZ:</label>
                        <select class="form-card__input" name="couple_place" id="couple_place" cod_couple_place="${usuarioData.lugar_nacimiento}">
                            <option disabled value="">- SELECCIONE UNO -</option>
                            <option value="AFGH">AFGANISTÁN</option>
                            <option value="ALB">ALBANIA</option>
                            <option value="ALGR">ARGELIA</option>
                            <option value="ANDO">ANDORRA</option>
                            <option value="ANGL">ANGOLA</option>
                            <option value="ANGU">ANGUILA</option>
                            <option value="ANTI">ANTIGUA Y BARBUDA</option>
                            <option value="ARG">ARGENTINA</option>
                            <option value="ARM">ARMENIA</option>
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
                            <option value="BENN">BENÍN</option>
                            <option value="BERM">ISLAS BERMUDAS</option>
                            <option value="BHU">BUTÁN</option>
                            <option value="BOL">BOLIVIA</option>
                            <option value="BIH">BOSNIA-HERZEGOVINA</option>
                            <option value="BOT">BOTSUANA</option>
                            <option value="BRZL">BRASIL</option>
                            <option value="BRNI">BRUNEI</option>
                            <option value="BULG">BULGARIA</option>
                            <option value="BURK">BURKINA FASO</option>
                            <option value="BURM">BIRMANIA</option>
                            <option value="BRND">BURUNDI</option>
                            <option value="CBDA">CAMBOYA</option>
                            <option value="CMRN">CAMERÚN</option>
                            <option value="CAN">CANADÁ</option>
                            <option value="CAVI">CABO VERDE</option>
                            <option value="CAYI">ISLAS CAIMÁN</option>
                            <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                            <option value="CHAD">CHAD</option>
                            <option value="CHIL">CHILE</option>
                            <option value="CHIN">PORCELANA</option>
                            <option value="COL">COLOMBIA</option>
                            <option value="COMO">COMORAS</option>
                            <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                            <option value="CONB">CONGO, REPÚBLICA DEL</option>
                            <option value="CSTR">COSTA RICA</option>
                            <option value="IVCO">COSTA DE MARFIL</option>
                            <option value="HRV">CROACIA</option>
                            <option value="CUBA">CUBA</option>
                            <option value="CYPR">CHIPRE</option>
                            <option value="CZEC">REPÚBLICA CHECA</option>
                            <option value="DEN">DINAMARCA</option>
                            <option value="DJI">Djibouti</option>
                            <option value="DOMN">DOMINICA</option>
                            <option value="DOMR">REPÚBLICA DOMINICANA</option>
                            <option value="ECUA">ECUADOR</option>
                            <option value="EGYP">EGIPTO</option>
                            <option value="ELSL">EL SALVADOR</option>
                            <option value="EGN">GUINEA ECUATORIAL</option>
                            <option value="ERI">ERITREA</option>
                            <option value="EST">ESTONIA</option>
                            <option value="SZLD">ESWATINÍ</option>
                            <option value="ETH">ETIOPÍA</option>
                            <option value="FIJI">FIJI</option>
                            <option value="FIN">FINLANDIA</option>
                            <option value="FRAN">FRANCIA</option>
                            <option value="GABN">GABÓN</option>
                            <option value="GAM">GAMBIA, EL</option>
                            <option value="GEO">GEORGIA</option>
                            <option value="GER">ALEMANIA</option>
                            <option value="GHAN">GHANA</option>
                            <option value="GIB">GIBRALTAR</option>
                            <option value="GRC">GRECIA</option>
                            <option value="GREN">GRANADA</option>
                            <option value="GUAT">GUATEMALA</option>
                            <option value="GNEA">GUINEA</option>
                            <option value="GUIB">GUINEA - BISSAU</option>
                            <option value="GUY">GUAYANA</option>
                            <option value="HAT">HAITÍ</option>
                            <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                            <option value="HOND">HONDURAS</option>
                            <option value="HOKO">BNO DE HONG KONG</option>
                            <option value="HNK">RAE DE HONG KONG</option>
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
                            <option value="JORD">JORDÁN</option>
                            <option value="KAZ">KAZAJSTÁN</option>
                            <option value="KENY">KENIA</option>
                            <option value="KIRI">KIRIBATI</option>
                            <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                            <option value="LCHT">LIECHTENSTEIN</option>
                            <option value="LITH">LITUANIA</option>
                            <option value="LXM">LUXEMBURGO</option>
                            <option value="MAC">MACAO</option>
                            <option value="MKD">MACEDONIA, NORTE</option>
                            <option value="MADG">MADAGASCAR</option>
                            <option value="MALW">MALAUI</option>
                            <option value="MLAS">MALASIA</option>
                            <option value="MLDV">MALDIVAS</option>
                            <option value="MALI">MALÍ</option>
                            <option value="MLTA">MALTA</option>
                            <option value="RMI">ISLAS MARSHALL</option>
                            <option value="MAUR">MAURITANIA</option>
                            <option value="MRTS">MAURICIO</option>
                            <option value="MEX">MÉXICO</option>
                            <option value="FSM">MICRONESIA</option>
                            <option value="MLD">MOLDAVIA</option>
                            <option value="MON">MÓNACO</option>
                            <option value="MONG">MONGOLIA</option>
                            <option value="MTG">MONTENEGRO</option>
                            <option value="MONT">MONTSERRAT</option>
                            <option value="MORO">MARRUECOS</option>
                            <option value="MOZ">MOZAMBIQUE</option>
                            <option value="NAMB">NAMIBIA</option>
                            <option value="NAU">NAURÚ</option>
                            <option value="NEP">NEPAL</option>
                            <option value="NETH">PAÍSES BAJOS</option>
                            <option value="NZLD">NUEVA ZELANDA</option>
                            <option value="NIC">NICARAGUA</option>
                            <option value="NIR">NÍGER</option>
                            <option value="NRA">NIGERIA</option>
                            <option value="NORW">NORUEGA</option>
                            <option value="OMAN">OMÁN</option>
                            <option value="PKST">PAKISTÁN</option>
                            <option value="PALA">PALAU</option>
                            <option value="PAL">AUTORIDAD PALESTINA</option>
                            <option value="PAN">PANAMÁ</option>
                            <option value="PNG">PAPÚA NUEVA GUINEA</option>
                            <option value="PARA">PARAGUAY</option>
                            <option value="PERU">PERÚ</option>
                            <option value="PHIL">FILIPINAS</option>
                            <option value="PITC">ISLAS PITCAIRN</option>
                            <option value="POL">POLONIA</option>
                            <option value="PORT">PORTUGAL</option>
                            <option value="QTAR">KATAR</option>
                            <option value="ROM">RUMANIA</option>
                            <option value="RUS">RUSIA</option>
                            <option value="RWND">RUANDA</option>
                            <option value="WSAM">SAMOA</option>
                            <option value="SMAR">SAN MARINO</option>
                            <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                            <option value="SARB">ARABIA SAUDITA</option>
                            <option value="SENG">SENEGAL</option>
                            <option value="SBA">SERBIA</option>
                            <option value="SEYC">SEYCHELLES</option>
                            <option value="SLEO">SIERRA LEONA</option>
                            <option value="SING">SINGAPUR</option>
                            <option value="SVK">ESLOVAQUIA</option>
                            <option value="SVN">ESLOVENIA</option>
                            <option value="SLMN">ISLAS SALOMÓN</option>
                            <option value="SOMA">SOMALIA</option>
                            <option value="SAFR">SUDÁFRICA</option>
                            <option value="SSDN">SUDÁN DEL SUR</option>
                            <option value="SPN">ESPAÑA</option>
                            <option value="SRL">SRI LANKA</option>
                            <option value="SHEL">CALLE. ELENA</option>
                            <option value="STCN">CALLE. Kitts y Nevis</option>
                            <option value="SLCA">CALLE. LUCÍA</option>
                            <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                            <option value="XXX">APÁTRIDA</option>
                            <option value="SUDA">SUDÁN</option>
                            <option value="SURM">SURINAME</option>
                            <option value="SWDN">SUECIA</option>
                            <option value="SWTZ">SUIZA</option>
                            <option value="SYR">SIRIA</option>
                            <option value="TWAN">TAIWÁN</option>
                            <option value="TJK">TAYIKISTÁN</option>
                            <option value="TAZN">TANZANIA</option>
                            <option value="THAI">TAILANDIA</option>
                            <option value="TMOR">TIMOR-LESTE</option>
                            <option value="TOGO">IR</option>
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
                            <option value="URU">URUGUAY</option>
                            <option value="UZB">UZBEKISTÁN</option>
                            <option value="VANU">VANUATU</option>
                            <option value="VENZ">VENEZUELA</option>
                            <option value="VTNM">VIETNAM</option>
                            <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                            <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                            <option value="SSAH">SAHARA OCCIDENTAL</option>
                            <option value="YEM">YEMEN</option>
                            <option value="ZAMB">ZAMBIA</option>
                            <option value="ZIMB">ZIMBABUE</option>
                        </select>
                    </div>`;
                break;
            case 'M':
            case 'C':
            case 'P':
            case 'L': // CASADO, UNION DE HECHO, UNION CIVIL, LEGALMENTE SEPARADO
                dynamicContent.innerHTML = `
                    <div class="form-card__group">
                        <label class="form-card__label">NOMBRES PAREJA:</label>
                        <input type="text" class="form-card__input" name="couple_names" placeholder="Nombres" value="${usuarioData.nombres || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label">APELLIDOS PAREJA:</label>
                        <input type="text" class="form-card__input" name="couple_surnames" placeholder="Apellidos" value="${usuarioData.apellidos || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label">FECHA DE NACIMIENTO PAREJA:</label>
                        <input type="date" class="form-card__input" name="couple_birthdate" value="${usuarioData.fecha_nacimiento || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_nationality">NACIONALIDAD PAREJA:</label>
                        <select class="form-card__input" name="couple_nationality" id="couple_nationality" cod_couple_nacioality="${usuarioData.nacionalidad}">
                            <option disabled value="">- SELECCIONE UNO -</option>
                            <option value="AFGH">AFGANISTÁN</option>
                            <option value="ALB">ALBANIA</option>
                            <option value="ALGR">ARGELIA</option>
                            <option value="ANDO">ANDORRA</option>
                            <option value="ANGL">ANGOLA</option>
                            <option value="ANGU">ANGUILA</option>
                            <option value="ANTI">ANTIGUA Y BARBUDA</option>
                            <option value="ARG">ARGENTINA</option>
                            <option value="ARM">ARMENIA</option>
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
                            <option value="BENN">BENÍN</option>
                            <option value="BERM">ISLAS BERMUDAS</option>
                            <option value="BHU">BUTÁN</option>
                            <option value="BOL">BOLIVIA</option>
                            <option value="BIH">BOSNIA-HERZEGOVINA</option>
                            <option value="BOT">BOTSUANA</option>
                            <option value="BRZL">BRASIL</option>
                            <option value="BRNI">BRUNEI</option>
                            <option value="BULG">BULGARIA</option>
                            <option value="BURK">BURKINA FASO</option>
                            <option value="BURM">BIRMANIA</option>
                            <option value="BRND">BURUNDI</option>
                            <option value="CBDA">CAMBOYA</option>
                            <option value="CMRN">CAMERÚN</option>
                            <option value="CAN">CANADÁ</option>
                            <option value="CAVI">CABO VERDE</option>
                            <option value="CAYI">ISLAS CAIMÁN</option>
                            <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                            <option value="CHAD">CHAD</option>
                            <option value="CHIL">CHILE</option>
                            <option value="CHIN">PORCELANA</option>
                            <option value="COL">COLOMBIA</option>
                            <option value="COMO">COMORAS</option>
                            <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                            <option value="CONB">CONGO, REPÚBLICA DEL</option>
                            <option value="CSTR">COSTA RICA</option>
                            <option value="IVCO">COSTA DE MARFIL</option>
                            <option value="HRV">CROACIA</option>
                            <option value="CUBA">CUBA</option>
                            <option value="CYPR">CHIPRE</option>
                            <option value="CZEC">REPÚBLICA CHECA</option>
                            <option value="DEN">DINAMARCA</option>
                            <option value="DJI">Djibouti</option>
                            <option value="DOMN">DOMINICA</option>
                            <option value="DOMR">REPÚBLICA DOMINICANA</option>
                            <option value="ECUA">ECUADOR</option>
                            <option value="EGYP">EGIPTO</option>
                            <option value="ELSL">EL SALVADOR</option>
                            <option value="EGN">GUINEA ECUATORIAL</option>
                            <option value="ERI">ERITREA</option>
                            <option value="EST">ESTONIA</option>
                            <option value="SZLD">ESWATINÍ</option>
                            <option value="ETH">ETIOPÍA</option>
                            <option value="FIJI">FIJI</option>
                            <option value="FIN">FINLANDIA</option>
                            <option value="FRAN">FRANCIA</option>
                            <option value="GABN">GABÓN</option>
                            <option value="GAM">GAMBIA, EL</option>
                            <option value="GEO">GEORGIA</option>
                            <option value="GER">ALEMANIA</option>
                            <option value="GHAN">GHANA</option>
                            <option value="GIB">GIBRALTAR</option>
                            <option value="GRC">GRECIA</option>
                            <option value="GREN">GRANADA</option>
                            <option value="GUAT">GUATEMALA</option>
                            <option value="GNEA">GUINEA</option>
                            <option value="GUIB">GUINEA - BISSAU</option>
                            <option value="GUY">GUAYANA</option>
                            <option value="HAT">HAITÍ</option>
                            <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                            <option value="HOND">HONDURAS</option>
                            <option value="HOKO">BNO DE HONG KONG</option>
                            <option value="HNK">RAE DE HONG KONG</option>
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
                            <option value="JORD">JORDÁN</option>
                            <option value="KAZ">KAZAJSTÁN</option>
                            <option value="KENY">KENIA</option>
                            <option value="KIRI">KIRIBATI</option>
                            <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                            <option value="LCHT">LIECHTENSTEIN</option>
                            <option value="LITH">LITUANIA</option>
                            <option value="LXM">LUXEMBURGO</option>
                            <option value="MAC">MACAO</option>
                            <option value="MKD">MACEDONIA, NORTE</option>
                            <option value="MADG">MADAGASCAR</option>
                            <option value="MALW">MALAUI</option>
                            <option value="MLAS">MALASIA</option>
                            <option value="MLDV">MALDIVAS</option>
                            <option value="MALI">MALÍ</option>
                            <option value="MLTA">MALTA</option>
                            <option value="RMI">ISLAS MARSHALL</option>
                            <option value="MAUR">MAURITANIA</option>
                            <option value="MRTS">MAURICIO</option>
                            <option value="MEX">MÉXICO</option>
                            <option value="FSM">MICRONESIA</option>
                            <option value="MLD">MOLDAVIA</option>
                            <option value="MON">MÓNACO</option>
                            <option value="MONG">MONGOLIA</option>
                            <option value="MTG">MONTENEGRO</option>
                            <option value="MONT">MONTSERRAT</option>
                            <option value="MORO">MARRUECOS</option>
                            <option value="MOZ">MOZAMBIQUE</option>
                            <option value="NAMB">NAMIBIA</option>
                            <option value="NAU">NAURÚ</option>
                            <option value="NEP">NEPAL</option>
                            <option value="NETH">PAÍSES BAJOS</option>
                            <option value="NZLD">NUEVA ZELANDA</option>
                            <option value="NIC">NICARAGUA</option>
                            <option value="NIR">NÍGER</option>
                            <option value="NRA">NIGERIA</option>
                            <option value="NORW">NORUEGA</option>
                            <option value="OMAN">OMÁN</option>
                            <option value="PKST">PAKISTÁN</option>
                            <option value="PALA">PALAU</option>
                            <option value="PAL">AUTORIDAD PALESTINA</option>
                            <option value="PAN">PANAMÁ</option>
                            <option value="PNG">PAPÚA NUEVA GUINEA</option>
                            <option value="PARA">PARAGUAY</option>
                            <option value="PERU">PERÚ</option>
                            <option value="PHIL">FILIPINAS</option>
                            <option value="PITC">ISLAS PITCAIRN</option>
                            <option value="POL">POLONIA</option>
                            <option value="PORT">PORTUGAL</option>
                            <option value="QTAR">KATAR</option>
                            <option value="ROM">RUMANIA</option>
                            <option value="RUS">RUSIA</option>
                            <option value="RWND">RUANDA</option>
                            <option value="WSAM">SAMOA</option>
                            <option value="SMAR">SAN MARINO</option>
                            <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                            <option value="SARB">ARABIA SAUDITA</option>
                            <option value="SENG">SENEGAL</option>
                            <option value="SBA">SERBIA</option>
                            <option value="SEYC">SEYCHELLES</option>
                            <option value="SLEO">SIERRA LEONA</option>
                            <option value="SING">SINGAPUR</option>
                            <option value="SVK">ESLOVAQUIA</option>
                            <option value="SVN">ESLOVENIA</option>
                            <option value="SLMN">ISLAS SALOMÓN</option>
                            <option value="SOMA">SOMALIA</option>
                            <option value="SAFR">SUDÁFRICA</option>
                            <option value="SSDN">SUDÁN DEL SUR</option>
                            <option value="SPN">ESPAÑA</option>
                            <option value="SRL">SRI LANKA</option>
                            <option value="SHEL">CALLE. ELENA</option>
                            <option value="STCN">CALLE. Kitts y Nevis</option>
                            <option value="SLCA">CALLE. LUCÍA</option>
                            <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                            <option value="XXX">APÁTRIDA</option>
                            <option value="SUDA">SUDÁN</option>
                            <option value="SURM">SURINAME</option>
                            <option value="SWDN">SUECIA</option>
                            <option value="SWTZ">SUIZA</option>
                            <option value="SYR">SIRIA</option>
                            <option value="TWAN">TAIWÁN</option>
                            <option value="TJK">TAYIKISTÁN</option>
                            <option value="TAZN">TANZANIA</option>
                            <option value="THAI">TAILANDIA</option>
                            <option value="TMOR">TIMOR-LESTE</option>
                            <option value="TOGO">IR</option>
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
                            <option value="URU">URUGUAY</option>
                            <option value="UZB">UZBEKISTÁN</option>
                            <option value="VANU">VANUATU</option>
                            <option value="VENZ">VENEZUELA</option>
                            <option value="VTNM">VIETNAM</option>
                            <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                            <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                            <option value="SSAH">SAHARA OCCIDENTAL</option>
                            <option value="YEM">YEMEN</option>
                            <option value="ZAMB">ZAMBIA</option>
                            <option value="ZIMB">ZIMBABUE</option>
                        </select>
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_city">CIUDAD DE NACIMIENTO PAREJA:</label>
                        <input type="text" class="form-card__input" name="couple_city" placeholder="Ciudad de nacimiento" value="${usuarioData.ciudad_nacimiento || ''}">
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_place">LUGAR DE NACIMIENTO PAREJA:</label>
                        <select class="form-card__input" name="couple_place" id="couple_place" cod_couple_place="${usuarioData.lugar_nacimiento}">
                            <option disabled value="">- SELECCIONE UNO -</option>
                            <option value="AFGH">AFGANISTÁN</option>
                            <option value="ALB">ALBANIA</option>
                            <option value="ALGR">ARGELIA</option>
                            <option value="ANDO">ANDORRA</option>
                            <option value="ANGL">ANGOLA</option>
                            <option value="ANGU">ANGUILA</option>
                            <option value="ANTI">ANTIGUA Y BARBUDA</option>
                            <option value="ARG">ARGENTINA</option>
                            <option value="ARM">ARMENIA</option>
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
                            <option value="BENN">BENÍN</option>
                            <option value="BERM">ISLAS BERMUDAS</option>
                            <option value="BHU">BUTÁN</option>
                            <option value="BOL">BOLIVIA</option>
                            <option value="BIH">BOSNIA-HERZEGOVINA</option>
                            <option value="BOT">BOTSUANA</option>
                            <option value="BRZL">BRASIL</option>
                            <option value="BRNI">BRUNEI</option>
                            <option value="BULG">BULGARIA</option>
                            <option value="BURK">BURKINA FASO</option>
                            <option value="BURM">BIRMANIA</option>
                            <option value="BRND">BURUNDI</option>
                            <option value="CBDA">CAMBOYA</option>
                            <option value="CMRN">CAMERÚN</option>
                            <option value="CAN">CANADÁ</option>
                            <option value="CAVI">CABO VERDE</option>
                            <option value="CAYI">ISLAS CAIMÁN</option>
                            <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                            <option value="CHAD">CHAD</option>
                            <option value="CHIL">CHILE</option>
                            <option value="CHIN">PORCELANA</option>
                            <option value="COL">COLOMBIA</option>
                            <option value="COMO">COMORAS</option>
                            <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                            <option value="CONB">CONGO, REPÚBLICA DEL</option>
                            <option value="CSTR">COSTA RICA</option>
                            <option value="IVCO">COSTA DE MARFIL</option>
                            <option value="HRV">CROACIA</option>
                            <option value="CUBA">CUBA</option>
                            <option value="CYPR">CHIPRE</option>
                            <option value="CZEC">REPÚBLICA CHECA</option>
                            <option value="DEN">DINAMARCA</option>
                            <option value="DJI">Djibouti</option>
                            <option value="DOMN">DOMINICA</option>
                            <option value="DOMR">REPÚBLICA DOMINICANA</option>
                            <option value="ECUA">ECUADOR</option>
                            <option value="EGYP">EGIPTO</option>
                            <option value="ELSL">EL SALVADOR</option>
                            <option value="EGN">GUINEA ECUATORIAL</option>
                            <option value="ERI">ERITREA</option>
                            <option value="EST">ESTONIA</option>
                            <option value="SZLD">ESWATINÍ</option>
                            <option value="ETH">ETIOPÍA</option>
                            <option value="FIJI">FIJI</option>
                            <option value="FIN">FINLANDIA</option>
                            <option value="FRAN">FRANCIA</option>
                            <option value="GABN">GABÓN</option>
                            <option value="GAM">GAMBIA, EL</option>
                            <option value="GEO">GEORGIA</option>
                            <option value="GER">ALEMANIA</option>
                            <option value="GHAN">GHANA</option>
                            <option value="GIB">GIBRALTAR</option>
                            <option value="GRC">GRECIA</option>
                            <option value="GREN">GRANADA</option>
                            <option value="GUAT">GUATEMALA</option>
                            <option value="GNEA">GUINEA</option>
                            <option value="GUIB">GUINEA - BISSAU</option>
                            <option value="GUY">GUAYANA</option>
                            <option value="HAT">HAITÍ</option>
                            <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                            <option value="HOND">HONDURAS</option>
                            <option value="HOKO">BNO DE HONG KONG</option>
                            <option value="HNK">RAE DE HONG KONG</option>
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
                            <option value="JORD">JORDÁN</option>
                            <option value="KAZ">KAZAJSTÁN</option>
                            <option value="KENY">KENIA</option>
                            <option value="KIRI">KIRIBATI</option>
                            <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                            <option value="LCHT">LIECHTENSTEIN</option>
                            <option value="LITH">LITUANIA</option>
                            <option value="LXM">LUXEMBURGO</option>
                            <option value="MAC">MACAO</option>
                            <option value="MKD">MACEDONIA, NORTE</option>
                            <option value="MADG">MADAGASCAR</option>
                            <option value="MALW">MALAUI</option>
                            <option value="MLAS">MALASIA</option>
                            <option value="MLDV">MALDIVAS</option>
                            <option value="MALI">MALÍ</option>
                            <option value="MLTA">MALTA</option>
                            <option value="RMI">ISLAS MARSHALL</option>
                            <option value="MAUR">MAURITANIA</option>
                            <option value="MRTS">MAURICIO</option>
                            <option value="MEX">MÉXICO</option>
                            <option value="FSM">MICRONESIA</option>
                            <option value="MLD">MOLDAVIA</option>
                            <option value="MON">MÓNACO</option>
                            <option value="MONG">MONGOLIA</option>
                            <option value="MTG">MONTENEGRO</option>
                            <option value="MONT">MONTSERRAT</option>
                            <option value="MORO">MARRUECOS</option>
                            <option value="MOZ">MOZAMBIQUE</option>
                            <option value="NAMB">NAMIBIA</option>
                            <option value="NAU">NAURÚ</option>
                            <option value="NEP">NEPAL</option>
                            <option value="NETH">PAÍSES BAJOS</option>
                            <option value="NZLD">NUEVA ZELANDA</option>
                            <option value="NIC">NICARAGUA</option>
                            <option value="NIR">NÍGER</option>
                            <option value="NRA">NIGERIA</option>
                            <option value="NORW">NORUEGA</option>
                            <option value="OMAN">OMÁN</option>
                            <option value="PKST">PAKISTÁN</option>
                            <option value="PALA">PALAU</option>
                            <option value="PAL">AUTORIDAD PALESTINA</option>
                            <option value="PAN">PANAMÁ</option>
                            <option value="PNG">PAPÚA NUEVA GUINEA</option>
                            <option value="PARA">PARAGUAY</option>
                            <option value="PERU">PERÚ</option>
                            <option value="PHIL">FILIPINAS</option>
                            <option value="PITC">ISLAS PITCAIRN</option>
                            <option value="POL">POLONIA</option>
                            <option value="PORT">PORTUGAL</option>
                            <option value="QTAR">KATAR</option>
                            <option value="ROM">RUMANIA</option>
                            <option value="RUS">RUSIA</option>
                            <option value="RWND">RUANDA</option>
                            <option value="WSAM">SAMOA</option>
                            <option value="SMAR">SAN MARINO</option>
                            <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                            <option value="SARB">ARABIA SAUDITA</option>
                            <option value="SENG">SENEGAL</option>
                            <option value="SBA">SERBIA</option>
                            <option value="SEYC">SEYCHELLES</option>
                            <option value="SLEO">SIERRA LEONA</option>
                            <option value="SING">SINGAPUR</option>
                            <option value="SVK">ESLOVAQUIA</option>
                            <option value="SVN">ESLOVENIA</option>
                            <option value="SLMN">ISLAS SALOMÓN</option>
                            <option value="SOMA">SOMALIA</option>
                            <option value="SAFR">SUDÁFRICA</option>
                            <option value="SSDN">SUDÁN DEL SUR</option>
                            <option value="SPN">ESPAÑA</option>
                            <option value="SRL">SRI LANKA</option>
                            <option value="SHEL">CALLE. ELENA</option>
                            <option value="STCN">CALLE. Kitts y Nevis</option>
                            <option value="SLCA">CALLE. LUCÍA</option>
                            <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                            <option value="XXX">APÁTRIDA</option>
                            <option value="SUDA">SUDÁN</option>
                            <option value="SURM">SURINAME</option>
                            <option value="SWDN">SUECIA</option>
                            <option value="SWTZ">SUIZA</option>
                            <option value="SYR">SIRIA</option>
                            <option value="TWAN">TAIWÁN</option>
                            <option value="TJK">TAYIKISTÁN</option>
                            <option value="TAZN">TANZANIA</option>
                            <option value="THAI">TAILANDIA</option>
                            <option value="TMOR">TIMOR-LESTE</option>
                            <option value="TOGO">IR</option>
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
                            <option value="URU">URUGUAY</option>
                            <option value="UZB">UZBEKISTÁN</option>
                            <option value="VANU">VANUATU</option>
                            <option value="VENZ">VENEZUELA</option>
                            <option value="VTNM">VIETNAM</option>
                            <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                            <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                            <option value="SSAH">SAHARA OCCIDENTAL</option>
                            <option value="YEM">YEMEN</option>
                            <option value="ZAMB">ZAMBIA</option>
                            <option value="ZIMB">ZIMBABUE</option>
                        </select>
                    </div>
                    <div class="form-card__group">
                        <label class="form-card__label" for="couple_address_select">DIRECCION DE LA PAREJA:</label>
                        <select class="form-card__input" name="couple_address_select" id="couple_address_select" cod_couple_address_select="${usuarioData.direccion_select}">
                            <option disabled value="">- SELECCIONE UNO -</option>
                            <option value="H">IGUAL QUE LA DIRECCIÓN DE CASA</option>
                            <option value="M">LA MISMA QUE MI DIRECCION DE CORREO</option>
                            <option value="U">IGUAL QUE LA DIRECCIÓN DE CONTACTO DE EE. UU.</option>
                            <option value="D">NO LO SÉ</option>
                            <option value="O">OTRO (ESPECIFICAR DIRECCIÓN)</option>
                        </select>
                    </div>
                    <div id="couple_address_details" style="display: none;">
                        <div class="form-card__group">
                            <label class="form-card__label" for="couple_address">DIRECCIÓN PAREJA:</label>
                            <input type="text" class="form-card__input" name="couple_address" placeholder="Dirección" value="${usuarioData.direccion || ''}">
                        </div>
                        <div class="form-card__group">
                            <label class="form-card__label">CIUDAD PAREJA:</label>
                            <input type="text" class="form-card__input" name="partner_city" placeholder="Ciudad" value="${usuarioData.ciudad || ''}">
                        </div>
                        <div class="form-card__group">
                            <label class="form-card__label" for="couple_state">ESTADO PAREJA:</label>
                            <input type="text" class="form-card__input" name="couple_state" placeholder="Estado (puede no aplicar)" value="${usuarioData.estado || ''}">
                        </div>
                        <div class="form-card__group">
                            <label class="form-card__label" for="couple_postal">CÓDIGO POSTAL PAREJA:</label>
                            <input type="text" class="form-card__input" name="couple_postal" placeholder="Código postal (puede no aplicar)" value="${usuarioData.postal || ''}">
                        </div>
                        <div class="form-card__group">
                            <label class="form-card__label" for="couple_country">PAÍS PAREJA:</label>
                            <select class="form-card__input" name="couple_country" id="couple_country" cod_couple_country="${usuarioData.pais}">
                                <option disabled value="">- SELECCIONE UNO -</option>
                                <option value="AFGH">AFGANISTÁN</option>
                                <option value="ALB">ALBANIA</option>
                                <option value="ALGR">ARGELIA</option>
                                <option value="ASMO">SAMOA AMERICANA</option>
                                <option value="ANDO">ANDORRA</option>
                                <option value="ANGL">ANGOLA</option>
                                <option value="ANGU">ANGUILA</option>
                                <option value="ANTI">ANTIGUA Y BARBUDA</option>
                                <option value="ARG">ARGENTINA</option>
                                <option value="ARM">ARMENIA</option>
                                <option value="ARB">ARUBA</option>
                                <option value="XAS">EN EL MAR</option>
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
                                <option value="BENN">BENÍN</option>
                                <option value="BERM">ISLAS BERMUDAS</option>
                                <option value="BHU">BUTÁN</option>
                                <option value="BOL">BOLIVIA</option>
                                <option value="BON">BONAIRE</option>
                                <option value="BIH">BOSNIA-HERZEGOVINA</option>
                                <option value="BOT">BOTSUANA</option>
                                <option value="BRZL">BRASIL</option>
                                <option value="IOT">TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO</option>
                                <option value="BRNI">BRUNEI</option>
                                <option value="BULG">BULGARIA</option>
                                <option value="BURK">BURKINA FASO</option>
                                <option value="BURM">BIRMANIA</option>
                                <option value="BRND">BURUNDI</option>
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
                                <option value="CUR">CURACAO</option>
                                <option value="CYPR">CHIPRE</option>
                                <option value="CZEC">REPÚBLICA CHECA</option>
                                <option value="DEN">DINAMARCA</option>
                                <option value="DJI">Djibouti</option>
                                <option value="DOMN">DOMINICA</option>
                                <option value="DOMR">REPÚBLICA DOMINICANA</option>
                                <option value="ECUA">ECUADOR</option>
                                <option value="EGYP">EGIPTO</option>
                                <option value="ELSL">EL SALVADOR</option>
                                <option value="EGN">GUINEA ECUATORIAL</option>
                                <option value="ERI">ERITREA</option>
                                <option value="EST">ESTONIA</option>
                                <option value="SZLD">ESWATINÍ</option>
                                <option value="ETH">ETIOPÍA</option>
                                <option value="FKLI">ISLAS MALVINAS</option>
                                <option value="FRO">ISLAS FAROE</option>
                                <option value="FIJI">FIJI</option>
                                <option value="FIN">FINLANDIA</option>
                                <option value="FRAN">FRANCIA</option>
                                <option value="FRGN">GUAYANA FRANCESA</option>
                                <option value="FPOL">POLINESIA FRANCÉS</option>
                                <option value="FSAT">TERRITORIOS FRANCESES DEL SUR Y ANTÁRTICOS</option>
                                <option value="GABN">GABÓN</option>
                                <option value="GAM">GAMBIA, EL</option>
                                <option value="XGZ">FRANJA DE GAZA</option>
                                <option value="GEO">GEORGIA</option>
                                <option value="GER">ALEMANIA</option>
                                <option value="GHAN">GHANA</option>
                                <option value="GIB">GIBRALTAR</option>
                                <option value="GRC">GRECIA</option>
                                <option value="GRLD">GROENLANDIA</option>
                                <option value="GREN">GRANADA</option>
                                <option value="GUAD">GUADALUPE</option>
                                <option value="GUAM">GUAM</option>
                                <option value="GUAT">GUATEMALA</option>
                                <option value="GNEA">GUINEA</option>
                                <option value="GUIB">GUINEA - BISSAU</option>
                                <option value="GUY">GUAYANA</option>
                                <option value="HAT">HAITÍ</option>
                                <option value="HMD">ISLAS HEARD Y MCDONALD</option>
                                <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                                <option value="HOND">HONDURAS</option>
                                <option value="HOKO">BNO DE HONG KONG</option>
                                <option value="HNK">RAE DE HONG KONG</option>
                                <option value="XHI">ISLA DE HOWLAND</option>
                                <option value="HUNG">HUNGRÍA</option>
                                <option value="ICLD">ISLANDIA</option>
                                <option value="XIR">EN EL AIRE</option>
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
                                <option value="KIRI">KIRIBATI</option>
                                <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                                <option value="LCHT">LIECHTENSTEIN</option>
                                <option value="LITH">LITUANIA</option>
                                <option value="LXM">LUXEMBURGO</option>
                                <option value="MAC">MACAO</option>
                                <option value="MKD">MACEDONIA, NORTE</option>
                                <option value="MADG">MADAGASCAR</option>
                                <option value="MALW">MALAUI</option>
                                <option value="MLAS">MALASIA</option>
                                <option value="MLDI">ISLA MALDEN</option>
                                <option value="MLDV">MALDIVAS</option>
                                <option value="MALI">MALÍ</option>
                                <option value="MLTA">MALTA</option>
                                <option value="RMI">ISLAS MARSHALL</option>
                                <option value="MART">MARTINICA</option>
                                <option value="MAUR">MAURITANIA</option>
                                <option value="MRTS">MAURICIO</option>
                                <option value="MYT">MAYOTTE</option>
                                <option value="AGS">MÉXICO - AGUASCALIENTES</option>
                                <option value="BC">MÉXICO - BAJA CALIFORNIA NORTE</option>
                                <option value="BCSR">MÉXICO - BAJA CALIFORNIA SUR</option>
                                <option value="CAMP">MÉXICO - CAMPECHE</option>
                                <option value="CHIS">MÉXICO - CHIAPAS</option>
                                <option value="CHIH">MÉXICO - CHIHUAHUA</option>
                                <option value="COAH">MÉXICO - COAHUILA</option>
                                <option value="COLI">MÉXICO - COLIMA</option>
                                <option value="DF">MÉXICO - DISTRITO FEDERAL</option>
                                <option value="DGO">MÉXICO - DURANGO</option>
                                <option value="GTO">MÉXICO - GUANAJUATO</option>
                                <option value="GRO">MÉXICO - GUERRERO</option>
                                <option value="HGO">MÉXICO - HIDALGO</option>
                                <option value="JAL">MÉXICO - JALISCO</option>
                                <option value="MCH">MÉXICO - MICHOACAN</option>
                                <option value="MOR">MÉXICO - MORELOS</option>
                                <option value="NAY">MÉXICO - NAYARIT</option>
                                <option value="NL">MÉXICO - NUEVO LEÓN</option>
                                <option value="OAX">MÉXICO - OAXACA</option>
                                <option value="PUE">MÉXICO - PUEBLA</option>
                                <option value="QRO">MÉXICO - QUERÉTARO</option>
                                <option value="QROO">MÉXICO - QUINTANA ROO</option>
                                <option value="SLP">MÉXICO - SAN LUIS POTOSI</option>
                                <option value="SIN">MÉXICO - SINALOA</option>
                                <option value="SON">MÉXICO - SONORA</option>
                                <option value="MXCO">MÉXICO - ESTADO DE MÉXICO</option>
                                <option value="TAB">MÉXICO - TABASCO</option>
                                <option value="TAMP">MÉXICO - TAMAULIPAS</option>
                                <option value="TLAX">MÉXICO - TLAXCALA</option>
                                <option value="VER">MÉXICO - VERACRUZ</option>
                                <option value="YUC">MÉXICO - YUCATAN</option>
                                <option value="ZAC">MÉXICO - ZACATECAS</option>
                                <option value="FSM">MICRONESIA</option>
                                <option value="MDWI">ISLAS MIDWAY</option>
                                <option value="MLD">MOLDAVIA</option>
                                <option value="MON">MÓNACO</option>
                                <option value="MONG">MONGOLIA</option>
                                <option value="MTG">MONTENEGRO</option>
                                <option value="MONT">MONTSERRAT</option>
                                <option value="MORO">MARRUECOS</option>
                                <option value="MOZ">MOZAMBIQUE</option>
                                <option value="NAMB">NAMIBIA</option>
                                <option value="NAU">NAURÚ</option>
                                <option value="NEP">NEPAL</option>
                                <option value="NETH">PAÍSES BAJOS</option>
                                <option value="NCAL">NUEVA CALEDONIA</option>
                                <option value="NZLD">NUEVA ZELANDA</option>
                                <option value="NIC">NICARAGUA</option>
                                <option value="NIR">NÍGER</option>
                                <option value="NRA">NIGERIA</option>
                                <option value="NIUE">NIUE</option>
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
                                <option value="STM">SAN MARTIN</option>
                                <option value="SVK">ESLOVAQUIA</option>
                                <option value="SVN">ESLOVENIA</option>
                                <option value="SLMN">ISLAS SALOMÓN</option>
                                <option value="SOMA">SOMALIA</option>
                                <option value="SAFR">SUDÁFRICA</option>
                                <option value="SGS">GEORGIA DEL SUR Y LA ISLA SANDWICH DEL SUR</option>
                                <option value="SSDN">SUDÁN DEL SUR</option>
                                <option value="SPN">ESPAÑA</option>
                                <option value="SRL">SRI LANKA</option>
                                <option value="STBR">CALLE. BARTHELEMY</option>
                                <option value="STEU">CALLE. EUSTACIO</option>
                                <option value="SHEL">CALLE. ELENA</option>
                                <option value="STCN">CALLE. Kitts y Nevis</option>
                                <option value="SLCA">CALLE. LUCÍA</option>
                                <option value="SPMI">CALLE. PIERRE Y MIQUELÓN</option>
                                <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                                <option value="SUDA">SUDÁN</option>
                                <option value="SURM">SURINAME</option>
                                <option value="SJM">SVALBARD</option>
                                <option value="SWDN">SUECIA</option>
                                <option value="SWTZ">SUIZA</option>
                                <option value="SYR">SIRIA</option>
                                <option value="TWAN">TAIWÁN</option>
                                <option value="TJK">TAYIKISTÁN</option>
                                <option value="TAZN">TANZANIA</option>
                                <option value="THAI">TAILANDIA</option>
                                <option value="TMOR">TIMOR-LESTE</option>
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
                                <option value="VANU">VANUATU</option>
                                <option value="VENZ">VENEZUELA</option>
                                <option value="VTNM">VIETNAM</option>
                                <option value="VI">ISLAS VÍRGENES (EE.UU.)</option>
                                <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                                <option value="WKI">ISLA DESPERTAR</option>
                                <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                                <option value="XWB">BANCO OESTE</option>
                                <option value="SSAH">SAHARA OCCIDENTAL</option>
                                <option value="YEM">YEMEN</option>
                                <option value="ZAMB">ZAMBIA</option>
                                <option value="ZIMB">ZIMBABUE</option>
                            </select>
                        </div>
                    </div>
                    `;
                    function handleAddressVisibility() {
                        var addressSelect = document.getElementById('couple_address_select');
                        var addressDetails = document.getElementById('couple_address_details');
                        if (addressSelect && addressDetails) {
                            if (addressSelect.value === 'O') {
                                addressDetails.style.display = 'block';
                            } else {
                                addressDetails.style.display = 'none';
                            }
                        }
                    }
    
                    // Llamar a la función inmediatamente después de crear los elementos
                    setTimeout(handleAddressVisibility, 0);
    
                    // Añadir evento para cambios futuros
                    var addressSelect = document.getElementById('couple_address_select');
                    if (addressSelect) {
                        addressSelect.addEventListener('change', handleAddressVisibility);
                    }
    
                    // Establecer el valor seleccionado del select
                    if (addressSelect && usuarioData.direccion_select) {
                        addressSelect.value = usuarioData.direccion_select;
                    }
                    var couple_country = document.getElementById("couple_country");
                    var cod_couple_country = couple_country.getAttribute("cod_couple_country");

                    if (cod_couple_country=="null") {
                        couple_country.selectedIndex = 0;
                    } else {
                        couple_country.value = cod_couple_country;
                    }
    
                    break;
            case 'D': // DIVORCIADO - PUEDEN HABER VARIOS
                addDivorceButton.style.display = 'inline-block';
                let divorceContainer = document.createElement('div');
                divorceContainer.id = 'divorceContainer';
                dynamicContent.appendChild(divorceContainer);
                generateDivorceFields();
                break;
            case 'S': // SOLTERO
            default:
                break;
        }
    }

    function generateDivorceFields() {
        dynamicContent.innerHTML = '';
    
        if (divorcios.length === 0) {
            divorcios.push({}); // Añadir un objeto vacío si no hay divorcios
        }
    
        divorcios.forEach((divorcio, index) => {
            const divorceFields = createDivorceFields(divorcio, index);
            dynamicContent.appendChild(divorceFields);
        });
    
        updateRemoveButton();
        
        // Añadir los botones después de los campos de divorcio
        dynamicContent.appendChild(addDivorceButton);
        dynamicContent.appendChild(removeDivorceButton);
    }

    
    // Función para actualizar el botón de eliminar
    function updateRemoveButton() {
        removeDivorceButton.style.display = divorcios.length > 1 ? 'inline-block' : 'none';
    }
    
    // Función para añadir un nuevo divorcio
    function addDivorceField() {
        const newIndex = divorcios.length;
        divorcios.push({});
        const newDivorceFields = createDivorceFields({}, newIndex);
        dynamicContent.insertBefore(newDivorceFields, addDivorceButton);
        updateRemoveButton();
    }
    
    // Función para eliminar el último divorcio
    function removeLastDivorceField() {
        if (divorcios.length > 1) {
            divorcios.pop();
            generateDivorceFields();
        }
    }
    
    // Event Listeners
    selectElementCivilStatus.addEventListener('change', function() {
        generateDynamicContent(this.value);
    });
    
    addDivorceButton.addEventListener('click', addDivorceField);
    removeDivorceButton.addEventListener('click', removeLastDivorceField);


    function createDivorceFields(divorcio, index) {
        const divorceFields = document.createElement('div');
        divorceFields.classList.add('divorce-group');
        divorceFields.dataset.index = index;
    

        divorceFields.innerHTML = `
            <h3>Divorcio ${index + 1}</h3>
            <div class="form-card__group">
                <label class="form-card__label" for="divorce_names_${index+1}">NOMBRES:</label>
                <input type="text" class="form-card__input" id="divorce_names_${index+1}" name="divorce_names_${index+1}" value="${divorcio.NOMBRES || ''}">
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_surnames_${index+1}">APELLIDOS:</label>
                <input type="text" class="form-card__input" id="divorce_surnames_${index+1}" name="divorce_surnames_${index+1}" value="${divorcio.APELLIDOS || ''}">
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_birthdate_${index+1}">FECHA DE NACIMIENTO:</label>
                <input class="form-card__input" type="date" id="divorce_birthdate_${index+1}" name="divorce_birthdate_${index+1}" value="${divorcio.FECHA_NACIMIENTO || ''}"/>
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_country_nacionality_${index+1}">PAÍS DE NACIONALIDAD:</label>
                <select class="form-card__input" id="divorce_country_nacionality_${index+1}" name="divorce_country_nacionality_${index+1}" cod_divorce_country_nacionality_${index+1}="${divorcio.PAIS_NACIONALIDAD || ''}">

                    <option disabled value="">- SELECCIONE UNO -</option>
                    <option value="AFGH">AFGANISTÁN</option>
                    <option value="ALB">ALBANIA</option>
                    <option value="ALGR">ARGELIA</option>
                    <option value="ANDO">ANDORRA</option>
                    <option value="ANGL">ANGOLA</option>
                    <option value="ANGU">ANGUILA</option>
                    <option value="ANTI">ANTIGUA Y BARBUDA</option>
                    <option value="ARG">ARGENTINA</option>
                    <option value="ARM">ARMENIA</option>
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
                    <option value="BENN">BENÍN</option>
                    <option value="BERM">ISLAS BERMUDAS</option>
                    <option value="BHU">BUTÁN</option>
                    <option value="BOL">BOLIVIA</option>
                    <option value="BIH">BOSNIA-HERZEGOVINA</option>
                    <option value="BOT">BOTSUANA</option>
                    <option value="BRZL">BRASIL</option>
                    <option value="BRNI">BRUNEI</option>
                    <option value="BULG">BULGARIA</option>
                    <option value="BURK">BURKINA FASO</option>
                    <option value="BURM">BIRMANIA</option>
                    <option value="BRND">BURUNDI</option>
                    <option value="CBDA">CAMBOYA</option>
                    <option value="CMRN">CAMERÚN</option>
                    <option value="CAN">CANADÁ</option>
                    <option value="CAVI">CABO VERDE</option>
                    <option value="CAYI">ISLAS CAIMÁN</option>
                    <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                    <option value="CHAD">CHAD</option>
                    <option value="CHIL">CHILE</option>
                    <option value="CHIN">PORCELANA</option>
                    <option value="COL">COLOMBIA</option>
                    <option value="COMO">COMORAS</option>
                    <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                    <option value="CONB">CONGO, REPÚBLICA DEL</option>
                    <option value="CSTR">COSTA RICA</option>
                    <option value="IVCO">COSTA DE MARFIL</option>
                    <option value="HRV">CROACIA</option>
                    <option value="CUBA">CUBA</option>
                    <option value="CYPR">CHIPRE</option>
                    <option value="CZEC">REPÚBLICA CHECA</option>
                    <option value="DEN">DINAMARCA</option>
                    <option value="DJI">Djibouti</option>
                    <option value="DOMN">DOMINICA</option>
                    <option value="DOMR">REPÚBLICA DOMINICANA</option>
                    <option value="ECUA">ECUADOR</option>
                    <option value="EGYP">EGIPTO</option>
                    <option value="ELSL">EL SALVADOR</option>
                    <option value="EGN">GUINEA ECUATORIAL</option>
                    <option value="ERI">ERITREA</option>
                    <option value="EST">ESTONIA</option>
                    <option value="SZLD">ESWATINÍ</option>
                    <option value="ETH">ETIOPÍA</option>
                    <option value="FIJI">FIJI</option>
                    <option value="FIN">FINLANDIA</option>
                    <option value="FRAN">FRANCIA</option>
                    <option value="GABN">GABÓN</option>
                    <option value="GAM">GAMBIA, EL</option>
                    <option value="GEO">GEORGIA</option>
                    <option value="GER">ALEMANIA</option>
                    <option value="GHAN">GHANA</option>
                    <option value="GIB">GIBRALTAR</option>
                    <option value="GRC">GRECIA</option>
                    <option value="GREN">GRANADA</option>
                    <option value="GUAT">GUATEMALA</option>
                    <option value="GNEA">GUINEA</option>
                    <option value="GUIB">GUINEA - BISSAU</option>
                    <option value="GUY">GUAYANA</option>
                    <option value="HAT">HAITÍ</option>
                    <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                    <option value="HOND">HONDURAS</option>
                    <option value="HOKO">BNO DE HONG KONG</option>
                    <option value="HNK">RAE DE HONG KONG</option>
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
                    <option value="JORD">JORDÁN</option>
                    <option value="KAZ">KAZAJSTÁN</option>
                    <option value="KENY">KENIA</option>
                    <option value="KIRI">KIRIBATI</option>
                    <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                    <option value="LCHT">LIECHTENSTEIN</option>
                    <option value="LITH">LITUANIA</option>
                    <option value="LXM">LUXEMBURGO</option>
                    <option value="MAC">MACAO</option>
                    <option value="MKD">MACEDONIA, NORTE</option>
                    <option value="MADG">MADAGASCAR</option>
                    <option value="MALW">MALAUI</option>
                    <option value="MLAS">MALASIA</option>
                    <option value="MLDV">MALDIVAS</option>
                    <option value="MALI">MALÍ</option>
                    <option value="MLTA">MALTA</option>
                    <option value="RMI">ISLAS MARSHALL</option>
                    <option value="MAUR">MAURITANIA</option>
                    <option value="MRTS">MAURICIO</option>
                    <option value="MEX">MÉXICO</option>
                    <option value="FSM">MICRONESIA</option>
                    <option value="MLD">MOLDAVIA</option>
                    <option value="MON">MÓNACO</option>
                    <option value="MONG">MONGOLIA</option>
                    <option value="MTG">MONTENEGRO</option>
                    <option value="MONT">MONTSERRAT</option>
                    <option value="MORO">MARRUECOS</option>
                    <option value="MOZ">MOZAMBIQUE</option>
                    <option value="NAMB">NAMIBIA</option>
                    <option value="NAU">NAURÚ</option>
                    <option value="NEP">NEPAL</option>
                    <option value="NETH">PAÍSES BAJOS</option>
                    <option value="NZLD">NUEVA ZELANDA</option>
                    <option value="NIC">NICARAGUA</option>
                    <option value="NIR">NÍGER</option>
                    <option value="NRA">NIGERIA</option>
                    <option value="NORW">NORUEGA</option>
                    <option value="OMAN">OMÁN</option>
                    <option value="PKST">PAKISTÁN</option>
                    <option value="PALA">PALAU</option>
                    <option value="PAL">AUTORIDAD PALESTINA</option>
                    <option value="PAN">PANAMÁ</option>
                    <option value="PNG">PAPÚA NUEVA GUINEA</option>
                    <option value="PARA">PARAGUAY</option>
                    <option value="PERU">PERÚ</option>
                    <option value="PHIL">FILIPINAS</option>
                    <option value="PITC">ISLAS PITCAIRN</option>
                    <option value="POL">POLONIA</option>
                    <option value="PORT">PORTUGAL</option>
                    <option value="QTAR">KATAR</option>
                    <option value="ROM">RUMANIA</option>
                    <option value="RUS">RUSIA</option>
                    <option value="RWND">RUANDA</option>
                    <option value="WSAM">SAMOA</option>
                    <option value="SMAR">SAN MARINO</option>
                    <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                    <option value="SARB">ARABIA SAUDITA</option>
                    <option value="SENG">SENEGAL</option>
                    <option value="SBA">SERBIA</option>
                    <option value="SEYC">SEYCHELLES</option>
                    <option value="SLEO">SIERRA LEONA</option>
                    <option value="SING">SINGAPUR</option>
                    <option value="SVK">ESLOVAQUIA</option>
                    <option value="SVN">ESLOVENIA</option>
                    <option value="SLMN">ISLAS SALOMÓN</option>
                    <option value="SOMA">SOMALIA</option>
                    <option value="SAFR">SUDÁFRICA</option>
                    <option value="SSDN">SUDÁN DEL SUR</option>
                    <option value="SPN">ESPAÑA</option>
                    <option value="SRL">SRI LANKA</option>
                    <option value="SHEL">CALLE. ELENA</option>
                    <option value="STCN">CALLE. Kitts y Nevis</option>
                    <option value="SLCA">CALLE. LUCÍA</option>
                    <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                    <option value="XXX">APÁTRIDA</option>
                    <option value="SUDA">SUDÁN</option>
                    <option value="SURM">SURINAME</option>
                    <option value="SWDN">SUECIA</option>
                    <option value="SWTZ">SUIZA</option>
                    <option value="SYR">SIRIA</option>
                    <option value="TWAN">TAIWÁN</option>
                    <option value="TJK">TAYIKISTÁN</option>
                    <option value="TAZN">TANZANIA</option>
                    <option value="THAI">TAILANDIA</option>
                    <option value="TMOR">TIMOR-LESTE</option>
                    <option value="TOGO">IR</option>
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
                    <option value="URU">URUGUAY</option>
                    <option value="UZB">UZBEKISTÁN</option>
                    <option value="VANU">VANUATU</option>
                    <option value="VENZ">VENEZUELA</option>
                    <option value="VTNM">VIETNAM</option>
                    <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                    <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                    <option value="SSAH">SAHARA OCCIDENTAL</option>
                    <option value="YEM">YEMEN</option>
                    <option value="ZAMB">ZAMBIA</option>
                    <option value="ZIMB">ZIMBABUE</option>
                </select>
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_city_${index+1}">CIUDAD NACIMIENTO:</label>
                <input type="text" class="form-card__input" id="divorce_city_${index+1}" name="divorce_city_${index+1}" value="${divorcio.CIUDAD_NACIMIENTO || ''}">
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_country_birth_${index+1}">PAÍS DE NACIMIENTO:</label>
                <select class="form-card__input" id="divorce_country_birth_${index+1}" name="divorce_country_birth_${index+1}" cod_divorce_country_birth_${index+1}="${divorcio.PAIS_NACIMIENTO || ''}">
                    <option selected="selected" value="">- SELECCIONE UNO -</option>
                    <option value="AFGH">AFGANISTÁN</option>
                    <option value="ALB">ALBANIA</option>
                    <option value="ALGR">ARGELIA</option>
                    <option value="ANDO">ANDORRA</option>
                    <option value="ANGL">ANGOLA</option>
                    <option value="ANGU">ANGUILA</option>
                    <option value="ANTI">ANTIGUA Y BARBUDA</option>
                    <option value="ARG">ARGENTINA</option>
                    <option value="ARM">ARMENIA</option>
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
                    <option value="BENN">BENÍN</option>
                    <option value="BERM">ISLAS BERMUDAS</option>
                    <option value="BHU">BUTÁN</option>
                    <option value="BOL">BOLIVIA</option>
                    <option value="BIH">BOSNIA-HERZEGOVINA</option>
                    <option value="BOT">BOTSUANA</option>
                    <option value="BRZL">BRASIL</option>
                    <option value="BRNI">BRUNEI</option>
                    <option value="BULG">BULGARIA</option>
                    <option value="BURK">BURKINA FASO</option>
                    <option value="BURM">BIRMANIA</option>
                    <option value="BRND">BURUNDI</option>
                    <option value="CBDA">CAMBOYA</option>
                    <option value="CMRN">CAMERÚN</option>
                    <option value="CAN">CANADÁ</option>
                    <option value="CAVI">CABO VERDE</option>
                    <option value="CAYI">ISLAS CAIMÁN</option>
                    <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                    <option value="CHAD">CHAD</option>
                    <option value="CHIL">CHILE</option>
                    <option value="CHIN">PORCELANA</option>
                    <option value="COL">COLOMBIA</option>
                    <option value="COMO">COMORAS</option>
                    <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                    <option value="CONB">CONGO, REPÚBLICA DEL</option>
                    <option value="CSTR">COSTA RICA</option>
                    <option value="IVCO">COSTA DE MARFIL</option>
                    <option value="HRV">CROACIA</option>
                    <option value="CUBA">CUBA</option>
                    <option value="CYPR">CHIPRE</option>
                    <option value="CZEC">REPÚBLICA CHECA</option>
                    <option value="DEN">DINAMARCA</option>
                    <option value="DJI">Djibouti</option>
                    <option value="DOMN">DOMINICA</option>
                    <option value="DOMR">REPÚBLICA DOMINICANA</option>
                    <option value="ECUA">ECUADOR</option>
                    <option value="EGYP">EGIPTO</option>
                    <option value="ELSL">EL SALVADOR</option>
                    <option value="EGN">GUINEA ECUATORIAL</option>
                    <option value="ERI">ERITREA</option>
                    <option value="EST">ESTONIA</option>
                    <option value="SZLD">ESWATINÍ</option>
                    <option value="ETH">ETIOPÍA</option>
                    <option value="FIJI">FIJI</option>
                    <option value="FIN">FINLANDIA</option>
                    <option value="FRAN">FRANCIA</option>
                    <option value="GABN">GABÓN</option>
                    <option value="GAM">GAMBIA, EL</option>
                    <option value="GEO">GEORGIA</option>
                    <option value="GER">ALEMANIA</option>
                    <option value="GHAN">GHANA</option>
                    <option value="GIB">GIBRALTAR</option>
                    <option value="GRC">GRECIA</option>
                    <option value="GREN">GRANADA</option>
                    <option value="GUAT">GUATEMALA</option>
                    <option value="GNEA">GUINEA</option>
                    <option value="GUIB">GUINEA - BISSAU</option>
                    <option value="GUY">GUAYANA</option>
                    <option value="HAT">HAITÍ</option>
                    <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                    <option value="HOND">HONDURAS</option>
                    <option value="HOKO">BNO DE HONG KONG</option>
                    <option value="HNK">RAE DE HONG KONG</option>
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
                    <option value="JORD">JORDÁN</option>
                    <option value="KAZ">KAZAJSTÁN</option>
                    <option value="KENY">KENIA</option>
                    <option value="KIRI">KIRIBATI</option>
                    <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                    <option value="LCHT">LIECHTENSTEIN</option>
                    <option value="LITH">LITUANIA</option>
                    <option value="LXM">LUXEMBURGO</option>
                    <option value="MAC">MACAO</option>
                    <option value="MKD">MACEDONIA, NORTE</option>
                    <option value="MADG">MADAGASCAR</option>
                    <option value="MALW">MALAUI</option>
                    <option value="MLAS">MALASIA</option>
                    <option value="MLDV">MALDIVAS</option>
                    <option value="MALI">MALÍ</option>
                    <option value="MLTA">MALTA</option>
                    <option value="RMI">ISLAS MARSHALL</option>
                    <option value="MAUR">MAURITANIA</option>
                    <option value="MRTS">MAURICIO</option>
                    <option value="MEX">MÉXICO</option>
                    <option value="FSM">MICRONESIA</option>
                    <option value="MLD">MOLDAVIA</option>
                    <option value="MON">MÓNACO</option>
                    <option value="MONG">MONGOLIA</option>
                    <option value="MTG">MONTENEGRO</option>
                    <option value="MONT">MONTSERRAT</option>
                    <option value="MORO">MARRUECOS</option>
                    <option value="MOZ">MOZAMBIQUE</option>
                    <option value="NAMB">NAMIBIA</option>
                    <option value="NAU">NAURÚ</option>
                    <option value="NEP">NEPAL</option>
                    <option value="NETH">PAÍSES BAJOS</option>
                    <option value="NZLD">NUEVA ZELANDA</option>
                    <option value="NIC">NICARAGUA</option>
                    <option value="NIR">NÍGER</option>
                    <option value="NRA">NIGERIA</option>
                    <option value="NORW">NORUEGA</option>
                    <option value="OMAN">OMÁN</option>
                    <option value="PKST">PAKISTÁN</option>
                    <option value="PALA">PALAU</option>
                    <option value="PAL">AUTORIDAD PALESTINA</option>
                    <option value="PAN">PANAMÁ</option>
                    <option value="PNG">PAPÚA NUEVA GUINEA</option>
                    <option value="PARA">PARAGUAY</option>
                    <option value="PERU">PERÚ</option>
                    <option value="PHIL">FILIPINAS</option>
                    <option value="PITC">ISLAS PITCAIRN</option>
                    <option value="POL">POLONIA</option>
                    <option value="PORT">PORTUGAL</option>
                    <option value="QTAR">KATAR</option>
                    <option value="ROM">RUMANIA</option>
                    <option value="RUS">RUSIA</option>
                    <option value="RWND">RUANDA</option>
                    <option value="WSAM">SAMOA</option>
                    <option value="SMAR">SAN MARINO</option>
                    <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                    <option value="SARB">ARABIA SAUDITA</option>
                    <option value="SENG">SENEGAL</option>
                    <option value="SBA">SERBIA</option>
                    <option value="SEYC">SEYCHELLES</option>
                    <option value="SLEO">SIERRA LEONA</option>
                    <option value="SING">SINGAPUR</option>
                    <option value="SVK">ESLOVAQUIA</option>
                    <option value="SVN">ESLOVENIA</option>
                    <option value="SLMN">ISLAS SALOMÓN</option>
                    <option value="SOMA">SOMALIA</option>
                    <option value="SAFR">SUDÁFRICA</option>
                    <option value="SSDN">SUDÁN DEL SUR</option>
                    <option value="SPN">ESPAÑA</option>
                    <option value="SRL">SRI LANKA</option>
                    <option value="SHEL">CALLE. ELENA</option>
                    <option value="STCN">CALLE. Kitts y Nevis</option>
                    <option value="SLCA">CALLE. LUCÍA</option>
                    <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                    <option value="XXX">APÁTRIDA</option>
                    <option value="SUDA">SUDÁN</option>
                    <option value="SURM">SURINAME</option>
                    <option value="SWDN">SUECIA</option>
                    <option value="SWTZ">SUIZA</option>
                    <option value="SYR">SIRIA</option>
                    <option value="TWAN">TAIWÁN</option>
                    <option value="TJK">TAYIKISTÁN</option>
                    <option value="TAZN">TANZANIA</option>
                    <option value="THAI">TAILANDIA</option>
                    <option value="TMOR">TIMOR-LESTE</option>
                    <option value="TOGO">IR</option>
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
                    <option value="URU">URUGUAY</option>
                    <option value="UZB">UZBEKISTÁN</option>
                    <option value="VANU">VANUATU</option>
                    <option value="VENZ">VENEZUELA</option>
                    <option value="VTNM">VIETNAM</option>
                    <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                    <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                    <option value="SSAH">SAHARA OCCIDENTAL</option>
                    <option value="YEM">YEMEN</option>
                    <option value="ZAMB">ZAMBIA</option>
                    <option value="ZIMB">ZIMBABUE</option>
                </select>
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_start_${index+1}">FECHA DE INICIO MATRIMONIO:</label>
                <input class="form-card__input" type="date" id="divorce_start_${index+1}" name="divorce_start_${index+1}" value="${divorcio.FECHA_INICIO_MATRIMONIO || ''}"/>
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_end_${index+1}">FECHA DE FIN MATRIMONIO:</label>
                <input class="form-card__input" type="date" id="divorce_end_${index+1}" name="divorce_end_${index+1}" value="${divorcio.FECHA_FIN_MATRIMONIO || ''}"/>
            </div>

            <div class="form-card__group">
                <label class="form-card__label" for="divorce_country_divorce_${index+1}">PAÍS DEL DIVORCIO:</label>
                <select class="form-card__input" id="divorce_country_divorce_${index+1}" name="divorce_country_divorce_${index+1}" cod_divorce_country_divorce_${index+1}="${divorcio.PAIS_FINALIZACION || ''}">

                    <option disabled selected value="">- SELECCIONE UNO -</option>
                    <option value="AFGH">AFGANISTÁN</option>
                    <option value="ALB">ALBANIA</option>
                    <option value="ALGR">ARGELIA</option>
                    <option value="ANDO">ANDORRA</option>
                    <option value="ANGL">ANGOLA</option>
                    <option value="ANGU">ANGUILA</option>
                    <option value="ANTI">ANTIGUA Y BARBUDA</option>
                    <option value="ARG">ARGENTINA</option>
                    <option value="ARM">ARMENIA</option>
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
                    <option value="BENN">BENÍN</option>
                    <option value="BERM">ISLAS BERMUDAS</option>
                    <option value="BHU">BUTÁN</option>
                    <option value="BOL">BOLIVIA</option>
                    <option value="BIH">BOSNIA-HERZEGOVINA</option>
                    <option value="BOT">BOTSUANA</option>
                    <option value="BRZL">BRASIL</option>
                    <option value="BRNI">BRUNEI</option>
                    <option value="BULG">BULGARIA</option>
                    <option value="BURK">BURKINA FASO</option>
                    <option value="BURM">BIRMANIA</option>
                    <option value="BRND">BURUNDI</option>
                    <option value="CBDA">CAMBOYA</option>
                    <option value="CMRN">CAMERÚN</option>
                    <option value="CAN">CANADÁ</option>
                    <option value="CAVI">CABO VERDE</option>
                    <option value="CAYI">ISLAS CAIMÁN</option>
                    <option value="CAFR">REPÚBLICA CENTROAFRICANA</option>
                    <option value="CHAD">CHAD</option>
                    <option value="CHIL">CHILE</option>
                    <option value="CHIN">PORCELANA</option>
                    <option value="COL">COLOMBIA</option>
                    <option value="COMO">COMORAS</option>
                    <option value="COD">CONGO, REPÚBLICA DEMOCRÁTICA DEL</option>
                    <option value="CONB">CONGO, REPÚBLICA DEL</option>
                    <option value="CSTR">COSTA RICA</option>
                    <option value="IVCO">COSTA DE MARFIL</option>
                    <option value="HRV">CROACIA</option>
                    <option value="CUBA">CUBA</option>
                    <option value="CYPR">CHIPRE</option>
                    <option value="CZEC">REPÚBLICA CHECA</option>
                    <option value="DEN">DINAMARCA</option>
                    <option value="DJI">Djibouti</option>
                    <option value="DOMN">DOMINICA</option>
                    <option value="DOMR">REPÚBLICA DOMINICANA</option>
                    <option value="ECUA">ECUADOR</option>
                    <option value="EGYP">EGIPTO</option>
                    <option value="ELSL">EL SALVADOR</option>
                    <option value="EGN">GUINEA ECUATORIAL</option>
                    <option value="ERI">ERITREA</option>
                    <option value="EST">ESTONIA</option>
                    <option value="SZLD">ESWATINÍ</option>
                    <option value="ETH">ETIOPÍA</option>
                    <option value="FIJI">FIJI</option>
                    <option value="FIN">FINLANDIA</option>
                    <option value="FRAN">FRANCIA</option>
                    <option value="GABN">GABÓN</option>
                    <option value="GAM">GAMBIA, EL</option>
                    <option value="GEO">GEORGIA</option>
                    <option value="GER">ALEMANIA</option>
                    <option value="GHAN">GHANA</option>
                    <option value="GIB">GIBRALTAR</option>
                    <option value="GRC">GRECIA</option>
                    <option value="GREN">GRANADA</option>
                    <option value="GUAT">GUATEMALA</option>
                    <option value="GNEA">GUINEA</option>
                    <option value="GUIB">GUINEA - BISSAU</option>
                    <option value="GUY">GUAYANA</option>
                    <option value="HAT">HAITÍ</option>
                    <option value="VAT">SANTA SEDE (CIUDAD DEL VATICANO)</option>
                    <option value="HOND">HONDURAS</option>
                    <option value="HOKO">BNO DE HONG KONG</option>
                    <option value="HNK">RAE DE HONG KONG</option>
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
                    <option value="JORD">JORDÁN</option>
                    <option value="KAZ">KAZAJSTÁN</option>
                    <option value="KENY">KENIA</option>
                    <option value="KIRI">KIRIBATI</option>
                    <option value="PRK">COREA, REPÚBLICA DEMOCRÁTICA DEL (NORTE)</option>
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
                    <option value="LCHT">LIECHTENSTEIN</option>
                    <option value="LITH">LITUANIA</option>
                    <option value="LXM">LUXEMBURGO</option>
                    <option value="MAC">MACAO</option>
                    <option value="MKD">MACEDONIA, NORTE</option>
                    <option value="MADG">MADAGASCAR</option>
                    <option value="MALW">MALAUI</option>
                    <option value="MLAS">MALASIA</option>
                    <option value="MLDV">MALDIVAS</option>
                    <option value="MALI">MALÍ</option>
                    <option value="MLTA">MALTA</option>
                    <option value="RMI">ISLAS MARSHALL</option>
                    <option value="MAUR">MAURITANIA</option>
                    <option value="MRTS">MAURICIO</option>
                    <option value="MEX">MÉXICO</option>
                    <option value="FSM">MICRONESIA</option>
                    <option value="MLD">MOLDAVIA</option>
                    <option value="MON">MÓNACO</option>
                    <option value="MONG">MONGOLIA</option>
                    <option value="MTG">MONTENEGRO</option>
                    <option value="MONT">MONTSERRAT</option>
                    <option value="MORO">MARRUECOS</option>
                    <option value="MOZ">MOZAMBIQUE</option>
                    <option value="NAMB">NAMIBIA</option>
                    <option value="NAU">NAURÚ</option>
                    <option value="NEP">NEPAL</option>
                    <option value="NETH">PAÍSES BAJOS</option>
                    <option value="NZLD">NUEVA ZELANDA</option>
                    <option value="NIC">NICARAGUA</option>
                    <option value="NIR">NÍGER</option>
                    <option value="NRA">NIGERIA</option>
                    <option value="NORW">NORUEGA</option>
                    <option value="OMAN">OMÁN</option>
                    <option value="PKST">PAKISTÁN</option>
                    <option value="PALA">PALAU</option>
                    <option value="PAL">AUTORIDAD PALESTINA</option>
                    <option value="PAN">PANAMÁ</option>
                    <option value="PNG">PAPÚA NUEVA GUINEA</option>
                    <option value="PARA">PARAGUAY</option>
                    <option value="PERU">PERÚ</option>
                    <option value="PHIL">FILIPINAS</option>
                    <option value="PITC">ISLAS PITCAIRN</option>
                    <option value="POL">POLONIA</option>
                    <option value="PORT">PORTUGAL</option>
                    <option value="QTAR">KATAR</option>
                    <option value="ROM">RUMANIA</option>
                    <option value="RUS">RUSIA</option>
                    <option value="RWND">RUANDA</option>
                    <option value="WSAM">SAMOA</option>
                    <option value="SMAR">SAN MARINO</option>
                    <option value="STPR">SANTO TOMÉ Y PRÍNCIPE</option>
                    <option value="SARB">ARABIA SAUDITA</option>
                    <option value="SENG">SENEGAL</option>
                    <option value="SBA">SERBIA</option>
                    <option value="SEYC">SEYCHELLES</option>
                    <option value="SLEO">SIERRA LEONA</option>
                    <option value="SING">SINGAPUR</option>
                    <option value="SVK">ESLOVAQUIA</option>
                    <option value="SVN">ESLOVENIA</option>
                    <option value="SLMN">ISLAS SALOMÓN</option>
                    <option value="SOMA">SOMALIA</option>
                    <option value="SAFR">SUDÁFRICA</option>
                    <option value="SSDN">SUDÁN DEL SUR</option>
                    <option value="SPN">ESPAÑA</option>
                    <option value="SRL">SRI LANKA</option>
                    <option value="SHEL">CALLE. ELENA</option>
                    <option value="STCN">CALLE. Kitts y Nevis</option>
                    <option value="SLCA">CALLE. LUCÍA</option>
                    <option value="STVN">CALLE. VICENTE Y LAS GRANADINAS</option>
                    <option value="XXX">APÁTRIDA</option>
                    <option value="SUDA">SUDÁN</option>
                    <option value="SURM">SURINAME</option>
                    <option value="SWDN">SUECIA</option>
                    <option value="SWTZ">SUIZA</option>
                    <option value="SYR">SIRIA</option>
                    <option value="TWAN">TAIWÁN</option>
                    <option value="TJK">TAYIKISTÁN</option>
                    <option value="TAZN">TANZANIA</option>
                    <option value="THAI">TAILANDIA</option>
                    <option value="TMOR">TIMOR-LESTE</option>
                    <option value="TOGO">IR</option>
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
                    <option value="URU">URUGUAY</option>
                    <option value="UZB">UZBEKISTÁN</option>
                    <option value="VANU">VANUATU</option>
                    <option value="VENZ">VENEZUELA</option>
                    <option value="VTNM">VIETNAM</option>
                    <option value="BRVI">ISLAS VÍRGENES BRITÁNICAS</option>
                    <option value="WAFT">ISLAS WALLIS Y FUTUNA</option>
                    <option value="SSAH">SAHARA OCCIDENTAL</option>
                    <option value="YEM">YEMEN</option>
                    <option value="ZAMB">ZAMBIA</option>
                    <option value="ZIMB">ZIMBABUE</option>
                </select>
            </div>

            <div class="form-card__group" id="divorce_explication_${index}">
                <label class="form-card__label" for="divorce_explication_${index}">CÓMO TERMINÓ EL MATRIMONIO:</label>
                <textarea class="form-card__input" id="divorce_explication_${index+1}" name="divorce_explication_${index+1}" rows="5">${divorcio.EXPLICACION || ''}</textarea>
            </div>
        `;

        divorceFields.querySelectorAll('select').forEach(select => {
            const codAttribute = select.getAttribute(`cod_${select.name}`);
            if (codAttribute === "null" || codAttribute === "") {
                select.selectedIndex = 0;
            } else {
                select.value = codAttribute;
            }
        });

        return divorceFields;
    }

        // Función para actualizar el botón de eliminar
    function updateRemoveButton() {
        removeDivorceButton.style.display = divorcios.length > 1 ? 'inline-block' : 'none';
    }

    // Función para añadir un nuevo divorcio
    function addDivorceField() {
        const newIndex = divorcios.length;
        divorcios.push({});
        const newDivorceFields = createDivorceFields({}, newIndex);
        dynamicContent.insertBefore(newDivorceFields, addDivorceButton);
        updateRemoveButton();
    }

    // Función para eliminar el último divorcio
    function removeLastDivorceField() {
        if (divorcios.length > 1) {
            divorcios.pop();
            generateDivorceFields();
        }
    }

    // Event Listeners
    selectElementCivilStatus.addEventListener('change', function() {
        generateDynamicContent(this.value);
    });

    addDivorceButton.addEventListener('click', addDivorceField);
    removeDivorceButton.addEventListener('click', removeLastDivorceField);
    

    var checkbox = document.getElementById('no_aplica');
    var inputField = document.getElementById('provincia_estado');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            inputField.value = '';
            inputField.disabled = true;
        } else {
            inputField.disabled = false;
        }
    });

    var selectElementPaisRegion = document.getElementById("pais_region");
    var codPaisRegion = selectElementPaisRegion.getAttribute("data-cod-pais-region");
    if (codPaisRegion=="None") {
        selectElementPaisRegion.selectedIndex = 0;
    } else {
        selectElementPaisRegion.value = codPaisRegion;
    }

    var selectElementStayDurationUnit = document.getElementById("stay_duration_unit");
    var codStayDurationUnit = selectElementStayDurationUnit.getAttribute("data_stay_duration_unit");
    if (codStayDurationUnit=="None") {
        selectElementStayDurationUnit.selectedIndex = 0;
    } else {
        selectElementStayDurationUnit.value = codStayDurationUnit;
    }




    let nationalityCount = parseInt(window.nationalityCount, 10);
    for (let i = 1; i <= nationalityCount; i++) {
        var selectElementNacionalidad = document.getElementById(`nacionalidad_${i}`);
        var codNacionalidad = selectElementNacionalidad.getAttribute("data_cod_nacionalidad");
        if (codNacionalidad=="None") {
            selectElementNacionalidad.selectedIndex = 0;
        } else {
            selectElementNacionalidad.value = codNacionalidad;
        }


        const hasPassportYes = document.getElementById(`has_passport_yes_${i}`);
        const passportDetails = document.getElementById(`passport_details_${i}`);

        // Verificar el estado inicial
        if (hasPassportYes.checked) {
            passportDetails.classList.remove('hidden');
        } else {
            passportDetails.classList.add('hidden');
        }

        // Agregar eventos de cambio para cada radio button
        hasPassportYes.addEventListener('change', function() {
            if (this.checked) {
                passportDetails.classList.remove('hidden');
            } else {
                passportDetails.classList.add('hidden');
            }
        });

        const hasPassportNo = document.getElementById(`has_passport_no_${i}`);
        hasPassportNo.addEventListener('change', function() {
            if (this.checked) {
                passportDetails.classList.add('hidden');
            } else {
                passportDetails.classList.remove('hidden');
            }
        });
        
    }


    const travel_companions_yes = document.getElementById(`travel_companions_yes`);
    const companions_details_container = document.getElementById(`companions_details_container`);

    // Verificar el estado inicial
    if (travel_companions_yes.checked) {
        companions_details_container.classList.remove('hidden');
    } else {
        companions_details_container.classList.add('hidden');
    }

    // Agregar eventos de cambio para cada radio button
    travel_companions_yes.addEventListener('change', function() {
        if (this.checked) {
            companions_details_container.classList.remove('hidden');
        } else {
            companions_details_container.classList.add('hidden');
        }
    });

    const travel_companions_no = document.getElementById(`travel_companions_no`);
    travel_companions_no.addEventListener('change', function() {
        if (this.checked) {
            companions_details_container.classList.add('hidden');
        } else {
            companions_details_container.classList.remove('hidden');
        }
    });


    const motivoViajeSelect = document.getElementById('motivo_viaje');
    const detalleMotivoSelect = document.getElementById('detalle_motivo');

    var optionsByMotivo = {
        'A': [
            { value: 'A1-AM', text: 'EMBAJADOR O MINISTRO PÚBLICO (A1)' },
            { value: 'A1-CH', text: 'HIJO DE UN A1 (A1)' },
            { value: 'A1-DP', text: 'DIPLOMÁTICO DE CARRERA/FUNCIONARIO CONSULAR (A1)' },
            { value: 'A1-SP', text: 'CÓNYUGE DE UN A1 (A1)' },
            { value: 'A2-CH', text: 'HIJO DE UN A2 (A2)' },
            { value: 'A2-EM', text: 'FUNCIONARIO/EMPLEADO EXTRANJERO (A2)' },
            { value: 'A2-SP', text: 'CÓNYUGE DE UN A2 (A2)' },
            { value: 'A3-CH', text: 'HIJO DE UN A3 (A3)' },
            { value: 'A3-EM', text: 'EMPRESA PERSONAL DE UN A1 O A2 (A3)' },
            { value: 'A3-SP', text: 'CÓNYUGE DE UN A3 (A3)' }
        ],
        'B': [
            { value: 'B1-B2', text: 'NEGOCIOS Y TURISMO (VISITANTE TEMPORAL) (B1/B2)' },
            { value: 'B1-CF', text: 'NEGOCIOS/CONFERENCIAS (B1)' },
            { value: 'B2-TM', text: 'TURISMO/TRATAMIENTO MÉDICO (B2)' }
        ],
        'C': [
            { value: 'C1-D', text: 'TRIPULANTE EN TRANSITO (C1/D)' },
            { value: 'C1-TR', text: 'TRANSITO (C1)' },
            { value: 'C2-UN', text: 'TRÁNSITO A LA SEDE DE LA ONU (C2)' },
            { value: 'C3-CH', text: 'HIJO DE UN C3 (C3)' },
            { value: 'C3-EM', text: 'EMPLEO PERSONAL DE UN C3 (C3)' },
            { value: 'C3-FR', text: 'FUNCIONARIO EXTRANJERO EN TRANSITO (C3)' },
            { value: 'C3-SP', text: 'CÓNYUGE DE UN C3 (C3)' }
        ],
        'CNMI': [
            { value: 'CW1-CW1', text: 'TRABAJADOR TEMPORAL DE LAS CNMI (CW1)' },
            { value: 'CW2-CH', text: 'NIÑO DE CW1 (CW2)' },
            { value: 'CW2-SP', text: 'CÓNYUGE DE CW1 (CW2)' },
            { value: 'E2C-E2C', text: 'INVERSOR A LARGO PLAZO DE LAS CNMI (E2C)' }
        ],
        'D': [
            { value: 'D-D', text: 'TRIPULANTE (D)' }
        ],
        'E': [
            { value: 'E1-CH', text: 'HIJO DE UN E1 (E1)' },
            { value: 'E1-EX', text: 'EJECUTIVO/GERENTE/EMPRESA ESENCIAL (E1)' },
            { value: 'E1-SP', text: 'CÓNYUGE DE UN E1 (E1)' },
            { value: 'E1-TR', text: 'COMERCIANTE DE TRATADOS (E1)' },
            { value: 'E2-CH', text: 'HIJO DE UN E2 (E2)' },
            { value: 'E2-EX', text: 'EJECUTIVO/GERENTE/EMPRESA ESENCIAL (E2)' },
            { value: 'E2-SP', text: 'CÓNYUGE DE UN E2 (E2)' },
            { value: 'E2-TR', text: 'INVERSIONISTA DEL TRATADO (E2)' },
            { value: 'E3D-CH', text: 'HIJO DE UN E3 (E3D)' },
            { value: 'E3D-SP', text: 'CÓNYUGE DE UN E3 (E3D)' }
        ],
        'F': [
            { value: 'F1-F1', text: 'ESTUDIANTE (F1)' },
            { value: 'F2-CH', text: 'HIJO DE UN F1 (F2)' },
            { value: 'F2-SP', text: 'CÓNYUGE DE UN F1 (F2)' }
        ],
        'G': [
            { value: 'G1-CH', text: 'HIJO DE UN G1 (G1)' },
            { value: 'G1-G1', text: 'REPRESENTANTE PRINCIPAL (G1)' },
            { value: 'G1-SP', text: 'CÓNYUGE DE UN G1 (G1)' },
            { value: 'G1-ST', text: 'PERSONAL DEL REPRESENTANTE PRINCIPAL (G1)' },
            { value: 'G2-CH', text: 'HIJO DE UN G2 (G2)' },
            { value: 'G2-RP', text: 'REPRESENTANTE (G2)' },
            { value: 'G2-SP', text: 'CÓNYUGE DE UN G2 (G2)' },
            { value: 'G3-CH', text: 'HIJO DE UN G3 (G3)' },
            { value: 'G3-RP', text: 'REPRESENTANTE DE PAÍS NO RECONOCIDO/-MIEMBRO (G3)' },
            { value: 'G3-SP', text: 'CÓNYUGE DE UN G3 (G3)' },
            { value: 'G4-CH', text: 'HIJO DE UN G4 (G4)' },
            { value: 'G4-G4', text: 'EMPLEADO DE ORGANIZACIÓN INTERNACIONAL (G4)' },
            { value: 'G4-SP', text: 'CÓNYUGE DE UN G4 (G4)' },
            { value: 'G5-CH', text: 'HIJO DE UN G5 (G5)' },
            { value: 'G5-EM', text: 'EMPLEO PERSONAL DE UN G1, 2, 3 O 4 (G5)' },
            { value: 'G5-SP', text: 'CÓNYUGE DE UN G5 (G5)' }
        ],
        'H': [
            { value: 'H1B-H1B', text: 'OCUPACIÓN ESPECIALIZADA (H1B)' },
            { value: 'H1B1-CHL', text: 'OCUPACIÓN ESPECIAL CHILEÑA (H1B1)' },
            { value: 'H1B1-SGP', text: 'OCUPACIÓN ESPECIAL DE SINGAPUR (H1B1)' },
            { value: 'H1C-NR', text: 'ENFERMERA EN ZONA DE ESCASEZ (H1C)' },
            { value: 'H2A-AG', text: 'TRABAJADOR AGRÍCOLA (H2A)' },
            { value: 'H2B-NA', text: 'TRABAJADOR NO AGRÍCOLA (H2B)' },
            { value: 'H3-TR', text: 'PRÁCTICA (H3)' },
            { value: 'H4-CH', text: 'HIJO DE UN H (H4)' },
            { value: 'H4-SP', text: 'CÓNYUGE DE UN H (H4)' }
        ],
        'I': [
            { value: 'I-CH', text: 'HIJO DE UN YO (I)' },
            { value: 'I-FR', text: 'REPRESENTANTE DE MEDIOS EXTRANJEROS (I)' },
            { value: 'I-SP', text: 'CÓNYUGE DE UN YO (YO)' }
        ],
        'J': [
            { value: 'J1-J1', text: 'VISITANTE DE INTERCAMBIO (J1)' },
            { value: 'J2-CH', text: 'HIJO DE UN J1 (J2)' },
            { value: 'J2-SP', text: 'CÓNYUGE DE UN J1 (J2)' }
        ],
        'K': [
            { value: 'K1-K1', text: 'PROMETIDO(A) DE UN CIUDADANO ESTADOUNIDENSE (K1)' },
            { value: 'K2-K2', text: 'HIJO DE UN K1 (K2)' },
            { value: 'K3-K3', text: 'CÓNYUGE DE UN CIUDADANO ESTADOUNIDENSE (K3)' },
            { value: 'K4-K4', text: 'NIÑO DE UN K3 (K4)' }
        ],
        'L': [
            { value: 'L1-L1', text: 'CESIONARIO INTRAEMPRESARIAL (L1)' },
            { value: 'L2-CH', text: 'HIJO DE UN L1 (L2)' },
            { value: 'L2-SP', text: 'CÓNYUGE DE UN L1 (L2)' }
        ],
        'M': [
            { value: 'M1-M1', text: 'ESTUDIANTE (M1)' },
            { value: 'M2-CH', text: 'NIÑO DE M1 (M2)' },
            { value: 'M2-SP', text: 'CÓNYUGE DE M1 (M2)' },
            { value: 'M3-M3', text: 'ESTUDIANTE VIAJERO (M3)' }
        ],
        'N': [
            { value: 'N8-CH', text: 'HIJO DE UN N8 (N9)' },
            { value: 'N8-N8', text: 'PADRE DE CIERTO INMIGRANTE ESPECIAL (N8)' }
        ],
        'NATO': [
            { value: 'NATO1-CH', text: 'NIÑO DE LA OTAN 1 (NATO1)' },
            { value: 'NATO1-PR', text: 'REPRESENTANTE PRINCIPAL (NATO1)' },
            { value: 'NATO1-SP', text: 'ESPOSA DE LA OTAN1 (NATO1)' },
            { value: 'NATO2-CH', text: 'NIÑO DE LA OTAN2 (NATO2)' },
            { value: 'NATO2-RP', text: 'REPRESENTANTE (NATO2)' },
            { value: 'NATO2-SP', text: 'ESPOSA DE LA OTAN2 (NATO2)' },
            { value: 'NATO3-CH', text: 'NIÑO DE LA OTAN3 (NATO3)' },
            { value: 'NATO3-SP', text: 'ESPOSA DE LA OTAN3 (NATO3)' },
            { value: 'NATO3-ST', text: 'PERSONAL ADMINISTRATIVO (NATO3)' },
            { value: 'NATO4-CH', text: 'NIÑO DE LA OTAN4 (NATO4)' },
            { value: 'NATO4-OF', text: 'OFICIAL (NATO4)' },
            { value: 'NATO4-SP', text: 'ESPOSA DE LA OTAN4 (NATO4)' },
            { value: 'NATO5-CH', text: 'NIÑO DE LA OTAN5 (NATO5)' },
            { value: 'NATO5-EX', text: 'EXPERTO (NATO5)' },
            { value: 'NATO5-SP', text: 'ESPOSA DE LA OTAN5 (NATO5)' },
            { value: 'NATO6-CH', text: 'NIÑO DE LA OTAN6 (NATO6)' },
            { value: 'NATO6-SP', text: 'ESPOSA DE LA OTAN6 (NATO6)' },
            { value: 'NATO6-ST', text: 'PERSONAL CIVIL (NATO6)' },
            { value: 'NATO7-CH', text: 'NIÑO DE LA OTAN7 (NATO7)' },
            { value: 'NATO7-EM', text: 'EMPLEO PERSONAL DE LA OTAN1-OTAN6 (OTAN7)' },
            { value: 'NATO7-SP', text: 'ESPOSA DE LA OTAN7 (NATO7)' }
        ],
        'O': [
            { value: 'O1-EX', text: 'HABILIDAD EXTRAORDINARIA (O1)' },
            { value: 'O2-AL', text: 'EXTRANJERO QUE ACOMPAÑA/ASISTENCIA (O2)' },
            { value: 'O3-CH', text: 'HIJO DE O1 O O2 (O3)' },
            { value: 'O3-SP', text: 'CÓNYUGE DE O1 O O2 (O3)' }
        ],
        'P': [
            { value: 'P1-P1', text: 'EXTRANJERO RECONOCIDO INTERNACIONALMENTE (P1)' },
            { value: 'P2-P2', text: 'PROGRAMA DE INTERCAMBIO DE ARTISTAS Y ANIMADORES (P2)' },
            { value: 'P3-P3', text: 'ARTISTA/ANIMADOR EN PROG. CULTURALES (P3)' },
            { value: 'P4-CH', text: 'HIJO DE P1, P2 O P3 (P4)' },
            { value: 'P4-SP', text: 'CÓNYUGE DE P1, P2 O P3 (P4)' }
        ],
        'Q': [
            { value: 'Q1-Q1', text: 'VISITANTE DE INTERCAMBIO CULTURAL (T1)' }
        ],
        'R': [
            { value: 'R1-R1', text: 'TRABAJADOR RELIGIOSO (R1)' },
            { value: 'R2-CH', text: 'NIÑO DE R1 (R2)' },
            { value: 'R2-SP', text: 'CÓNYUGE DE R1 (R2)' }
        ],
        'S': [
            { value: 'S7-S7', text: 'FAMILIAR DE UN INFORMANTE (S7)' }
        ],
        'T': [
            { value: 'T1-T1', text: 'VÍCTIMA DE TRATA DE PERSONAS (T1)' },
            { value: 'T2-SP', text: 'CÓNYUGE DE T1 (T2)' },
            { value: 'T3-CH', text: 'NIÑO DE T1 (T3)' },
            { value: 'T4-PR', text: 'PADRE DE T1 (T4)' },
            { value: 'T5-SB', text: 'HERMANO DE T1 (T5)' },
            { value: 'T6-CB', text: 'ADULTO/HIJO MENOR DE UN DERIVADO DE UNA T1 (T6)' }
        ],
        'TD/TN': [
            { value: 'TD-CH', text: 'NIÑO DE TN (TD)' },
            { value: 'TD-SP', text: 'CÓNYUGE DE TN (TD)' }
        ],
        'U': [
            { value: 'U1-U1', text: 'VÍCTIMA DE DELITO (U1)' },
            { value: 'U2-SP', text: 'CÓNYUGE DE U1 (U2)' },
            { value: 'U3-CH', text: 'NIÑO DE U1 (U3)' },
            { value: 'U4-PR', text: 'PADRE DE U1 (U4)' },
            { value: 'U5-SB', text: 'HERMANO DE U1 (U5)' }
        ],
        'PAROLE-BEN': [
            { value: 'PRL-PARCIS', text: 'PARCIS (PERMANENCIA LIBRE APROBADA POR USCIS)' }

        ]
    };

    function setSelectedOption(selectElement, value) {
        const options = selectElement.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                options[i].selected = true;
                break;
            }
        }
    }
    
    function updateDetalleMotivoOptions(motivo, selectedDetalle = null) {
        detalleMotivoSelect.innerHTML = '<option disabled value="">- SELECCIONE UNO -</option>';
    
        if (optionsByMotivo[motivo]) {
            optionsByMotivo[motivo].forEach(function(option) {
                const newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.textContent = option.text;
                detalleMotivoSelect.appendChild(newOption);
            });
    
            detalleMotivoSelect.disabled = false;
            detalleMotivoSelect.selectedIndex = 0;
    
            if (selectedDetalle) {
                setSelectedOption(detalleMotivoSelect, selectedDetalle);
            }
        } else {
            detalleMotivoSelect.disabled = true;
            detalleMotivoSelect.selectedIndex = 0;
        }
    }
    
    const selectedMotivoViaje = motivoViajeSelect.getAttribute('data_cod_motivo_viaje') || '';
    if (selectedMotivoViaje) {
        setSelectedOption(motivoViajeSelect, selectedMotivoViaje);
        
        const selectedDetalleMotivo = detalleMotivoSelect.getAttribute('data_cod_motivo_especifico_viaje') || '';
        updateDetalleMotivoOptions(selectedMotivoViaje, selectedDetalleMotivo);
        
        if (!selectedDetalleMotivo) {
            detalleMotivoSelect.selectedIndex = 0;
        }
    } else {
        motivoViajeSelect.selectedIndex = 0;
    }
    
    motivoViajeSelect.addEventListener('change', function() {
        const selectedMotivo = motivoViajeSelect.value;
        updateDetalleMotivoOptions(selectedMotivo);
    });

    var selectElementUs = document.getElementById("us_state");
    var codUs = selectElementUs.getAttribute("cod_estado_usa");
    if (codUs=="None") {
        selectElementUs.selectedIndex = 0;
    } else {
        selectElementUs.value = codUs;
    }


    let PassportsCount = parseInt(window.PassportsCount, 10);
    for (let i = 1; i <= PassportsCount; i++) {
        var selectElementUs = document.getElementById(`issuing-country-${i}`);
        var codUs = selectElementUs.getAttribute("cod_pais_pasaporte_perdido");
        if (codUs=="None") {
            selectElementUs.selectedIndex = 0;
        } else {
            selectElementUs.value = codUs;
        }
    }


    let companionsCount = parseInt(window.companionsCount, 10);
    for (let i = 1; i <= companionsCount; i++) {
        var companionRelationship = document.getElementById(`companion_relationship_${i}`);
        var cod_companion_relationship = companionRelationship.getAttribute("cod_companion_relationship");
        if (cod_companion_relationship=="None") {
            companionRelationship.selectedIndex = 0;
        } else {
            companionRelationship.value = cod_companion_relationship;
        }
    }

    let TripsCount = parseInt(window.TripsCount, 10);
    for (let i = 1; i <= TripsCount; i++) {
        let visit_duration_unit = document.getElementById(`visit_duration_unit_${i}`);
        let visit_duration_number = document.getElementById(`visit_duration_number_${i}`);

        visit_duration_unit.addEventListener('change', function() {
            if (visit_duration_unit.value === 'H') {
                visit_duration_number.value = '';
                visit_duration_number.disabled = true;
            } else {
                visit_duration_number.disabled = false;
            }
        });

        let cod_visit_duration_unit = visit_duration_unit.getAttribute("cod_visit_duration_unit");

        if (cod_visit_duration_unit === "None") {
            visit_duration_unit.selectedIndex = 0;
        } else {
            visit_duration_unit.value = cod_visit_duration_unit;
        }
    }

    const parents_mother = document.getElementById('parents_mother');
    const parents_father = document.getElementById('parents_father');
    const parents_both = document.getElementById('parents_both');
    const parents_none = document.getElementById('parents_none');

    const mother_status = document.getElementById('mother_status');
    const father_status = document.getElementById('father_status');

    function updateParentStatus() {
        if (parents_mother.checked) {
            mother_status.classList.remove('hidden');
            father_status.classList.add('hidden');
        } else if (parents_father.checked) {
            mother_status.classList.add('hidden');
            father_status.classList.remove('hidden');
        } else if (parents_both.checked) {
            mother_status.classList.remove('hidden');
            father_status.classList.remove('hidden');
        } else if (parents_none.checked) {
            mother_status.classList.add('hidden');
            father_status.classList.add('hidden');
        }
    }

    // Inicializar el estado basado en el valor inicial
    updateParentStatus();

    // Agregar los event listeners
    parents_mother.addEventListener('change', updateParentStatus);
    parents_father.addEventListener('change', updateParentStatus);
    parents_both.addEventListener('change', updateParentStatus);
    parents_none.addEventListener('change', updateParentStatus);

    var selectMotherStatus = document.getElementById("select_mother_status");
    var codMotherStatus = selectMotherStatus.getAttribute("cod_mother_status");
    if (codMotherStatus=="None") {
        selectMotherStatus.selectedIndex = 0;
    } else {
        selectMotherStatus.value = codMotherStatus;
    }

    var selectFatherStatus = document.getElementById("select_father_status");
    var codFatherStatus = selectFatherStatus.getAttribute("cod_father_status");
    if (codFatherStatus=="None") {
        selectFatherStatus.selectedIndex = 0;
    } else {
        selectFatherStatus.value = codFatherStatus;
    }

    var residence_country = document.getElementById("residence_country")
    var cod_residence_country = residence_country.getAttribute("cod_residence_country");
    if(cod_residence_country == 'None'){
        residence_country.selectedIndex = 0;
    } else{
        residence_country.value = cod_residence_country;
    }

    var contact_state = document.getElementById("contact_state")
    var cod_contact_state = contact_state.getAttribute("cod_contact_state");
    if(cod_contact_state == 'None'){
        contact_state.selectedIndex = 0;
    } else{
        contact_state.value = cod_contact_state;
    }



    const relatives_usa_yes = document.getElementById(`relatives_usa_yes`);
    const relatives_container = document.getElementById(`relatives_container`);

    // Verificar el estado inicial
    if (relatives_usa_yes.checked) {
        relatives_container.classList.remove('hidden');
    } else {
        relatives_container.classList.add('hidden');
    }

    // Agregar eventos de cambio para cada radio button
    relatives_usa_yes.addEventListener('change', function() {
        if (this.checked) {
            relatives_container.classList.remove('hidden');
        } else {
            relatives_container.classList.add('hidden');
        }
    });

    const relatives_usa_no = document.getElementById(`relatives_usa_no`);
    relatives_usa_no.addEventListener('change', function() {
        if (this.checked) {
            relatives_container.classList.add('hidden');
        } else {
            relatives_container.classList.remove('hidden');
        }
    });



    let NetworksCount = parseInt(window.NetworksCount, 10);
    for (let i = 1; i <= NetworksCount; i++) {
        var social_media_type = document.getElementById(`social_media_type_${i}`);
        var cod_social_media = social_media_type.getAttribute("cod_social_media");
        if (cod_social_media=="None") {
            social_media_type.selectedIndex = 0;
        } else {
            social_media_type.value = cod_social_media;
        }
    }

    var pasaport_type = document.getElementById("pasaport_type");
    var cod_pasaport_type = pasaport_type.getAttribute("cod_pasaport_type");
    if (cod_pasaport_type=="None") {
        pasaport_type.selectedIndex = 0;
    } else {
        pasaport_type.value = cod_pasaport_type;
    }

    var contact_relationship = document.getElementById("contact_relationship");
    var cod_contact_relationship = contact_relationship.getAttribute("cod_contact_relationship");
    if (cod_contact_relationship=="None") {
        contact_relationship.selectedIndex = 0;
    } else {
        contact_relationship.value = cod_contact_relationship;
    }

    var work_country = document.getElementById("work_country");
    var cod_work_country =  work_country.getAttribute("cod_work_country");
    if (cod_work_country=="None") {
        work_country.selectedIndex = 0;
    } else {
        work_country.value = cod_work_country;
    }


    let countriesCount = parseInt(window.countriesCount, 10);
    for (let i = 1; i <= countriesCount; i++) {
        var country_visited = document.getElementById(`country_visited_${i}`);
        var cod_country_visited = country_visited.getAttribute("cod_country_visited");
        if (cod_country_visited=="None") {
            country_visited.selectedIndex = 0;
        } else {
            country_visited.value = cod_country_visited;
        }
    }

    let armiesCount = parseInt(window.armiesCount, 10);
    for (let i = 1; i <= armiesCount; i++) {
        var army_place = document.getElementById(`army_place_${i}`);
        var cod_army_place = army_place.getAttribute("cod_army_place");
        if (cod_army_place=="None") {
            army_place.selectedIndex = 0;
        } else {
            army_place.value = cod_army_place;
        }
    }

    let institutionsCount = parseInt(window.institutionsCount, 10);
    for (let i = 1; i <= institutionsCount; i++) {
        var institution_country = document.getElementById(`institution_country_${i}`);
        var cod_institution_country = institution_country.getAttribute("cod_institution_country");
        if (cod_institution_country=="None") {
            institution_country.selectedIndex = 0;
        } else {
            institution_country.value = cod_institution_country;
        }
    }

    let jobsCount = parseInt(window.jobsCount, 10);
    for (let i = 1; i <= jobsCount; i++) {
        var previous_job_country = document.getElementById(`previous_job_country_${i}`);
        var cod_previous_job_country = previous_job_country.getAttribute("cod_previous_job_country");
        if (cod_previous_job_country=="None") {
            previous_job_country.selectedIndex = 0;
        } else {
            previous_job_country.value = cod_previous_job_country;
        }
    }

    let relativesCount = parseInt(window.relativesCount, 10);
    for (let i = 1; i <= relativesCount; i++) {
        var relative_relationship = document.getElementById(`relative_relationship_${i}`);
        var cod_relative_relationship = relative_relationship.getAttribute("cod_relative_relationship");
        if (cod_relative_relationship=="None") {
            relative_relationship.selectedIndex = 0;
        } else {
            relative_relationship.value = cod_relative_relationship;
        }

        var relative_status = document.getElementById(`relative_status_${i}`);
        var cod_relative_status = relative_status.getAttribute("cod_relative_status");

        if (cod_relative_status=="None") {
            relative_status.selectedIndex = 0;
        } else {
            relative_status.value = cod_relative_status;
        }
    }

    



    const emailContainer = document.getElementById('email-container');
    const addEmailButton = document.getElementById('add-email');
    const removeEmailButton = document.getElementById('remove-email');
    let EmailsCount = parseInt(window.EmailsCount, 10);

    if (EmailsCount === 0) {
        EmailsCount = 1;
    }


    function updateButtonVisibilityEmails() {
        removeEmailButton.classList.toggle('hidden', EmailsCount <= 1);
    }

    function addEmailField() {
        const newEmailIndex = EmailsCount + 1;
        EmailsCount++;
        const newEmailGroup = document.createElement('div');
        newEmailGroup.className = 'form-card__group email-group';
        newEmailGroup.innerHTML = `
            <label class="form-card__label" for="email_${newEmailIndex}">CORREO ELECTRÓNICO:</label>
            <input class="form-card__input" type="email" id="email_${newEmailIndex}" name="email_${newEmailIndex}" value=""/>
        `;
        emailContainer.appendChild(newEmailGroup);
        updateButtonVisibilityEmails();
        
    }

    function removeEmailField() {
        if (EmailsCount > 1) {
            emailContainer.removeChild(emailContainer.lastElementChild);
            EmailsCount--;
            updateButtonVisibilityEmails();
        }
    }

    addEmailButton.addEventListener('click', addEmailField);
    removeEmailButton.addEventListener('click', removeEmailField);

    updateButtonVisibilityEmails();
        
});